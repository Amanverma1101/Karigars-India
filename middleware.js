const { isTokenValid } = require('./utils');

const mw = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.locals.msg="";
        res.locals.icon = "";
        next();
    }else{
        const payload = isTokenValid({token});
        res.locals.msg="Logout";
        res.locals.icon = "fa-user";
        res.locals.email = payload.email;
        next();
    }
};

module.exports = mw;