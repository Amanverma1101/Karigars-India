const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ type: "application/json" }));
const {db} = require("./config");


const { attachCookiesTOResponse, isTokenValid} = require("./utils");
const cookieParser = require("cookie-parser");
app.use(cookieParser());


const authenticate = async(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        console.log("No token Present !");
        return "";
    }else{
        const payload = isTokenValid({token});
        // console.log(payload);
        console.log("Token is Present !");
        return payload.email;
    }
};
const fill = async(req,res)=>{
    var msg="",icon="";
    if(await authenticate(req,res)!=""){
        msg="Logout";
        icon = "fa-user";
    }
    const navitem = {msg: msg, icon: icon};
    return navitem;
};



app.get('/',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("index",{msg:msg,icon:icon});
});
app.get('/login',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("login",{msg:msg,icon:icon});
});
app.get('/moblogin',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("moblogin",{msg:msg,icon:icon});
});
app.get('/signup',async (req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("signup",{msg:msg,icon:icon});
});
app.get('/pop',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("pop",{msg:msg,icon:icon});
});
app.get('/cpop',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("cpop",{msg:msg,icon:icon});
});
app.get('/postjob',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    if(msg==="Logout"){
        return res.render("postjob",{msg:msg,icon:icon});
    }else{
        return res.render("notify",{msg:msg,icon:icon});
    }
});
app.get('/opportunity',async (req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("opportinuty",{msg:msg,icon:icon});
});
app.post("/login",async(req,res)=>{
        console.log(req.body.email);
        // profemail=req.body;     
        const email= String(req.body.email);
        const tuser = {email: email};
        attachCookiesTOResponse({ res, user: tuser });
        // console.log(req.body);
        // res.json({user: tuser});
    
    // msg="Logout";
    // icon = "fa-user";
    return res.redirect("/");
});
app.post("/googlelogin",async (req,res)=>{
    
    // data = JSON.parse(req.body)
    // console.log(data);
    if (req.body.email){
        // email=data.email;
        // profemail=data.email;
        const email= String(req.body.email);
        const tuser = {email: email};
        attachCookiesTOResponse({res,user: tuser});
        // console.log(data);
        // const {msg,icon} = await fill(req,res);
        return res.redirect("/"); // success status
    }
    else{
        // console.log("jdf");
        return res.sendStatus(400); // error status
    }
});
app.post('/signup',async(req,res)=>{
    if (req.body){
        email= String(req.body);
        const tuser = {email: email};
        attachCookiesTOResponse({res,user: tuser});
        // console.log(req.body);
        // res.json({user: tuser});
        return res.redirect("/select"); // success status
    }else{
        // console.log("jdf");
        return res.sendStatus(400); // error status
    }
});
app.post("/signout",(req,res)=>{
    msg = "";
    icon="";
    res.cookie('token','logout',{
        httpOnly: true,
        expires: new Date(Date.now())
    });
    // res.json({msg : "user loged out"});
    return res.redirect("/");
});
app.get("/reset",(req,res)=>{
    return res.render("reset");
});
app.get('/about',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("about", { msg: msg, icon: icon });
});
app.get("/profile",async(req,res)=>{
    // email = String(profemail);
    const email = await authenticate(req,res);
    let check=0;
    console.log(email);
    const {msg,icon} = await fill(req,res);
    const snap = await db.collection(`karigarss`).get();
    snap.forEach((doc) => {
        if(doc.id==email){
            check=1;
           emplist={...doc.data()};
            return res.render("profile",{list: emplist,msg:msg,icon:icon});
        }
      });
      if(check==0){
        return res.render("select",{msg:msg,icon:icon});
      }
});
app.get('/select',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("select",{msg:msg,icon:icon});
});
app.get('/kform',async(req,res)=>{
    // console.log("reached");
    const email = await authenticate(req,res);
    const {msg,icon} = await fill(req,res);
    res.render("k_form",{mailid: email,msg:msg,icon:icon});
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
    return res.redirect('/karigars');
});


app.post('/trial',async (req,res)=>{
    const data = {
      stringExample: 'Hello, World!',
      booleanExample: true,
      numberExample: 3.14159265,
    //   dateExample: Timestamp.fromDate(new Date('December 10, 1815')),
      arrayExample: [5, true, 'hello'],
      nullExample: null,
      objectExample: {
        a: 5,
        b: true
      }
    }
    await db.collection('data').doc('one').set(data);
    return res.send("updated the data");

  });


