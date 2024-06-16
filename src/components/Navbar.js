import React, { Component } from 'react';
import FileDropzoneContainer from '../containers/FileDropzoneContainer';
import StatusBarContainer from '../containers/StatusBarContainer';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav style={{ background: '#333', color: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
                    <FileDropzoneContainer fileType="csv" fieldIndex="1" />
                    <FileDropzoneContainer fileType="csv" fieldIndex="2" />
                    <FileDropzoneContainer fileType="csv" fieldIndex="3" />
                    <FileDropzoneContainer fileType="csv" fieldIndex="4" />
                    <FileDropzoneContainer fileType="excel" />
                </nav>
                <StatusBarContainer />
            </div>
        );
    }
}

export default Navbar;
