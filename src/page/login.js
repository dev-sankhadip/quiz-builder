import React,{ useState, useEffect } from 'react';

const Login=(props)=>
{
    const [ email, setEmail ]=useState('');
    const [ password, setPassword ]=useState('');
    const [ select, setSelect ]=useState('');
    const [ error, setError ]=useState('');

    const submit=(e)=>
    {
        e.preventDefault();
        fetch('http://localhost:3001/user/login',{
            method:"POST",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json'
            },
            body:JSON.stringify({ email, password, select })
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>
        {
            if(res.code===200 && res.select==="admin")
            {
                window.localStorage.setItem("token", res.token);
                props.history.push('/admin');
            }
            else if(res.code===200 && res.select==="student")
            {
                const setname=props.match.params.setname;
                window.localStorage.setItem("token", res.token);
                props.history.push(`/test/${setname}`);
            }
            else if(res.code===400)
            {
                setError("User not found")
            }
            else if(res.code===300)
            {
                setError("bad credentials");
            }
            else if(res.code===500)
            {
                setError("Internal error");
            }
        })
        .catch((err)=>
        {
            console.log(err);
            setError(err);
        })
    }

    const updateEmail=(e)=>
    {
        setEmail(e.target.value);
    }
    const updatePassword=(e)=>
    {
        setPassword(e.target.value);
    }
    const updateSelect=(e)=>
    {
        setSelect(e.target.value);
    }
    useEffect(()=>
    {
        console.log('rendered');
    },[])
    return(
        <div className="container shadow">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input 
                    type="email"
                    className="form-control" 
                    id="exampleInputEmail1" 
                    placeholder="Enter email"
                    onChange={updateEmail}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    id="exampleInputPassword1" 
                    placeholder="Password"
                    onChange={updatePassword}
                    />
                </div>
                <div className="form-group">
                    <select className="form-control form-control-sm" onChange={updateSelect}>
                        <option>select</option>
                        <option>admin</option>
                        <option>student</option>
                    </select>
                </div>
                <button 
                type="submit" 
                className="btn btn-primary"
                onClick={submit}
                >Submit</button>
                <div style={{ display:error ? 'inline' : 'none' }} className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{ error }</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
        </div>
    )
}

export default Login;