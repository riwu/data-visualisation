import { connect } from 'react-redux';
import TopStats from './TopStats';
import { setTopValue, getTopStats } from '../actions';

const mapStateToProps = state => ({
  data: state.topStats.data,
  title: state.topStats.title,
  chart: state.topStats.chart,
});

export default connect(
  mapStateToProps,
  {
    setTopValue, getTopStats,
  },
)(TopStats);
