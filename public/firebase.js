const firebaseConfig = {
  apiKey: "AIzaSyDoMlriG5ch5Vursn-T1N8MOOtifZlT6LU",
  authDomain: "designkoktail-f13c3.firebaseapp.com",
  projectId: "designkoktail-f13c3",
  storageBucket: "designkoktail-f13c3.appspot.com",
  messagingSenderId: "237876784229",
  appId: "1:237876784229:web:85cdaab127d61f2b0c6a8c"
};
  
//   // initialize firebase
  firebase.initializeApp(firebaseConfig);
  var firestore = firebase.firestore();
//   // reference your database
  const db = firestore.collection("karigars");
  
  document.getElementById("karigarsform").addEventListener("submit", submitForm);
  
  function submitForm(e) {
    e.preventDefault();
    var fname = getElementVal("fname");
    var lname = getElementVal("lname");
    var gender= getElementVal("gender");
    var phonee = getElementVal("phone");
    var email = getElementVal("email");
    var category = getElementVal("category");
    var title = getElementVal("title");
    var add = getElementVal("add");
    var skill = getElementVal("skill");
    var price = getElementVal("price");
    var exp = getElementVal("exp");
    var qualification = getElementVal("qualification");
    var postal = getElementVal("postal");
    var url = getElementVal("image_url");

  //   firestore.collection("karigars").get().then((snapshot) =>{
  //     const main = document.getElementsByClassName(".main");
  //     snapshot.docs.forEach((doc)=>{
  //       console.log(doc.data());
  //       const name = doc.data().fname+doc.data().lname;
  //       const title = doc.data().title;
  //       const price = doc.data().price;
  //       const postal = doc.data().postal;
  //     // const pn = doc.data().phone;
  //     // if(phonee===pn){
  //     //   console.log("Data already exists !");
  //     // }
  //     main.innerHTML+=`
  //     <div class="card">
     
  //     <div class="image">
  //        <img src="https://images.unsplash.com/photo-1577199001468-44c049e7603f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bGFib3Vyc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60">
  //     </div>
  //     <div class="title">
  //       <h1>${title}</h1>
  //     </div>

  //     <div class="title">
  //       <p>Name : ${name}</p>
  //       <p>pin : ${postal}</p>
  //     </div>

  //     <div class="des">
  //       <div class="stars">
  //         <i class="fas fa-star"></i>
  //         <i class="fas fa-star"></i>
  //         <i class="fas fa-star"></i>
  //         <i class="fas fa-star"></i>
  //         <i class="far fa-star"></i>
  //       </div>
  //       <div class="price"> ₹${price}/day</div>
  //       <button class="click">Hire Now</button>
  //       </div>
  //     </div>
  //     `;
  //   });
  // });
   
  //  console.log(fname);
  //  console.log(lname);
  //  console.log(gender);
  //  console.log(phonee);
  //  console.log(email);
  //  console.log(category);
  //  console.log(title);
  //  console.log(add);
  //  console.log(skill);
  //  console.log(exp);
  //  console.log(price);
  //  console.log(qualification);
  //  console.log(postal);
    saveMessages(fname, lname, gender, phonee, email, category, title, add, skill, exp, price,qualification, postal,url);
    
  }
  
  const saveMessages = (fname, lname, gender, phone, email, category ,title ,add, skill, exp,price, qualification, postal,url) => {
    // var newkarigarsform = karigarsformDB.push();
    db.doc().set({
      fname: fname,
      lname: lname,
      gender: gender,
      phone:phone,
      email: email,
      category: category,
      title: title,
      add:add,
      skill:skill,
      exp:exp,
      price:price,
      qualification:qualification,
      postal:postal,
      url:url
    }).then(()=>{   
       alert("data stored to firestore !");
       document.getElementById("karigarsform").reset();
      })
    .catch((error)=>{
      alert(error);
    });


  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };