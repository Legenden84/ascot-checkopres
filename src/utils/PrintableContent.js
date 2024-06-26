import React, { Component } from 'react';
import './PrintableContent.css';

class PrintableContent extends Component {
  render() {
    const { filteredData, properties, excelData } = this.props;

    const fieldsToPrint = Object.keys(filteredData).slice(0, 4);

    const allSections = fieldsToPrint.map((fieldKey, index) => {
      const propertyHeader = (
        <tr key={`header-${fieldKey}`} className="header-row">
          <td colSpan="6" className="section-header">{properties[`property${index + 1}`]}</td>
        </tr>
      );

      const tableHeader = (
        <tr key={`table-header-${fieldKey}`}>
          <th className="table-header booking-header">Booking #</th>
          <th className="table-header">Last Name</th>
          <th className="table-header">First Name</th>
          <th className="table-header checkin-header">Check-In</th>
          <th className="table-header checkout-header">Check-Out</th>
          <th className="table-header">OK</th>
        </tr>
      );

      const rows = filteredData[fieldKey].map((row, rowIndex) => (
        <tr key={`${fieldKey}-${rowIndex}`}>
          <td className="table-cell booking-cell">{row.bookingReference}</td>
          <td className="table-cell">{row.lastname}</td>
          <td className="table-cell">{row.firstname}</td>
          <td className="table-cell checkin-cell">{row.checkIn}</td>
          <td className="table-cell checkout-cell">{row.checkOut}</td>
          <td className={`table-cell ok-cell ${row.checked ? 'checked' : 'unchecked'}`}>
            {row.checked ? 'OK' : '%'}
          </td>
        </tr>
      ));

      return [propertyHeader, tableHeader, ...rows];
    });

    let columns = [];
    let currentColumn = [];
    let currentRowCount = 0;
    const rowsPerColumn = Math.ceil(allSections.flat().length / 4);

    allSections.flat().forEach(row => {
      if (currentRowCount >= rowsPerColumn) {
        columns.push(currentColumn);
        currentColumn = [];
        currentRowCount = 0;
      }
      currentColumn.push(row);
      currentRowCount++;
    });

    if (currentColumn.length) {
      columns.push(currentColumn);
    }

    return (
      <div className="printable-content">
        <div className="page-header-row">
          <div className="page-header">
            <h1>Ankomster</h1>
            <p>Dato: {excelData.date}</p>
          </div>
        </div>
        <div className="content-columns">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="print-column">
              <table className="dense-table">
                <tbody>
                  {column}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PrintableContent;
