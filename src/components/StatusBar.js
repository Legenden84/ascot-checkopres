import React, { Component } from 'react';
import './StatusBar.css';

class StatusBar extends Component {
    handleReset = () => {
        const { resetCsvData, fieldIndex } = this.props;
        resetCsvData(fieldIndex);
    }

    handleResetReduxStore = () => {
        this.props.resetReduxStore();
    }

    handleCompareData = () => {
        this.props.compareData();
    }

    render() {
        const { fileType } = this.props;
        return (
            <div className={`status-bar ${fileType === 'excel' ? 'excel-status-bar' : ''}`}>
                <div className="status-bar-buttons">
                    {fileType === 'csv' ? (
                        <>
                            <button onClick={this.handleReset}>Reset</button>
                            <button>Placeholder</button>
                        </>
                    ) : (
                        <>
                            <button onClick={this.handleResetReduxStore}>Reset</button>
                            <button onClick={this.handleCompareData}>Compare</button>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default StatusBar;
