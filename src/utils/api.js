import store from "../stores/store";


import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseCredentials from "./firebaseCredentials";

const firebaseConfig = firebaseCredentials;
firebase.initializeApp(firebaseConfig);


let lobos = 0;
let aldeanos = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////DATABASE
let database = firebase.database();

//listeners
database.ref('contadorSalas').once('value').then(function(snapshot) {
  cont = snapshot.val() + '';

  database.ref('salas/'+cont+'/users').on('value', function(users) {
    if(users.val()){
      let array = Object.keys(users.val());
      let roomMates = [];
      for (let i = 0; i < array.length; i++) {
        database.ref('salas/'+cont+'/users/'+array[i]).once('value').then(function (user) {
          roomMates = [...roomMates, {name: user.val().username, personaje: user.val().personaje, imagen: user.val().imagen, id: user.val().id}]
          if(i=== array.length -1){
            store.setRoomMates(roomMates);
          }
        });
      }
      store.setCurrentConectados(array.length);
    }
  });

  database.ref('salas/'+cont+'/asesinado').on('value', function(asesinados) {
    if(asesinados.val() ){

      if(lobos===1){
        store.setAsesinado(asesinados.val());

          updateUserSelected(asesinados.val()[0]);
          store.setAsesinado(asesinados.val());

          if(asesinados.val()[0].id == 7){
            store.setThereIsVidente(false);
          }else if(asesinados.val()[0].id == 4){
            store.setThereIsMedico(false);
          }else if(asesinados.val()[0].id == 0 || asesinados.val()[0].id == 5){
            lobos += 1;
            if(lobos === 2)
            store.setThereIsLobo(false);
          }else if(asesinados.val()[0].id == 1 || asesinados.val()[0].id == 2 || asesinados.val()[0].id == 3 || asesinados.val()[0].id == 6){
            if(aldeanos === 4)store.setThereIsAldeano(false);
          }
      }

      if(asesinados.val().length>=2){
        store.setAsesinado(asesinados.val());
        if(asesinados.val()[0].name === asesinados.val()[1].name){
          updateUserSelected(asesinados.val()[0]);
          store.setAsesinado(asesinados.val());

          if(asesinados.val()[0].id == 7){
            store.setThereIsVidente(false);
          }else if(asesinados.val()[0].id == 4){
            store.setThereIsMedico(false);
          }else if(asesinados.val()[0].id == 0 || asesinados.val()[0].id == 5){
            lobos += 1;
            if(lobos === 2)
            store.setThereIsLobo(false);
          }else if(asesinados.val()[0].id == 1 || asesinados.val()[0].id == 2 || asesinados.val()[0].id == 3 || asesinados.val()[0].id == 6){
            if(aldeanos === 4)store.setThereIsAldeano(false);
          }
        }else{
          setTimeout(() => {
            database.ref('salas/'+cont).update({asesinado: []});
            store.setAsesinado([]);
            store.setIsActionDidIt(false);
          }, 5000);
        }
      }else{
        store.setAsesinado(asesinados.val());
      }
    }
  });

  database.ref('salas/'+cont+'/linchado').on('value', function(linchados) {
    if(linchados.val() ){
      if(linchados.val().length==store.roomMates.length){
        store.setLinchado(linchados.val());
        let coincide = 0;
        for (let i = linchados.val().length - 1; i > 0; i--) {
          if(linchados.val()[i].name === linchados.val()[i-1].name){
            coincide += 1;
          }
        }

        if(coincide === store.roomMates.length -1 ){
          updateUserSelected(linchados.val()[0]);
          store.setLinchado(linchados.val());

          database.ref('salas/'+cont+'/users/'+linchados.val()[0].id).set({});
          if(linchados.val()[0].id == 7){
            store.setThereIsVidente(false);
          }else if(linchados.val()[0].id == 4){
            store.setThereIsMedico(false);
          }else if(linchados.val()[0].id == 0 || linchados.val()[0].id == 5){
            lobos += 1;
            if(lobos === 2)store.setThereIsLobo(false);
          }else if(linchados.val()[0].id == 1 || linchados.val()[0].id == 2 || linchados.val()[0].id == 3 || linchados.val()[0].id == 6){
            if(aldeanos === 4)store.setThereIsAldeano(false);
          }

          if(linchados.val()[0].id === store.userInfo.id){
            window.location.href = '/';
          }
        }else{
          setTimeout(() => {
            database.ref('salas/'+cont).update({linchado: []});
            store.setLinchado([]);
            store.setIsActionDidIt(false);
          }, 5000);
        }
      }else{   
        store.setLinchado(linchados.val());
      }
    }
  });
  

  database.ref('salas/'+cont+'/turno').on('value', function(turnoGeneral) {
    store.setIsActionDidIt(false);
    store.setTurnoGeneral(turnoGeneral.val());
    if(turnoGeneral.val() === 4){
      database.ref('salas/'+cont+'/seleccionados').once('value').then(function(snapshot) {
        if(snapshot.val()[0].name === snapshot.val()[1].name){
          store.setHayMuerto(false);
        }else{
          store.setHayMuerto(true);
          database.ref('salas/'+cont+'/users/'+snapshot.val()[0].id).set({});
          if(snapshot.val()[0].id === store.userInfo.id){
            window.location.href = '/';
          }
        }
      });
    }
  });
  database.ref('salas/'+cont+'/mensajes').on('value', function(mensajes) {
    store.setMensajes(mensajes.val());
  });

  database.ref('salas/'+cont+'/ronda').on('value', function(ronda) {
    store.setRonda(ronda.val());
  });
  database.ref('salas/'+cont+'/seleccionados').on('value', function(seleccionados) {
    store.setSeleccionados(seleccionados.val());
  });
});

