import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './Sing.css'
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import store from '../../stores/store';

let email = '';
let password = '';

class SingIn extends Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        api.SingIn(this.state.email, this.state.password);
    }

    render(){
        return(
            <div className='page Sing'>
                <input type='text' placeholder='Correo' value={this.state.email} onChange={(e)=>{
                   this.setState({email : e.target.value + ''})
                }}/>

                <input type='password' placeholder='Password' value={this.state.password} onChange={(e)=>{
                   this.setState({password : e.target.value + ''})
                }}/>
                
                {store.initSuccess?
                    <Link className='btn' to={'/Waiting'}>Iniciar</Link>
                :
                store.isLogin? 
                    <div className='btn' >Cargando</div>
                :
                    <div className='btn' onClick={this.handleClick}>Intentar</div>
                }
                <Link to={'/SingUp'}>Crear una cuenta</Link>
            </div>
        );
    }
}

export default observer(SingIn);