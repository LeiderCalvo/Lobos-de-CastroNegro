import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './Sing.css'
import { Link } from 'react-router-dom';
import store from '../../stores/store';
import api from '../../utils/api';

class SingUp extends Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        api.SingUp(this.state.email, this.state.password);
    }

    render(){
        return(
            <div className='page Sing'>
                <input type='text' placeholder='Correo' value={this.state.email} onChange={(e)=>{
                   this.setState({email : e.target.value + ''});
                }}/>
                <input type='password' placeholder='Password' value={this.state.password} onChange={(e)=>{
                    this.setState({password : e.target.value + ''});
                }}/>

                {store.loginSuccess?
                    <Link className='btn' to={'/Waiting'}>Registrar</Link>
                :
                store.isLogin? 
                    <div className='btn' >Cargando</div>
                :
                    <div className='btn' onClick={this.handleClick}>Intentar</div>
                }
                
                <Link to={'/SingIn'}>Ya tengo una cuenta</Link>
            </div>
        );
    }
}

export default observer(SingUp);