import React,{useState, useEffect} from 'react'
import fetchApi from '../../fetch/fetch';
import SelectedSet from './selectedSet';



const UpdateSet=()=>
{
    const [questionSet, setQuestionSet]=useState([]);
    const [allQuestions, setAllQuestions]=useState([]);
    const [isQuesTable, setQuesTable]=useState(false);

    const getResponse=(data)=>{
        setQuestionSet(data.result1);
    }
    const getSetQuestions=(data)=>{
        setQuesTable(true);
        setAllQuestions(data.result);
    }
    const editQues=(qid, setname)=>{
        console.log(qid, setname);
    }
    const fetchAllSet=()=>{
        const url="http://localhost:3001/admin/sets";
        const options={
            method:"GET",
            headers:{
                Accept:'application/json'
            }
        }
        fetchApi(url, options, getResponse);
    }
    useEffect(()=>{
        fetchAllSet();
        // eslint-disable-next-line 
    },[])
    const selectSet=(e)=>{
        const value=e.target.value;
        window.sessionStorage.setItem("selectedSet", value);
        if(value!=="Select Set"){
            // window.history.pushState(null, "admin",`?set=${value}`);
            const url="http://localhost:3001/admin/selectset";
            const options={
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({ value })
            }
            fetchApi(url, options, getSetQuestions);
        }
    }
    const questionSetValue=questionSet.length>0 ? questionSet.map((set, index)=>{
        return(
            <option key={ index }>{ set.table_name }</option>
        )
    }) : <option>No Set Uploaded Yet</option>
    return(
        <React.Fragment>
            <div className="container">
                <div className="col-md-12">
                    <div className="form-group">
                        <select className="form-control form-control-sm" onChange={selectSet}>
                            <option>Select Set</option>
                            { questionSetValue }
                        </select>
                    </div>
                    <SelectedSet 
                    allQuestions={allQuestions}
                    isQuesTable={isQuesTable} 
                    editQues={editQues}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateSet;