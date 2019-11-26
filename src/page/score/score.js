import React,{ useState, useEffect } from 'react';
import fetchApi from '../../fetch/fetch';
import { ScoreDetails } from './scoreDetails'


const Score=()=>{
    const [questionSet, setQuestionSet]=useState([]);
    const [score, setScore]=useState([]);
    const getResponse=(data)=>{
        setQuestionSet(data.result1);
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
        const token=window.localStorage.getItem("token");
        fetch(`http://localhost:3001/quiz/score/${value}`,{
            method:"GET",
            headers:{
                Accept:'application/json',
                'x-access-token':token
            }
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setScore(res.result);
        })
        .catch((err)=>{
            console.log(err);
        })
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
                        <ScoreDetails  score={ score }/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Score;