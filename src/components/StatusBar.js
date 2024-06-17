import React, { Component } from 'react';

class StatusBar extends Component {
    handleReset = () => {
        const { resetCsvData, fieldIndex } = this.props;
        resetCsvData(fieldIndex);
    }

    handleResetReduxStore = () => {
        this.props.resetReduxStore();
    }

    render() {
        const { fileType } = this.props;
        return (
            <div className="status-bar">
                <div className="status-bar-buttons">
                    {fileType === 'csv' ? (
                        <>
                            <button onClick={this.handleReset}>Reset</button>
                            <button>Placeholder</button>
                        </>
                    ) : (
                        <>
                            <button onClick={this.handleResetReduxStore}>Reset Redux Store</button>
                            <button>Placeholder</button>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default StatusBar;
