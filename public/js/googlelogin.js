import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
  import { getAuth ,GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDoMlriG5ch5Vursn-T1N8MOOtifZlT6LU",
    authDomain: "designkoktail-f13c3.firebaseapp.com",
    projectId: "designkoktail-f13c3",
    storageBucket: "designkoktail-f13c3.appspot.com",
    messagingSenderId: "237876784229",
    appId: "1:237876784229:web:85cdaab127d61f2b0c6a8c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider(app);




  document.getElementById('signInWithGoogle1').addEventListener('click',(e) => {

// sign in with popup tab
signInWithPopup(auth, provider)
  .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // let data = {
        //   "email":user.email,
        //   "profile": user.photoURL,
        //   "name": user.displayName
        // }
        // request.send (JSON.stringify(data));
        document.getElementById("loginmail").value = user.email;
        document.getElementById("loginsubmit").click();
        alert("Hello "+user.displayName+", You are Successfully Logged In !");

    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(email + error);
    // ...

    alert(errorMessage);
  });
 });


