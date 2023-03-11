const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "application/json" }));
const db = require("./config");
var email="",msg="",icon="",profemail="";
//connect firebase firestore to express js?

app.get('/',(req,res)=>{
    res.render("index",{msg:msg,icon:icon});
});
app.get('/login',(req,res)=>{
    res.render("login",{msg:msg,icon:icon});
});
app.get('/moblogin',(req,res)=>{
    res.render("moblogin");
});
app.get('/signup',(req,res)=>{
    res.render("signup",{msg:msg,icon:icon});
});
app.get('/postjob',(req,res)=>{
    if(msg==="Logout"){
        return res.render("postjob");
    }else{
        return res.render("notify");
    }
});
app.get('/opportunity',(req,res)=>{
    res.render("opportinuty",{msg:msg,icon:icon});
});
app.post("/login",(req,res)=>{
    console.log(req.body);
    profemail=req.body;
    msg="Logout";
    icon = "fa-user"
    return res.redirect("/");
});
app.post("/googlelogin",(req,res)=>{
    data = JSON.parse(req.body)
    // console.log(data);
    email=data.email;
    profemail=data.email;
    msg="Logout";
    icon = "fa-user"
    if (data){
        // console.log(data);
        return res.redirect("select",{msg:msg,icon:icon}); // success status
    }
    else{
        // console.log("jdf");
        return res.sendStatus(400); // error status
    }
});
app.post('/signup',(req,res)=>{
    if (req.body){
        email= req.body;
        console.log(req.body);
        return res.redirect("select",{msg:msg,icon:icon}); // success status
    }
    else{
        // console.log("jdf");
        return res.sendStatus(400); // error status
    }
});
app.post("/signout",(req,res)=>{
    msg = "";
    icon="";
    // console.log("sout");
    return res.redirect("/");
});
app.get("/reset",(req,res)=>{
    return res.render("reset");
});
app.get("/profile",async(req,res)=>{
    var email = String(profemail);
    const snap = await db.collection(`karigarss`).get();
    snap.forEach((doc) => {
        if(doc.id==email){
           emplist={...doc.data()};
            return res.render("profile",{list: emplist});
        }
      });
      return res.render("select",{msg:msg,icon:icon});
});
app.get('/select',(req,res)=>{
    console.log("reached");
    res.render("select",{msg:msg,icon:icon});
});
app.get('/kform',(req,res)=>{
    // console.log("reached");
    res.render("k_form",{mailid: email});
});
app.post('/kform',async (req,res)=>{
    // console.log(req.body);
    const userdata = {
    fname: req.body.fname,
    lname: req.body.lname,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
    category: req.body.category,
    title: req.body.title,
    add: req.body.add,
    skill: req.body.skill,
    price: req.body.price,
    exp: req.body.exp,
    city: req.body.city,
    state: req.body.state,
    qualification: req.body.qualification,
    postal: req.body.postal,
    url: req.body.image_url,
    };
    // console.log(userdata);
    await db.collection(`karigarss`).doc(userdata.email).set(userdata);
    return res.redirect('/karigars',{msg:msg,icon:icon});
});
app.get('/companies',async(req,res)=>{
    let snapshot = await db.collection(`companies`).get(); 
    let clist = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.render("companies", { newListItems: clist,msg:msg,icon:icon });
});
app.get('/cform',(req,res)=>{
    console.log("reached");
    return res.render("cform",{mailid: email});
});
app.post('/cform',async(req,res)=>{
    const compdata = {
        fname: req.body.fname,
        lname: req.body.lname,
        designation: req.body.designation,
        phone: req.body.phone,
        email: req.body.email,
        company: req.body.company,
        add: req.body.add,
        gst: req.body.gst,
        loc: req.body.loc,
        url: req.body.image_url,
        };
        // console.log(userdata);
        await db.collection(`companies`).doc(compdata.email).set(compdata);
        return res.redirect("/companies",{msg:msg,icon:icon});
});
app.get('/karigars',async(req,res)=>{
    let snapshot = await db.collection(`karigarss`).get(); 
    let list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.render("karigars", { newListItems: list,msg:msg,icon:icon });
});
app.get('/pricing',(req,res)=>{
    res.render("pricing",{msg:msg,icon:icon});
});
app.get('/services',(req,res)=>{
    res.render("services",{msg:msg,icon:icon});
});
var fprice=0;
app.post('/checkout',(req,res)=>{
      const price = req.body.fprice;
      const gstp = req.body.gstprice;
      fprice=gstp;
    //   console.log(price);
    if(msg==="Logout"){
        return res.render("finalcheckout",{price: price,gst: gstp});
    }else{
        return res.render("notify");
    }
});
app.get('/checkout',(req,res)=>{
    res.render("scnner",{price: fprice});
});


app.get('/cart/:id',async(req,res)=>{
    var email = req.params.id;
    const snap = await db.collection(`karigarss`).get();
    snap.forEach((doc) => {
        if(doc.id==email){
           emplist={...doc.data()};
            return res.render("cart",{list: emplist});
        }
      });
      return ;
});
app.get('/resumebuilder',(req,res)=>{
    res.render("resumebuilder",{msg:msg,icon:icon});
});
app.get('/faq',(req,res)=>{
    res.render("faq",{msg:msg,icon:icon});
});
app.get('/skill',(req,res)=>{
    res.render("skill",{msg:msg,icon:icon});
});
app.get('/contact',(req,res)=>{
    res.render("contact",{msg:msg,icon:icon});
});
app.get('/internship',(req,res)=>{
    res.render("internship",{msg:msg,icon:icon});
});

app.listen(PORT, () => {
    console.log(`port is running successfully at server ${PORT} !`);
  });