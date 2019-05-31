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
                <div className='container'>
                    <div className='btnContainer'><Link to={'/Juego'} className='go'> {'<'} </Link></div>
                    <h3 className='titulo'>Chat</h3>
                </div>

                <p>Discute con los demás y ponte de acuerdo en las acciones a realizar</p>
                <div className='mensajes'>
                    {store.mensajes && store.mensajes.map((mensaje, index)=>{
                        if(mensaje.split(':')[0] === store.userInfo.name){
                            return <p className='mensaje2' key={index}>{mensaje.split(':')[1]}</p>
                        }else{
                            return <p className='mensaje' key={index}>{mensaje}</p>
                        }
                    })}
                </div>

                <div className='container2'>
                    <input className='input' type='text' value={this.state.msj} onChange={(e)=>{
                        this.setState({
                            msj: e.target.value,
                        });
                    }}></input>
                    <div className='btn' onClick={(e)=>{
                        api.NuevoMsj(store.userInfo.username+': '+ this.state.msj + '');
                        this.setState({
                            msj: '',
                        });
                    }}>Enviar</div>
                </div>
            </div>
        );
    }
}

export default observer(Chat);