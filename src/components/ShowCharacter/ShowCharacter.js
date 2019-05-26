import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './ShowCharacter.css';
import store from '../../stores/store';

class ShowCharacter extends Component{

    componentDidMount(){
        setTimeout(() => {
            this.props.history.push('/Juego');
        }, 9000);
    }

    render(){
        return (
            <div className='page ShowCharacter'>
                <img width= '220px' src={store.userInfo.imagen} alt="Italian Trulli"/>
                <h3 className='titulo'>{store.userInfo.personaje}</h3>
                <p>El objetivo de tu personaje es {store.userInfo.descripcion}</p>
            </div>
        );
    }
}

export default observer(ShowCharacter);
