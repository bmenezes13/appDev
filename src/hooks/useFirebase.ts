import * as firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { toast } from '../toast'

export function useFirebase() {

  const userLogin = async (email:any ,password:any) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(resp=>{return true;},err=>{return false;})
  };

  return {
    userLogin
  };
}

export async function loginUser(email: string, password: string){
	try{
		const res = await firebase.auth().signInWithEmailAndPassword(email, password);
		return res;
	} catch(error) {
		return false;
	}
}
export async function createUser(email: string, password: string) {
	try {
		const res = firebase.auth().createUserWithEmailAndPassword(email,password);
		console.log(res);
		return true;
	} catch (error) {
		console.log(error);
		toast(error.message);
		return false;
	}
}
export function getCurrentUser(){
	return new Promise((resolve, reject) => {
		const unsubcribe = firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				resolve(user);
			} else {
				resolve(null);
			}
			unsubcribe();
		})
	})
}
export function logoutUser() {
	return firebase.auth().signOut();
}
export async function getChar() {
	const user = firebase.auth().currentUser;
	const email = () => {
    	if(user === null){
      		return 'guest';
    	}else{
    	  	return user.email;
    	}
  	};
  	
	const db = firebase.firestore();
	try{
		const coll = db.collection('Characters');
		const query = coll.where('player','==',email());
		const snap = await query.get();
		return snap.docs.map(doc => ({__id: doc.id, ...doc.data()}));
	} catch (error) {
		toast(error.message);
		console.log(error);
	}
}