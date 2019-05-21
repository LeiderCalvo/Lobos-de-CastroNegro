import { extendObservable, runInAction } from 'mobx';
import { observer }  from 'mobx-react';

class Store {
    constructor(){
        extendObservable(this, {
            currentConectados: 0,
            minConectados: 8
          })
    }

    setCurrentConectados(val){
        runInAction(()=>{
            this.currentConectados = val;
        });
    }
}

const store = new Store();
export default observer(store);