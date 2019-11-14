import express from 'express';
import checkToken from '../jwt/auth';
import connection from '../db/db';

const setController=express.Router();

setController.post('/set',checkToken, function(request, response)
{
    const { setName }=request.body;
    var checkIfTableExists=`SELECT * from information_schema.tables where TABLE_NAME='${setName}' and table_schema='quiz'`;
    connection.query(checkIfTableExists, function(err1, result1)
    {
        if(err1)
        {
            console.log(err1);
            response.status(500).send({ code:500, message:"Internal error" });
        }
        if(result1.length>0)
        {
            response.status(409).send({ code:409, message:"Set Already exists" });
        }
        else
        {
            var createSetSqlQuery=`create table ${setName} 
            (qid int auto_increment primary key, title varchar(255), p1 varchar(255), p2 varchar(255),
            p3 varchar(255), p4 varchar(255), r varchar(50))`;
            connection.query(createSetSqlQuery, function(err, result)
            {
                if(err)
                {
                    console.log(err);
                    response.status(500).send({ code:500, message:"Internal error" })
                }
                else
                {
                    response.status(201).send({ code:201, message:"Created" });
                }
            })
        }
    })
})



setController.get('/sets', checkToken, function(request, response)
{
    var getAllSetsSqlQuery="SELECT table_name FROM information_schema.tables WHERE table_schema ='quiz';"
    connection.query(getAllSetsSqlQuery,function(err, result)
    {
        if(err)
        {
            console.log(err);
            response.status(500).send({ code:500, message:"Internal error" });
        }
        else
        {
            var result1=result.filter((res)=>{
                return res.table_name!=='admin'
            })
            response.status(200).send({ code:200, result1 })
        }
    })
})

setController.post('/selectset', checkToken, function(request, response)
{
    console.log(request.body)
    const { value }=request.body;
    var getAllQuestionsSqlQuery=`select * from ${value}`;
    connection.query(getAllQuestionsSqlQuery, function(err, result)
    {
        if(err)
        {
            console.log(err);
            response.status(500).send({ code:500, message:"Internal error" });
        }
        response.status(200).send({ code:200, result })
    })
})

export default setController;