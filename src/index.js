import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SingInSignUpProvider } from './contexts/SignInSignUpContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SingInSignUpProvider>
      <App />
    </SingInSignUpProvider>
  </React.StrictMode>
);

