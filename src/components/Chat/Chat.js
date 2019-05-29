import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import './Chat.css';
import store from '../../stores/store';
import api from '../../utils/api';

class Chat extends Component{
    constructor(props){
        super(props);

        this.state = {
            msj : '',
        };
    }
    render(){
        return (
            <div className='page Chat'>
                <h3 className='titulo'>Chat</h3>
                <p>Discute con los demás y ponte de acuerdo en las acciones a realizar</p>
                <div className='mensajes'>
                    {store.mensajes && store.mensajes.map((mensaje, index)=>{
                        return <p className='mensaje' key={index}>{mensaje}</p>
                    })}
                </div>
                <input type='text' value={this.state.msj} onChange={(e)=>{
                    this.setState({
                        msj: e.target.value,
                    });
                }}></input>
                <div className='btn' onClick={(e)=>{
                    api.NuevoMsj(store.userInfo.name+': '+ this.state.msj + '');
                    this.setState({
                        msj: '',
                    });
                }}>Enviar</div>
                <div className='btnContainer'><Link to={'/Juego'} className='go'> {'<'} </Link></div>
            </div>
        );
    }
}

export default observer(Chat);