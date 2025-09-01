import { ResponsiveContainer } from 'recharts'
import SubTitle from '@renderer/component/basic/SubTitle'

const ChartOverview = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <div>
        <SubTitle>기간별 차트</SubTitle>
        <div>
          <h3>심리평가 기간별 인정시간</h3>
          <div></div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default ChartOverview;
