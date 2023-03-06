const mailField = document.getElementById('mail');
const labels = document.getElementsByTagName('label');
const resetPassword = document.getElementById('resetPassword');
const successModal = document.querySelector('.success');
const failureModal = document.querySelector('.failure');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

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
const analytics = getAnalytics(app);
const auth = getAuth();
console.log(app);

auth.useDeviceLanguage();

const resetPasswordFunction = () => {
    const email = mailField.value;

    sendPasswordResetEmail(auth,email)
    .then(() => {
        alert('Password Reset Email Sent Successfully!');
    })
    .catch(error => {
        alert(error);
    })
}

resetPassword.addEventListener('click', resetPasswordFunction);

//Animations
mailField.addEventListener('focus', () => {
    labels.item(0).className = "focused-field";
});

mailField.addEventListener('blur', () => {
    if(!mailField.value)
        labels.item(0).className = "unfocused-field";
});