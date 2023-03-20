import React from 'react';

import './app.css';

import Footer from './components/Footer';
import Header from './components/Header/index';
import Main from './components/Main/index';

export default function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
