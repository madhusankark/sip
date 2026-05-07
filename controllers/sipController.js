const {
    addSipDB,
    getSipByIdDB,
    getSipTransactionsDB,
    processSipDB
} = require('../models/sipModel');

const addsip = async (req, res) => {

    try {

        await addSipDB(req.body);

        return res.status(201).json({
            message: "SIP created successfully"
        });

    }
    catch(error)
    {
        return res.status(500).json({
            error: error.message
        });
    }
};

const getsipbyid = async (req, res) => {

    const { id } = req.params;

    try {

        const sip = await getSipByIdDB(id);

        if(sip)
        {
            return res.json(sip);
        }
        else
        {
            return res.status(404).json({
                error: "SIP not found"
            });
        }

    }
    catch(error)
    {
        return res.status(500).json({
            error: error.message
        });
    }
};

const sipprocess = async (req, res) => {

    const { id } = req.params;

    try {

        const transaction = await processSipDB(id);

        return res.json({
            message: "SIP processed successfully",
            transaction
        });

    }
    catch(error)
    {
        return res.status(500).json({
            error: error.message
        });
    }
};

const getsiptranscations = async (req, res) => {

    const { id } = req.params;

    try {

        const transactions = await getSipTransactionsDB(id);

        return res.json(transactions);

    }
    catch(error)
    {
        return res.status(500).json({
            error: error.message
        });
    }
};

module.exports = {
    addsip,
    getsipbyid,
    sipprocess,
    getsiptranscations
};