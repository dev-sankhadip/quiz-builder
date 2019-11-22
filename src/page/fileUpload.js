import React,{ useState, useRef } from 'react'
import axios from 'axios';
import fetchApi from '../fetch/fetch';


const FileUpload=()=>
{
    const [file, setFile]=useState();
    const [fileName, setFileName]=useState('Upload CSV file');
    const [ isDisplay, setDisplay ]=useState(false);
    const [setName, setSetName]=useState('');
    let form=useRef();

    const uploadFile=(e)=>
    {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }
    const upload=async (e)=>
    {
        e.preventDefault();
        const setno=window.localStorage.getItem("setno");
        const formData=new FormData();
        formData.append('file', file);
        formData.append("setname", setno);
        const token=window.localStorage.getItem("token");
        try{
            const response=await axios.post('http://localhost:3001/quiz/upload', formData, {
                headers:{
                    'Content-Type':'multipart/form-data',
                    'x-access-token':token
                },
                // onUploadProgress:ProgressEvent=>{
                //     setUploadPercentage(parseInt(Math.round((ProgressEvent.loaded*100) / ProgressEvent.total)))

                //     //clear percentage
                //     setTimeout(() => {
                //         setUploadPercentage(0)
                //     }, 10000);
                // }
            })
            console.log(response);
            window.alert("File Uploaded");
            form.current.reset();
            setFileName('Upload CSV file');
        }
        catch(err)
        {
            console.log(err);
        }
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
            <div className="col-md-12" style={{ display:isDisplay ? 'none' : 'inline' }}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Set Name</span>
                    </div>
                    <input onChange={updateSetname} type="text" className="form-control" placeholder="Write Set name here"/>
                </div>
                <button onClick={submitSetName} className="btn btn-sm btn-danger">Create Set</button>
            </div>
            <div style={{ display: isDisplay ? 'inline' : 'none'}}>
                <form ref={form}>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" onChange={ uploadFile }/>
                        <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                    </div>
                </form>
                <button className="btn btn-sm btn-success mt-2" onClick={ upload }>upload</button>
            </div>
        </React.Fragment>
    )
}

export default FileUpload;