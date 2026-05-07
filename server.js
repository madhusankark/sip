const express =require('express')
const app=express()
app.use(express.json());
app.get("/",(req,res)=>{
    return res.send("Hello");
})
app.use('/api/investor',require('./routes/investorRoute'))
app.use('/api/sip',require('./routes/sipRoute'))
app.use('/api/funds',require('./routes/fundsRoute'))

app.listen(4000,()=>{
    console.log("SERVER started");
})