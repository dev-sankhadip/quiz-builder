import React,{ useState } from 'react'


const SelectedSet=(props)=>
{
    const isDisplay=props.isQuesTable;
    const editQues=(qid,e)=>{
        console.log(e.target.parentElement);
        const selectedSetName=window.sessionStorage.getItem("selectedSet");
        props.editQues(qid, selectedSetName);
    }
    const questionView=props.allQuestions.length>0 ? props.allQuestions.map((ques,i)=>{
        return(
            <tr key={i}>
                <th>{i}</th>
                <td>{ ques.title }</td>
                <td>{ ques.p1 }</td>
                <td>{ ques.p2 }</td>
                <td>{ ques.p3 }</td>
                <td>{ ques.p4 }</td>
                <td>{ ques.r }</td>
                <td>
                    <button className="btn btn-danger" onClick={(e)=>{ editQues(ques.qid, e) }}>edit</button>
                </td>
            </tr>
        )
    }) : null;
    return(
        <React.Fragment>
            <table className="table" style={{ display: isDisplay ? 'inline' : 'none' }}>
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Question</th>
                    <th scope="col">OP1</th>
                    <th scope="col">OP2</th>
                    <th scope="col">OP3</th>
                    <th scope="col">OP4</th>
                    <th scope="col">Right Answer</th>
                    <th>edit</th>
                    </tr>
                </thead>
                <tbody>
                    { questionView }
                </tbody>
            </table>
        </React.Fragment>
    )
}


export default React.memo(SelectedSet);