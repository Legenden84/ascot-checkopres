import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';
import { resetCsvData, resetReduxStore, dispatchMatchDateAndName } from '../actions/statusBarActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetCsvData: (fieldIndex) => dispatch(resetCsvData(fieldIndex)),
  resetReduxStore: () => dispatch(resetReduxStore()),
  compareData: () => {
    dispatch(dispatchMatchDateAndName());
  },
});

const mapStateToProps = (state, ownProps) => ({
  fieldIndex: ownProps.fieldIndex,
  fileType: ownProps.fileType,
  properties: state.properties,
  filteredData: state.filteredData,
  excelData: state.excelData,
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
