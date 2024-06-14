import React, { Component } from 'react';

class StatusBar extends Component {
    handleReset = (fieldIndex) => {
        this.props.resetCsvData(fieldIndex);
    }

    render() {
        return (
            <div style={{ background: '#eee', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {[1, 2, 3, 4].map(fieldIndex => (
                        <div key={fieldIndex} style={{ textAlign: 'center', width: '18%' }}>
                            <div id={`dropzone${fieldIndex}`} style={{ marginBottom: '10px' }}></div>
                            <div style={{ marginBottom: '10px' }}>
                                <button onClick={() => this.handleReset(fieldIndex)}>Reset</button>
                                <button>Placeholder</button>
                            </div>
                        </div>
                    ))}
                    <div style={{ textAlign: 'center', width: '18%' }}>
                        <div id="dropzone5" style={{ marginBottom: '10px' }}></div>
                        <div style={{ marginBottom: '10px' }}>
                            <button>Placeholder</button>
                            <button>Placeholder</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StatusBar;
