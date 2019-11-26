import React from 'react';

const ScoreDetails=(props)=>{
    const scoreView=props.score.length>0 ? props.score.map((item, i)=>{
        return(
            <tr key={ i }>
                <td>{ item.user }</td>
                <td>{ item.score }</td>
            </tr>
        )
    }) : <tr>
            <td>No user</td>
            <td>No score</td>
        </tr>
    return(
        <React.Fragment>
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">User</th>
                    <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    { scoreView }
                </tbody>
            </table>
        </React.Fragment>
    )
}


export{
    ScoreDetails
}