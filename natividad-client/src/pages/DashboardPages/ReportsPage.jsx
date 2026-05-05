import { useRef } from 'react';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const salesData = [30, 45, 38, 60, 55, 72];
const ordersData = [20, 30, 25, 40, 35, 50];

const channelData = [
  { id: 0, value: 40, label: 'Walk-in' },
  { id: 1, value: 35, label: 'Online' },
  { id: 2, value: 25, label: 'Event' },
];

const quarterlyData = [
  { id: 0, value: 35, label: 'Q1' },
  { id: 1, value: 44, label: 'Q2' },
  { id: 2, value: 24, label: 'Q3' },
  { id: 3, value: 34, label: 'Q4' },
];

const chartCardSx = {
  p: 3,
  borderRadius: 3,
  border: '1px solid',
  borderColor: 'divider',
  elevation: 0,
  transition: 'box-shadow 0.2s ease',
  '&:hover': { boxShadow: '0 4px 16px rgba(122,47,59,0.08)' },
};

const ReportsPage = () => {
  const printRef = useRef(null);

  const handleGenerate = () => {
    console.log('Generate clicked');
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Print Report</title>
          ${headMarkup}
          <style>
            @page { size: A4; margin: 16mm; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              font-family: Arial, Helvetica, sans-serif;
              background: #fff;
              color: #1f2937;
            }
            .report-shell { padding: 28px; }
            .report-header {
              margin-bottom: 24px;
              padding-bottom: 14px;
              border-bottom: 1px solid #d1d5db;
            }
            .report-header h1 { margin: 0 0 6px; font-size: 20px; font-weight: 700; }
            .report-header p { margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5; }
            .report-content .MuiCard-root {
              box-shadow: none !important;
              border: 1px solid #e5e7eb;
              break-inside: avoid;
              page-break-inside: avoid;
            }
            .report-content .MuiCardContent-root { padding: 20px; }
            .report-content svg { max-width: 100%; }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Analytics overview for monthly sales, order volume, channel breakdown, and quarterly performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  };

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', md: 'center' }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Report analytics overview showing generated reports, category breakdown, and current completion performance.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="outlined" onClick={handleGenerate}>Generate</Button>
          <Button variant="outlined" onClick={handlePrint}>
            Export
          </Button>
          <Button variant="outlined" onClick={handleFilter}>Filter</Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <Grid container spacing={2}>
          {/* Monthly Sales Bar Chart */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={0} sx={chartCardSx}>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                Monthly Sales
              </Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: months }]}
                series={[{ data: salesData, label: 'Sales', color: '#7a2f3b' }]}
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
                xAxis={[{ scaleType: 'point', data: months }]}
                series={[
                  {
                    data: ordersData,
                    label: 'Orders',
                    color: '#9b4f5d',
                    area: true,
                    showMark: true,
                  },
                ]}
                height={260}
                sx={{
                  '& .MuiAreaElement-root': {
                    fill: 'url(#areaGradient)',
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
                colors={['#7a2f3b', '#9b4f5d', '#b87080']}
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
                xAxis={[{ scaleType: 'band', data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
                series={[
                  {
                    data: quarterlyData.map((d) => d.value),
                    label: 'Revenue',
                    color: '#5f222d',
                  },
                ]}
                height={260}
              />
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
