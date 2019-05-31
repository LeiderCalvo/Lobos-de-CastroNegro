import React, { Component } from 'react'
import { observer } from 'mobx-react'
import './SplahPage.css'
import { Link } from 'react-router-dom';

class SplahPage extends Component{
    render(){
        return(
            <div className='page Spalh'>
                <img width= '220px' src="./imgs/lobo.png" alt="Italian Trulli"/>
                <p>Hombres lobo de castronegro es un juego Colaborativo, basado en la desconfianza</p>
                <h3 className='titulo'>Hombres lobo de Castronegro</h3>
                <div className='btnContainer'><Link to={'/SingIn'} className='go'>></Link></div>
            </div>
        );
    }
}

export default observer(SplahPage);