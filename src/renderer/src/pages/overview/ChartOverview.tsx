import SubTitle from '@renderer/component/basic/SubTitle'
import AssessmentLogChartOverview from '@renderer/pages/overview/assessment-log/AssessmentLogChartOverview'

const ChartOverview = () => {
  return (
    <div className="w-full space-y-4">
      <SubTitle>기간별 차트</SubTitle>
      <AssessmentLogChartOverview />
    </div>
  );
};

export default ChartOverview;
