module.exports =(query)=>{
    let fillterStatus = [
        {
            name: "tat ca",
            status: "",
            class:""
        },
        {
            name: "hoat dong",
            status: "active"
        },
        {
            name: "dung hoat dong",
            status:"inactive"
        },
    ]
    if(query.status){
        const index = fillterStatus.findIndex(item => item.status == query.status);
        // console.log(query.status);
        // console.log(index);
        fillterStatus[index].class="active"
    }else{
        const index = fillterStatus.findIndex(item => item.status == "");
        fillterStatus[index].class="active"
    }
    return fillterStatus;
}