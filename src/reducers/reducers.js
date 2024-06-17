import { SET_CSV_DATA, SET_EXCEL_DATA } from "../actions/importExcelCsvActions";
import { UPDATE_CHECKED_STATUS } from "../actions/mainWindowActions";
import { RESET_CSV_DATA, RESET_REDUX_STORE } from "../actions/statusBarActions";

const initialState = {
    excelData: {
        date: '',
        entries: [],
    },
    csvData: {
        field1: [],
        field2: [],
        field3: [],
        field4: []
    },
    properties: {
        property1: null,
        property2: null,
        property3: null,
        property4: null
    }
};

const calculateMajorityProperty = (data) => {
    const propertyCount = data.reduce((acc, row) => {
        const property = row.property;
        if (property) {
            acc[property] = (acc[property] || 0) + 1;
        }
        return acc;
    }, {});

    return Object.keys(propertyCount).reduce((a, b) => propertyCount[a] > propertyCount[b] ? a : b, null);
};

const rootReducer = (state = initialState, action) => {
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
                properties: {
                    property1: calculateMajorityProperty(updatedCsvData.field1),
                    property2: calculateMajorityProperty(updatedCsvData.field2),
                    property3: calculateMajorityProperty(updatedCsvData.field3),
                    property4: calculateMajorityProperty(updatedCsvData.field4)
                }
            };
        case UPDATE_CHECKED_STATUS:
            const { field, index, checked } = action.payload;
            const updatedField = state.csvData[field].map((row, idx) =>
                idx === index ? { ...row, checked } : row
            );
            return {
                ...state,
                csvData: {
                    ...state.csvData,
                    [field]: updatedField
                }
            };
        case RESET_CSV_DATA:
            const resetFieldIndex = `field${action.payload.fieldIndex}`;
            const resetCsvData = {
                ...state.csvData,
                [resetFieldIndex]: []
            };
            return {
                ...state,
                csvData: resetCsvData,
                properties: {
                    ...state.properties,
                    [`property${action.payload.fieldIndex}`]: null
                }
            };
        case RESET_REDUX_STORE:
            return initialState;
        default:
            return state;
    }
};

export default rootReducer;
