import React, { Component } from 'react';
import './PrintableContent.css';

class PrintableContent extends Component {
  render() {
    const { filteredData } = this.props;

    return (
      <div className="printable-content">
        {Object.keys(filteredData).map((fieldKey, index) => (
          <div key={index} className="table-wrapper">
            <div className="table-container">
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
                  {filteredData[fieldKey].map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="table-cell booking-cell">{row.bookingReference}</td>
                      <td className="table-cell">{row.lastname}</td>
                      <td className="table-cell">{row.firstname}</td>
                      <td className="table-cell checkin-cell">{row.checkIn}</td>
                      <td className="table-cell checkout-cell">{row.checkOut}</td>
                      <td className={`table-cell ok-cell ${row.checked ? 'checked' : 'unchecked'}`}>
                        {row.checked ? '✔' : '✘'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default PrintableContent;
