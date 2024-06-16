import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class FileDropzone extends Component {
    onDrop = (acceptedFiles) => {
        const { onDrop } = this.props;

        acceptedFiles.forEach((file) => {
            onDrop(file);
        });
    };

    render() {
        const { fileType, property, date } = this.props;
        const acceptMimeType = fileType === 'csv'
            ? { 'text/*': ['.csv'] }
            : { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] };

        const dropzoneStyle = {
            border: '2px dashed #ccc',
            padding: '10px',
            textAlign: 'center',
            height: '100px',
            width: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#333',
            color: '#fff',
            boxSizing: 'border-box'
        };

        const textStyle = {
            margin: 0,
            whiteSpace: 'normal',  // Allow text to wrap
            wordWrap: 'break-word',  // Break long words
            textAlign: 'center',
            width: '100%'
        };

        return (
            <Dropzone onDrop={this.onDrop} accept={acceptMimeType}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ style: dropzoneStyle })}>
                        <input {...getInputProps()} />
                        <p style={textStyle}>
                            {fileType === 'excel' ? (date || `Drag 'n' drop an ${fileType.toUpperCase()} file here, or click to select one`) 
                            : (property || `Drag 'n' drop a ${fileType.toUpperCase()} file here, or click to select one`)}
                        </p>
                    </div>
                )}
            </Dropzone>
        );
    }
}

export default FileDropzone;
