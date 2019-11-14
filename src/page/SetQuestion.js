import React,{ useState, useRef } from 'react'
import Question from './question';
import fetchApi from '../fetch/fetch';


const SetQuestion=()=>
{
    const [ title, sett ]=useState('');
    const [ m1, setm1 ]=useState('');
    const [ m2, setm2 ]=useState('');
    const [ m3, setm3 ]=useState('');
    const [ m4, setm4 ]=useState('');
    const [ right, setRight ]=useState('');
    const [ question, setQuestion ]=useState([]);
    const [ isDisplay, setDisplay ]=useState(false);
    const [setName, setSetName]=useState('');
    let radio1=useRef();
    let radio2=useRef();
    let radio3=useRef();
    let radio4=useRef();

    const setTitle=(e)=>
    {
        sett(e.target.value);
    }

    const setOp1=(e)=>
    {
        setm1(e.target.value);
    }

    const setOp2=(e)=>
    {
        setm2(e.target.value);
    }
    const setOp3=(e)=>
    {
        setm3(e.target.value);
    }
    const setOp4=(e)=>
    {
        setm4(e.target.value);
    }
    const setRadio=(e)=>
    {
        setRight(e.target.value);
    }
    const upload=()=>
    {
        const questionsSet=new Object();
        questionsSet.title=title;
        questionsSet.m1=m1;
        questionsSet.m2=m2;
        questionsSet.m3=m3;
        questionsSet.m4=m4;
        questionsSet.right=right;
        const token=window.localStorage.getItem("token");
        const setno=window.localStorage.getItem("setno");
        fetch('http://localhost:3001/quiz/set',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                'x-access-token':token
            },
            body:JSON.stringify({ questionsSet, setno })
        })
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            console.log(res);
            if(res.code===200)
            {
                setQuestion(question=>[...question, questionsSet]);
                radio1.current.checked=false;
                radio2.current.checked=false;
                radio3.current.checked=false;
                radio4.current.checked=false;
                sett('');
                setm1('');
                setm2('');
                setm3('');
                setm4('');
                setRight('');
            }
            else if(res.code===500)
            {
                console.log("Internal error");
            }
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    const getResponse=(data)=>
    {
        window.localStorage.setItem("setno", setName);
        setDisplay(true);
    }
    const updateSetname=(e)=>
    {
        setSetName(e.target.value);
    }
    const submitSetName=()=>
    {
        console.log(setName);
        const token=window.localStorage.getItem("token");
        const url="http://localhost:3001/admin/set";
        const options={
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                'x-access-token':token
            },
            body:JSON.stringify({ setName })
        }
        fetchApi(url, options, getResponse);
    }
    return(
        <React.Fragment>
            <div className="container pt-2">
                <div className="row">
                    <div className="col-md-12" style={{ display:isDisplay ? 'none' : 'inline' }}>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Set Name</span>
                            </div>
                            <input onChange={updateSetname} type="text" className="form-control" placeholder="Write Set name here"/>
                        </div>
                        <button onClick={submitSetName} className="btn btn-sm btn-danger">Create Set</button>
                    </div>
                    <div className="col-md-6" style={{ display: isDisplay ? 'inline' : 'none'}}>
                        <p>Set Questins Here</p>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Title</span>
                            </div>
                            <input onChange={setTitle} type="text" className="form-control" placeholder="Write Questions Here"/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Point 1</span>
                            </div>
                            <input onChange={setOp1} type="text" className="form-control" placeholder="Point 1" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input ref={radio1} type="radio" className="mt-2 ml-2" value={m1} onChange={ setRadio }/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Point 2</span>
                            </div>
                            <input onChange={setOp2} type="text" className="form-control" placeholder="Point 2" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input ref={radio2} type="radio" className="mt-2 ml-2" value={m2} onChange={ setRadio }/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Point 3</span>
                            </div>
                            <input onChange={setOp3} type="text" className="form-control" placeholder="Point 3" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input ref={radio3} type="radio" className="mt-2 ml-2" value={m3} onChange={ setRadio }/>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="basic-addon1">Point 4</span>
                            </div>
                            <input onChange={setOp4} type="text" className="form-control" placeholder="Point 4" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input ref={radio4} type="radio" className="mt-2 ml-2" value={m4} onChange={ setRadio }/>
                        </div>
                        <button className="btn btn-sm btn-primary" onClick={upload}>SET</button>
                    </div>
                    <div className="col-md-6" style={{ display: isDisplay ? 'inline' : 'none' }}>
                        <Question  question={question} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SetQuestion;