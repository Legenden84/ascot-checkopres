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

  render() {
    const { properties, filteredData } = this.props;

    return (
      <div className="status-bar excel-status-bar">
        <div className="status-bar-buttons">
          <div className="dropdown">
            <button className="dropdown-button">
              <i className="fas fa-sync-alt"></i>
            </button>
            <div className="dropdown-content">
              <button onClick={() => this.handleResetCsvData(1)}>
                {this.getResetButtonText(properties.property1, 'CSV 1')}
              </button>
              <button onClick={() => this.handleResetCsvData(2)}>
                {this.getResetButtonText(properties.property2, 'CSV 2')}
              </button>
              <button onClick={() => this.handleResetCsvData(3)}>
                {this.getResetButtonText(properties.property3, 'CSV 3')}
              </button>
              <button onClick={() => this.handleResetCsvData(4)}>
                {this.getResetButtonText(properties.property4, 'CSV 4')}
              </button>
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
          <PrintableContent ref={this.printableContentRef} filteredData={filteredData} />
        </div>
      </div>
    );
  }
}

export default StatusBar;
