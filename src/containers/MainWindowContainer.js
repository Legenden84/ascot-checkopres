import { connect } from 'react-redux';
import MainWindow from '../components/MainWindow';

const mapStateToProps = (state) => ({
    excelEntries: state.excelData.entries || [],
    csvEntries: [
        state.csvData.field1 || [],
        state.csvData.field2 || [],
        state.csvData.field3 || [],
        state.csvData.field4 || [],
    ]
});

export default connect(mapStateToProps)(MainWindow);
