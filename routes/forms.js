const express = require('express');
const router = express.Router();

const { setkformdata,
    setinternshipformdata,
    setskillformdata,
    postjobdata,
    compformdata } = require('../controllers/forms');

router.get('/kform',async(req,res)=>{
    const {email} = res.locals;
    res.render("k_form",{mailid: email});
});

router.post('/kform',setkformdata);

router.post('/iform', setinternshipformdata);

router.post('/sform',setskillformdata);

router.get('/cform',async(req,res)=>{
    const {email} = res.locals;
    return res.render("cform",{mailid: email});
});

router.post('/postjob',postjobdata);

router.post('/cform',compformdata);

module.exports = router;