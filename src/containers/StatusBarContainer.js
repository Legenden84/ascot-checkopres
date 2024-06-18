// src/containers/StatusBarContainer.js

import { connect } from 'react-redux';
import StatusBar from '../components/StatusBar';
import { resetCsvData, resetReduxStore, compareData } from '../actions/statusBarActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
    resetCsvData: (fieldIndex) => dispatch(resetCsvData(fieldIndex)),
    resetReduxStore: () => dispatch(resetReduxStore()),
    compareData: () => dispatch(compareData()),
});

const mapStateToProps = (state, ownProps) => ({
    fieldIndex: ownProps.fieldIndex,
    fileType: ownProps.fileType,
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusBar);
