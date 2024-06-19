import React, { Component } from 'react';
import './PrintableContent.css';

class PrintableContent extends Component {
  render() {
    const { filteredData, properties } = this.props;
    const rowsPerColumn = 40; // Adjust this value as necessary to fit your layout
    
    const allRows = Object.keys(filteredData).flatMap((fieldKey, index) => {
      return [
        <tr key={`header-${fieldKey}`} className="header-row">
          <td colSpan="6" className="section-header">{properties[`property${index + 1}`]}</td>
        </tr>,
        ...filteredData[fieldKey].map((row, rowIndex) => (
          <tr key={`${fieldKey}-${rowIndex}`}>
            <td className="table-cell booking-cell">{row.bookingReference}</td>
            <td className="table-cell">{row.lastname}</td>
            <td className="table-cell">{row.firstname}</td>
            <td className="table-cell checkin-cell">{row.checkIn}</td>
            <td className="table-cell checkout-cell">{row.checkOut}</td>
            <td className={`table-cell ok-cell ${row.checked ? 'checked' : 'unchecked'}`}>
              {row.checked ? '✔' : '✘'}
            </td>
          </tr>
        )),
      ];
    });

    let columns = [];
    let currentColumn = [];
    let currentRowCount = 0;

    allRows.forEach(row => {
      if (row.props.className === 'header-row' && currentRowCount + 1 > rowsPerColumn) {
        columns.push(currentColumn);
        currentColumn = [row];
        currentRowCount = 1;
      } else {
        currentColumn.push(row);
        currentRowCount++;
        if (currentRowCount >= rowsPerColumn) {
          columns.push(currentColumn);
          currentColumn = [];
          currentRowCount = 0;
        }
      }
    });
    if (currentColumn.length) {
      columns.push(currentColumn);
    }

    return (
      <div className="printable-content">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="print-column">
            <table className="dense-table">
              <thead>
                <tr>
                  <th className="table-header booking-header">Booking #</th>
                  <th className="table-header">Last Name</th>
                  <th className="table-header">First Name</th>
                  <th className="table-header checkin-header">Check-In</th>
                  <th className="table-header checkout-header">Check-Out</th>
                  <th className="table-header">OK</th>
                </tr>
              </thead>
              <tbody>
                {column}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }
}

export default PrintableContent;
