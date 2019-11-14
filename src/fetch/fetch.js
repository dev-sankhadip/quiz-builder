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

const fetchData=(url, options, getResponse)=>
{
    fetch(url, updateOptions(options))
    .then((res)=>
    {
        return res.json();
    })
    .then((res)=>
    {
        getResponse(res);
    })
    .catch((err)=>
    {
        console.log(err);
    })
}

export default fetchData;