import { connect } from 'react-redux';
import CitationWeb from './CitationWeb';
import { setCitationPaper, getCitationWeb, setCitationDepth } from '../actions';

const mapStateToProps = state => ({
  data: state.citationWeb.data,
  title: state.citationWeb.title,
});

export default connect(
  mapStateToProps,
  {
    setCitationPaper, getCitationWeb, setCitationDepth,
  },
)(CitationWeb);
