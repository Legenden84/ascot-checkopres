const characterMappings = {
    'Ã¶': 'ö',
    'Ã©': 'é',
    'Ã': 'Å'
    // Add more mappings here as needed
};

const replaceSpecialCharacters = (str) => {
    if (typeof str !== 'string') return str;
    Object.keys(characterMappings).forEach((key) => {
        str = str.replace(new RegExp(key, 'g'), characterMappings[key]);
    });
    return str;
};

const splitWords = (str) => {
    if (typeof str !== 'string') return [];
    str = replaceSpecialCharacters(str);
    return str.split(' ').filter(word => word.trim() !== '');
};

const wordsMatch = (excelNameParts, csvNameParts) => {
    const sortedExcelNameParts = excelNameParts.sort().map(word => word.toLowerCase());
    const sortedCsvNameParts = csvNameParts.sort().map(word => word.toLowerCase());

    // Find the shorter and the longer list
    const [shorterList, longerList] = sortedExcelNameParts.length <= sortedCsvNameParts.length
        ? [sortedExcelNameParts, sortedCsvNameParts]
        : [sortedCsvNameParts, sortedExcelNameParts];

    // Check if every word in the shorter list is present in the longer list
    return shorterList.every(word => longerList.includes(word));
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
    const updatedExcelEntries = excelData.entries.map(entry => ({ ...entry }));

    Object.keys(filteredData).forEach(fieldKey => {
        updatedFilteredData[fieldKey] = filteredData[fieldKey].map(filteredRow => {
            if (filteredRow.checked) return filteredRow; // Skip already checked rows in filteredData

            const csvNameParts = splitWords(`${filteredRow.firstname} ${filteredRow.lastname}`);

            const matchedExcelIndex = updatedExcelEntries.findIndex(excelRow => {
                if (excelRow.checked) return false; // Skip already checked rows in excelData

                const excelNameParts = splitWords(`${excelRow.firstname} ${excelRow.lastname}`);
                
                return (
                    excelRow.checkIn === filteredRow.checkIn &&
                    excelRow.checkOut === filteredRow.checkOut &&
                    wordsMatch(excelNameParts, csvNameParts)
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
