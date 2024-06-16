import React, { Component } from 'react';

class StatusBar extends Component {
    handleReset = (fieldIndex) => {
        this.props.resetCsvData(fieldIndex);
    }

    handleResetReduxStore = () => {
        this.props.resetReduxStore(); // Dispatch the action to reset the entire state
    }
    render() {

        const buttonStyle = {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
        };

        const statusBarStyle = {
            background: '#eee',
            padding: '10px',
            borderBottom: '1px solid #ccc',
            display: 'flex',
            justifyContent: 'space-around',
        };

        return (
            <div style={statusBarStyle}>
                {[1, 2, 3, 4].map(fieldIndex => (
                    <div key={fieldIndex} style={buttonStyle}>
                        <div>
                            <button onClick={() => this.handleReset(fieldIndex)}>Reset</button>
                            <button>Placeholder</button>
                        </div>
                    </div>
                ))}
                <div style={buttonStyle}>
                    <div>
                        <button onClick={this.handleResetReduxStore}>Reset Redux Store</button>
                        <button>Placeholder</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusBar;
