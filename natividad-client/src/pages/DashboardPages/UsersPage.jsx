import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const initialRows = [
  { id: 1, lastName: "Nativdad", firstName: "JB", age: null },
  { id: 2, lastName: "Iguiron", firstName: "Mac", age: 20 },
  { id: 3, lastName: "Naranjo", firstName: "Shem", age: 21 },
  { id: 4, lastName: "Santiago", firstName: "Vergel", age: 20 },
  { id: 5, lastName: "Panahon", firstName: "Marius", age: 20 },
  { id: 6, lastName: "Regodon", firstName: null, age: 20 },
  { id: 7, lastName: "Reillo", firstName: "Rhoedney", age: 24 },
  { id: 8, lastName: "Braza", firstName: "Joshua", age: 36 },
  { id: 9, lastName: "Ramos", firstName: "Jed", age: 65 },
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 150, editable: true },
  { field: "lastName", headerName: "Last Name", width: 150, editable: true },
  { field: "age", headerName: "Age", type: "number", width: 100, editable: true },
  {
    field: "fullName",
    headerName: "Full Name",
    width: 200,
    valueGetter: (value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`.trim(),
    sortable: true,
  },
];

function UsersPage() {
  const [rows, setRows] = useState(initialRows);

  const handleRowUpdate = (newRow) => {
    setRows((prev) => prev.map((r) => (r.id === newRow.id ? newRow : r)));
    return newRow;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Users
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Manage registered users. Click any row to edit inline.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          processRowUpdate={handleRowUpdate}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
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
            "& .MuiCheckbox-root.Mui-checked": { color: "primary.main" },
          }}
        />
      </Paper>
    </Box>
  );
}

export default UsersPage;
