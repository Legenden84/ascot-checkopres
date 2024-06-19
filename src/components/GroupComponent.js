import React from 'react';
import FileDropzoneContainer from '../containers/FileDropzoneContainer';
import StatusBarContainer from '../containers/StatusBarContainer';
import MainWindowContainer from '../containers/MainWindowContainer';
import './GroupComponent.css';

const GroupComponent = ({ fileType, fieldIndex }) => (
    <div className={`group-container ${fileType === 'excel' ? 'excel-group' : ''}`}>
        <div className="dropzone-status-container">
            <div className="dropzone-container">
                <FileDropzoneContainer fileType={fileType} fieldIndex={fieldIndex} />
            </div>
            {fileType === 'excel' && (
                <div className="status-bar-container">
                    <StatusBarContainer fileType={fileType} fieldIndex={fieldIndex} />
                </div>
            )}
        </div>
        <MainWindowContainer fileType={fileType} fieldIndex={fieldIndex} />
    </div>
);

export default GroupComponent;
