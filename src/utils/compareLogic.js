export const matchDateAndName = (filteredData, excelData) => {
    if (!excelData || !excelData.entries) {
        console.error('excelData or excelData.entries is undefined');
        return { updatedFilteredData: filteredData, updatedExcelEntries: [] };
    }

    if (!filteredData) {
        console.error('filteredData is undefined');
        return { updatedFilteredData: {}, updatedExcelEntries: excelData.entries };
    }

    const updatedFilteredData = { ...filteredData };
    const updatedExcelEntries = excelData.entries.map(entry => ({ ...entry, checked: false }));

    Object.keys(filteredData).forEach(fieldKey => {
        updatedFilteredData[fieldKey] = filteredData[fieldKey].map(filteredRow => {
            const matchedExcelIndex = updatedExcelEntries.findIndex(excelRow => 
                excelRow.checkIn === filteredRow.checkIn &&
                excelRow.checkOut === filteredRow.checkOut &&
                excelRow.firstname.trim().toLowerCase() === filteredRow.firstname.trim().toLowerCase() &&
                excelRow.lastname.trim().toLowerCase() === filteredRow.lastname.trim().toLowerCase() &&
                !excelRow.checked // Ensure that we only match with unchecked rows
            );

            if (matchedExcelIndex !== -1) {
                filteredRow.checked = true;
                updatedExcelEntries[matchedExcelIndex].checked = true;
            } else {
                filteredRow.checked = false; // If no match found, ensure it's unchecked
            }

            return filteredRow;
        });
    });

    return {
        updatedFilteredData,
        updatedExcelEntries
    };
};
