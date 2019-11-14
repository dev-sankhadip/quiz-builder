import React,{ useEffect, useState } from 'react'
import Navbar from './navbar';
import SetQuestion from './SetQuestion'
import FileUpload from './fileUpload';
import fetchApi from '../fetch/fetch';
import UpdateSet from './updateSet';



const Admin=(props)=>
{
    const [updateDisplay, setUpdateDisplay]=useState(false);
    const getResponse=(data)=>
    {
        if(data.code!==200)
        {
            props.history.push('/login');
        }
    }
    useEffect(()=>
    {
        const url="http://localhost:3001/user/check";
        const options={
            method:"POST",
            headers:{

            }
        }
        fetchApi(url, options,getResponse);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <React.Fragment>
            <Navbar/>
            <div className="container pt-5">
                <h3 className="display-4 text-center">Upload Questions Here</h3>
                <ul className="nav nav-tabs">
                    <li className="nav-item"><a onClick={()=>{ setUpdateDisplay(false) }} href="#ques" className="nav-link active" data-toggle="tab" id="login-tab">Set Questions</a></li>
                    <li className="nav-item"><a onClick={()=>{ setUpdateDisplay(false) }} href="#file" className="nav-link" data-toggle="tab">Upload CSV File</a></li>
                    <li className="nav-item"><a onClick={()=>{ setUpdateDisplay(false) }} href="#allques" className="nav-link" data-toggle="tab">Active Sets</a></li>
                    <li className="nav-item"><a onClick={()=>{ setUpdateDisplay(true) }} href="#updateset" className="nav-link" data-toggle="tab">Update Set</a></li>
                </ul>
                <div className="tab-content" style={{ overflow:'hidden' }}>
                    <div className="tab-pane active p-3" id="ques">
                        <SetQuestion/>
                    </div>
                    <div className="tab-pane pt-2" id="file">
                        <FileUpload/>
                    </div>
                    <div className="tab-pane pt-2" id="allques">
                        
                    </div>
                    <div className="tab-pane pt-2" id="updateset">
                        {updateDisplay ? <UpdateSet/> : null}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Admin;