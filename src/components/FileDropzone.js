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
            width: '100%',
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
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            textAlign: 'center',
            width: '100%'
        };

        return (
            <Dropzone onDrop={this.onDrop} accept={acceptMimeType}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ style: dropzoneStyle })}>
                        <input {...getInputProps()} />
                        <p style={textStyle}>
                            {fileType === 'excel' ? (date || `Åben Spectra AnkomstListe (${fileType.toUpperCase()}).`) 
                            : (property || `Åben SiteMinder fil (${fileType.toUpperCase()}).`)}
                        </p>
                    </div>
                )}
            </Dropzone>
        );
    }
}

export default FileDropzone;
