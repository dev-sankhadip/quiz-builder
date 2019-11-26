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
                if(res.table_name==='admin' || res.table_name==='score'){
                    return false;
                }
                return true;
                // return res.table_name!=='admin'
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


setController.get('/get/:qid/:setname', checkToken, function(request, response){
    const { qid, setname }=request.params;
    var getQuestionSqlQuery=`select * from ${setname} where qid = ${qid}`;
    connection.query(getQuestionSqlQuery,(err, result)=>{
        if(err){
            response.status(500).send({ code:500, message:"Internal Error" });
        }
        if(result.length>0){
            response.status(200).send({ code:200, result });
        }
        else{
            response.status(400).send({ code:400, message:"Not found" });
        }
    })
})

setController.put('/update', checkToken, function(request, response){
    const { data:{ title, op1, op2, op3, op4, right }, setname, qid }=request.body;
    const quesUpdateSqlQuery=`update ${setname} 
    set title=?,p1=?,p2=?,p3=?,p4=?,r=? where qid=?`;
    connection.query(quesUpdateSqlQuery,[title, op1, op2, op3, op4, right, qid],function(err, result){
        if(err){
            console.log(err);
        }
        response.status(200).send({ code:200, message:"Updated" })
    })
})


setController.get('/result', async function(request, response){
    const arr=['cuhp', 'kolkata', 'india'];
    let c=0;
    var sql="select * from cuhpst2 where qid = ?";
    for(let i=0;i<arr.length;i++){
        try{
            const res=await checkResult(i+1, arr[i]);
            c++;
        }
        catch(err){
            console.log(err);
        }
    }

    function checkResult(n, ans){
        return new Promise((resolve, reject)=>{
            connection.query(sql,[n], function(err, result){
                if(err){
                    console.log(err)
                }
                if(result.length>0){
                    if(result[0].r===ans)
                    {
                        console.log("Correct");
                        resolve();
                    }
                }
            })
        })
    }
    response.send({ c });
})

// setController.route("/update").options("/update").put("/update", checkToken, function(request, response){
//     console.log(request.body);
// })

export default setController;