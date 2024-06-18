const splitWords = (str) => {
    if (typeof str !== 'string') return [];
    return str.split(' ').filter(word => word.trim() !== '');
};

const wordsMatch = (excelNameParts, csvNameParts) => {
    return csvNameParts.every(word => excelNameParts.includes(word));
};


export const matchDateAndName = (excelData, filteredData) => {
    const updatedFilteredData = {};
    const updatedExcelEntries = excelData.entries.map((excelRow) => {
        let matched = false;

        Object.keys(filteredData).forEach((fieldKey) => {
            filteredData[fieldKey] = filteredData[fieldKey].map((csvRow) => {
                if (csvRow.checked) return csvRow;

                if (
                    excelRow.checkIn === csvRow.checkIn &&
                    excelRow.checkOut === csvRow.checkOut &&
                    excelRow.firstname.trim() === csvRow.firstname.trim() &&
                    excelRow.lastname.trim() === csvRow.lastname.trim()
                ) {
                    matched = true;
                    return { ...csvRow, checked: true };
                }

                return csvRow;
            });

            updatedFilteredData[fieldKey] = filteredData[fieldKey];
        });

        return matched ? { ...excelRow, checked: true } : excelRow;
    });

    return { updatedFilteredData, updatedExcelEntries };
};

export const matchDateAndNameRelaxed = (excelData, filteredData) => {
    const updatedFilteredData = {};
    const updatedExcelEntries = excelData.entries.map((excelRow) => {
        let matched = false;
        const excelNameParts = splitWords(excelRow.firstname + ' ' + excelRow.lastname);

        Object.keys(filteredData).forEach((fieldKey) => {
            filteredData[fieldKey] = filteredData[fieldKey].map((csvRow) => {
                if (csvRow.checked) return csvRow;

                const csvNameParts = splitWords(csvRow.guests);

                if (
                    excelRow.checkIn === csvRow.checkIn &&
                    excelRow.checkOut === csvRow.checkOut &&
                    wordsMatch(excelNameParts, csvNameParts)
                ) {
                    matched = true;
                    return { ...csvRow, checked: true };
                }

                return csvRow;
            });

            updatedFilteredData[fieldKey] = filteredData[fieldKey];
        });

        return matched ? { ...excelRow, checked: true } : excelRow;
    });

    return { updatedFilteredData, updatedExcelEntries };
};