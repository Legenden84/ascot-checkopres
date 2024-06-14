import { SET_CSV_DATA, SET_EXCEL_DATA } from "../actions/importExcelCsvActions";

const initialState = {
    excelData: {
        date: '',
        entries: [], // Changed from separate arrays to a single array of objects
    },
    csvData: null,
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
            return {
                ...state,
                csvData: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;