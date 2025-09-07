import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Sector
} from 'recharts';
import { groupByMonth, groupByYear, groupByField, groupTherapyTimesByMonth } from '../utils';
import { useGroupTherapyLogs } from '../hook/useGroupTherapyLogs';

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const GroupTherapyLogCharts = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: therapyLogs, isLoading, error } = useGroupTherapyLogs();

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">로딩 중...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64">데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (!therapyLogs || therapyLogs.length === 0) {
    return <div className="flex justify-center items-center h-64">데이터가 없습니다.</div>;
  }

  // Calculate total credit time for each therapy log
  const logsWithCreditTime = therapyLogs.map(log => ({
    ...log,
    creditTime: log.prepareTime + log.sessionTime + log.supervisionTime
  }));

  // Process data for monthly bar charts
  const monthlyData = groupByMonth(logsWithCreditTime, 'endDate', 'creditTime' as any);

  // Process data for yearly bar charts
  const yearlyData = groupByYear(logsWithCreditTime, 'endDate', 'creditTime' as any);

  // Process data for monthly stacked bar chart
  const monthlyTimeData = groupTherapyTimesByMonth(therapyLogs, 'endDate');

  // Process therapy type data
  const therapyTypeData = groupByField(therapyLogs, 'therapyType');

  // Custom active shape for pie charts
  const renderActiveShape = (props: any) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-midAngle * Math.PI / 180);
    const cos = Math.cos(-midAngle * Math.PI / 180);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload.name}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`${value} (${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">월별 집단치료 건수 및 인정시간</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="count" name="건수" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="totalCreditTime" name="인정시간 (분)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">월별 시간 구성</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={monthlyTimeData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="prepareTime" name="준비시간" stackId="a" fill="#8884d8" />
            <Bar dataKey="sessionTime" name="세션시간" stackId="a" fill="#82ca9d" />
            <Bar dataKey="supervisionTime" name="수퍼비전시간" stackId="a" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">연도별 집단치료 건수 및 인정시간</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={yearlyData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="count" name="건수" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="totalCreditTime" name="인정시간 (분)" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">치료 유형 분포</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              {...{ activeIndex } as any}
              activeShape={renderActiveShape}
              data={therapyTypeData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              onMouseEnter={onPieEnter}
            >
              {therapyTypeData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GroupTherapyLogCharts;
