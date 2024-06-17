import { connect } from 'react-redux';
import { updateCheckedStatus } from '../actions/mainWindowActions';
import MainWindow from '../components/MainWindow';

const mapStateToProps = (state) => ({
    excelEntries: state.excelData.entries || [],
    csvEntries: [
        state.csvData.field1 || [],
        state.csvData.field2 || [],
        state.csvData.field3 || [],
        state.csvData.field4 || [],
    ],
    excelDate: state.excelData.date || ''
});

const mapDispatchToProps = (dispatch) => ({
    updateCheckedStatus: (field, index, checked) => dispatch(updateCheckedStatus(field, index, checked))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainWindow);
