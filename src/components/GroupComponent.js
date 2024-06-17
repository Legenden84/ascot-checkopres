import React from 'react';
import FileDropzoneContainer from '../containers/FileDropzoneContainer';
import StatusBarContainer from '../containers/StatusBarContainer';
import MainWindowContainer from '../containers/MainWindowContainer';
import './GroupComponent.css';

const GroupComponent = ({ fileType, fieldIndex }) => (
    <div className="group-container">
        <div className="dropzone-container">
            <FileDropzoneContainer fileType={fileType} fieldIndex={fieldIndex} />
        </div>
        <StatusBarContainer fileType={fileType} fieldIndex={fieldIndex} />
        <MainWindowContainer fileType={fileType} fieldIndex={fieldIndex} />
    </div>
);

export default GroupComponent;
