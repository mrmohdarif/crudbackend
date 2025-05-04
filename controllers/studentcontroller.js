const { parse } = require('dotenv')
const URL = require('url')
const { createStudent, getAllStudent, updateStudentRecord,deleteStudent } = require('../model/studentmodel.js')

const handleRequest = async (req, res) => {

    const { method, url } = req
    console.log(URL.parse(url));
    if (method == "POST" && url == "/api/students") {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', async () => {
            const parseBody = JSON.parse(body)
            const result = await createStudent(parseBody)
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(result))

        })
    }
 
   
    else if (method == "GET" &&  URL.parse(url).pathname=='/api/students') {
        console.log("fdkudkf");
        const page = URL.parse(url).query.split('&')[0].split("=")[1];
        const limit = URL.parse(url).query.split('&')[1].split("=")[1];
     
        
        const result = await getAllStudent(page,limit)
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(result))
    }
    else if (method == "PUT" && url == URL.parse(req.url).pathname) {
        try{
            const parsedUrl = URL.parse(req.url);
            const id = parsedUrl.pathname.split(":")[1]
            let body = ''
            req.on('data', (chunk) => {
                body += chunk.toString()
            })
            req.on('end', async () => {
                const {email} = JSON.parse(body)
                console.log(email);
                
                const result = await updateStudentRecord(email,id)
                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(result))
    
            })
        }
        catch(err)
        {
            return err;
        }
       

    }
    else if(method=="DELETE" &&  url==URL.parse(req.url).pathname )
    {
        const parsedUrl = URL.parse(req.url);
        const id =  parsedUrl.pathname.split(":")[1]
        const result=await deleteStudent(id)
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(result))
        
    }

}
module.exports = { handleRequest }