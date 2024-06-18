// src/utils/compareLogic.js

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
