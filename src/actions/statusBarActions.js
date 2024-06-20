import { matchDateAndName, matchDateAndNameRelaxed } from '../utils/compareLogic';

export const RESET_CSV_DATA = 'RESET_CSV_DATA';
export const RESET_REDUX_STORE = 'RESET_REDUX_STORE';
export const COMPARE_DATA_STRICT = 'COMPARE_DATA_STRICT';
export const COMPARE_DATA_RELAXED = 'COMPARE_DATA_RELAXED';

export const resetCsvData = (fieldIndex) => ({
    type: RESET_CSV_DATA,
    payload: { fieldIndex }
});

export const resetReduxStore = () => ({
    type: RESET_REDUX_STORE
});

export const dispatchMatchDateAndName = () => (dispatch, getState) => {
    const state = getState();
    const { excelData, filteredData } = state;

    const { updatedFilteredData, updatedExcelEntries } = matchDateAndName(filteredData, excelData);

    dispatch({
        type: COMPARE_DATA_STRICT,
        payload: { updatedFilteredData, updatedExcelEntries },
    });
};

export const dispatchMatchDateAndNameRelaxed = () => (dispatch, getState) => {
    const state = getState();
    const { excelData, filteredData } = state;

    const { updatedFilteredData, updatedExcelEntries } = matchDateAndNameRelaxed(excelData, filteredData);

    dispatch({
        type: COMPARE_DATA_RELAXED,
        payload: { updatedFilteredData, updatedExcelEntries },
    });
};
