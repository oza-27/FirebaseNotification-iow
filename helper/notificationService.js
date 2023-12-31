import messaging from '@react-native-firebase/messaging';
import {useState} from 'react';


export async function requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = 
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if(enabled){
        console.log("Authorization status", authStatus);
        getFcmToken()
    }
}

const getFcmToken = async() => {
    try {
        const fcmToken = await messaging().getToken();
        console.log("FCM Token generated", fcmToken);
    } catch (error) {
        console.log("Error in fcmToken", error)
        alert(error?.message)
    }
}
export const notificationListener = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        console.log("Background Notification", remoteMessage.notification);
        navigation.navigate(remoteMessage.data.type);
      });
      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            console.log("Remote Message", remoteMessage.notification);
        }
    })
}