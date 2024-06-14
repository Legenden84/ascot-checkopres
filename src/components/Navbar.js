import React, { Component } from 'react';
import FileDropzoneContainer from '../containers/FileDropzoneContainer';

class Navbar extends Component {
  render() {
    return (
      <nav style={{ background: '#333', color: '#fff', padding: '10px', display: 'flex', justifyContent: 'space-around' }}>
        <FileDropzoneContainer fileType="csv" />
        <FileDropzoneContainer fileType="csv" />
        <FileDropzoneContainer fileType="csv" />
        <FileDropzoneContainer fileType="csv" />
        <FileDropzoneContainer fileType="excel" />
      </nav>
    );
  }
}

export default Navbar;
