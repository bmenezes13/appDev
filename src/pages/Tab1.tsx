import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonText, IonCard, IonCardTitle, IonCardContent } from '@ionic/react';
import './Tab1.css';
import * as firebase from 'firebase';
import { useFirebase, logoutUser, getChar } from '../hooks/useFirebase';
import { useHistory } from 'react-router-dom'
import { toast } from '../toast'

const Tab1: React.FC = () => {

  const [charN, setCharN] = useState<string>('');
  const [charR, setCharR] = useState<string>('');
  const [charC, setCharC] = useState<string>('');
  const [charL, setCharL] = useState<number>();

  const [statS, setStatS] = useState<number>();
  const [statD, setStatD] = useState<number>();
  const [statC, setStatC] = useState<number>();
  const [statI, setStatI] = useState<number>();
  const [statW, setStatW] = useState<number>();
  const [statCh, setStatCh] = useState<number>();

  const user = firebase.auth().currentUser;
  const history = useHistory();
  const email = () => {
    if(user === null){
      return 'NPC';
    }else{
      return user.email;
    }
  };
  async function logout() {
    await logoutUser();
    history.replace('/');
  }
  async function char(){
    const chars = await getChar();
    console.log(chars);
  }
  const character = char();
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="tertiary">
          <IonTitle>Logged in as {email()}</IonTitle>
          <IonText></IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard color="secondary" mode="md">
          <IonCardTitle>Create a New Character!</IonCardTitle>
          <IonInput value={charN} placeholder='Character Name' type='text' onIonChange={e => setCharN(e.detail.value!)}></IonInput>
          <IonInput value={charR} placeholder='Race' type='text' onIonChange={e => setCharR(e.detail.value!)}></IonInput>
          <IonInput value={charC} placeholder='Class' type='text' onIonChange={e => setCharC(e.detail.value!)}></IonInput>
          <IonInput value={charL} placeholder='Level' type='number' onIonChange={e => setCharL(parseInt(e.detail.value!))}></IonInput>
          <IonCardContent>Ability Scores</IonCardContent>
          <IonInput value={statS} placeholder='Strength' type='number' onIonChange={e => setStatS(parseInt(e.detail.value!))}></IonInput>
          <IonInput value={statD} placeholder='Dexterity' type='number' onIonChange={e => setStatD(parseInt(e.detail.value!))}></IonInput>
          <IonInput value={statC} placeholder='Constitution' type='number' onIonChange={e => setStatC(parseInt(e.detail.value!))}></IonInput>
          <IonInput value={statI} placeholder='Intelligence' type='number' onIonChange={e => setStatI(parseInt(e.detail.value!))}></IonInput>
          <IonInput value={statW} placeholder='Wisdom' type='number' onIonChange={e => setStatW(parseInt(e.detail.value!))}></IonInput>
          <IonInput value={statCh} placeholder='Charisma' type='number' onIonChange={e => setStatCh(parseInt(e.detail.value!))}></IonInput>

          <IonButton onClick={() => toast('Character creation not yet implemented...')}>Create!</IonButton>
        </IonCard>
      <IonButton onClick={logout}>Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
