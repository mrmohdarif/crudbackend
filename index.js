const http=require('http')
const {handleRequest}=require('./controllers/studentcontroller.js')
require('dotenv').config()
const server=http.createServer((req,res)=>{
    handleRequest(req,res)
})

server.listen(process.env.PORT,()=>{
    console.log(`Server created sucessfully ${process.env.PORT}`);
    
})