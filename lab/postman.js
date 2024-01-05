const express = require("express")
const mysql = require("mysql2")
const bodyparser = require("body-parser")
const app =express()
const port = 8080
const connection = mysql.createConnection(
    {
        host:"localhost",
        user: "root",
        password:"root",
        database:"student"
    }
)
connection.connect((err)=>
{
    if(err)
    {
        console.log("error")
        return ;
    }
    console.log("connected to my sql")
});
app.use(bodyparser.json());
app.get('/getAllstudentinfo',(req,res)=>
{
    connection.query('select * from stud',(err,results)=>
    {
        if(err)
        throw err;
        res.json(results);
    });
});
app.get('/getAllStudentinfo/:id',(req,res)=>
{
    const stuid = req.params.id;
    connection.query(`SELECT * FROM stud WHERE id=?`,[stuid],(err,results)=>
    {
        if(err)
        throw err;
    res.json(results[0]);
    }
    );
});
app.post("/addStudentInfo",(req,res)=>{
    const{id,name,age} =req.body;
    connection.query("insert into stud(id,name,age) values(?,?,?)",[id,name,age],(err,results)=>
    {
        if(err)throw err;
        res.json({id,name,age});
    });
});
app.put("/updateStudent/:id",(req,res)=>
{
    const stdid = req.params.id;
    const{name,age}=req.body;
    connection.query("update stud set name=?,age=? where id = ?",[name ,age,stdid],(err,results)=>
    {
        if(err)
        throw err;
    res.json({id:stdid,name,age});
    });
});
app.delete('/removeStudent/:id',(req,res)=>{
    const stdId=req.params.id;
    connection.query('DELETE FROM stud WHERE id=?',[stdId],(err)=>{
    if(err) throw err;
    res.json({message:'Student deleted successfully',id:stdId});
    });
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

