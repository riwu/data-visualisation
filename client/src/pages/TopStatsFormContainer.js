import { connect } from 'react-redux';
import TopStatsForm from './TopStatsForm';
import { setTopValue, getTopStats } from '../actions';

const mapStateToProps = state => ({
  topStats: state.topStats,
});

export default connect(
  mapStateToProps,
  {
    setTopValue, getTopStats,
  },
)(TopStatsForm);
