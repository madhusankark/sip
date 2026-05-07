const db = require('../utility/dbManager');

const addfund = (req, res) => {

    const {
        fund_id,
        fund_name,
        amc_id,
        category,
        risk_level,
        latest_nav
    } = req.body;

    db.run(
`INSERT INTO funds
(fund_id, fund_name, amc_id, category, risk_level, latest_nav)
VALUES (?, ?, ?, ?, ?, ?)`,
[
    fund_id,
    fund_name,
    amc_id,
    category,
    risk_level,
    latest_nav
],
function(err)
{
    if(err)
    {
        return res.status(500).json({
            error: err.message
        });
    }

    return res.json({
        message: "Fund added successfully"
    });
}
    );
};

const getallfunds = (req, res) => {

    db.all(
`SELECT * FROM funds`,
[],
(err, rows) => {

    if(err)
    {
        return res.status(500).json({
            error: err.message
        });
    }

    return res.json(rows);
}
    );
};

const updatefundnav = (req, res) => {

    const { id } = req.params;
    const { latest_nav } = req.body;

    db.run(
`UPDATE funds
 SET latest_nav = ?
 WHERE fund_id = ?`,
[latest_nav, id],

function(err)
{
    if(err)
    {
        return res.status(500).json({
            error: err.message
        });
    }

    if(this.changes === 0)
    {
        return res.status(404).json({
            error: "Fund not found"
        });
    }

    return res.json({
        message: "NAV updated successfully"
    });
}
    );
};

module.exports = {
    addfund,
    getallfunds,
    updatefundnav,
};
module.exports={
    addfund,
    getallfunds,
    updatefundnav,
}