import React from 'react'

class EditSet extends React.Component
{

    state={
        title:'',
        op1:'',
        op2:'',
        op3:'',
        op4:'',
        right:''
    }

    componentDidMount(){
        const qid=this.props.match.params.id;
        const editableSet=window.sessionStorage.getItem("selectedSet");
        const token=window.localStorage.getItem("token");
        fetch(`http://localhost:3001/admin/get/${qid}/${editableSet}`,{
            method:"GET",
            headers:{
                'x-access-token':token
            }
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            const { code, result }=res;
            const { p1:op1, p2:op2, p3:op3, p4:op4, qid, r:right, title }=result[0];
            this.setState({ title, op1, op2, op3, op4, right });
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    handle=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    update=()=>{
        console.log(this.state);
        const data=this.state;
        const qid=this.props.match.params.id;
        const token=window.localStorage.getItem("token");
        const setname=window.sessionStorage.getItem("selectedSet");
        fetch("http://localhost:3001/admin/update",{
            method:"PUT",
            headers:{
                'Content-Type':'application/json',
                Accept:'application/json',
                'x-access-token':token
            },
            body:JSON.stringify({ data, setname, qid })
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            console.log(res);
            alert("Updated");
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    render(){
        const { title, op1, op2, op3, op4, right }=this.state;
        return(
            <React.Fragment>
                <div className="container">
                    <div className="col-md-12">
                        <p>Set Questins Here</p>
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Title</span>
                                </div>
                                <input
                                name="title" 
                                value={ title } 
                                onChange={this.handle} 
                                type="text" 
                                className="form-control" 
                                placeholder="Update Question Title"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Point 1</span>
                                </div>
                                <input 
                                name="op1"
                                type="text" 
                                value={ op1 }
                                className="form-control" 
                                placeholder="Point 1" 
                                onChange={this.handle} 
                                />
                                <input type="radio" name="right" className="mt-2 ml-2" 
                                value={ op1 }
                                onChange={ this.handle }
                                />
                                <span>{ op1===right ? 'Previous Right Answer' : null}</span>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Point 2</span>
                                </div>
                                <input 
                                name="op2" 
                                type="text" 
                                value={ op2 } 
                                className="form-control" 
                                placeholder="Point 2"
                                onChange={this.handle} 
                                />
                                <input type="radio" name="right" className="mt-2 ml-2" 
                                value={ op2 }
                                onChange={ this.handle }
                                />
                                <span>{ op2===right ? 'Previous Right Answer' : null}</span>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Point 3</span>
                                </div>
                                <input 
                                name="op3" 
                                type="text" 
                                value={ op3 } 
                                className="form-control" 
                                placeholder="Point 3" 
                                onChange={this.handle} 
                                />
                                <input type="radio" name="right" className="mt-2 ml-2" 
                                value={ op3 } 
                                onChange={ this.handle }
                                />
                                <span>{ op3===right ? 'Previous Right Answer' : null}</span>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Point 4</span>
                                </div>
                                <input 
                                name="op4" 
                                type="text" 
                                value={ op4 } 
                                className="form-control" 
                                placeholder="Point 4" 
                                onChange={this.handle} 
                                />
                                <input type="radio" name="right" className="mt-2 ml-2" 
                                value={ op4 } 
                                onChange={ this.handle }
                                />
                                <span>{ op4===right ? 'Previous Right Answer' : null}</span>
                            </div>
                        </form>
                        <button
                        onClick={this.update} 
                        className="btn btn-sm btn-primary">UPDATE</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default EditSet;