// Define action types
export const RESET_CSV_DATA = 'RESET_CSV_DATA';
export const RESET_REDUX_STORE = 'RESET_REDUX_STORE';

// Action creator for resetting CSV data
export const resetCsvData = (fieldIndex) => ({
    type: RESET_CSV_DATA,
    payload: { fieldIndex }
});

export const resetReduxStore = () => ({
    type: RESET_REDUX_STORE
});