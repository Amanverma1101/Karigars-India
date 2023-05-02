const express = require('express');
const router = express.Router();
const {
    getprofile,
    getkarigarslist,
    getcomplist,
    getcartdata
} = require('../controllers/users');

router.get('/postjob',async(req,res)=>{
    const {msg} = res.locals;
    if(msg==='Logout'){
        return res.render("postjob");
    }else{
        return res.render("notify");
    }
});

router.get("/profile",getprofile);

router.get('/karigars',getkarigarslist);
router.get('/companies',getcomplist);
router.get('/pricing',async(req,res)=>{
    res.render("pricing");
});

var fprice=0;
router.post('/checkout',async(req,res)=>{
      const price = req.body.fprice;
      const gstp = req.body.gstprice;
      fprice=gstp;
      const {msg} = res.locals;
    if(msg==="Logout"){
        return res.render("finalcheckout",{price: price,gst: gstp});
    }else{
        return res.render("notify");
    }
});
router.get('/checkout',(req,res)=>{
    res.render("scnner",{price: fprice});
});

router.get('/cart/:id',getcartdata);

module.exports = router;