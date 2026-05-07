const { fetchInvestordata, logincheck } = require("../models/investorModel");
const {
    addInvestorDB,
    getInvestorHoldings,
    getInvestorNetworth
} = require('../models/investorModel');

const { signJwt } = require("../utility/authManager");

const login = async (req, res) => {

    const { id, pass } = req.body;

    try {

        const user = await logincheck(id, pass);

        if(!user)
        {
            return res.status(401).json({
                error: "Invalid credentials"
            });
        }

        const token = signJwt({
            id: user.investor_id,
            role: "investor"
        });

        return res.json({
            token
        });

    }
    catch(error)
    {
        return res.status(500).json({
            error: error.message
        });
    }
};
const addinvestor = async (req, res) => {

    try {

        await addInvestorDB(req.body);

        return res.status(201).json({
            message: "Investor added successfully"
        });

    }
    catch(error)
    {
        return res.status(500).json({
            error: error.message
        });
    }
};

const investorholdings = async (req, res) => {

    const { id } = req.params;

    try {

        const holdings = await getInvestorHoldings(id);

        return res.json(holdings);

    }
    catch(error)
    {
        return res.status(500).json({
            error: error.message
        });
    }
};

const investornetworth = async (req, res) => {

    const { id } = req.params;

    try {

        const networth = await getInvestorNetworth(id);

        return res.json({
            investor_id: id,
            networth: networth
        });

    }
    catch(error)
    {
        return res.status(500).json({
            error: error.message
        });
    }
};

const getinvestor= async (req,res)=>{
 const {id}=req.params;

    const investor= await fetchInvestordata(id);
    if(investor!=undefined)
    {
      console.log(investor);
      return res.json(investor);
    }
    else
    {
        return res.status(404).json({error:"j not found"});
    }
 }
module.exports={
    addinvestor,
    investorholdings,
    investornetworth,
    getinvestor,
    login
}