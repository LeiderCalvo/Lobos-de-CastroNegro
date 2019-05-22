import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './WaitingPage.css'
import { Link } from 'react-router-dom';
import store from '../../stores/store';

class WaitingPage extends Component{
    render(){
        return(
            <div className='page Waiting'>
                <h1>{store.currentConectados}</h1>
                <h3 className='titulo'>Conectados</h3>
                <p>Esta sala esta programada para XXXXXX personas. Debemos esperar y mas usuarios</p>
                <Link to={'/ShowCharacter'} className={store.currentConectados>=store.minConectados? 'btn': 'oculto'}>Jugar</Link>
            </div>
        );
    }
}

export default observer(WaitingPage);