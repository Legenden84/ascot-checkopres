import { connect } from 'react-redux';
import FileDropzone from '../components/FileDropzone';
import { dropExcelFile, dropCsvFile } from '../actions/importExcelCsvActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDrop: (file) => {
        if (ownProps.fileType === 'csv') {
            dispatch(dropCsvFile(file, ownProps.fieldIndex));
        } else if (ownProps.fileType === 'excel') {
            dispatch(dropExcelFile(file));
        }
    },
});

const FileDropzoneContainer = connect(null, mapDispatchToProps)(FileDropzone);

export default FileDropzoneContainer;