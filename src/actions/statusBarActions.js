import { matchDateAndName } from '../utils/compareLogic';

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
  
    Object.keys(filteredData).forEach(fieldKey => {
      const fieldFilteredData = { [fieldKey]: filteredData[fieldKey] };
      const result = matchDateAndName(fieldFilteredData, excelData);
  
      dispatch({
        type: COMPARE_DATA_STRICT,
        payload: result,
      });
    });
  };
