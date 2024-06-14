import * as XLSX from 'xlsx';

// Define action types
export const SET_EXCEL_DATA = 'SET_EXCEL_DATA';
export const SET_CSV_DATA = 'SET_CSV_DATA';

// Action creators
export const setExcelData = (data) => ({
    type: SET_EXCEL_DATA,
    payload: data,
});

export const setCsvData = (data, fieldIndex) => ({
    type: SET_CSV_DATA,
    payload: { data, fieldIndex },
});

export const dropExcelFile = (file) => (dispatch) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const cellA3 = worksheet['A3'];
        const dateSerial = cellA3 ? cellA3.v : null;
        const formattedDate = dateSerial ? parseExcelDate(dateSerial) : null;

        const entries = [];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        for (let i = 3; i < sheetData.length; i++) { // Start from row 4 (index 3)
            const row = sheetData[i];
            const name = row[2] || '';
            const nameParts = splitName(name);
            const adults = row[9] || '';
            const group = row[5] || '';
            entries.push({
                firstname: nameParts.firstname,
                lastname: nameParts.lastname,
                adults: adults,
                group: group
            });
        }

        dispatch(setExcelData({
            date: formattedDate,
            entries: entries,
        }));
    };
    reader.readAsArrayBuffer(file);
};

export const dropCsvFile = (file, fieldIndex) => (dispatch) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const binaryStr = event.target.result;
        const data = XLSX.read(binaryStr, { type: 'binary' });
        const sheetName = data.SheetNames[0];
        const worksheet = data.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Find column indices for the required columns
        const header = jsonData[0];
        const bookingRefIndex = header.indexOf('Booking Reference');
        const cancelledAtIndex = header.indexOf('Cancelled At');
        const roomIndex = header.indexOf('Room');
        const checkInIndex = header.indexOf('Check - In');
        const guestsIndex = header.indexOf('Guests');
        const adultsIndex = header.indexOf('Adults');

        // Extract the required columns
        const filteredData = jsonData.slice(1).map(row => {
            const bookingReference = row[bookingRefIndex];
            const cancelledAt = row[cancelledAtIndex];
            const room = row[roomIndex];
            const checkIn = row[checkInIndex];
            const guests = row[guestsIndex];
            const adults = row[adultsIndex];

            console.log('Raw Cancelled At:', cancelledAt);
            console.log('Raw Check In:', checkIn);

            return {
                bookingReference: bookingReference,
                cancelledAt: formatDate(cancelledAt),
                room: room,
                checkIn: formatDate(checkIn),
                guests: guests,
                adults: adults
            };
        });

        dispatch(setCsvData(filteredData, fieldIndex));
    };
    reader.readAsBinaryString(file);
};

function formatDate(dateStr) {
    if (!dateStr) return '';

    // Handle Excel serial date
    if (typeof dateStr === 'number') {
        const date = XLSX.SSF.parse_date_code(dateStr);
        const day = String(date.d).padStart(2, '0');
        const month = String(date.m).padStart(2, '0');
        const year = date.y;
        return `${day}-${month}-${year}`;
    }

    // Handle date string
    if (typeof dateStr === 'string') {
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        }
    }

    return '';
}

function parseExcelDate(excelSerialDate) {
    const date = XLSX.SSF.parse_date_code(excelSerialDate);
    if (date) {
        const day = String(date.d).padStart(2, '0');
        const month = String(date.m).padStart(2, '0');
        const year = date.y;
        return `${day}-${month}-${year}`;
    }
    return null;
}

function splitName(name) {
    const cleanedName = name.replace(/,/g, '').trim();
    const parts = cleanedName.split(' ');

    if (name.includes(',')) {
        const lastName = parts[0];
        const firstName = parts.slice(1).join(' ');
        return { firstname: firstName, lastname: lastName };
    } else {
        const lastName = parts.pop();
        const firstName = parts.join(' ');
        return { firstname: firstName, lastname: lastName };
    }
}