let cont = 0;
function RegistrarPersonaje(name, correo, password) {
    database.ref('personajes').transaction(function(personajes) {
      
      if (personajes) {
        RegistrarUsuario(name, correo, password, personajes[0]);

        if(personajes.length === 1){
          database.ref('fixedPersonajes').once('value').then(function(snapshot) {
            personajes = snapshot.val();
            
            database.ref('contadorSalas').once('value').then(function(snapshot) {
              cont = snapshot.val();
              database.ref().update({contadorSalas : cont+1});
            });
            database.ref().update({personajes : personajes})
            return personajes;
          });
        }else{
          personajes.shift();
          return personajes;
        }
      }
    }/*, function (error, committed, snapshot) {
      if(error){
        console.log('transaccion fallo', error);
      }else if(committed){
        console.log('ya existe en esa rama');
      } else {
        console.log('exitoso');
      }
    }*/
    );
}

function RegistrarUsuario(name, correo, password, per) {
  database.ref('contadorSalas').once('value').then(function(snapshot) {
    cont = snapshot.val() + '';

    database.ref('salas/'+cont+'/cantidadUsuarios').once('value').then(function (cantUsuarios) {
      if(cantUsuarios.val() !== null || cantUsuarios.val() !== undefined){
        writeUserInSala(cantUsuarios.val(), per, name, correo);
      }else{
        writeUserInSala(0, per, name, correo);
      }
    });

  });
}

function writeUserInSala(cantUsuarios, per, name, correo) {
  if(cantUsuarios === null)cantUsuarios = 0;
  database.ref('salas/'+cont+'/users/'+cantUsuarios).transaction(function(usuario) {
    if (usuario) {
      return database.ref('salas/'+cont+'/users/'+cantUsuarios).update({activo : true, personaje: per, descripcion: store.getDescripcion(per), turno: store.getTurno(per), imagen: "src/imgs/"+per+".png"});
    }else{
      database.ref('salas/'+cont).update({turno: 0});
      database.ref('salas/'+cont).update({ronda: 0});
      database.ref('salas/'+cont).update({seleccionados: ''});
      database.ref('salas/'+cont).update({cantidadUsuarios: cantUsuarios + 1});
      let userInfo = {
        username: name,
        email: correo,
        activo: true,
        personaje: per,
        descripcion: store.getDescripcion(per),
        imagen: "/imgs/"+per+".png",
        turno: store.getTurno(per),
        //isActionDidit: false,
        id: cantUsuarios
      }
      store.setUserInfo(userInfo);
      return userInfo;
    }
  });
}

