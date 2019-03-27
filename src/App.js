import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import './styles/App.scss';
import Main from './containers/Main';

const App = props => {
  return (
    <div className="App">
      <Main />
    </div>
  );
};

export default App;
