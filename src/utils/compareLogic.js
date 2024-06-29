// utils/compareLogic.js

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

    const [shorterList, longerList] = sortedExcelNameParts.length <= sortedCsvNameParts.length
        ? [sortedExcelNameParts, sortedCsvNameParts]
        : [sortedCsvNameParts, sortedExcelNameParts];

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
            if (filteredRow.checked) return filteredRow;

            const csvNameParts = splitWords(`${filteredRow.firstname} ${filteredRow.lastname}`);
            const matchedExcelIndex = updatedExcelEntries.findIndex(excelRow => {
                const excelNameParts = splitWords(`${excelRow.firstname} ${excelRow.lastname}`);

                return (
                    excelRow.checkIn === filteredRow.checkIn &&
                    excelRow.checkOut === filteredRow.checkOut &&
                    wordsMatch(excelNameParts, csvNameParts) &&
                    !excelRow.checked
                );
            });

            if (matchedExcelIndex !== -1) {
                filteredRow.checked = true;
                updatedExcelEntries[matchedExcelIndex].checked = true;
                console.log(`Match found: Excel Row:`, updatedExcelEntries[matchedExcelIndex], `Filtered Row:`, filteredRow);
            }

            return filteredRow;
        });
    });

    console.log('Final Updated Filtered Data:', JSON.stringify(updatedFilteredData, null, 2));
    console.log('Final Updated Excel Entries:', JSON.stringify(updatedExcelEntries, null, 2));

    return {
        updatedFilteredData,
        updatedExcelEntries
    };
};
