// StatusBar.js
import React, { Component } from 'react';
import './StatusBar.css';

class StatusBar extends Component {
    handleResetReduxStore = () => {
        this.props.resetReduxStore();
    }

    handleCompareData = () => {
        this.props.compareData();
    }

    render() {
        return (
            <div className="status-bar excel-status-bar">
                <div className="status-bar-buttons">
                    <button onClick={this.handleResetReduxStore}>
                        <i className="fas fa-sync-alt"></i>
                    </button>
                    <button onClick={this.handleCompareData}>
                        <i className="fas fa-play"></i>
                    </button>
                    <button>
                        <i className="fas fa-print"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default StatusBar;
