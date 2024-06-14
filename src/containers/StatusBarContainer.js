import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';
import { resetCsvData } from '../actions/statusBarActions';

const mapDispatchToProps = (dispatch) => ({
    resetCsvData: (fieldIndex) => dispatch(resetCsvData(fieldIndex))
});

export default connect(null, mapDispatchToProps)(StatusBar);
