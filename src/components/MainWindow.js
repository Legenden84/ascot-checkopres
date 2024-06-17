import React, { Component } from 'react';
import './MainWindow.css';

class MainWindow extends Component {
    filterData = (data, date) => {
        return data
            .map((row, originalIndex) => ({ ...row, originalIndex }))
            .filter(row => !row.cancelledAt && row.checkIn === date);
    }

    handleCheckboxChange = (originalIndex, fileType) => {
        const { updateCheckedStatus, fieldIndex } = this.props;
        const field = `field${fieldIndex}`;
        return (event) => {
            updateCheckedStatus(field, originalIndex, event.target.checked, fileType);
        };
    }

    renderCsvTable = (data) => (
        <div className="table-container">
            <table className="dense-table">
                <thead>
                    <tr>
                        <th className="table-header">Booking #</th>
                        <th className="table-header">Last Name</th>
                        <th className="table-header">First Name</th>
                        <th className="table-header checkin-header">Check-In</th>
                        <th className="table-header checkout-header">Check-Out</th>
                        <th className="table-header"></th>
                        <th className="table-header">OK</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="table-cell">{row.bookingReference}</td>
                            <td className="table-cell">{row.lastname}</td>
                            <td className="table-cell">{row.firstname}</td>
                            <td className="table-cell checkin-cell">{row.checkIn}</td>
                            <td className="table-cell checkout-cell">{row.checkOut}</td>
                            <td className="table-cell">
                                <input 
                                    type="checkbox" 
                                    checked={row.checked} 
                                    onChange={this.handleCheckboxChange(row.originalIndex, 'csv')}
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

    renderExcelTable = (data) => (
        <div className="table-container">
            <table className="dense-table">
                <thead>
                    <tr>
                        <th className="table-header">Last Name</th>
                        <th className="table-header">First Name</th>
                        <th className="table-header checkin-header">Check-In</th>
                        <th className="table-header checkout-header">Check-Out</th>
                        <th className="table-header"></th>
                        <th className="table-header">OK</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            <td className="table-cell">{row.lastname}</td>
                            <td className="table-cell">{row.firstname}</td>
                            <td className="table-cell checkin-cell">{row.checkIn}</td>
                            <td className="table-cell checkout-cell">{row.checkOut}</td>
                            <td className="table-cell">
                                <input 
                                    type="checkbox" 
                                    checked={row.checked} 
                                    onChange={this.handleCheckboxChange(index, 'excel')}
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
        const { excelEntries = [], csvEntries = [], excelDate, fileType } = this.props;

        return (
            <div className="main-window">
                {fileType === 'csv' ? (
                    this.renderCsvTable(this.filterData(csvEntries, excelDate))
                ) : (
                    this.renderExcelTable(excelEntries)
                )}
            </div>
        );
    }
}

export default MainWindow;
