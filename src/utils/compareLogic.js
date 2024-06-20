const splitWords = (str) => {
    if (typeof str !== 'string') return [];
    return str.split(' ').filter(word => word.trim() !== '');
};

const wordsMatch = (nameParts1, nameParts2) => {
    const set1 = new Set(nameParts1);
    const set2 = new Set(nameParts2);
    return [...set1].every(word => set2.has(word));
};

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

export const matchDateAndNameRelaxed = (filteredData, excelData) => {
    if (!excelData || !excelData.entries) {
        console.error('excelData or excelData.entries is undefined');
        return { updatedFilteredData: filteredData, updatedExcelEntries: [] };
    }

    if (!filteredData) {
        console.error('filteredData is undefined');
        return { updatedFilteredData: {}, updatedExcelEntries: excelData.entries };
    }

    const updatedFilteredData = { ...filteredData };
    const updatedExcelEntries = excelData.entries.map(entry => ({ ...entry, checked: entry.checked || false }));

    Object.keys(filteredData).forEach(fieldKey => {
        updatedFilteredData[fieldKey] = filteredData[fieldKey].map(filteredRow => {
            if (filteredRow.checked) {
                return filteredRow; // Skip already checked rows
            }

            const filteredNameParts = splitWords(`${filteredRow.firstname} ${filteredRow.lastname}`);
            const matchedExcelIndex = updatedExcelEntries.findIndex(excelRow => {
                if (excelRow.checked) {
                    return false; // Skip already checked rows
                }

                const excelNameParts = splitWords(`${excelRow.firstname} ${excelRow.lastname}`);
                return (
                    excelRow.checkIn === filteredRow.checkIn &&
                    excelRow.checkOut === filteredRow.checkOut &&
                    wordsMatch(excelNameParts, filteredNameParts)
                );
            });

            if (matchedExcelIndex !== -1) {
                filteredRow.checked = true;
                updatedExcelEntries[matchedExcelIndex].checked = true;
            }

            return filteredRow;
        });
    });

    return {
        updatedFilteredData,
        updatedExcelEntries
    };
};
