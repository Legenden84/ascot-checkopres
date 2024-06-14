// Define action types
export const RESET_CSV_DATA = 'RESET_CSV_DATA';

// Action creator for resetting CSV data
export const resetCsvData = (fieldIndex) => ({
    type: RESET_CSV_DATA,
    payload: { fieldIndex }
});
