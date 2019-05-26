import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './Sing.css'
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import store from '../../stores/store';

class SingIn extends Component{

    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.onSingIn = this.onSingIn.bind(this);
    }

    onSingIn(val){
        val && this.props.history.push('/Waiting');
    }

    handleClick(){
        api.SingIn((this.state.email+'@gmail.com'), this.state.password, this.onSingIn);
    }

    render(){
        return(
            <div className='page Sing'>

                <div className='titulo'>Sing In</div>

                <input type='text' placeholder='Usuario' value={this.state.email} onChange={(e)=>{
                   this.setState({email : e.target.value + ''})
                }}/>

                <input type='password' placeholder='Password' value={this.state.password} onChange={(e)=>{
                   this.setState({password : e.target.value + ''})
                }}/>
                
                {
                store.isLogin? 
                    <div className='btn' >Cargando</div>
                :
                    <div className='btn' onClick={this.handleClick}>Iniciar</div>
                }
                <Link to={'/SingUp'} className='link'>Crear una cuenta</Link>
            </div>
        );
    }
}

export default observer(SingIn);