function setTurnoGeneral(num) {
  store.setIsActionDidIt(false);
  if(num === 2 && store.thereIsMedico === false){
    if(store.thereIsVidente){
      database.ref('salas/'+cont).update({turno: num + 1});
    }else{
      database.ref('salas/'+cont).update({turno: num + 2});
    }
  }else if(num === 3 && store.thereIsVidente === false){
    database.ref('salas/'+cont).update({turno: 4});
  }else {
    database.ref('salas/'+cont).update({turno: num});
  }
}

function updateUserSelected(user) {
  store.setIsActionDidIt(false);
  if(store.turnoGeneral + 1 === 2 && store.thereIsMedico === false){
    if(store.thereIsVidente){
      database.ref('salas/'+cont).update({turno: store.turnoGeneral + 2});
    }else{
      database.ref('salas/'+cont).update({turno: store.turnoGeneral + 3});
    }
  }else if(store.turnoGeneral + 1 === 3 && store.thereIsVidente === false){
    database.ref('salas/'+cont).update({turno: 4});
  }else {
    database.ref('salas/'+cont).update({turno: store.turnoGeneral + 1});
  }



  if(user !== 'nadie'){
    let array = store.seleccionados;
    array? database.ref('salas/'+cont).update({seleccionados: [...array, user]}) : database.ref('salas/'+cont).update({seleccionados: [ user]});
  }
}

function updateAsesinado(user) {
  database.ref('salas/'+cont+'/asesinado').once('value').then(function(snapshot) {
    if(snapshot.val()){
      database.ref('salas/'+cont).update({asesinado: [...snapshot.val(), user]});
    }else{
      database.ref('salas/'+cont).update({asesinado: [user]});
    }
  });
}

function updateLinchado(user) {
  database.ref('salas/'+cont+'/linchado').once('value').then(function(snapshot) {
    if(snapshot.val()){
      database.ref('salas/'+cont).update({linchado: [...snapshot.val(), user]});
    }else{
      database.ref('salas/'+cont).update({linchado: [user]});
    }
  });
}

function reset() {
  database.ref('salas/'+cont).update({linchado: null, asesinado: null, seleccionados: null});
  store.setMensajes([]);
}

function NuevoMsj(string) {
  database.ref('salas/'+cont+'/mensajes').once('value').then(function(snapshot) {
    if(snapshot.val()){
      database.ref('salas/'+cont).update({mensajes: [...snapshot.val(), string]});
    }else{
      database.ref('salas/'+cont).update({mensajes: [string]});
    }
  });
}


//The simplest way to delete data is to call remove() on a reference to the location of that data. update(null) //// You can remove a single listener by passing it as a parameter to off(). Calling off() on the location with no arguments removes all listeners at that location.



var starCountRef = database.ref();
starCountRef.on('value', function(snapshot) {
    //store.setCharcter();
  //updateStarCount(postElement, snapshot.val());
});





/////////////////////////////////////////////////////////////////////////////////////////////////AUTHENTICATION
let auth = firebase.auth();
//https://www.youtube.com/watch?v=CkePdocytWM
function SingIn(correo, password, callback){
  if(store.isLogin)return;
  store.setLogin(true);

  auth.signInWithEmailAndPassword(correo, password).then((a)=>{
    store.setLogin(false);
    callback(true);
    RegistrarPersonaje(a.user.email.split('@')[0], correo, password);
  }).catch(function(error) {
    if (error) {
      store.setLogin(false);
      callback(false);
      console.log('sing In error ', error);
    }
  });
}

function SingUp(correo, password, name, callback){
  if(store.isLogin)return;
  store.setLogin(true);

  auth.createUserWithEmailAndPassword(correo, password).then(()=>{
    callback(true);
    RegistrarPersonaje(name, correo, password);
    store.setLogin(false);
  }).catch(function(error) {
    if (error) {
      callback(false);
      store.setLogin(false);
      console.log('sing Up error ', error);
    }
  })
}



export default {SingIn, SingUp, setTurnoGeneral, updateUserSelected, updateAsesinado, updateLinchado, reset, NuevoMsj};