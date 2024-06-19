// FileDropzone.js
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

    handleClick = () => {
        this.fileInput.click();
    }

    setFileInputRef = (element) => {
        this.fileInput = element;
    }

    render() {
        const { disabled, property, date, fileType } = this.props;
        const className = `file-dropzone ${fileType === 'excel' ? 'file-dropzone-excel' : ''} ${disabled ? 'disabled' : ''}`;
        let dropzoneText = '';

        if (fileType === 'csv') {
            dropzoneText = 'Tryk for at åbne, eller træk og slip SiteMinder fil (csv).';
        } else if (fileType === 'excel') {
            dropzoneText = 'Tryk for at åbne, eller træk og slip Spectra AnkomstListe fil (XLS).';
        }

        return (
            <div
                className={className}
                onDrop={this.handleDrop}
                onDragOver={this.handleDragOver}
                onClick={this.handleClick}
            >
                <input
                    type="file"
                    accept=".csv, .xlsx, .xls"
                    onChange={this.handleChange}
                    disabled={disabled}
                    ref={this.setFileInputRef}
                    style={{ display: 'none' }}
                />
                <p>{property || date || dropzoneText}</p>
            </div>
        );
    }
}

export default FileDropzone;
