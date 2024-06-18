// src/containers/FileDropzoneContainer.js

import { connect } from 'react-redux';
import FileDropzone from '../components/FileDropzone';
import { dropExcelFile, dropCsvFile } from '../actions/importExcelCsvActions';

const mapStateToProps = (state, ownProps) => {
    if (ownProps.fileType === 'excel') {
        return {
            date: state.excelData.date
        };
    } else {
        const propertyKey = `property${ownProps.fieldIndex}`;
        return {
            property: state.properties[propertyKey],
            isExcelFileUploaded: state.isExcelFileUploaded
        };
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDrop: (file) => {
        if (ownProps.fileType === 'csv') {
            dispatch(dropCsvFile(file, ownProps.fieldIndex));
        } else if (ownProps.fileType === 'excel') {
            dispatch(dropExcelFile(file));
        }
    },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    disabled: ownProps.fileType === 'csv' && !stateProps.isExcelFileUploaded
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(FileDropzone);