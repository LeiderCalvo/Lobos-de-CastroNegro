import { extendObservable, runInAction } from 'mobx';
import { observer }  from 'mobx-react';
import api from '../utils/api';

class Store {
    constructor(){
        extendObservable(this, {
            currentConectados: 8,
            minConectados: 8,
            isLogin: false,
          })
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