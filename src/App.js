import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import NavbarContainer from './containers/NavbarContainer';
import StatusBarContainer from './containers/StatusBarContainer';
import MainWindowContainer from './containers/MainWindowContainer';
import FileDropzoneContainer from './containers/FileDropzoneContainer';

class App extends React.Component {
    componentDidMount() {
        const dropzones = [1, 2, 3, 4].map(index => ({
            element: document.getElementById(`dropzone${index}`),
            component: <FileDropzoneContainer key={index} fileType="csv" fieldIndex={index} />
        }));

        dropzones.push({
            element: document.getElementById('dropzone5'),
            component: <FileDropzoneContainer key={5} fileType="excel" />
        });

        dropzones.forEach(({ element, component }) => {
            if (element) {
                ReactDOM.render(component, element);
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <div>
                    <NavbarContainer />
                    <StatusBarContainer />
                    <MainWindowContainer />
                </div>
            </Provider>
        );
    }
}

export default App;
