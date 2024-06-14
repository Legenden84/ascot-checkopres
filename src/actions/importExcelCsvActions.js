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

    const cellA3 = worksheet['A3'];
    const dateSerial = cellA3 ? cellA3.v : null;
    const formattedDate = dateSerial ? parseExcelDate(dateSerial) : null;

    const nameColumn = [];
    const adultsColumn = [];
    const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    for (let i = 3; i < sheetData.length; i++) {
      const row = sheetData[i];
      nameColumn.push(row[2] || '');
      adultsColumn.push(row[9] || '');
    }

    dispatch(setExcelData({
      date: formattedDate,
      name: nameColumn,
      adults: adultsColumn,
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
