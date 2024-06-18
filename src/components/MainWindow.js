// src/components/MainWindow.js

import React, { Component } from 'react';
import './MainWindow.css';

class MainWindow extends Component {
    handleCheckboxChange = (index, fileType) => {
        const { updateExcelCheckedStatus, updateCsvCheckedStatus, fieldIndex } = this.props;
        const field = `field${fieldIndex}`;
        return (event) => {
            const checked = event.target.checked;
            if (fileType === 'excel') {
                updateExcelCheckedStatus(field, index, checked);
            } else if (fileType === 'csv') {
                updateCsvCheckedStatus(field, index, checked);
            }
        };
    }

    renderTable = (data, fileType) => (
        <div className="table-container">
            <table className="dense-table">
                <thead>
                    <tr>
                        {fileType === 'csv' && <th className="table-header booking-header">Booking #</th>}
                        {fileType === 'excel' && <th className="table-header resNum-header">Res. Nr.</th>}
                        <th className="table-header">Last Name</th>
                        <th className="table-header">First Name</th>
                        <th className="table-header checkin-header">Check-In</th>
                        <th className="table-header checkout-header">Check-Out</th>
                        <th className="table-header checkbox-header"></th>
                        <th className="table-header ok-header">OK</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {fileType === 'csv' && <td className="table-cell booking-cell">{row.bookingReference}</td>}
                            {fileType === 'excel' && <td className="table-cell resNum-cell">{row.resNum}</td>}
                            <td className="table-cell">{row.lastname}</td>
                            <td className="table-cell">{row.firstname}</td>
                            <td className="table-cell checkin-cell">{row.checkIn}</td>
                            <td className="table-cell checkout-cell">{row.checkOut}</td>
                            <td className="table-cell checkbox-cell">
                                <input 
                                    type="checkbox" 
                                    checked={row.checked || false} 
                                    onChange={this.handleCheckboxChange(index, this.props.fileType)}
                                />
                            </td>
                            <td className={`table-cell ok-cell ${row.checked ? 'checked' : 'unchecked'}`}>
                                {row.checked ? '✔' : '✘'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    render() {
        const { entries, fileType } = this.props;

        return (
            <div className="main-window">
                {this.renderTable(entries, fileType)}
            </div>
        );
    }
}

export default MainWindow;
