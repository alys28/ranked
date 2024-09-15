import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ageData = [
  { name: '18-24', value: 30 },
  { name: '25-34', value: 45 },
  { name: '35-44', value: 20 },
  { name: '45+', value: 5 },
];

const occupationData = [
  { name: 'Manager', value: 20 },
  { name: 'Engineer', value: 30 },
  { name: 'Designer', value: 15 },
  { name: 'Teacher', value: 10 },
  { name: 'Other', value: 25 },
];

const personalityData = [
  { name: 'ISTJ', value: 15 },
  { name: 'ENFP', value: 25 },
  { name: 'INTJ', value: 20 },
  { name: 'ESFJ', value: 18 },
  { name: 'Other', value: 22 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#3c493f', '#b3bfb8'];

export function RetailerDashboard({ children }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[calc(100vh-8rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Product Popularity Dashboard</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Age Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Occupation Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {occupationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Personality Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={personalityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RetailerDashboard;