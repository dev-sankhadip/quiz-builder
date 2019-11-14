import express from 'express';
import connection from '../db/db';
import jwt from 'jsonwebtoken'
import checkToken from '../jwt/auth';


const userController=express.Router();
const config={
    secret:"iamthebest"
}
userController.post('/login', function(request, response)
{
    console.log(request.body);
    const { email, password, select }=request.body;
    var loginSqlQuery="select * from admin where username = ?";
    connection.query(loginSqlQuery,[email], function(err, result)
    {
        if(err)
        {
            console.log(err);
            response.status(500).send({ code:500 })
        }
        if(result.length>0)
        {
            if(result[0].password===password && result[0].type===select)
            {
                let token = jwt.sign({email: email},
                    config.secret,
                    { 
                      expiresIn: '1h' //expires in 24 hours
                    }
                )
                response.status(200).send({ code:200, message:"User Found", token, select });
            }
            else
            {
                response.status(300).send({ code:300, message:"Check Credentials" });
            }
        }
        else
        {
            response.status(400).send({ code:400, message:"User Not Found" });
        }
    })
})


userController.post('/check',checkToken, function(request, response)
{
    response.status(200).send({ code:200, message:"Valid" });
})


export default userController;