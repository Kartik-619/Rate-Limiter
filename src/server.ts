import express from "express";

const app=express();

app.use(express.jsonI());

app.get("/api/data",(req,res)=>{
    res.json({message:"Request allowed"});
});

const PORT = 3008;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
