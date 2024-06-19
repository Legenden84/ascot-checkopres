import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import GroupComponent from './components/GroupComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app-container">
          {[1, 2, 3, 4].map(fieldIndex => (
            <GroupComponent key={fieldIndex} fileType="csv" fieldIndex={fieldIndex} />
          ))}
          <GroupComponent fileType="excel" fieldIndex={5} />
        </div>
      </Provider>
    );
  }
}

export default App;
