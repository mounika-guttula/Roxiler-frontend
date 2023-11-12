// Write your code here
// import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const BarChartComponent = ({barChartData}) => (
  <BarChart
    width={800}
    height={400}
    data={barChartData}
    margin={{top: 20, right: 30, left: 20, bottom: 5}}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="priceRange" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="itemCount" fill="#8884d8" />
  </BarChart>
)

export default BarChartComponent
