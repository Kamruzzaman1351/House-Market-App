import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SingInSignUpProvider } from './contexts/SignInSignUpContext';
import { BrowserRouter } from 'react-router-dom';
import { CategoryProvider } from './contexts/CategoryContext';
import { ListingProvider } from './contexts/ListingContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SingInSignUpProvider>
        <CategoryProvider>
          <ListingProvider>
            <App />
          </ListingProvider>
        </CategoryProvider>
      </SingInSignUpProvider>
    </BrowserRouter>
  </React.StrictMode>
);

