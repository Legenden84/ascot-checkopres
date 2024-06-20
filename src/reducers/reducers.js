// import { matchDateAndName, matchDateAndNameRelaxed } from '../utils/compareLogic';
import { SET_EXCEL_DATA, SET_CSV_DATA } from "../actions/importExcelCsvActions";
import { UPDATE_EXCEL_CHECKED_STATUS, UPDATE_CSV_CHECKED_STATUS, SAVE_FILTERED_DATA } from "../actions/mainWindowActions";
import { RESET_CSV_DATA, RESET_REDUX_STORE, COMPARE_DATA_STRICT, COMPARE_DATA_RELAXED } from "../actions/statusBarActions";

const initialState = {
    excelData: {
        date: '',
        entries: [],
    },
    csvData: {
        field1: [],
        field2: [],
        field3: [],
        field4: [],
        field5: [],
    },
    properties: {
        property1: null,
        property2: null,
        property3: null,
        property4: null,
        property5: null,
    },
    filteredData: {
        field1: [],
        field2: [],
        field3: [],
        field4: [],
        field5: [],
    },
    isExcelFileUploaded: false,
};

const calculateMajorityProperty = (data = []) => {
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
                isExcelFileUploaded: true,
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
                    property4: calculateMajorityProperty(updatedCsvData.field4),
                    property5: calculateMajorityProperty(updatedCsvData.field5),
                }
            };
        case SAVE_FILTERED_DATA:
            const updatedFilteredData = { ...state.filteredData };
            updatedFilteredData[`field${action.payload.fieldIndex}`] = action.payload.data;

            return {
                ...state,
                filteredData: updatedFilteredData
            };
        case UPDATE_EXCEL_CHECKED_STATUS:
            const { index: excelIndex, checked: excelChecked } = action.payload;

            const updatedExcelEntries = state.excelData.entries.map((row, idx) =>
                idx === excelIndex ? { ...row, checked: excelChecked } : row
            );

            return {
                ...state,
                excelData: {
                    ...state.excelData,
                    entries: updatedExcelEntries
                }
            };
        case UPDATE_CSV_CHECKED_STATUS:
            const { field: csvField, index: csvIndex, checked: csvChecked } = action.payload;

            const updatedFilteredField = state.filteredData[csvField].map((row, idx) =>
                idx === csvIndex ? { ...row, checked: csvChecked } : row
            );

            return {
                ...state,
                filteredData: {
                    ...state.filteredData,
                    [csvField]: updatedFilteredField
                }
            };
        case RESET_CSV_DATA:
            const resetFieldIndex = `field${action.payload.fieldIndex}`;
            const resetCsvData = {
                ...state.csvData,
                [resetFieldIndex]: []
            };
            const resetFilteredData = {
                ...state.filteredData,
                [resetFieldIndex]: []
            };
            return {
                ...state,
                csvData: resetCsvData,
                filteredData: resetFilteredData,
                properties: {
                    ...state.properties,
                    [`property${action.payload.fieldIndex}`]: null
                }
            };
        case RESET_REDUX_STORE:
            return initialState;
        case COMPARE_DATA_STRICT:
            const { updatedFilteredData: strictFilteredData, updatedExcelEntries: strictExcelEntries } = action.payload;
            return {
                ...state,
                filteredData: strictFilteredData,
                excelData: {
                    ...state.excelData,
                    entries: strictExcelEntries,
                }
            };
        case COMPARE_DATA_RELAXED:
            const { updatedFilteredData: comparedFilteredData, updatedExcelEntries: comparedExcelEntries } = action.payload;
            return {
                ...state,
                filteredData: comparedFilteredData,
                excelData: {
                    ...state.excelData,
                    entries: comparedExcelEntries,
                }
            };
        default:
            return state;
    }
};

export default rootReducer;
