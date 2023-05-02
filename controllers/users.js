const {db} = require('../config');

const getprofile = async(req,res)=>{
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
}
const getkarigarslist = async(req,res)=>{
    let snapshot = await db.collection(`karigarss`).get(); 
    let list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.render("karigars", { newListItems: list });
}

const getcomplist = async(req,res)=>{
    let snapshot = await db.collection(`companies`).get(); 
    let clist = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return res.render("companies", { newListItems: clist });
}
const getcartdata = async(req,res)=>{
    const email = req.params.id;
    const snap = await db.collection(`karigarss`).get();
    snap.forEach((doc) => {
        if(doc.id==email){
           emplist={...doc.data()};
            return res.render("cart",{list: emplist});
        }
      });
      return ;
}
module.exports = {
    getprofile,
    getkarigarslist,
    getcomplist,
    getcartdata
}
