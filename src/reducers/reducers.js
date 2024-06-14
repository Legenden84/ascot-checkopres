import { SET_CSV_DATA, SET_EXCEL_DATA } from "../actions/importExcelCsvActions";

const initialState = {
    excelData: {
        date: '',
        entries: [], // Changed from separate arrays to a single array of objects
    },
    csvData: {
        field1: [],
        field2: [],
        field3: [],
        field4: []
    }
};

const rootReducer = (state = initialState, action) => {
    console.log('Reducer received action:', action); // Add this line to debug
    switch (action.type) {
        case SET_EXCEL_DATA:
            return {
                ...state,
                excelData: {
                    date: action.payload.date,
                    entries: action.payload.entries,
                },
            };
        case SET_CSV_DATA:
            const updatedCsvData = { ...state.csvData };
            updatedCsvData[`field${action.payload.fieldIndex}`] = action.payload.data;
            return {
                ...state,
                csvData: updatedCsvData,
            };
        default:
            return state;
    }
};

export default rootReducer;