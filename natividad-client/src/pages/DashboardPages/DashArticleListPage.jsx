import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/ArticleService";
import { imageKeys, resolveImage } from "../../assets/articleImages";

const statuses = ["active", "inactive"];
const availabilities = ["in-stock", "pre-order", "limited"];

const blankForm = {
  slug: "",
  title: "",
  category: "",
  image: imageKeys[0] || "bq1",
  price: 0,
  availability: "in-stock",
  contentText: "",
  status: "active",
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const normalize = (article) => ({
  id: article._id,
  _id: article._id,
  slug: String(article.slug ?? "").trim(),
  title: String(article.title ?? "").trim(),
  image: String(article.image ?? "").trim(),
  availability: String(article.availability ?? "in-stock"),
  price: Number(article.price ?? 0),
  content: Array.isArray(article.content) ? article.content : [],
  category: String(article.category ?? "").trim(),
  status: String(article.status ?? "active").trim().toLowerCase(),
});

const availabilityColor = (a) =>
  a === "in-stock" ? "success" : a === "limited" ? "warning" : "info";

const DashArticleListPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const loadArticles = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const { data } = await fetchArticles();
      setArticles((data.articles || []).map(normalize));
    } catch (err) {
      setLoadError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load articles from the server.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category).filter(Boolean))),
    [articles],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return articles.filter((a) => {
      const matchSearch =
        !q ||
        a.slug.toLowerCase().includes(q) ||
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      const matchStatus = filterStatus === "all" || a.status === filterStatus;
      const matchCategory =
        filterCategory === "all" || a.category === filterCategory;
      return matchSearch && matchStatus && matchCategory;
    });
  }, [articles, search, filterStatus, filterCategory]);

  const openModal = (article) => {
    setModal({ open: true, id: article ? article._id : null });
    if (article) {
      setForm({
        slug: article.slug,
        title: article.title,
        category: article.category,
        image: article.image || blankForm.image,
        price: article.price,
        availability: article.availability,
        contentText: (article.content || []).join("\n\n"),
        status: article.status,
      });
    } else {
      setForm({ ...blankForm });
    }
    setErrors({});
    setSubmitError("");
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setForm({ ...blankForm });
    setErrors({});
    setSubmitError("");
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.slug.trim()) next.slug = "Slug is required";
    else if (/\s/.test(form.slug))
      next.slug = "Slug must not contain spaces";
    if (!form.title.trim()) next.title = "Title is required";
    if (!form.category.trim()) next.category = "Category is required";
    if (!form.image) next.image = "Image is required";
    if (!form.availability) next.availability = "Availability is required";
    const p = Number(form.price);
    if (Number.isNaN(p) || p < 0) next.price = "Price must be 0 or greater";
    if (
      !next.slug &&
      articles.some(
        (a) => a._id !== modal.id && a.slug === form.slug.trim().toLowerCase(),
      )
    ) {
      next.slug = "Slug already exists";
    }
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    const paragraphs = form.contentText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    const payload = {
      slug: form.slug.trim().toLowerCase(),
      title: form.title.trim(),
      category: form.category.trim(),
      image: form.image,
      price: Number(form.price),
      availability: form.availability,
      content: paragraphs,
      status: form.status,
    };
    try {
      if (modal.id) await updateArticle(modal.id, payload);
      else await createArticle(payload);
      closeModal();
      await loadArticles();
    } catch (err) {
      setSubmitError(
        err.response?.data?.message ||
          err.message ||
          "Unable to save article. Please try again.",
      );
    }
  };

  const toggleStatus = async (article) => {
    try {
      await updateArticle(article._id, {
        status: article.status === "active" ? "inactive" : "active",
      });
      await loadArticles();
    } catch (err) {
      setLoadError(
        err.response?.data?.message ||
          err.message ||
          "Unable to update article status.",
      );
    }
  };

  const handleDelete = async (article) => {
    if (!window.confirm(`Delete article "${article.title}"?`)) return;
    try {
      await deleteArticle(article._id);
      await loadArticles();
    } catch (err) {
      setLoadError(
        err.response?.data?.message ||
          err.message ||
          "Unable to delete article.",
      );
    }
  };

  const fieldProps = (name, label, extra = {}) => ({
    name,
    label,
    value: form[name],
    onChange: handleChange,
    error: Boolean(errors[name]),
    helperText: errors[name],
    fullWidth: true,
    ...extra,
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      valueGetter: (value, row) => String(row._id || "").slice(-6),
    },
    {
      field: "image",
      headerName: "Image",
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (cell) => (
        <Box
          sx={{
            width: 56,
            height: 42,
            borderRadius: 1,
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
          }}
        >
          <img
            src={resolveImage(cell.row.image)}
            alt={cell.row.image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      ),
    },
    { field: "slug", headerName: "Slug", width: 180 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "category", headerName: "Category", width: 120 },
    {
      field: "price",
      headerName: "Price",
      width: 110,
      valueGetter: (value, row) => `Php ${Number(row.price).toLocaleString()}`,
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 130,
      renderCell: (cell) => (
        <Chip
          size="small"
          variant="outlined"
          color={availabilityColor(cell.row.availability)}
          label={String(cell.row.availability).replace("-", " ")}
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      sortable: false,
      renderCell: (cell) => (
        <Chip
          size="small"
          variant="outlined"
          color={cell.row.status === "active" ? "success" : "warning"}
          label={labelize(cell.row.status)}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 230,
      sortable: false,
      filterable: false,
      renderCell: (cell) => (
        <Stack
          direction="row"
          spacing={0.5}
          alignItems="center"
          sx={{ py: 0.5 }}
        >
          <Button
            size="small"
            variant="outlined"
            color="warning"
            onClick={() => openModal(cell.row)}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="contained"
            color={cell.row.status === "active" ? "warning" : "success"}
            onClick={() => toggleStatus(cell.row)}
          >
            {cell.row.status === "active" ? "Disable" : "Enable"}
          </Button>
          <Button
            size="small"
            variant="text"
            color="error"
            onClick={() => handleDelete(cell.row)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", minWidth: 0, overflowX: "hidden" }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4">Articles</Typography>
        <Button variant="contained" onClick={() => openModal()}>
          Add Article
        </Button>
      </Box>

      {loadError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loadError}
        </Alert>
      ) : null}

      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2 },
          minWidth: 0,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 2 }}
          flexWrap="wrap"
          useFlexGap
        >
          <TextField
            size="small"
            placeholder="Search by slug, title, or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 2, minWidth: 200 }}
          />
          <TextField
            select
            size="small"
            label="Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            sx={{ flex: 1, minWidth: 150 }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ flex: 1, minWidth: 150 }}
          >
            <MenuItem value="all">All Statuses</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {labelize(s)}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Box sx={{ width: "100%", minWidth: 0 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={filtered}
              columns={columns}
              autoHeight
              rowHeight={56}
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10, page: 0 } },
              }}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "rgba(122,47,59,0.05)",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "rgba(122,47,59,0.03)",
                },
                "& .MuiDataGrid-cell:focus": { outline: "none" },
              }}
            />
          )}
        </Box>
      </Paper>

      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>
            {modal.id ? "Edit Article" : "Add Article"}
          </DialogTitle>
          <DialogContent dividers sx={{ pt: 2 }}>
            {submitError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {submitError}
              </Alert>
            ) : null}
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("slug", "Slug")} />
                <TextField {...fieldProps("title", "Title")} />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("category", "Category")} />
                <TextField
                  {...fieldProps("image", "Image", { select: true })}
                >
                  {imageKeys.map((key) => (
                    <MenuItem key={key} value={key}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Box
                          component="img"
                          src={resolveImage(key)}
                          alt={key}
                          sx={{
                            width: 32,
                            height: 24,
                            objectFit: "cover",
                            borderRadius: 0.5,
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        />
                        {key}
                      </Box>
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  {...fieldProps("price", "Price (Php)", {
                    type: "number",
                    inputProps: { min: 0 },
                  })}
                />
                <TextField
                  {...fieldProps("availability", "Availability", {
                    select: true,
                  })}
                >
                  {availabilities.map((a) => (
                    <MenuItem key={a} value={a}>
                      {a.replace("-", " ")}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  {...fieldProps("status", "Status", { select: true })}
                >
                  {statuses.map((s) => (
                    <MenuItem key={s} value={s}>
                      {labelize(s)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <TextField
                {...fieldProps("contentText", "Content (paragraphs)", {
                  multiline: true,
                  rows: 6,
                  helperText:
                    errors.contentText ||
                    "Separate paragraphs with a blank line.",
                })}
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ py: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">
              {modal.id ? "Update Article" : "Save Article"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default DashArticleListPage;
