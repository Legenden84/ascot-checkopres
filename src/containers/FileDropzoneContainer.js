import { connect } from 'react-redux';
import FileDropzone from '../components/FileDropzone';
import { dropExcelFile, setCsvData } from '../actions/importExcelCsvActions';

const mapDispatchToProps = (dispatch, ownProps) => ({
    onDrop: (file) => {
        if (ownProps.fileType === 'csv') {
            const reader = new FileReader();
            reader.onload = (event) => {
                const binaryStr = event.target.result;
                const data = binaryStr.split('\n').map((line) => line.split(','));
                dispatch(setCsvData(data));
            };
            reader.readAsText(file);
        } else if (ownProps.fileType === 'excel') {
            dispatch(dropExcelFile(file));
        }
    },
});
  
const FileDropzoneContainer = connect(null, mapDispatchToProps)(FileDropzone);
  
export default FileDropzoneContainer;