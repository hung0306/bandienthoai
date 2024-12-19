module.exports =(query)=>{
    let objectSearch = {
        keyword: "",
       

    }

    if(query.keyword){
        objectSearch.keyword = query.keyword;
        // const regex = /keyword/i;
        // i ko phân biệt hoa thường
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;

    }
    return objectSearch;
}