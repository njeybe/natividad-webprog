import { useState, useMemo, useEffect, useCallback } from "react";
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
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchUsers,
  createUser,
  updateUser,
} from "../../services/UserService";

const roles = ["admin", "editor", "viewer"];
const genders = ["male", "female", "other"];

const blankForm = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  contactNum: "",
  email: "",
  type: "editor",
  username: "",
  password: "",
  address: "",
  isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : "";

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [saving, setSaving] = useState(false);

  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState({ ...blankForm });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterGender, setFilterGender] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // ── Fetch users from MongoDB on mount ──────────────────────────────────────
  const loadUsers = useCallback(async () => {
    setLoading(true);
    setApiError("");
    try {
      const { data } = await fetchUsers();
      // Normalize _id → id for DataGrid
      setUsers(
        (data.users || []).map((u) => ({ ...u, id: u._id }))
      );
    } catch (err) {
      setApiError(
        err?.response?.data?.message || "Failed to load users from server."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // ── Filtering ───────────────────────────────────────────────────────────────
  const filteredUsers = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchSearch =
        !q ||
        (u.firstName || "").toLowerCase().includes(q) ||
        (u.lastName || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.username || "").toLowerCase().includes(q);
      const matchRole = filterRole === "all" || u.type === filterRole;
      const matchGender = filterGender === "all" || u.gender === filterGender;
      const matchStatus =
        filterStatus === "all" ||
        (filterStatus === "active" ? u.isActive : !u.isActive);
      return matchSearch && matchRole && matchGender && matchStatus;
    });
  }, [users, search, filterRole, filterGender, filterStatus]);

  // ── Modal helpers ───────────────────────────────────────────────────────────
  const resetForm = () => {
    setForm({ ...blankForm });
    setErrors({});
  };

  const openModal = (user) => {
    setModal({ open: true, id: user ? (user._id ?? null) : null });
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        age: user.age || "",
        gender: user.gender || "",
        contactNum: user.contactNum || "",
        email: user.email || "",
        type: user.type || "editor",
        username: user.username || "",
        password: "",           // never pre-fill password
        address: user.address || "",
        isActive: user.isActive ?? true,
      });
    } else {
      setForm({ ...blankForm });
    }
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, id: null });
    setShowPassword(false);
    resetForm();
  };

  const handleChange = ({ target: { name, value, checked, type } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = () => {
    const nextErrors = {};
    const mustEmail = form.email.trim().toLowerCase();
    const username = form.username.trim().toLowerCase();

    [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["age", "Age"],
      ["gender", "Gender"],
      ["contactNum", "Contact number"],
      ["email", "Email"],
      ["type", "Role"],
      ["username", "Username"],
      ["address", "Address"],
    ].forEach(([key, label]) => {
      if (!form[key]) nextErrors[key] = `${label} is required`;
    });

    // Password required only when adding
    if (!modal.id && !form.password) {
      nextErrors.password = "Password is required";
    }
    if (!nextErrors.password && form.password && form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mustEmail)) {
      nextErrors.email = "Enter a valid email address";
    }
    if (
      !nextErrors.email &&
      users.some((u) => u._id !== modal.id && u.email === mustEmail)
    ) {
      nextErrors.email = "Email address already exists.";
    }
    if (
      !nextErrors.username &&
      users.some((u) => u._id !== modal.id && u.username === username)
    ) {
      nextErrors.username = "Username already exists.";
    }
    if (!nextErrors.contactNum && !/^\d{11}$/.test(form.contactNum)) {
      nextErrors.contactNum = "Contact number must be exactly 11 digits";
    }
    if (!nextErrors.age && !/^\d+$/.test(form.age.trim())) {
      nextErrors.age = "Age must be a number only";
    }
    if (!nextErrors.username && /\s/.test(form.username)) {
      nextErrors.username = "Username must not contain spaces";
    }

    return nextErrors;
  };

  // ── Submit (Create / Update) ────────────────────────────────────────────────
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      age: form.age.trim(),
      gender: form.gender,
      contactNum: form.contactNum.trim(),
      email: form.email.trim().toLowerCase(),
      type: form.type,
      username: form.username.trim().toLowerCase(),
      address: form.address.trim(),
      isActive: form.isActive,
    };

    // Only include password if provided (edit mode may leave it blank)
    if (form.password) payload.password = form.password;

    setSaving(true);
    setApiError("");
    try {
      if (modal.id) {
        await updateUser(modal.id, payload);
      } else {
        await createUser(payload);
      }
      await loadUsers(); // re-fetch from DB
      closeModal();
    } catch (err) {
      setApiError(
        err?.response?.data?.message || "Failed to save user. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // ── Toggle active status ────────────────────────────────────────────────────
  const toggleStatus = async (user) => {
    try {
      await updateUser(user._id, { isActive: !user.isActive });
      await loadUsers();
    } catch {
      setApiError("Failed to update user status.");
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

  // ── DataGrid columns ────────────────────────────────────────────────────────
  const columns = [
    { field: "username", headerName: "Username", width: 130 },
    {
      field: "firstName",
      headerName: "Full Name",
      width: 150,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`.trim(),
    },
    { field: "age", headerName: "Age", width: 55 },
    {
      field: "gender",
      headerName: "Gender",
      width: 80,
      valueGetter: (value, row) => labelize(row.gender),
    },
    { field: "contactNum", headerName: "Phone", width: 125 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "type",
      headerName: "Role",
      width: 75,
      valueGetter: (value, row) => labelize(row.type),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 90,
      sortable: false,
      renderCell: (cell) => (
        <Chip
          size="small"
          variant="outlined"
          color={cell.row.isActive ? "success" : "warning"}
          label={cell.row.isActive ? "Active" : "Inactive"}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (cell) => (
        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ py: 0.5 }}>
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
            color={cell.row.isActive ? "warning" : "success"}
            onClick={() => toggleStatus(cell.row)}
          >
            {cell.row.isActive ? "Disable" : "Activate"}
          </Button>
        </Stack>
      ),
    },
  ];

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ width: "100%", minWidth: 0, overflowX: "hidden" }}>
      {/* Header */}
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
        <Typography variant="h4">Users</Typography>
        <Button variant="contained" onClick={() => openModal()}>
          Add User
        </Button>
      </Box>

      {apiError ? (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setApiError("")}>
          {apiError}
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
        {/* Search & Filter Row */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 2 }}
          flexWrap="wrap"
          useFlexGap
        >
          <TextField
            size="small"
            placeholder="Search by name, email, or username…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 2, minWidth: 200 }}
          />
          <TextField
            select
            size="small"
            label="Role"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            sx={{ flex: 1, minWidth: 120 }}
          >
            <MenuItem value="all">All Roles</MenuItem>
            {roles.map((r) => (
              <MenuItem key={r} value={r}>
                {labelize(r)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="Gender"
            value={filterGender}
            onChange={(e) => setFilterGender(e.target.value)}
            sx={{ flex: 1, minWidth: 120 }}
          >
            <MenuItem value="all">All Genders</MenuItem>
            {genders.map((g) => (
              <MenuItem key={g} value={g}>
                {labelize(g)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size="small"
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            sx={{ flex: 1, minWidth: 120 }}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Stack>

        <Box sx={{ width: "100%", minWidth: 0 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <DataGrid
              rows={filteredUsers}
              columns={columns}
              autoHeight
              disableRowSelectionOnClick
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5, page: 0 } },
              }}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "rgba(122,47,59,0.05)",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "rgba(122,47,59,0.03)",
                },
                "& .MuiDataGrid-row.Mui-selected": {
                  backgroundColor: "rgba(122,47,59,0.08)",
                  "&:hover": { backgroundColor: "rgba(122,47,59,0.10)" },
                },
                "& .MuiDataGrid-cell:focus": { outline: "none" },
              }}
            />
          )}
        </Box>
      </Paper>

      {/* Add / Edit User Dialog */}
      <Dialog
        open={modal.open}
        onClose={closeModal}
        fullWidth
        fullScreen={isMobile}
        maxWidth="md"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent dividers sx={{ pt: 2 }}>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("firstName", "First Name")} />
                <TextField {...fieldProps("lastName", "Last Name")} />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("age", "Age")} />
                <TextField {...fieldProps("gender", "Gender", { select: true })}>
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {labelize(gender)}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("contactNum", "Contact Number")} />
                <TextField
                  {...fieldProps("email", "Email Address", { type: "email" })}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField {...fieldProps("type", "Role", { select: true })}>
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {labelize(role)}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField {...fieldProps("username", "Username")} />
              </Stack>
              <TextField
                {...fieldProps("password", "Password", {
                  type: showPassword ? "text" : "password",
                  helperText:
                    errors.password ||
                    (modal.id ? "Leave blank to keep current password" : ""),
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => setShowPassword((prev) => !prev)}
                            onMouseDown={(e) => e.preventDefault()}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  },
                })}
              />
              <TextField
                {...fieldProps("address", "Address", {
                  multiline: true,
                  rows: 3,
                })}
              />
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={form.isActive}
                    onChange={handleChange}
                  />
                }
                label={
                  form.isActive ? "User status: Active" : "User status: Inactive"
                }
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ py: 2 }}>
            <Button onClick={closeModal} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? (
                <CircularProgress size={20} color="inherit" />
              ) : modal.id ? (
                "Update User"
              ) : (
                "Save User"
              )}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;
