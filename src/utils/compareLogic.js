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
    const updatedExcelEntries = excelData.entries.map(entry => ({ ...entry, checked: false }));

    Object.keys(filteredData).forEach(fieldKey => {
        updatedFilteredData[fieldKey] = filteredData[fieldKey].map(filteredRow => {
            const matchedExcelIndex = updatedExcelEntries.findIndex(excelRow => 
                excelRow.checkIn === filteredRow.checkIn &&
                excelRow.checkOut === filteredRow.checkOut &&
                replaceSpecialCharacters(excelRow.firstname.trim().toLowerCase()) === replaceSpecialCharacters(filteredRow.firstname.trim().toLowerCase()) &&
                replaceSpecialCharacters(excelRow.lastname.trim().toLowerCase()) === replaceSpecialCharacters(filteredRow.lastname.trim().toLowerCase()) &&
                !excelRow.checked
            );

            if (matchedExcelIndex !== -1) {
                filteredRow.checked = true;
                updatedExcelEntries[matchedExcelIndex].checked = true;
            } else {
                filteredRow.checked = false;
            }

            return filteredRow;
        });
    });

    return {
        updatedFilteredData,
        updatedExcelEntries
    };
};

export const matchDateAndNameRelaxed = (excelData, filteredData) => {
    if (!excelData || !excelData.entries) {
        console.error('excelData or excelData.entries is undefined');
        return { updatedFilteredData: filteredData, updatedExcelEntries: [] };
    }

    if (!filteredData) {
        console.error('filteredData is undefined');
        return { updatedFilteredData: {}, updatedExcelEntries: excelData.entries };
    }

    const updatedFilteredData = {};
    const updatedExcelEntries = excelData.entries.map(entry => ({ ...entry }));

    Object.keys(filteredData).forEach((fieldKey) => {
        updatedFilteredData[fieldKey] = filteredData[fieldKey].map((csvRow) => {
            if (csvRow.checked) return csvRow;

            const csvNameParts = splitWords(csvRow.guests);

            const matchedExcelIndex = updatedExcelEntries.findIndex((excelRow) => {
                const excelNameParts = splitWords(excelRow.firstname + ' ' + excelRow.lastname);
                
                return (
                    excelRow.checkIn === csvRow.checkIn &&
                    excelRow.checkOut === csvRow.checkOut &&
                    wordsMatch(excelNameParts, csvNameParts) &&
                    !excelRow.checked
                );
            });

            if (matchedExcelIndex !== -1) {
                csvRow.checked = true;
                updatedExcelEntries[matchedExcelIndex].checked = true;
            }

            return csvRow;
        });
    });

    return { updatedFilteredData, updatedExcelEntries };
};
