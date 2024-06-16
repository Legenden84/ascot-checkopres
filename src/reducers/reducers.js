import { SET_CSV_DATA, SET_EXCEL_DATA } from "../actions/importExcelCsvActions";
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

// Helper function to calculate the majority property
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

            const property1 = calculateMajorityProperty(updatedCsvData.field1);
            const property2 = calculateMajorityProperty(updatedCsvData.field2);
            const property3 = calculateMajorityProperty(updatedCsvData.field3);
            const property4 = calculateMajorityProperty(updatedCsvData.field4);

            return {
                ...state,
                csvData: updatedCsvData,
                properties: {
                    property1,
                    property2,
                    property3,
                    property4
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
