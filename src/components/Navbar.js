import React, { Component } from 'react';
import FileDropzoneContainer from '../containers/FileDropzoneContainer';
import StatusBarContainer from '../containers/StatusBarContainer';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar">
                    <div className="dropzone-container">
                        <FileDropzoneContainer fileType="csv" fieldIndex="1" />
                    </div>
                    <div className="dropzone-container">
                        <FileDropzoneContainer fileType="csv" fieldIndex="2" />
                    </div>
                    <div className="dropzone-container">
                        <FileDropzoneContainer fileType="csv" fieldIndex="3" />
                    </div>
                    <div className="dropzone-container">
                        <FileDropzoneContainer fileType="csv" fieldIndex="4" />
                    </div>
                    <div className="dropzone-container">
                        <FileDropzoneContainer fileType="excel" />
                    </div>
                </nav>
                <StatusBarContainer />
            </div>
        );
    }
}

export default Navbar;
