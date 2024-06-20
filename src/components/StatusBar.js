import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import PrintableContent from '../utils/PrintableContent';
import './StatusBar.css';

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.printableContentRef = React.createRef();
  }

  handleResetCsvData = (fieldIndex) => {
    this.props.resetCsvData(fieldIndex);
  }

  handleResetReduxStore = () => {
    this.props.resetReduxStore();
  }

  handleCompareData = () => {
    this.props.compareData();
  }

  getResetButtonText = (property, defaultText) => {
    return property ? `Reset ${property}` : defaultText;
  }

  renderResetButtons = () => {
    const { properties } = this.props;
    return [1, 2, 3, 4].map((fieldIndex) => {
      const propertyKey = `property${fieldIndex}`;
      if (properties && properties[propertyKey]) {
        return (
          <button key={fieldIndex} onClick={() => this.handleResetCsvData(fieldIndex)}>
            {this.getResetButtonText(properties[propertyKey], `CSV ${fieldIndex}`)}
          </button>
        );
      }
      return null;
    });
  }

  render() {
    const { properties, filteredData, excelData } = this.props;

    return (
      <div className="status-bar excel-status-bar">
        <div className="status-bar-buttons">
          <div className="dropdown">
            <button className="dropdown-button">
              <i className="fas fa-sync-alt"></i>
            </button>
            <div className="dropdown-content">
              {this.renderResetButtons()}
              <button onClick={this.handleResetReduxStore}>
                Reset All
              </button>
            </div>
          </div>
          <button onClick={this.handleCompareData}>
            <i className="fas fa-play"></i>
          </button>
          <ReactToPrint
            trigger={() => <button><i className="fas fa-print"></i></button>}
            content={() => this.printableContentRef.current}
          />
        </div>
        <div style={{ display: 'none' }}>
          <PrintableContent ref={this.printableContentRef} filteredData={filteredData} properties={properties} excelData={excelData} />
        </div>
      </div>
    );
  }
}

export default StatusBar;
