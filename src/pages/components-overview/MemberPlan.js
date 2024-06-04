// material-ui
import { styled } from '@mui/material/styles';

// project import
import ComponentSkeleton from './ComponentSkeleton';
import MainCard from 'components/MainCard';
import MemberShipPlan from '../MemberShipPlan/Membership';

// styles
const IFrameWrapper = styled('iframe')(() => ({
  height: 'calc(100vh - 210px)',
  border: 'none'
}));

// ============================|| ANT ICONS ||============================ //

const MemberPlan = () => (
  <ComponentSkeleton>
    <MainCard>
      <MemberShipPlan />
    </MainCard>
  </ComponentSkeleton>
);

export default MemberPlan;
