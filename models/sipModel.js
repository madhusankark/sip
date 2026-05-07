const db = require('../utility/dbManager');

function addSipDB(data)
{
    return new Promise((resolve, reject) => {

        db.run(
`INSERT INTO sip
(
    sip_id,
    portfolio_id,
    fund_id,
    sip_amount,
    frequency,
    start_date,
    status
)
VALUES (?, ?, ?, ?, ?, ?, ?)`,
[
    data.sip_id,
    data.portfolio_id,
    data.fund_id,
    data.sip_amount,
    data.frequency,
    data.start_date,
    data.status
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
function getSipByIdDB(id)
{
    return new Promise((resolve, reject) => {

        db.get(
`SELECT *
 FROM sip
 WHERE sip_id = ?`,
[id],

(err, row) => {

    if(err)
    {
        reject(err);
    }
    else
    {
        resolve(row);
    }
}
        );

    });
}
function processSipDB(id)
{
    return new Promise((resolve, reject) => {

        db.serialize(() => {

            db.run("BEGIN TRANSACTION");

            db.get(
`SELECT
    s.*,
    f.latest_nav

FROM sip s

JOIN funds f
ON s.fund_id = f.fund_id

WHERE s.sip_id = ?`,
[id],

(err, sip) => {

    if(err)
    {
        db.run("ROLLBACK");
        return reject(err);
    }

    if(!sip)
    {
        db.run("ROLLBACK");
        return reject(new Error("SIP not found"));
    }

    const units =
        sip.sip_amount / sip.latest_nav;

    db.run(
`INSERT INTO investment_transactions
(
    portfolio_id,
    fund_id,
    sip_id,
    transaction_type,
    amount,
    nav_value,
    units_allocated,
    transaction_date
)
VALUES (?, ?, ?, ?, ?, ?, ?, DATE('now'))`,
[
    sip.portfolio_id,
    sip.fund_id,
    sip.sip_id,
    'SIP',
    sip.sip_amount,
    sip.latest_nav,
    units
],

function(err)
{
    if(err)
    {
        db.run("ROLLBACK");
        return reject(err);
    }

    const transactionId = this.lastID;

    db.run(
`UPDATE holdings
SET total_units =
COALESCE(total_units,0) + ?

WHERE portfolio_id = ?
AND fund_id = ?`,
[
    units,
    sip.portfolio_id,
    sip.fund_id
],

function(err)
{
    if(err)
    {
        db.run("ROLLBACK");
        return reject(err);
    }

    db.run(
`COMMIT`,

function(err)
{
    if(err)
    {
        db.run("ROLLBACK");
        return reject(err);
    }

    resolve({
        transaction_id: transactionId,
        units_allocated: units
    });
}
            );
}
        );
}
        );
}
            );
        });

    });
}
function getSipTransactionsDB(id)
{
    return new Promise((resolve, reject) => {

        db.all(
`SELECT *
 FROM investment_transactions
 WHERE sip_id = ?`,
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

module.exports = {
    addSipDB,
    getSipByIdDB,
    processSipDB,
    getSipTransactionsDB
};