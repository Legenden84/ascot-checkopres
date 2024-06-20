import React from 'react';
import Modal from '../utils/Modal';
import './FileDropzone.css';

class FileDropzone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWarning: false,
            warningMessage: '',
        };
    }

    handleDrop = (event) => {
        event.preventDefault();
        const { onDrop, fieldIndex, fileType } = this.props;
        const files = event.dataTransfer.files;
        if (files.length) {
            this.handleFile(files[0], fieldIndex, onDrop, fileType);
        }
    }

    handleDragOver = (event) => {
        event.preventDefault();
    }

    handleChange = (event) => {
        const { onDrop, fieldIndex, fileType } = this.props;
        const files = event.target.files;
        if (files.length) {
            this.handleFile(files[0], fieldIndex, onDrop, fileType);
        }
    }

    handleClick = () => {
        this.fileInput.click();
    }

    setFileInputRef = (element) => {
        this.fileInput = element;
    }

    handleFile = (file, fieldIndex, onDrop, fileType) => {
        const validExtensions = fileType === 'excel' ? ['.xlsx', '.xls'] : ['.csv'];
        const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
        if (validExtensions.includes(fileExtension)) {
            this.setState({ showWarning: false, warningMessage: '' });
            onDrop(file, fieldIndex);
        } else {
            const warningMessage = fileType === 'excel' 
                ? 'Forkert fil. Vælg Spectra AnkomstListe!'
                : 'Forkert fil. Vælg SiteMinder fil!.';
            this.setState({ showWarning: true, warningMessage });
        }
    }

    closeModal = () => {
        this.setState({ showWarning: false, warningMessage: '' });
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
            <div className="dropzone-container">
                <div
                    className={className}
                    onDrop={this.handleDrop}
                    onDragOver={this.handleDragOver}
                    onClick={this.handleClick}
                >
                    <input
                        type="file"
                        accept={fileType === 'excel' ? '.xlsx, .xls' : '.csv'}
                        onChange={this.handleChange}
                        disabled={disabled}
                        ref={this.setFileInputRef}
                        style={{ display: 'none' }}
                    />
                    <p>{property || date || dropzoneText}</p>
                </div>
                {this.state.showWarning && (
                    <Modal 
                        message={this.state.warningMessage} 
                        onClose={this.closeModal} 
                    />
                )}
            </div>
        );
    }
}

export default FileDropzone;
