import { extendObservable, runInAction } from 'mobx';
import { observer }  from 'mobx-react';
import api from '../utils/api';

class Store {
    constructor(){
        extendObservable(this, {
            currentConectados: 0,
            minConectados: 8,
            isLogin: false,
            turnoGeneral: 0,
            ronda : 0,
            seleccionados : [],
            asesinado: [],
            userInfo: {
                username: '',
                email: '',
                activo: false,
                personaje: '',
                descripcion: '',
                imagen: '',
                turno: null,
                //isActionDidit: false,
                id: null
            },
            roomMates: []
          })
    }

    setAsesinado(val){
        runInAction(()=>{
            this.asesinado = val;
            console.log(val);
        });
    }

    setRonda(val){
        runInAction(()=>{
            this.ronda = val;
        });
    }

    setSeleccionados(val){
        runInAction(()=>{
            this.seleccionados = val;
        });
    }

    setRoomMates(val){
        runInAction(()=>{
            this.roomMates = val;
        });
    }

    setTurnoGeneral(val){
        runInAction(()=>{
            this.turnoGeneral = val;
            if(store.userInfo.personaje === 'vidente'){
                if (val === 4) {
                    setTimeout(() => {
                        this.setTurnoGeneral(5);
                    }, 9000);
                }
                if (val === 6) {
                    setTimeout(() => {
                        this.setTurnoGeneral(0);
                    }, 9000);
                }
            }
        });
    }

    getDescripcion(character){
        switch (character) {
            case "lobo":
                return "matar a todos los aldeanos sin que te descubran";
        
            case "aldeano":
                return "descubrir quien es el lobo";

            case "vidente":
                return "saber quien es un personaje que escojas";

            case "medico":
                return "darle inmunidad a algun jugador";
            
            default:
                break;
        }
    }

    getTurno(character){
        switch (character) {
            case "lobo":
                return 1;
        
            case "aldeano":
                return 5;

            case "vidente":
                return 3;

            case "medico":
                return 2;
            
            default:
                break;
            
        }
    }

    setUserInfo(val){
        runInAction(()=>{
            this.userInfo = val;
        });
    }

    setCurrentConectados(val){
        runInAction(()=>{
            this.currentConectados = val;
        });
    }

    setLogin(val){
        runInAction(()=>{
            this.isLogin = val;
        });
    }

    getCharacter(){
        runInAction(()=>{
            if(this.loadingCharcter)return;

            //Digo que una llamada al api fue echa
            this.loadingCharcter = true;
            var callback = (result) => {
                console.log('Character aignado', result);
                this.character = result;
            }
            api.getCharacter(callback);
        });
    }
}

const store = new Store();
export default observer(store);