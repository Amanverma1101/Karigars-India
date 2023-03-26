import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-app.js";
  import { getAuth ,FacebookAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/9.4.1/firebase-auth.js";
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
  const provider = new FacebookAuthProvider(app);

const signInWithFacebook = () => {
    console.log("fbon");

  signInWithPopup(auth,provider)
  .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(result.user);
        // let data = {
        // "email":user.email,
        // "profile": user.photoURL,
        // "name": user.displayName
        // }
        // request.send (JSON.stringify(data));
        document.getElementById("loginmail").value = user.email;
        console.log(document.getElementById("loginmail").value);
        document.getElementById("loginsubmit").click();
        alert("Hello "+user.displayName+", You are Successfully Logged In !");
        // window.location.replace("/");
  })
  .catch(error => {
    console.error(error);
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(email + error);
    // ...
    alert(errorMessage);
  })
}
document.getElementById('signInWithFb1').addEventListener('click',(e) => {

signInWithFacebook();
});