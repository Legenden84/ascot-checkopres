import React, { Component } from 'react';
import './MainWindow.css';

class MainWindow extends Component {
    filterData = (data, date) => {
        return data
            .map((row, originalIndex) => ({ ...row, originalIndex }))
            .filter(row => !row.cancelledAt && row.checkIn === date);
    }

    handleCheckboxChange = (originalIndex, isCsv, fieldIndex) => {
        const { updateCheckedStatus } = this.props;
        const field = `field${fieldIndex + 1}`;
        return (event) => {
            updateCheckedStatus(field, originalIndex, event.target.checked);
        };
    }

    render() {
        const { excelEntries = [], csvEntries = [], excelDate } = this.props;

        const renderTable = (data, isCsv = false, fieldIndex = null) => (
            <div className="table-container">
                <table className="dense-table">
                    <thead>
                        <tr>
                            {isCsv && <th className="table-header">Booking #</th>}
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
                                {isCsv && <td className="table-cell">{row.bookingReference}</td>}
                                <td className="table-cell">{row.lastname}</td>
                                <td className="table-cell">{row.firstname}</td>
                                <td className="table-cell checkin-cell">{row.checkIn}</td>
                                <td className="table-cell checkout-cell">{row.checkOut}</td>
                                <td className="table-cell">
                                    <input 
                                        type="checkbox" 
                                        checked={row.checked} 
                                        onChange={this.handleCheckboxChange(row.originalIndex, isCsv, fieldIndex)}
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

        return (
            <div className="main-window">
                {csvEntries.map((csvData, index) => (
                    <div key={index} className="table-wrapper">
                        {renderTable(this.filterData(csvData, excelDate), true, index)}
                    </div>
                ))}
                <div className="table-wrapper">
                    {renderTable(excelEntries)}
                </div>
            </div>
        );
    }
}

export default MainWindow;