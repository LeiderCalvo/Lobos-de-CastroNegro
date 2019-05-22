import store from "../stores/store";


import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseCredentials from "./firebaseCredentials";

const firebaseConfig = firebaseCredentials;
firebase.initializeApp(firebaseConfig);



let database = firebase.database();
function RegistrarPersonaje(name, correo, email) {
    database.ref('personajes').transaction(function(personajes) {
      if (personajes) {
        RegistrarUsuario(name, correo, email, personajes[0]);
        personajes.shift();
        return personajes;
      }else{
        personajes = database.ref('fixedPersonajes');
        RegistrarUsuario(name, correo, email, personajes[0]);
        personajes.shift();
        return personajes;
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

function RegistrarUsuario(name, correo, email, per) {
  database.ref('users/'+email).transaction(function(usuario) {
    if (usuario) {
      usuario.personaje = per;
      return usuario;
    }else{
      return {
        username: name,
        email: correo,
        personaje: per
      }
    }
  });
}


function writeNewPost(uid, username, picture, title, body) {
    // A post entry.
    var postData = {
      author: username,
      uid: uid,
      body: body,
      title: title,
      starCount: 0,
      authorPic: picture
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('posts').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return firebase.database().ref().update(updates);
}

//The simplest way to delete data is to call remove() on a reference to the location of that data. update(null) //// You can remove a single listener by passing it as a parameter to off(). Calling off() on the location with no arguments removes all listeners at that location.



var starCountRef = database.ref();
starCountRef.on('value', function(snapshot) {
    //store.setCharcter();
  //updateStarCount(postElement, snapshot.val());
});






let auth = firebase.auth();
//https://www.youtube.com/watch?v=CkePdocytWM
function SingIn(correo, password, callback){
  if(store.isLogin)return;
  store.setLogin(true);

  auth.signInWithEmailAndPassword(correo, password).then(()=>{
    store.setLogin(false);
    callback(true);
    RegistrarPersonaje('', correo, password);
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



export default {SingIn, SingUp};