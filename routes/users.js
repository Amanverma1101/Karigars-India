const express = require('express');
const router = express.Router();
const {db} = require('../config');


router.get('/postjob',async(req,res)=>{
    const {msg} = res.locals;
    if(msg==="Logout"){
        return res.render("postjob");
    }else{
        return res.render("notify");
    }
});

router.get("/profile",async(req,res)=>{
    const {email} = res.locals;
    let check=0;
    console.log(email);
    const snap = await db.collection(`karigarss`).get();
    snap.forEach((doc) => {
        if(doc.id==email){
            check=1;
           emplist={...doc.data()};
            return res.render("profile",{list: emplist});
        }
      });
      if(check==0){
        return res.render("select");
      }
});

router.get('/karigars',async(req,res)=>{
    let snapshot = await db.collection(`karigarss`).get(); 
    let list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.render("karigars", { newListItems: list });
});
router.get('/companies',async(req,res)=>{
    let snapshot = await db.collection(`companies`).get(); 
    let clist = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.render("companies", { newListItems: clist });
});
router.get('/pricing',async(req,res)=>{
    res.render("pricing");
});

var fprice=0;
router.post('/checkout',async(req,res)=>{
      const price = req.body.fprice;
      const gstp = req.body.gstprice;
      fprice=gstp;
    if(msg==="Logout"){
        return res.render("finalcheckout",{price: price,gst: gstp});
    }else{
        return res.render("notify");
    }
});
router.get('/checkout',(req,res)=>{
    res.render("scnner",{price: fprice});
});

router.get('/cart/:id',async(req,res)=>{
    const email = req.params.id;
    const snap = await db.collection(`karigarss`).get();
    snap.forEach((doc) => {
        if(doc.id==email){
           emplist={...doc.data()};
            return res.render("cart",{list: emplist});
        }
      });
      return ;
});

module.exports = router;