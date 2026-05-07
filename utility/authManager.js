const jwt=require('jsonwebtoken')
const secret="niuyfddfgmn"
function signJwt(playload)
{
    try{
      const token=jwt.sign(playload,secret,{expiresIn:'25m'})
      return token;
      }
      catch(error)
      {
     console.log(error);
      }
}
function verifyJWT(token)
{
   try{
    const playload=jwt.verify(token,secret)
    return playload;
   }
   catch(error)
   {
    return error;
   }
}
module.exports={
  signJwt,
  verifyJWT,

}