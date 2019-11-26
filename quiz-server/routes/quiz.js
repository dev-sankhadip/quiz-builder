import express from 'express';
import  checkToken from '../jwt/auth'
import connection from '../db/db';
import fileUpload from 'express-fileupload';
import csv from 'csvtojson';


const quizController=express.Router();

quizController.use(fileUpload());

quizController.post('/set',checkToken, function(request, response)
{
    console.log(request.body);
    const {title, option, setno, right }=request.body;
    const { op1, op2, op3, op4 }=option;
    var setQuestionQuery=`insert into ${setno}(title, p1, p2, p3, p4, r) values(?,?,?,?,?,?)`;
    connection.query(setQuestionQuery,[title, op1, op2, op3, op4, right], function(err, result)
    {
        if(err)
        {
            console.log(err);
            response.status(500).send({ code:500, message:"Intrnal Error" })
        }
        else
        {
            response.status(201).send({ code:200, message:"Data Inserted" });      
        }
    })
})


quizController.post('/upload', checkToken, function(request, response)
{
    console.log(request.body);
    const { setname }=request.body;
    if(request.files==null)
	{
		return response.status(400).json({msg:'no file upload'});
	}
    const file=request.files.file;
    const path="/media/sankha/New Volume1/project/quiz/quiz-client/quiz-server/data";
    const path1="/media/sankha/New Volume/project/quiz/quiz-client/quiz-server/data"
	file.mv(`${path1}/${file.name}`, (err)=>{
		if(err)
		{
			console.log(err);
			return response.status(500).send(err);
        }
        const csvFilePath=`${path1}/${file.name}`;
        csv()
        .fromFile(csvFilePath)
        .then((json)=>
        {
            json.map((quiz)=>
            {
                console.log(quiz);
                const { title, m1, m2, m3, m4, right}=quiz;
                var setQuestionQuery=`insert into ${setname}(title, p1, p2, p3, p4, r) values(?,?,?,?,?,?)`;
                connection.query(setQuestionQuery,[title, m1, m2, m3, m4, right], function(err, result)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log('updated');
                    }
                })
            })
        })
        .then(()=>
        {
            response.status(200).send({ code:200 })
        })
	})
})

quizController.get('/ques/:setname',checkToken, function(request, response)
{
    const { setname }=request.params;
    var getQuizQuery=`select * from ${setname}`;
    connection.query(getQuizQuery, function(err, result)
    {
        if(err)
        {
            response.status(500).send({ code:500, message:"Internal error" })
        }
        else
        {
            response.status(200).send({ code:200, result })
        }
    })
})

quizController.get('/score/:setname', function(request, response){
    console.log(request.params);
    const { setname }=request.params;
    const getAllScoreSqlQuery=`select * from score where setname = ?`;
    connection.query(getAllScoreSqlQuery,[setname],function(err, result){
        if(err){
            console.log(err);
            response.status(500).send({ code:500, message:"Internal Error" });
        }
        response.status(200).send({ code:200, result })
    })
})



quizController.post('/check', checkToken, async function(request, response){
    let userScore=0;
    const { email }=request.decoded;
    const { arr, setname }=request.body;
    const sql=`select * from ${setname} where qid = ?`;
    const resultSaveSqlQuery="insert into score(user, score, setname) values(?,?,?)";
    for(let i=0;i<arr.length;i++){
        if(arr[i]!==null){
            try{
                await checkResult(i, arr[i]);
                userScore++;
            }catch(err){
                console.log("wrong answer");
            }
        }
    }

    function checkResult(qid, ans){
        return new Promise((resolve, reject)=>{
            connection.query(sql,[qid], function(err, result){
                if(err){
                    console.log(err);
                }
                if(result[0].r===ans){
                    resolve();
                }else{
                    reject();
                }
            })
        })
    }
    await saveScoreToDatabase(userScore, setname, email);
    function saveScoreToDatabase(score, sname, id){
        return new Promise((resolve, reject)=>{
            connection.query(resultSaveSqlQuery,[id, score, setname], function(err, result){
                if(err){
                    console.log(err);
                }
                resolve();
            })
        })
    }
    response.send({ code:200, userScore })
})


export default quizController;