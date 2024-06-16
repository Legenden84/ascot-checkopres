import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';
import { resetCsvData, resetReduxStore } from '../actions/statusBarActions';

const mapDispatchToProps = (dispatch) => ({
    resetCsvData: (fieldIndex) => dispatch(resetCsvData(fieldIndex)),
    resetReduxStore: () => dispatch(resetReduxStore())
});

export default connect(null, mapDispatchToProps)(StatusBar);
