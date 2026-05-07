const db = require("../utility/dbManager");
async function logincheck(id, password)
{
    try{
      const inverstor=await loginUser(id, password);
      return inverstor
    }catch(error)
    {
     return undefined
    }
}
async function fetchInvestordata(id)
{
    try{
      const inverstor=await getInvestorFromDB(id);
      return inverstor
    }catch(error)
    {
     return undefined
    }
}

function getInvestorFromDB(id)
{
    return new Promise((resolve,reject)=>{
        db.get(
`select * from investor where investor_id='${id}'`,
(err,rows)=>{
    if(err)
    {
        console.log('rows');
        reject(err);
    }
    else
    {
        console.log(rows);
        resolve(rows);
    }
}
        );
    });
}
function getInvestorFromDB(mobile)
{
    return new Promise((resolve,reject)=>{
        db.get(
`select * from investor where investor_id='${mobile}'`,
(err,rows)=>{
    if(err)
    {
        console.log('rows');
        reject(err);
    }
    else
    {
        console.log(rows);
        resolve(rows);
    }
}
        );
    });
}
function loginUser(investor_id, password) {
    return new Promise((resolve, reject) => {

        db.get(
`SELECT * FROM investor 
 WHERE investor_id = ? 
 AND password = ?`,
[investor_id, password],

(err, row) => {

    if (err) {
        reject(err);
    }
    else {
        resolve(row);
    }
}
        );

    });
}
function addInvestorDB(data)
{
    return new Promise((resolve, reject) => {

        db.run(
`INSERT INTO investor
(
    investor_id,
    first_name,
    middle_name,
    last_name,
    pancard_no,
    adhaar_no,
    date_of_birth,
    gender,
    occupation,
    password
)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
[
    data.investor_id,
    data.first_name,
    data.middle_name,
    data.last_name,
    data.pancard_no,
    data.adhaar_no,
    data.date_of_birth,
    data.gender,
    data.occupation,
    data.password
],

function(err)
{
    if(err)
    {
        reject(err);
    }
    else
    {
        resolve(this.lastID);
    }
}
        );

    });
}

function getInvestorHoldings(id)
{
    return new Promise((resolve, reject) => {

        db.all(
`SELECT
    h.holding_id,
    h.total_units,
    f.fund_name,
    f.latest_nav,
    (h.total_units * f.latest_nav) AS current_value

FROM holdings h

JOIN portfolio p
ON h.portfolio_id = p.portfolio_id

JOIN funds f
ON h.fund_id = f.fund_id

WHERE p.investor_id = ?`,
[id],

(err, rows) => {

    if(err)
    {
        reject(err);
    }
    else
    {
        resolve(rows);
    }
}
        );

    });
}

function getInvestorNetworth(id)
{
    return new Promise((resolve, reject) => {

        db.get(
`SELECT
SUM(h.total_units * f.latest_nav) AS networth

FROM holdings h

JOIN portfolio p
ON h.portfolio_id = p.portfolio_id

JOIN funds f
ON h.fund_id = f.fund_id

WHERE p.investor_id = ?`,
[id],

(err, row) => {

    if(err)
    {
        reject(err);
    }
    else
    {
        resolve(row.networth || 0);
    }
}
        );

    });
}

module.exports={
    getInvestorFromDB,
    fetchInvestordata,
    getInvestorFromDB,
    addInvestorDB,
    getInvestorHoldings,
    getInvestorNetworth,
    loginUser,
    logincheck,
}