import UserModel from '../models/user.js'; 
import assetsModel from '../models/asset.js'
import Auth from '../utils/auth.js'

const getAllUsers = async(req,res)=>{
    try {
        let users = await UserModel.find({},{password:0})
        res.status(200).send({
            message:"Data Fetch Successful",
            users   
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const getAllAssets = async (req, res) => {
    try {
        
        let assets = await assetsModel.find();
        
        if(assets){
        res.status(200).send({
            message: "Data Fetch Successful",
            assets
        })} else{
            res.status(400).send({
                message: "No data"
        })};
    } catch (error) {
        res.status(500).send({
            message: error.message || "Internal Server Error"
        });
    }
};


const addAssets = async(req,res)=>{
    try {
        let assets = await assetsModel.findOne({a_id:req.body.a_id})
        
        if(!assets)
        {
            
            await assetsModel.create(req.body)
            res.status(201).send({
                message:"Asset added Successfull"
            })
        }
        else
        {
            res.status(400).send({
                message:`Asset Id with ${req.body.a_id} already exists`
            })
        }

    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}
const editAssets = async(req,res)=>{
    try {
        let assets = await assetsModel.findOne({_id:req.params.id});
        if(assets)
        {
            assets.a_id=req.body.a_id
            assets.a_name= req.body.a_name
            assets.a_sales=req.body.a_sales
            assets.a_stock=req.body.a_stock
            assets.stock_last_update=Date.now()

            await assets.save()

            res.status(201).send({
                message:"Updated Successfull"
            })
        }
        else
        {
            res.status(400).send({
                message:`Internal Server Error`
            })
        }

    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}
const  deleteAsset=async(req,res)=>
{   try{
    let asset=await assetsModel.findOne({_id:req.params.id});
    
    if (asset)
    {
        let asset = await assetsModel.deleteOne({_id:req.params.id})
            res.status(200).send({
                message:"Asset Deleted Successfully",
                asset
      })
    }
    else  {
        res.status(400).send({
            message:"The Asset does not exist"
        })
    }}
    catch (error) {
        res.status(500).send({
            message:error.message || "Internal server error"
        })
    }
}


const getAssetById = async(req,res)=>{
    try {
        let asset = await assetsModel.findOne({_id:req.params.id},{password:0})
        res.status(200).send({
            message:"Data Fetch Successful",
            asset
        })
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}



const signUp = async(req,res)=>{    
    try {
        let user = await UserModel.findOne({email:req.body.email})
        if(!user)
        {
            req.body.password = await Auth.hashPassword(req.body.password)
            await UserModel.create(req.body)
            res.status(201).send({
                message:"User Sign Up Successfull"
            })
        }
        else
        {
            res.status(400).send({
                message:`Assets with ${req.body.email} already exists`
            })
        }

    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

const login = async(req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})
        if(user)
        {
            if(await Auth.hashCompare(req.body.password,user.password))
            {
                let token = await Auth.createToken({
                    name:user.name,
                    email:user.email,
                    id:user._id,
                    role:user.role,
                })

                res.status(200).send({
                    message:"Login Successfull",
                    name:user.name,
                    role:user.role,
                    id:user._id,
                    token
                })
            }
            else
            {
                res.status(400).send({
                    message:"Incorect Password"
                })
            }
        }
        else
        {
            res.status(400).send({
                message:`User with ${req.body.email} does not exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:error.message || "Internal Server Error"
        })
    }
}

export default {
    getAllUsers,
    getAssetById,
    signUp,
    login,
    addAssets,
    editAssets,
    deleteAsset,
    getAllAssets
}