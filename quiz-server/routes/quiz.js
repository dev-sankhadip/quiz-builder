import express from 'express';
import  checkToken from '../jwt/auth'
import connection from '../db/db';
import fileUpload from 'express-fileupload';
import csv from 'csvtojson';


const quizController=express.Router();

quizController.use(fileUpload());

quizController.post('/set',checkToken, function(request, response)
{
    const { title, m1, m2, m3, m4,right }=request.body.questionsSet;
    const { setno }=request.body;
    var setQuestionQuery=`insert into ${setno}(title, p1, p2, p3, p4, r) values(?,?,?,?,?,?)`;
    connection.query(setQuestionQuery,[title, m1, m2, m3, m4, right], function(err, result)
    {
        if(err)
        {
            console.log(err);
            response.status(500).send({ code:500, message:"Intrnal Error" })
        }
        else
        {
            response.status(200).send({ code:200, message:"Data Inserted" });      
        }
    })
})


quizController.post('/upload', checkToken, function(request, response)
{
    if(request.files==null)
	{
		return response.status(400).json({msg:'no file upload'});
	}
	const file=request.files.file;
	file.mv(`/media/sankha/New Volume/project/quiz builder/quiz-client/quiz-server/data/${file.name}`, (err)=>{
		if(err)
		{
			console.log(err);
			return response.status(500).send(err);
        }
        const csvFilePath=`/media/sankha/New Volume/project/quiz builder/quiz-client/quiz-server/data/${file.name}`;
        csv()
        .fromFile(csvFilePath)
        .then((json)=>
        {
            json.map((quiz)=>
            {
                console.log(quiz);
                const { title, m1, m2, m3, m4, right}=quiz;
                var setQuestionQuery="insert into sets(title, p1, p2, p3, p4, r) values(?,?,?,?,?,?)";
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
            response.send({ code:200 })
        })
	})
})

quizController.get('/ques',checkToken, function(request, response)
{
    var getQuizQuery="select * from sets";
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

quizController.post('/check', checkToken, function(request, response)
{
    var userScore=0;
    const { arr }=request.body;
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i]!==null)
        {
            var sql="select * from sets where qid = ?";
            connection.query(sql,[i], function(err, result)
            {
                if(err)
                {
                    console.log(err);
                }
                if(result[0].r===arr[i])
                {
                    userScore++;
                    console.log('right answer');
                }
                else
                {
                    console.log('wrong anwer');
                }
            })
        }
    }
    response.send({ code:200, userScore })
    console.log(userScore);
})


export default quizController;