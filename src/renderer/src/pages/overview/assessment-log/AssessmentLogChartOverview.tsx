import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import useAssessmentChartData, {
  GenderData,
  ResearchTypeData
} from '@renderer/pages/overview/assessment-log/hook/useAssessmentChartData'
import { PieLabelProps } from 'recharts/types/polar/Pie'

const AssessmentLogChartOverview = () => {
  const { chartData, isLoading, isError } = useAssessmentChartData()

  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#6B66FF']

  if (isLoading) return <div>차트 데이터를 불러오는 중...</div>
  if (isError) return <div>차트 데이터를 불러오는 중 오류가 발생했습니다.</div>

  return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium mb-4">심리평가 기간별 차트</h3>
        <div>
        {chartData.length === 0 ? (
          <div className="text-center py-8">표시할 데이터가 없습니다.</div>
        ) : (
          <div className="space-y-8">
            {chartData.map((yearData) => (
              <div key={yearData.name} className="border rounded-lg p-4 border-gray-200 dark:border-gray-700">
                <h4 className="text-base font-medium mb-3">
                  {yearData.name} ({yearData.startDate} ~ {yearData.endDate})
                </h4>

                {/* Monthly Credit Time Bar Chart */}
                <div className="mb-6">
                  <h5 className="text-sm font-medium mb-2">월별 인정시간</h5>
                  {yearData.monthlyData.length === 0 ? (
                    <div className="text-center py-4">해당 기간에 데이터가 없습니다.</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart
                        data={yearData.monthlyData}
                        margin={{ top: 15, right: 20, left: 15, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis
                          label={{ value: '인정시간 (분)', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
                          tick={{ fontSize: 10 }}
                        />
                        <Tooltip formatter={(value) => [`${value} 분`, '인정시간']} contentStyle={{ fontSize: 10 }} />
                        <Legend wrapperStyle={{ fontSize: 10 }} />
                        <Bar dataKey="creditTime" name="인정시간" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Gender and Research Type Distribution Charts */}
                <div className="flex flex-row space-x-4">
                  {/* Gender Distribution Pie Chart */}
                  <div className="w-1/2">
                    <h5 className="text-sm font-medium mb-2">성별 분포</h5>
                    {yearData.genderData.length === 0 ? (
                      <div className="text-center py-4">해당 기간에 데이터가 없습니다.</div>
                    ) : (
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={yearData.genderData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }) => <tspan style={{ fontSize: 10 }}>{`${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}</tspan>}
                            outerRadius={65}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {yearData.genderData.map((_: GenderData, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value}건`, name]} contentStyle={{ fontSize: 10 }} />
                          <Legend wrapperStyle={{ fontSize: 10 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  {/* Research Type Distribution Pie Chart */}
                  <div className="w-1/2">
                    <h5 className="text-sm font-medium mb-2">검사 유형 분포</h5>
                    {yearData.researchTypeData.length === 0 ? (
                      <div className="text-center py-4">해당 기간에 데이터가 없습니다.</div>
                    ) : (
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={yearData.researchTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, percent }: PieLabelProps) => <tspan style={{ fontSize: 10 }}>{`${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}</tspan>}
                            outerRadius={65}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {yearData.researchTypeData.map((_: ResearchTypeData, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value}건`, name]} contentStyle={{ fontSize: 10 }} />
                          <Legend wrapperStyle={{ fontSize: 10 }} />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
  );
};

export default AssessmentLogChartOverview;
