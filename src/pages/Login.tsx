import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonCard, IonCardTitle, IonText, IonLoading } from '@ionic/react';
import './Login.css';
import { loginUser } from '../hooks/useFirebase';
import { toast } from '../toast'
import { createUser } from '../hooks/useFirebase';
import { setUserState } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

const Login: React.FC = () => {

  const [busy, setBusy] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [nemail, setNEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [npassword, setNPassword] = useState<string>('');
  const [passtest, setPasstest] = useState<string>('');
  const dispatch = useDispatch();
  const history = useHistory();



  async function login() {
    setBusy(true)
    const res: any = await loginUser(email, password);
    if(res){
      dispatch(setUserState(res.user.email));
      history.replace('/tab1');
      toast('Login Successful!');
    }else{
      toast('Login Failed! Please try again...');
      setBusy(true);
    }
  }
  async function create(){
    if(npassword !== passtest){
      return toast('Passwords do not match!');
    }
    if(nemail.trim()===''||npassword.trim()===''||passtest.trim()===''){
      return toast('Make sure to fill everything out!');
    }
    const res = await createUser(nemail, npassword);
    if(res){
      return toast('Welcome aboard!');
      setBusy(true);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Welcome to Player's Keep</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={2000} isOpen={busy}/>
      <IonContent>
        <IonCard color="secondary" mode="md">
          <IonCardTitle>Login Here</IonCardTitle>
          <IonInput value={email} placeholder='Email' type='email' onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          <IonInput value={password} placeholder='Password' type='password' onIonChange={e => setPassword(e.detail.value!)}></IonInput>
          <IonButton onClick={() => login()}>Login!</IonButton>
        </IonCard>
        <IonText mode="md"> -OR-</IonText>
        <IonCard color="secondary" mode="md">
          <IonCardTitle>Create an Account</IonCardTitle>
          <IonInput value={nemail} placeholder='Email' type='email' onIonChange={e => setNEmail(e.detail.value!)}></IonInput>
          <IonInput value={npassword} placeholder='Password' type='password' onIonChange={e => setNPassword(e.detail.value!)}></IonInput>
          <IonInput value={passtest} placeholder='Confirm Password' type='password' onIonChange={e => setPasstest(e.detail.value!)}></IonInput>
          <IonButton onClick={() => create()}>Create!</IonButton>
        </IonCard>


      </IonContent>
    </IonPage>
  );
};

export default Login;