export const UPDATE_CHECKED_STATUS = 'UPDATE_CHECKED_STATUS';

export const updateCheckedStatus = (field, index, checked) => ({
    type: UPDATE_CHECKED_STATUS,
    payload: { field, index, checked }
});
