import Auth from '../utils/auth.js'
import UserModel from '../models/user.js'
const Validate = async(req,res,next)=>{
    try {
        let token = req?.headers?.authorization?.split(" ")[1]

        if(token)
        {
            let payload = await Auth.decodeToken(token)

            let userData = await UserModel.findById(payload.id)
            
            if(Math.round(+new Date()/1000)<payload.exp && userData.role === payload.role)
                next()
            else    
                res.status(402).send({message:"Token Expired"})
        }
        else
        {
            res.status(402).send({
                message:"Token Not Found"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error: error.message
        })
    }
}

export default Validate