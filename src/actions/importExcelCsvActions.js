import * as XLSX from 'xlsx';

export const SET_EXCEL_DATA = 'SET_EXCEL_DATA';
export const SET_CSV_DATA = 'SET_CSV_DATA';

const roomMappings = {
    "Ascot": ['Duplex Suite', 'D3D', 'DOUBLE doubl', 'Single room', 'Standard Sin', '0T', 'DOUBLE DOUBL', 'Standard Dou', 'E1', 'D3', 'D4D', '02', 'D2D', 'SINGLE singl', 'Triple Room', 'Single Room', 'Double or Tw', 'D2', 'D2G'],
    "Wide": ['W2B', 'W3D', 'Deluxe Singl', 'Design Doubl', 'Værelse med', '1X', 'Executive Ro', 'Single room', 'Deluxe-enkel', '42', 'D7', 'DOUBLE Doubl', 'WIDE Deluxe', 'Signature Ro', 'Executive-su', 'W4B', 'WE1'],
    "57 House": ['Dobbeltværel', 'Expedia Room', 'Classic Doub', 'Enkeltværels', 'Classic Sing', 'Deluxe-værel', 'Fiftyseven S'],
    "HyperNym": ['Deluxe-suite', 'Hypernym Lux', 'Luxury Apart', 'Deluxe-lejli', 'APARTMENT Hy', 'Superior-lej', 'Standard Rat', 'Deluxe-studi', 'Luxury Studi', 'Superior Apa']
};

export const setExcelData = (data) => ({
    type: SET_EXCEL_DATA,
    payload: data,
});

export const setCsvData = (data, fieldIndex) => ({
    type: SET_CSV_DATA,
    payload: { data, fieldIndex },
});

const determineProperty = (roomName) => {
    if (typeof roomName !== 'string') return null;
    const room = roomName.slice(0, 12);
    if (roomMappings.Ascot.includes(room)) return 'Ascot';
    if (roomMappings.Wide.includes(room)) return 'Wide';
    if (roomMappings['57 House'].includes(room)) return '57 House';
    if (roomMappings.HyperNym.includes(room)) return 'HyperNym';
    return null;
};

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
        for (let i = 3; i < sheetData.length; i++) {
            const row = sheetData[i];
            const name = row[2] || '';
            const nameParts = splitName(name);
            const adults = row[9] || '';
            const group = row[5] || '';
            const checkOut = adjustCheckOutDate(formattedDate, row[11]);
            entries.push({
                firstname: nameParts.firstname,
                lastname: nameParts.lastname,
                adults: adults,
                group: group,
                checkIn: formattedDate,
                checkOut: checkOut,
                checked: false
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
        const checkOutIndex = header.indexOf('Check - Out');
        const guestsIndex = header.indexOf('Guests');
        const adultsIndex = header.indexOf('Adults');

        // Extract the required columns and add the property key
        const filteredData = jsonData.slice(1).map(row => {
            const roomValue = row[roomIndex] || '';
            const property = determineProperty(roomValue);

            const bookingReference = row[bookingRefIndex];
            const cancelledAt = row[cancelledAtIndex];
            const checkIn = row[checkInIndex];
            const checkOut = row[checkOutIndex];
            const guests = row[guestsIndex];
            const adults = row[adultsIndex];
            const nameParts = splitName(guests);

            return {
                bookingReference: bookingReference,
                cancelledAt: formatDate(cancelledAt),
                room: roomValue,
                checkIn: formatDate(checkIn),
                checkOut: formatDate(checkOut),
                guests: guests,
                adults: adults,
                property: property,
                firstname: nameParts.firstname,
                lastname: nameParts.lastname,
                checked: null
            };
        });

        dispatch(setCsvData(filteredData, fieldIndex));
    };
    reader.readAsBinaryString(file);
};

function adjustCheckOutDate(checkIn, checkOutStr) {
    let checkOutDate = formatDate(checkOutStr);
    if (!checkIn || !checkOutDate) return '';

    const checkInDate = new Date(checkIn.split('-').reverse().join('-'));
    let parsedCheckOutDate = new Date(checkOutDate.split('-').reverse().join('-'));

    // If checkOut date is before checkIn date, add 1 to the year
    if (parsedCheckOutDate < checkInDate) {
        parsedCheckOutDate.setFullYear(parsedCheckOutDate.getFullYear() + 1);
        checkOutDate = formatDate(parsedCheckOutDate.toISOString().split('T')[0]);
    }

    return checkOutDate;
}

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
            const month = String(date.getMonth() + 1).padStart(2, '0');
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
    if (!name || typeof name !== 'string') {
        return { firstname: '', lastname: '' };
    }
    
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