app.post('/iform',async (req,res)=>{
    // console.log(req.body);
    const userdata = {
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    college: req.body.college,
    qualify: req.body.qualify,
    exp: req.body.exp,
    pexp: req.body.pexp,
    question: req.body.question,
    moreabt: req.body.moreabt,
    };
    // console.log(userdata);
    await db.collection(`internship`).doc(userdata.email).set(userdata);
    return res.redirect('/pop');
});
app.post('/sform',async (req,res)=>{
    // console.log(req.body);
    const userdata = {
    fname: req.body.fname,
    mname: req.body.mname,
    lname: req.body.lname,
    email: req.body.email,
    phone: req.body.phone,
    qualify: req.body.qualify,
    exp: req.body.exp,
    pexp: req.body.pexp,
    question: req.body.question,
    };
    // console.log(userdata);
    await db.collection(`skilldevelopment`).doc(userdata.email).set(userdata);
    return res.redirect('/');
});
app.get('/companies',async(req,res)=>{
    let snapshot = await db.collection(`companies`).get(); 
    let clist = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const {msg,icon} = await fill(req,res);
    return res.render("companies", { newListItems: clist,msg:msg,icon:icon });
});
app.get('/cform',async(req,res)=>{
    // console.log("reached");
    const email = await authenticate(req,res);
    const {msg,icon} =await fill(req,res);
    return res.render("cform",{mailid: email,msg:msg,icon:icon});
});
app.post('/postjob',async(req,res)=>{
    const newjobdata = {
        cname: req.body.cname,
        email: req.body.email,
        salary: req.body.salary,
        add: req.body.cadd,
        url: req.body.curl,
        desc: req.body.desc,
        joblo: req.body.jobloc,
        jobcategory: req.body.jobcategory,
        jobtype: req.body.jobtype,
        link: req.body.link,
        gst: req.body.cgst,
        jobtitle: req.body.jobtitle
    };
    if(newjobdata.url===""){newjobdata.url="https://etimg.etb2bimg.com/photo/91912875.cms";}
    await db.collection(`postjob`).doc(newjobdata.email).set(newjobdata);
    return res.redirect("/opportunity");
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
        console.log(compdata);
        await db.collection(`companies`).doc(compdata.email).set(compdata);
        return res.redirect("/companies");
});
app.get('/karigars',async(req,res)=>{
    let snapshot = await db.collection(`karigarss`).get(); 
    let list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const {msg,icon} =await fill(req,res);
    return res.render("karigars", { newListItems: list,msg:msg,icon:icon });
});
app.get('/pricing',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("pricing",{msg:msg,icon:icon});
});
app.get('/services',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("services",{msg:msg,icon:icon});
});
var fprice=0;
app.post('/checkout',async(req,res)=>{
      const price = req.body.fprice;
      const gstp = req.body.gstprice;
      fprice=gstp;
      const {msg,icon} = await fill(req,res);
    if(msg==="Logout"){
        return res.render("finalcheckout",{price: price,gst: gstp,msg:msg,icon:icon});
    }else{
        return res.render("notify");
    }
});
app.get('/checkout',(req,res)=>{
    res.render("scnner",{price: fprice});
});


app.get('/cart/:id',async(req,res)=>{
    const email = req.params.id;
    const {msg,icon} = await fill(req,res);
    const snap = await db.collection(`karigarss`).get();
    snap.forEach((doc) => {
        if(doc.id==email){
           emplist={...doc.data()};
            return res.render("cart",{list: emplist,msg:msg,icon:icon});
        }
      });
      return ;
});
app.get('/resumebuilder',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("resumebuilder",{msg:msg,icon:icon});
});
app.get('/faq',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("faq",{msg:msg,icon:icon});
});
app.get('/skill',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("skill",{msg:msg,icon:icon});
});
app.get('/contact',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("contact",{msg:msg,icon:icon});
});
app.get('/internship',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("internship",{msg:msg,icon:icon});
});
app.get('/blogs',async(req,res)=>{
    const {msg,icon} = await fill(req,res);
    res.render("blogs",{msg:msg,icon:icon});
});

app.listen(PORT, () => {
    console.log(`port is running successfully at server ${PORT} !`);
  });
