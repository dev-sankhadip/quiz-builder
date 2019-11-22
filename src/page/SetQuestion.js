import React,{ useState, useRef } from 'react'
import Question from './question';
import fetchApi from '../fetch/fetch';
import { fetchData } from '../fetch/newFetch'


const SetQuestion=()=>
{
    const [ title, setTitle ]=useState('');
    const [ option, setOption ]=useState({ op1:'', op2:'', op3:'', op4:'' });
    const [ right, setRight ]=useState('');
    const [ isDisplay, setDisplay ]=useState(false);
    const [setName, setSetName]=useState('');
    // let radio1=useRef();
    let form=useRef();

    const updateTitle=(e)=>
    {
        setTitle(e.target.value);
    }

    const setOp1=(e)=>
    {
        setOption({ ...option, op1:e.target.value });
    }

    const setOp2=(e)=>
    {
        setOption({ ...option, op2:e.target.value });
    }
    const setOp3=(e)=>
    {
        setOption({ ...option, op3:e.target.value });
    }
    const setOp4=(e)=>
    {
        setOption({ ...option, op4:e.target.value });
    }
    const setRadio=(e)=>
    {
        console.log(e.target.value);
        setRight(e.target.value);
    }
    const upload=()=>
    {
        const setno=window.localStorage.getItem("setno");
        const url=`http://localhost:3001/quiz/set`;
        const options={
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json'
            },
            body:JSON.stringify({title, option,setno, right })
        }
        fetchData(url, options)
        .then((res)=>
        {
            form.current.reset();
            // radio1.current.checked=false;
            setTitle('');
            setRight('');
            setOption({ op1:'', op2:'', op3:'', op4:''});
        })
        .catch((err)=>
        {
            console.log(err);
        })
    }
    const getResponse=(data)=>
    {
        window.localStorage.setItem("setno", setName);
        if(data.code===409)
        {
            alert('set already exits');
        }
        else
        {
            setDisplay(true);
        }
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
                    <div className="col-md-12" style={{ display: isDisplay ? 'inline' : 'none'}}>
                        <p>Set Questins Here</p>
                        <form ref={form}>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Title</span>
                                </div>
                                <input onChange={updateTitle} type="text" className="form-control" placeholder="Write Questions Here"/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Point 1</span>
                                </div>
                                <input onChange={setOp1} type="text" className="form-control" placeholder="Point 1" aria-label="Username" aria-describedby="basic-addon1"/>
                                <input type="radio" name="select" className="mt-2 ml-2" value={option.op1} onChange={ setRadio }/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Point 2</span>
                                </div>
                                <input onChange={setOp2} type="text" className="form-control" placeholder="Point 2" aria-label="Username" aria-describedby="basic-addon1"/>
                                <input type="radio" name="select" className="mt-2 ml-2" value={option.op2} onChange={ setRadio }/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Point 3</span>
                                </div>
                                <input onChange={setOp3} type="text" className="form-control" placeholder="Point 3" aria-label="Username" aria-describedby="basic-addon1"/>
                                <input type="radio" name="select" className="mt-2 ml-2" value={option.op3} onChange={ setRadio }/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Point 4</span>
                                </div>
                                <input onChange={setOp4} type="text" className="form-control" placeholder="Point 4" aria-label="Username" aria-describedby="basic-addon1"/>
                                <input type="radio" name="select" className="mt-2 ml-2" value={option.op4} onChange={ setRadio }/>
                            </div>
                        </form>
                        <button className="btn btn-sm btn-primary" onClick={upload}>SET</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SetQuestion;