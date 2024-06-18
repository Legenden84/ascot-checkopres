export const UPDATE_EXCEL_CHECKED_STATUS = 'UPDATE_EXCEL_CHECKED_STATUS';
export const UPDATE_CSV_CHECKED_STATUS = 'UPDATE_CSV_CHECKED_STATUS';
export const SAVE_FILTERED_DATA = 'SAVE_FILTERED_DATA';

export const updateExcelCheckedStatus = (field, index, checked) => ({
    type: UPDATE_EXCEL_CHECKED_STATUS,
    payload: { field, index, checked, fileType: 'excel' }
});

export const updateCsvCheckedStatus = (field, index, checked) => ({
    type: UPDATE_CSV_CHECKED_STATUS,
    payload: { field, index, checked, fileType: 'csv' }
});

export const saveFilteredData = (fieldIndex, data) => ({
    type: SAVE_FILTERED_DATA,
    payload: { fieldIndex, data }
});