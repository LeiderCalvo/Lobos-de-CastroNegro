import React, { Component } from 'react';
import { observer }  from 'mobx-react';
import store from '../../stores/store';
import api from '../../utils/api';
//https://www.robinwieruch.de/create-react-app-mobx-decorators/
//import './Juego.css';

class Juego extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    if(store.userInfo.personaje === 'vidente'){
      setTimeout(() => {
        api.setTurnoGeneral(1);
      }, 9000);
    }
  }

  handleClick(user){
    if(store.userInfo.personaje === 'lobo'){
      api.updateAsesinado(user);
    }
    api.updateUserSelected(user);
  }

  render(){
    return (
      <div className="Juego">
        <div className='header'>
          <h3 className='titulo'>{store.userInfo.personaje}</h3>
          <img width= '90px' src="https://juguetes20.com/wp-content/uploads/2018/05/Los-hombres-lobo-de-CastroNegro.png" alt="Italian Trulli"/>
        </div>

        <div className='actions'>
        {store.turnoGeneral === 4?
          <div>
            <p className='msj'>ha muerto {store.seleccionados[0].name}</p>
            <img width= '220px' src="https://juguetes20.com/wp-content/uploads/2018/05/Los-hombres-lobo-de-CastroNegro.png" alt="Italian Trulli"/>
          </div>
        :
        store.turnoGeneral === store.userInfo.turno?
          <div className='cards'>
            {store.roomMates.map((user, index)=>{
              return <div key={index} className='card' onClick={()=>this.handleClick(user)}>{user.name}</div>
            })}
          </div>
        :
        store.turnoGeneral === 1?
          <p className='msj'>El lobo esta escogiendo a su presa</p>
        :
        store.turnoGeneral === 2?
          <p className='msj'>El medico esta buscando a quien darle inmunidad</p>
        :
        store.turnoGeneral === 3?
          <p className='msj'>El vidente esta descubriendo a alguien</p>
        :
        store.turnoGeneral === 5?
          <div className='cards'>
            {store.roomMates.map((user, index)=>{
              return <div key={index} className='card' onClick={()=>this.handleClick(user)}>{user.name}</div>
            })}
            <div className='card' onClick={()=>this.handleClick('nadie')}>Nadie</div>
          </div>
        :
         store.turnoGeneral === 6?
         <p className='msj'>Resumen, Matamos a: </p>
        :
        store.turnoGeneral === 0 &&
          <p className='msj'>Es de noche y todos dormimos</p>
        }
        </div>



        <div className='footer'>
        {store.turnoGeneral === 4?
          <p className='msj'>Es de dìa</p>
        :
        store.turnoGeneral === store.userInfo.turno?
          <p className='msj'>Es tu turno, no peritas que los demas descubran quiene eres</p>
        :
        store.turnoGeneral === 5?
          <p className='msj'>Es momento de decidir quien es el lobo</p>
        :
        store.turnoGeneral === 6?
          <p className='msj'>Es de dìa</p>
        :
        store.turnoGeneral === 0 &&
          <p className='msj'>Debes dormir</p>
        }
        </div>
      </div>
    );
  }
}

export default observer(Juego);
