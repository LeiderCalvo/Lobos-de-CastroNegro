import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './ShowCharacter.css';

class ShowCharacter extends Component{
    render(){
        return (
            <div className='ShowCharacter'>
                ShowCharacter
            </div>
        );
    }
}

export default observer(ShowCharacter);
