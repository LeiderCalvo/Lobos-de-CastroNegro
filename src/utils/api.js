import store from "../stores/store";


import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import firebaseCredentials from "./firebaseCredentials";

const firebaseConfig = firebaseCredentials;
firebase.initializeApp(firebaseConfig);



let database = firebase.database();
function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      email: email,
      profile_picture : imageUrl
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

//escribir sincrono
function toggleStar(postRef, uid) {
  postRef.transaction(function(post) {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
}



var starCountRef = database.ref();
starCountRef.on('value', function(snapshot) {
    //store.setCharcter();
  //updateStarCount(postElement, snapshot.val());
});






let auth = firebase.auth();

function SingIn(correo, password){
  if(store.isLogin)return;
  store.setLogin(true);

  auth.signInWithEmailAndPassword(correo, password).then(()=>{
    store.setInitSuccess(true);
    store.setLogin(false);
    console.log('sing In loginSuccess ', store.initSuccess);
  }).catch(function(error) {
    if (error) {
      store.setInitSuccess(false);
      store.setLogin(false);
      console.log('sing In loginSuccess ', store.initSuccess);
      console.log(error);
    }
  });
}

function SingUp(correo, password){
  if(store.isLogin)return;
  store.setLogin(true);

  auth.createUserWithEmailAndPassword(correo, password).then(()=>{
    store.setLoginSuccess(true);
    store.setLogin(false);
    console.log('sing Up loginSuccess ', store.loginSuccess);
  }).catch(function(error) {
    if (error) {
      store.setLoginSuccess(false);
      store.setLogin(false);
      console.log('sing Up loginSuccess ', store.loginSuccess);
      console.log(error);
    }
  })
}



export default {SingIn, SingUp};