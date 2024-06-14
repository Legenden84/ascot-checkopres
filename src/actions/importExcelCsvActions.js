import * as XLSX from 'xlsx';

// Define action types
export const SET_EXCEL_DATA = 'SET_EXCEL_DATA';
export const SET_CSV_DATA = 'SET_CSV_DATA';

// Action creators
export const setExcelData = (data) => ({
  type: SET_EXCEL_DATA,
  payload: data,
});

export const setCsvData = (data) => ({
  type: SET_CSV_DATA,
  payload: data,
});

export const dropExcelFile = (file) => (dispatch) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const cellA4 = worksheet['A4'];
    const dateSerial = cellA4 ? cellA4.v : null;
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

function parseExcelDate(excelSerialDate) {
  const date = XLSX.SSF.parse_date_code(excelSerialDate);
  if (date) {
    const day = String(date.d).padStart(2, '0');
    const month = String(date.m).padStart(2, '0');
    const year = date.y;
    return `${year}-${month}-${day}`;
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
