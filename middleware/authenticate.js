const jwtProvider = require("../config/jwtProvider")
const userService = require("../service/user.service")

const authenticate = async(req,res,next)=>{
    //bearer token ....
    try{
        const token = req.headers.authorization?.split(" ")[1];
        // console.log("token is created",token);
        if(!token){
            console.log("token not found",token);
            return res.status(404).send({error:"token not Found..."})
        }

        const userId=jwtProvider.getUserIdFromToken(token);
        if (!userId) {
            return res.status(401).json({ error: "Invalid token" });
        }
        const user = userService.findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user=user;
        next();
    }catch(e){
        return res.status(500).send({error:e.message});
    }

    
}

module.exports =  authenticate;