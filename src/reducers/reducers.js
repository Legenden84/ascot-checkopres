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
    },
    property1: null,
    property2: null,
    property3: null,
    property4: null
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

            // Calculate the majority property for each field
            const property1 = calculateMajorityProperty(updatedCsvData.field1);
            const property2 = calculateMajorityProperty(updatedCsvData.field2);
            const property3 = calculateMajorityProperty(updatedCsvData.field3);
            const property4 = calculateMajorityProperty(updatedCsvData.field4);

            return {
                ...state,
                csvData: updatedCsvData,
                property1,
                property2,
                property3,
                property4
            };
        default:
            return state;
    }
};

export default rootReducer;
