import React,{ useEffect, useState } from 'react'


const UserQuestion=(props)=>
{
    const [questions, setQuestions]=useState([]);
    const [score, setScore]=useState();
    const [loading, setLoading]=useState(false);
    var arr=[];
    useEffect(()=>
    {
        const token=window.localStorage.getItem("token");
        fetch("http://localhost:3001/quiz/ques",{
            method:"GET",
            headers:{
                'x-access-token':token
            }
        })
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            setQuestions(res.result);
        })
        .catch((err)=>
        {
            console.log(err);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const setAnswer=(qid, ans)=>
    {
        arr[qid]=ans;
    }
    const SubmitAnswer=()=>
    {
        setLoading(true);
        const token=window.localStorage.getItem("token");
        fetch('http://localhost:3001/quiz/check',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                'x-access-token':token
            },
            body:JSON.stringify({ arr })
        })
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            console.log(res);
            setLoading(false);
            setScore(res.userScore);
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    const questionsSet=questions.length>0 ? questions.map((ques, index)=>
    {
        return(

            <div className="card text-center mt-2" key={index}>
                <div className="card-header">
                    <strong>{ ques.title }</strong>
                </div>
                <div className="card-body">
                    <input type="radio" value={ques.p1} name={ques.qid} onChange={()=>{ setAnswer(ques.qid, ques.p1) }} />{ques.p1}<br/>
                    <input type="radio" value={ques.p2} name={ques.qid} onChange={()=>{ setAnswer(ques.qid, ques.p2) }}/>{ques.p2}<br/>
                    <input type="radio" value={ques.p3} name={ques.qid} onChange={()=>{ setAnswer(ques.qid, ques.p3) }}/>{ques.p3}<br/>
                    <input type="radio" value={ques.p4} name={ques.qid} onChange={()=>{ setAnswer(ques.qid, ques.p4) }}/>{ques.p4}<br/>
                </div>
            </div>
        )
    }) : <p>No questions</p>
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    {questionsSet}
                    <button onClick={SubmitAnswer}>Submit Answer</button>
                    </div>
                    <div className="col-md-6">
                        { loading===true ? <i className="fa fa-spinner fa-spin" style={{ fontSize:24 }}></i> :null }
                        { score ? <p>Your Score {score}</p> : null }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default UserQuestion;