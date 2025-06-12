import jwt from 'jsonwebtoken';

const isAuthenticated=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message:"user not authenticated",
                success:false
            })
        }
        const decode=await jwt.verify(token,process.env.SECRET_KEY);
        console.log(decode);
        
        if (!decode) {
            return res.status(401).json({
                message:"invalid token",
                success:false
            });
        }
        req.id=decode.UserId;
        next();
    }catch(error){
        console.log("error ",error);
    }
}
export default isAuthenticated;