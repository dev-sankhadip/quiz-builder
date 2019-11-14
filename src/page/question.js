import React from 'react'

const Question=(props)=>
{
    console.log(props);
    const questionsSet=props.question.length>0 ?  props.question.map((item, index)=>
        {
            return(
                <tr key={index}>
                    <th scope="row">{ index }</th>
                    <td>{ item.title }</td>
                    <td>{ item.m1 }</td>
                    <td>{ item.m2 }</td>
                    <td>{ item.m3 }</td>
                    <td>{ item.m4 }</td>
                    <td>{ item.right }</td>
                </tr>
            )
        }) : <tr><td>
            <p>No question yet</p>
            </td></tr>
    return(
        <React.Fragment>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">1</th>
                        <th scope="col">2</th>
                        <th scope="col">3</th>
                        <th scope="col">4</th>
                        <th scope="col">Right</th>
                    </tr>
                </thead>
                <tbody>
                    { questionsSet }
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default React.memo(Question);