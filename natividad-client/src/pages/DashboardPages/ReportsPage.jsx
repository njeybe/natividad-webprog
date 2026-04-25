import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const salesData = [30, 45, 38, 60, 55, 72];
const ordersData = [20, 30, 25, 40, 35, 50];

const channelData = [
  { id: 0, value: 40, label: "Walk-in" },
  { id: 1, value: 35, label: "Online" },
  { id: 2, value: 25, label: "Event" },
];

const quarterlyData = [
  { id: 0, value: 35, label: "Q1" },
  { id: 1, value: 44, label: "Q2" },
  { id: 2, value: 24, label: "Q3" },
  { id: 3, value: 34, label: "Q4" },
];

const chartCardSx = {
  p: 3,
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  elevation: 0,
  transition: "box-shadow 0.2s ease",
  "&:hover": { boxShadow: "0 4px 16px rgba(122,47,59,0.08)" },
};

function ReportsPage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Box>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Monthly performance across sales, order volume, and channel breakdown.
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Monthly Sales Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={chartCardSx}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Monthly Sales
            </Typography>
            <BarChart
              xAxis={[{ scaleType: "band", data: months }]}
              series={[{ data: salesData, label: "Sales", color: "#7a2f3b" }]}
              height={260}
            />
          </Paper>
        </Grid>

        {/* Order Volume Line Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={chartCardSx}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Order Volume
            </Typography>
            <LineChart
              xAxis={[{ scaleType: "point", data: months }]}
              series={[
                {
                  data: ordersData,
                  label: "Orders",
                  color: "#9b4f5d",
                  area: true,
                  showMark: true,
                },
              ]}
              height={260}
              sx={{
                "& .MuiAreaElement-root": {
                  fill: "url(#areaGradient)",
                  opacity: 0.15,
                },
              }}
            />
          </Paper>
        </Grid>

        {/* Order Channel Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={chartCardSx}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Order Channels
            </Typography>
            <PieChart
              series={[
                {
                  data: channelData,
                  innerRadius: 50,
                  outerRadius: 110,
                  paddingAngle: 2,
                  cornerRadius: 4,
                },
              ]}
              height={260}
              colors={["#7a2f3b", "#9b4f5d", "#b87080"]}
            />
          </Paper>
        </Grid>

        {/* Quarterly Breakdown Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper elevation={0} sx={chartCardSx}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              Quarterly Breakdown
            </Typography>
            <BarChart
              xAxis={[{ scaleType: "band", data: ["Q1", "Q2", "Q3", "Q4"] }]}
              series={[
                {
                  data: quarterlyData.map((d) => d.value),
                  label: "Revenue",
                  color: "#5f222d",
                },
              ]}
              height={260}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportsPage;
