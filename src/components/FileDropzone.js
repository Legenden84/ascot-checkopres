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
        const { fileType } = this.props;
        const acceptMimeType = fileType === 'csv'
            ? { 'text/*': ['.csv'] }
            : { 'application/vnd.ms-excel': ['.xls'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'] };

        return (
            <Dropzone onDrop={this.onDrop} accept={acceptMimeType}>
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ style: { border: '2px dashed #ccc', padding: '10px' } })}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop a {fileType.toUpperCase()} file here, or click to select one</p>
                    </div>
                )}
            </Dropzone>
        );
    }
}

export default FileDropzone;