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
            linchado: [],
            mensajes: [],
            userInfo: {
                username: '',
                email: '',
                activo: false,
                personaje: '',
                descripcion: '',
                imagen: '',
                turno: null,
                id: null
            },
            isActionDidit: false,
            hayMuerto: false,
            roomMates: [],

            thereIsLobo: true,
            thereIsAldeano: true,
            thereIsMedico: true,
            thereIsVidente: true,
          })
    }
    setThereIsLobo(val){
        runInAction(()=>{
            this.thereIsLobo = val;
            if(val === false) window.location.href = '/Win/ALDEANOS';
        });
    }
    setThereIsAldeano(val){
        runInAction(()=>{
            this.thereIsAldeano = val;
            if(val === false) window.location.href = '/Win/LOBOS';
        });
    }
    setThereIsMedico(val){
        runInAction(()=>{
            this.thereIsMedico = val;
        });
    }

    setThereIsVidente(val){
        runInAction(()=>{
            this.thereIsVidente = val;
        });
    }

    setMensajes(val){
        runInAction(()=>{
            this.mensajes = val;
        });
    }

    setHayMuerto(val){
        runInAction(()=>{
            this.hayMuerto = val;
        });
    }

    setIsActionDidIt(val){
        runInAction(()=>{
            this.isActionDidit = val;
        });
    }

    setAsesinado(val){
        runInAction(()=>{
            this.asesinado = val;
        });
    }

    setLinchado(val){
        runInAction(()=>{
            this.linchado = val;
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
            //if(store.userInfo.personaje === 'vidente'){
                if (val === 4) {
                    setTimeout(() => {
                        this.setTurnoGeneral(5);
                        this.setIsActionDidIt(false);
                    }, 9000);
                }
                if (val === 6) {
                    setTimeout(() => {
                        api.reset();
                        this.setTurnoGeneral(0);
                        store.setIsActionDidIt(false);
                        setTimeout(() => {
                            api.setTurnoGeneral(1);
                            store.setIsActionDidIt(false);
                          }, 9000);
                    }, 9000);
                }
            //}
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
                //console.log('Character aignado', result);
                this.character = result;
            }
            api.getCharacter(callback);
        });
    }
}

const store = new Store();
export default observer(store);