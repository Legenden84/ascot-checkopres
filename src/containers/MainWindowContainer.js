import { connect } from 'react-redux';
import MainWindow from '../components/MainWindow';
import { updateExcelCheckedStatus, updateCsvCheckedStatus } from '../actions/mainWindowActions';

const mapStateToProps = (state, ownProps) => {
    const fieldIndex = ownProps.fieldIndex;
    const fileType = ownProps.fileType;
    const data = fileType === 'csv' ? state.filteredData[`field${fieldIndex}`] : state.excelData.entries;
    return {
        entries: data,
        fieldIndex,
        fileType,
    };
};

const mapDispatchToProps = {
    updateExcelCheckedStatus,
    updateCsvCheckedStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
