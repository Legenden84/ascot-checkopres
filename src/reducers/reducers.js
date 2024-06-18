// src/reducers/reducers.js

import { SET_EXCEL_DATA, SET_CSV_DATA } from "../actions/importExcelCsvActions";
import { UPDATE_EXCEL_CHECKED_STATUS, UPDATE_CSV_CHECKED_STATUS, SAVE_FILTERED_DATA } from "../actions/mainWindowActions";
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
    }
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

            console.log('Updated Filtered Data:', updatedFilteredField);

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
