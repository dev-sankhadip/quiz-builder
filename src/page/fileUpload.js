import React,{ useState } from 'react'
import axios from 'axios';

const FileUpload=()=>
{
    const [file, setFile]=useState();
    const [fileName, setFileName]=useState('Upload CSV file');

    const uploadFile=(e)=>
    {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }
    const upload=async (e)=>
    {
        e.preventDefault();
        const formData=new FormData();
        formData.append('file', file);
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
            // const {fileName, filePath}=response.data
            // setUploadedFile({
            //     fileName, filePath
            // })
            // setMessage('File Uploaded');
        }
        catch(err)
        {
            console.log(err);
        }
    }
    return(
        <React.Fragment>
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="customFile" onChange={ uploadFile }/>
                <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
            </div>
            <button className="btn btn-sm btn-success mt-2" onClick={ upload }>upload</button>
        </React.Fragment>
    )
}

export default FileUpload;