import express from 'express';
import userController from './routes/user';
import cors from 'cors';
import quizController from './routes/quiz';
import setController from './routes/set';
import logger from 'morgan'


const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());
app.use(express.static('data'));
app.use(logger('dev'));
app.use((request, response, next)=>{
    if(request.method==="OPTIONS"){
        next();
    }
    next();
})



app.use('/user', userController);
app.use('/quiz', quizController);
app.use('/admin', setController);

app.listen(3001, function()
{
    console.log('app running on 3001');
})