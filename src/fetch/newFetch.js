const updateOptions=(options)=>
{
    const update={...options};
    const token=window.localStorage.getItem("token");
    if(token)
    {
        update.headers={
            ...update.headers,
            'x-access-token':token
        }
    }
    return update;
}

const fetchData=(url, options)=>
{
    return new Promise((resolve, reject)=>
    {
        fetch(url, updateOptions(options))
        .then((res)=>
        {
            return res.json();
        })
        .then((res)=>
        {
            resolve(res);
        })
        .catch((err)=>
        {
            reject(err);
        })
    })
}

export{
    fetchData
}