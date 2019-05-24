import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './ShowCharacter.css';
import store from '../../stores/store';

class ShowCharacter extends Component{
    render(){
        return (
            <div className='ShowCharacter'>
                {store.userInfo.username}
                {store.userInfo.email}
                {store.userInfo.activo? 'true' : 'false'}
                {store.userInfo.personaje}
                {store.userInfo.turno}
            </div>
        );
    }
}

export default observer(ShowCharacter);
