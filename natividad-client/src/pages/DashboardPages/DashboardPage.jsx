import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import { BarChart, PieChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

const rows = [
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
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "age", headerName: "Age", type: "number", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    width: 180,
    valueGetter: (value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`.trim(),
  },
];

const statCards = [
  {
    label: "Total Users",
    value: rows.length,
    icon: PeopleIcon,
  },
  {
    label: "Average Age",
    value: (
      rows.filter((r) => r.age != null).reduce((sum, r) => sum + r.age, 0) /
      rows.filter((r) => r.age != null).length
    ).toFixed(1),
    icon: PersonIcon,
  },
];

const pieData = [
  { id: 0, value: 35, label: "Bouquets" },
  { id: 1, value: 25, label: "Events" },
  { id: 2, value: 20, label: "Delivery" },
  { id: 3, value: 20, label: "Custom" },
];

const mapCenter = [14.5995, 120.9842];

function DashboardPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Typography
        variant="h5"
        fontWeight={700}
        color="text.primary"
        gutterBottom
      >
        Dashboard
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={2}>
        {statCards.map(({ label, value, icon: Icon }) => (
          <Grid key={label} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                gap: 2,
                transition: "box-shadow 0.2s ease",
                "&:hover": { boxShadow: "0 4px 16px rgba(122,47,59,0.10)" },
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  backgroundColor: "rgba(122,47,59,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "primary.main",
                }}
              >
                <Icon fontSize="medium" />
              </Box>
              <Box>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="text.primary"
                  lineHeight={1}
                >
                  {value}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  {label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Quarterly Sales
            </Typography>
            <BarChart
              xAxis={[{ scaleType: "band", data: ["Q1", "Q2", "Q3", "Q4"] }]}
              series={[
                { data: [35, 44, 24, 34], label: "Series 1", color: "#7a2f3b" },
                { data: [51, 6, 49, 30], label: "Series 2", color: "#9b4f5d" },
              ]}
              height={280}
            />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Category Breakdown
            </Typography>
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 40,
                  outerRadius: 100,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
              height={280}
              colors={["#7a2f3b", "#9b4f5d", "#b87080", "#d4a8b0"]}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* DataGrid */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 3, pb: 1 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Users Overview
          </Typography>
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
          disableRowSelectionOnClick
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
      </Paper>

      {/* Location Map */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          overflow: "hidden",
        }}
      >
        <Box sx={{ p: 3, pb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Location Map
          </Typography>
        </Box>
        <Box sx={{ px: 3, pb: 3 }}>
          <Box
            sx={{
              height: 360,
              borderRadius: 3,
              overflow: "hidden",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <MapContainer
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <CircleMarker
                center={mapCenter}
                radius={10}
                pathOptions={{
                  color: "#7a2f3b",
                  fillColor: "#7a2f3b",
                  fillOpacity: 0.85,
                }}
              >
                <Popup>OpenStreetMap location preview</Popup>
              </CircleMarker>
            </MapContainer>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default DashboardPage;
