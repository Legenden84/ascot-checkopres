import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import NavbarContainer from './containers/NavbarContainer';
import MainWindowContainer from './containers/MainWindowContainer';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <NavbarContainer />
          <MainWindowContainer />
        </div>
      </Provider>
    );
  }
}

export default App;