import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import ExamplePage from './ExamplePage';
import ExamplePosts from './ExamplePosts';
import ExampleRoutes from './ExampleRoutes'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ExampleRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
