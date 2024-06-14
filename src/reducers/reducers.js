import { SET_CSV_DATA, SET_EXCEL_DATA } from "../actions/importExcelCsvActions";

const initialState = {
    excelData: {
        date: '',
        name: [],
        adults: [],
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
                    name: action.payload.name,
                    adults: action.payload.adults,
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