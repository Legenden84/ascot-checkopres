// src/utils/compareLogic.js

export const compareDataLogic = (excelData, filteredData) => {
    const updatedFilteredData = {};

    Object.keys(filteredData).forEach((fieldKey) => {
        const fieldData = filteredData[fieldKey].map((csvRow) => {
            if (csvRow.checked) return csvRow;

            const matchingExcelRow = excelData.entries.find(
                (excelRow) =>
                    excelRow.checkIn === csvRow.checkIn &&
                    excelRow.checkOut === csvRow.checkOut &&
                    excelRow.firstname.trim() === csvRow.firstname.trim() &&
                    excelRow.lastname.trim() === csvRow.lastname.trim()
            );

            if (matchingExcelRow) {
                console.log(`Match found for ${csvRow.firstname} ${csvRow.lastname}`);
                return { ...csvRow, checked: true };
            }

            return csvRow;
        });

        updatedFilteredData[fieldKey] = fieldData;
    });

    console.log('Updated filtered data:', updatedFilteredData);
    return updatedFilteredData;
};
