import React, { Component } from 'react';
import { observer }  from 'mobx-react';
import store from '../../stores/store';
//https://www.robinwieruch.de/create-react-app-mobx-decorators/
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        {store.currentConectados}
        <div onClick={()=>{store.setCurrentConectados(45)}}>push</div>
      </div>
    );
  }
}

export default observer(App);
