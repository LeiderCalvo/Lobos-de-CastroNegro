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
            {store.userInfo.imagen}
                <img width= '220px' src="https://juguetes20.com/wp-content/uploads/2018/05/Los-hombres-lobo-de-CastroNegro.png" alt="Italian Trulli"/>
                <h3 className='titulo'>{store.userInfo.personaje}</h3>
                <p>El objetivo de tu personaje es {store.userInfo.descripcion}</p>
            </div>
        );
    }
}

export default observer(ShowCharacter);
