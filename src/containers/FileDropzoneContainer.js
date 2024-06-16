import { connect } from 'react-redux';
import FileDropzone from '../components/FileDropzone';
import { dropExcelFile, dropCsvFile } from '../actions/importExcelCsvActions';

const mapStateToProps = (state, ownProps) => {
    if (ownProps.fileType === 'excel') {
        return {
            date: state.excelData.date // Pass the date from excelData for Excel dropzone
        };
    } else {
        const propertyKey = `property${ownProps.fieldIndex}`;
        return {
            property: state.properties[propertyKey] // Pass the property for CSV dropzones
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

const FileDropzoneContainer = connect(mapStateToProps, mapDispatchToProps)(FileDropzone);

export default FileDropzoneContainer;
