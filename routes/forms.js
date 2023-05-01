const express = require('express');
const router = express.Router();
const {db} = require('../config');

router.get('/kform',async(req,res)=>{
    const {email} = res.locals;
    res.render("k_form",{mailid: email});
});
router.post('/kform',async (req,res)=>{
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
    if(userdata.url===""){userdata.url="https://pbs.twimg.com/profile_images/1269571859726688256/7v8kf3xX_400x400.jpg";}
    await db.collection(`karigarss`).doc(userdata.email).set(userdata);
    return res.redirect('/karigars');
});




router.post('/iform',async (req,res)=>{
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
router.post('/sform',async (req,res)=>{
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

router.get('/cform',async(req,res)=>{
    const {email} = res.locals;
    return res.render("cform",{mailid: email});
});
router.post('/postjob',async(req,res)=>{
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
router.post('/cform',async(req,res)=>{
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
        // console.log(compdata);
        await db.collection(`companies`).doc(compdata.email).set(compdata);
        return res.redirect("/companies");
});

module.exports = router;