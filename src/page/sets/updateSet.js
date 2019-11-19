import React,{useState, useEffect} from 'react'
import fetchApi from '../../fetch/fetch';
import SelectedSet from './selectedSet';


const UpdateSet=()=>
{
    const [questionSet, setQuestionSet]=useState([]);
    const [allQuestions, setAllQuestions]=useState([]);
    const getResponse=(data)=>
    {
        setQuestionSet(data.result1);
    }
    const getSetQuestions=(data)=>
    {
        setAllQuestions(data.result);
    }
    const fetchAllSet=()=>
    {
        const url="http://localhost:3001/admin/sets";
        const options={
            method:"GET",
            headers:{
                Accept:'application/json'
            }
        }
        fetchApi(url, options, getResponse);
    }
    useEffect(()=>
    {
        fetchAllSet();
    },[])
    const selectSet=(e)=>
    {
        const value=e.target.value;
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
    const questionSetValue=questionSet.length>0 ? questionSet.map((set, index)=>
    {
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
                    <SelectedSet allQuestions={allQuestions} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default UpdateSet;