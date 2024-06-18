// src/components/FileDropzone.js

import React from 'react';
import './FileDropzone.css';

class FileDropzone extends React.Component {
    handleDrop = (event) => {
        event.preventDefault();
        const { onDrop, fieldIndex } = this.props;
        const files = event.dataTransfer.files;
        if (files.length) {
            onDrop(files[0], fieldIndex);
        }
    }

    handleDragOver = (event) => {
        event.preventDefault();
    }

    handleChange = (event) => {
        const { onDrop, fieldIndex } = this.props;
        const files = event.target.files;
        if (files.length) {
            onDrop(files[0], fieldIndex);
        }
    }

    render() {
        const { disabled, property, date } = this.props;

        return (
            <div
                className={`file-dropzone ${disabled ? 'disabled' : ''}`}
                onDrop={this.handleDrop}
                onDragOver={this.handleDragOver}
            >
                <input
                    type="file"
                    accept=".csv, .xlsx, .xls"
                    onChange={this.handleChange}
                    disabled={disabled}
                />
                <p>{property || date || 'Drag and drop a file here, or click to select a file.'}</p>
            </div>
        );
    }
}

export default FileDropzone;
