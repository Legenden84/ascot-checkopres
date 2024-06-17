export const UPDATE_CHECKED_STATUS = 'UPDATE_CHECKED_STATUS';

export const updateCheckedStatus = (field, index, checked, fileType) => ({
    type: UPDATE_CHECKED_STATUS,
    payload: { field, index, checked, fileType }
});
