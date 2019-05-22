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
            password : '',
            name: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.onSingUp = this.onSingUp.bind(this);
    }

    onSingUp(val){
        val && this.props.history.push('/Waiting');
    }

    handleClick(){
        api.SingUp(this.state.email, this.state.password, this.state.name, this.onSingUp);
    }

    render(){
        return(
            <div className='page Sing'>
                <div className='titulo'>Sing Up</div>
                <input type='text' placeholder='Nombre' value={this.state.name} onChange={(e)=>{
                   this.setState({name : e.target.value + ''});
                }}/>
                <input type='text' placeholder='Correo' value={this.state.email} onChange={(e)=>{
                   this.setState({email : e.target.value + ''});
                }}/>
                <input type='password' placeholder='Password' value={this.state.password} onChange={(e)=>{
                    this.setState({password : e.target.value + ''});
                }}/>

                {
                store.isLogin? 
                    <div className='btn' >Cargando</div>
                :
                    <div className='btn' onClick={this.handleClick}>Registrar</div>
                }
                
                <Link to={'/SingIn'} className='link'>Ya tengo una cuenta</Link>
            </div>
        );
    }
}

export default observer(SingUp);