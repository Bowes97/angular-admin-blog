// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_URL: "http://localhost:3000",
  firebaseConfig:{
    apiKey: "AIzaSyC6oCIyjqd5uMA2X_ow3no9tZhXUyqt9-8",
    authDomain: "angularadminblog.firebaseapp.com",
    projectId: "angularadminblog",
    storageBucket: "angularadminblog.appspot.com",
    messagingSenderId: "190094168216",
    appId: "1:190094168216:web:ef7b97a1cefad21db680ed"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
