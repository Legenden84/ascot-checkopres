import { connect } from 'react-redux';
import { updateCheckedStatus } from '../actions/mainWindowActions';
import MainWindow from '../components/MainWindow';

const mapStateToProps = (state, ownProps) => {
    const fieldKey = `field${ownProps.fieldIndex}`;
    return {
        excelEntries: state.excelData.entries || [],
        csvEntries: state.csvData[fieldKey] || [],
        excelDate: state.excelData.date || '',
        fileType: ownProps.fileType,
        fieldIndex: ownProps.fieldIndex
    };
};

const mapDispatchToProps = (dispatch) => ({
    updateCheckedStatus: (field, index, checked, fileType) => dispatch(updateCheckedStatus(field, index, checked, fileType))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
