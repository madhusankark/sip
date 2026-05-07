const sqlite3=require('sqlite3')
const db =new sqlite3.Database('D:/mutualfunds_database/mutual.db.txt',(error)=>
    {
    if(error)
    {
        console.log('error');
    }
    else
        {
        console.log('connected');
        
    }
});

module.exports=db;
