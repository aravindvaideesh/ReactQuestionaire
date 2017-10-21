import React from 'react';
import { render } from 'react-dom';
import MainSection from './containers/MainSection';

const App = () => (
  <div>
 <MainSection /> 
  </div>
);

render(<App />, document.getElementById('root'));
