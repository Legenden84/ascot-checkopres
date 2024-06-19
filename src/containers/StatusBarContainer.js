import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';
import { resetCsvData, resetReduxStore, compareData, compareDataRelaxed } from '../actions/statusBarActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
    resetCsvData: (fieldIndex) => dispatch(resetCsvData(fieldIndex)),
    resetReduxStore: () => dispatch(resetReduxStore()),
    compareData: () => {
        dispatch(compareData());
        dispatch(compareDataRelaxed());
    },
});

const mapStateToProps = (state, ownProps) => ({
    fieldIndex: ownProps.fieldIndex,
    fileType: ownProps.fileType,
    properties: state.properties,
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
