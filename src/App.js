import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ShoppingCart from './container/ShoppingCart';
import './App.css';

class App extends Component {
  render() {
    return (
      <Layout>
          <Header/>
          <ShoppingCart/>
          <Footer/>
      </Layout>
    );
  }
}

export default App;
