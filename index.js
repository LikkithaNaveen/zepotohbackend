const express = require('express');
const mongoose = require('mongoose');
require('./db/db')
const cors = require('cors');
const user=require('./db/user')


const app = express();
app.use(cors());
app.use(express.json());


app.post('/User-Details',async(req,res)=>{
  let UserDetails=new user(req.body)
  let result= await UserDetails.save()
  res.json({ message: "User details saved successfully",user:result });
  // res.send(result) 
  })


  app.get('/getUser-Details',async(req,res)=>{
    let UserDetails=await user.find()
    if(UserDetails.length>0){
        res.send(UserDetails)
    }
    else{
        res.send({result:'Detail Not found'})
    }

})

app.delete('/getUser-Details/:id',async(req,res)=>{
  let result= await user.deleteOne({_id:req.params.id})
  if(res.length>0){
    res.send(result)
  }else{
    res.send({result:'deleted succesfully'})
}
})

// app.get('/updategetUser-Details/:id',async(req,res)=>{
//   let result= await user.findOne({_id:req.params.id});
//     if(result){
//       res.send(result)
//     }else{
//       res.send({result:'No record found'})
//   }
//   res.send(result)
// });

app.put('/updategetUser-Details/:id',async(req,res)=>{
  let result= await user.updateOne({_id:req.params.id},
  {
      $set:req.body
  }
 
  )
  res.send(result)
});

app.get('/search/:key',async(req,res)=>{
  let result=await user.find({
   "$or":[
       {Fname:{$regex:req.params.key}}
       
   ]
  });
  res.send(result)
})

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});