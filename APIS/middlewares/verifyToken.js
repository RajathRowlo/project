const jwt=require("jsonwebtoken")
const verifyTokenMethod=(req,res,next)=>{


    //read token from reqObj
    let tokenWithBearer=req.headers["authorization"]
    //if token is existed
    if(tokenWithBearer!=undefined){

        //extract token by removing first 7 charecters
        let token=tokenWithBearer.slice(7,tokenWithBearer.length)
        //verify the token
        jwt.verify(token,"secret",(err,decoded) => {
            if(err){
                return res.send({reason:"Session expired...Please login again", message:"failed"})
            }
            else{
                //forward to next handler
                next()
            }

        })
    }
    //if token is not exist
    else{

        return res.send({reason:"Unauthorised access", message:"failed"})
    }
}



//exports middlewares
module.exports=verifyTokenMethod