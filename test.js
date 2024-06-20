const splitWords = (str) => {
    if (typeof str !== 'string') return [];
    return str.split(' ').filter(word => word.trim() !== '');
};

const wordsMatch = (excelNameParts, csvNameParts) => {
    const sortedExcelNameParts = excelNameParts.sort().map(word => word.toLowerCase());
    const sortedCsvNameParts = csvNameParts.sort().map(word => word.toLowerCase());
    return sortedExcelNameParts.every(word => sortedCsvNameParts.includes(word)) && sortedCsvNameParts.every(word => sortedExcelNameParts.includes(word));
};

const matchDateAndName = (filteredData, excelData) => {
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
}

const matchDateAndNameRelaxed = (excelData, filteredData) => {
    const updatedFilteredData = {};
    const updatedExcelEntries = excelData.entries.map(entry => ({ ...entry, checked: false }));

    Object.keys(filteredData).forEach((fieldKey) => {
        updatedFilteredData[fieldKey] = filteredData[fieldKey].map((csvRow) => {
            if (csvRow.checked) return csvRow;

            const csvNameParts = splitWords(csvRow.guests);
            console.log("csvNameParts:", csvNameParts);

            const matchedExcelIndex = updatedExcelEntries.findIndex((excelRow) => {
                const excelNameParts = splitWords(excelRow.firstname + ' ' + excelRow.lastname);
                console.log("excelNameParts:", excelNameParts);
                
                return (
                    excelRow.checkIn === csvRow.checkIn &&
                    excelRow.checkOut === csvRow.checkOut &&
                    wordsMatch(excelNameParts, csvNameParts) &&
                    !excelRow.checked // Ensure that we only match with unchecked rows
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

const excelData = {
    date: '12-05-2024',
    entries: [
        // Other entries...
        {
            firstname: 'L Cruz Andrea',
            lastname: 'Naddeo',
            resNum: 136394,
            adults: '2',
            group: '',
            checkIn: '12-05-2024',
            checkOut: '16-05-2024',
            checked: false
        },
        // Other entries...
    ],
};

const filteredData = {
    field1: [
        { guests: 'Andrea Naddeo L Cruz', checkIn: '12-05-2024', checkOut: '16-05-2024', checked: false },
        // Other rows...
    ],
};

// Call the function with the example data
const result = matchDateAndNameRelaxed(excelData, filteredData);
console.log(result);