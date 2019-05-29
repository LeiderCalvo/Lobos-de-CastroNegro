import React, { Component } from 'react';
import { observer }  from 'mobx-react';
import store from '../../stores/store';
import api from '../../utils/api';
//https://www.robinwieruch.de/create-react-app-mobx-decorators/
import './Juego.css';

class Juego extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClassSelected = this.handleClassSelected.bind(this);
  }

  componentDidMount(){
    if(store.userInfo.personaje === 'vidente'){
      setTimeout(() => {
        api.setTurnoGeneral(1);
        //api.setTurnoGeneral(store.userInfo.turno);
      }, 9000);
    }
  }

  handleClick(user){
    if(store.isActionDidit === false){
      if(store.userInfo.personaje === 'lobo'){
        api.updateAsesinado(user);
        store.setIsActionDidIt(true);
        return;
      }
      api.updateUserSelected(user)
      store.setIsActionDidIt(true);
    }
  }

  handleClick2(user){
    if(store.isActionDidit === false){
      api.updateLinchado(user);
      store.setIsActionDidIt(true);
    }
  }

  handleClassSelected(user){
    if(store.userInfo.personaje === 'lobo'){
      let exist = false;
      if(store.asesinado){
        store.asesinado.map((asesinado)=>{
          if (asesinado.name === user.name) {
           exist = true;
          }
        });
      }
      let reponse = 'card';
      if(exist) reponse = 'card sel';
      return reponse
    }else{
      return 'card';
    }
  }

  handleClassSelected2(user){
      let exist = false;
      if(store.linchado){
        store.linchado.map((linchado)=>{
          if (linchado.name === user.name) {
           exist = true;
          }
        });
      }
      let reponse = 'card';
      if(exist) reponse = 'card sel';
      return reponse;
  }

  render(){
    return (
      <div className="page Juego">
        <div className='header'>
          <h3 className='titulo'>{store.userInfo.personaje}</h3>
          <p>{store.isActionDidit? 'ya perro' : 'nada pinche pendejo'}</p>
          <div className='imgContainer'><img width= '100%' src={store.userInfo.imagen} alt="Italian Trulli"/></div>
        </div>

        <div className='actions'>
        {store.turnoGeneral === 5?
          <div className='cards'>
            {store.roomMates.map((user, index)=>{
              return <div key={index} className={this.handleClassSelected2(user)} onClick={()=>this.handleClick2(user)}>{user.name}</div>
            })}
          </div>
        :
        store.turnoGeneral === 4?
          store.hayMuerto?
          <div>
            <p className='msj'>ha muerto {store.seleccionados[0].name}</p>
            <img width= '220px' src={store.seleccionados[0].imagen} alt="Italian Trulli"/>
          </div>
          :
          <div>
            <p className='msj'>Nadie Murio esta noche</p>
          </div>
        :
        store.turnoGeneral === store.userInfo.turno?
          <div className='cards'>
            {store.roomMates.map((user, index)=>{
              return <div key={index} className={this.handleClassSelected(user)} onClick={()=>this.handleClick(user)}>{user.name}</div>
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
