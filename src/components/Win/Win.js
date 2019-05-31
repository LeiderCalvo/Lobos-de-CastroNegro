import React, { Component } from 'react';
import { observer } from 'mobx-react';
import './Win.css';
import store from '../../stores/store';

class Win extends Component{
    render(){
        return (
            <div className='page Win'>
                {//<h1>FIN DEL JUEGO</h1>
                }
                <h1>Ha ganado esta partida los</h1>
                <h3>{this.props.match.params.who}</h3>
            </div>
        );
    }
}

export default observer(Win);