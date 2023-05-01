const express = require('express');
const router = express.Router();

router.get('/',async(req,res)=>{
    res.render("index");
});
router.get('/resumebuilder',async(req,res)=>{
    res.render("resumebuilder");
});
router.get('/faq',async(req,res)=>{
    res.render("faq");
});
router.get('/skill',async(req,res)=>{
    res.render("skill");
});
router.get('/contact',async(req,res)=>{
    res.render("contact");
});
router.get('/internship',async(req,res)=>{
    res.render("internship");
});
router.get('/blogs',async(req,res)=>{
    res.render("blogs");
});
router.get('/pop',async(req,res)=>{
    res.render("pop");
});
router.get('/cpop',async(req,res)=>{
    res.render("cpop");
});
router.get('/opportunity',async (req,res)=>{
    res.render("opportinuty");
});
router.get("/reset",(req,res)=>{
    return res.render("reset");
});
router.get('/about',async(req,res)=>{
    res.render("about");
});
router.get('/select',async(req,res)=>{
    res.render("select");
});
router.get('/services',async(req,res)=>{
    res.render("services");
});

module.exports = router;