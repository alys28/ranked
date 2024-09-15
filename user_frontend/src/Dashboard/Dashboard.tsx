// src/components/Dashboard.tsx
import React from 'react';
import { PieChart, Pie, Tooltip, Cell, LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Bar, Legend } from 'recharts';
import { Container, Typography, Paper, Grid } from '@mui/material';

// Sample data for visualizations
const pieData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
];

const lineData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
  { month: 'Jul', sales: 3490 },
];

const barData = [
  { product: 'Product A', sales: 2400 },
  { product: 'Product B', sales: 1398 },
  { product: 'Product C', sales: 9800 },
  { product: 'Product D', sales: 3908 },
];

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Retailer Dashboard
      </Typography>
      <Grid container spacing={4}>
        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Product Distribution
            </Typography>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#8884d8', '#ff7300', '#00c49f', '#ffbb28'][index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Paper>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Monthly Sales
            </Typography>
            <LineChart width={500} height={300} data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </Paper>
        </Grid>

        {/* Bar Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Product Sales
            </Typography>
            <BarChart width={500} height={300} data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
