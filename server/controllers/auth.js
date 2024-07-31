const User=require('../model/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const userLogin = async (req,res)=>{
    // console.log(req.body);
    let {uname,pword}=req.body;
    if(!uname || !pword ) return res.status(400).send({'message':'Username and Password are required'});

    const user=await User.findOne({username:uname});
    if(!user) return res.sendStatus(401);   //unauthorized

    const match=await bcrypt.compare(pword,user.password);
    if(match){
        const accessToken=jwt.sign(
            {
                "username":uname
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:'1h'
            }
        );
        const refreshToken = jwt.sign(
            { "username": uname },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        user.refreshToken=refreshToken;
        await user.save();
        // console.log(user);
        // res.send({"message":"login succesful"});
        res.cookie('jwt',refreshToken,{httpOnly:true,sameSite:'None',secure:true,maxAge: 24 * 60 * 60 * 1000});
        res.send({id:user._id,accessToken});
    }
    else{
        res.sendStatus(401);
    }
};

const userRegister= async (req,res)=>{
    let {uname,pword}=req.body;
    console.log("here");
    if(!uname || !pword ) return res.status(400).send({'message':'Username and Password are required'});

    let duplicate=await User.findOne({username:uname});
    if(duplicate) return res.status(409).send({'message':`User with ${uname} already exists`});

    try{
        const hashedPass=await bcrypt.hash(pword,10);
        const newUser= await User.create({
            username:uname,
            password:hashedPass
        })
        // console.log(savedUser);
        res.status(201).send({'message':`User ${uname} registered`});
    }
    catch(err){
        res.status(500).send({'message':err.message});
    }
};

const userLogout= async (req,res)=>{
    const token=req.cookies?.jwt;
    // console.log(token);
    if(!token) return res.sendStatus(204);
    const user=await User.findOne({refreshToken:token});
    // console.log(user);
    if(!user){
        res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true,maxAge: 24 * 60 * 60 * 1000});
        return res.sendStatus(204);
    }
    user.refreshToken='';
    await user.save();
    res.clearCookie('jwt',{httpOnly:true,sameSite:'None',secure:true,maxAge: 24 * 60 * 60 * 1000});
    return res.sendStatus(204);
};

const handleRefreshToken=async (req,res)=>{
    // console.log(req.cookies);
    const token=req.cookies?.jwt;
    if(!token) return res.sendStatus(401);

    const user=await User.findOne({refreshToken:token});
    // console.log(user);
    if(!user) return res.sendStatus(403);

    jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
        if( err || user.username!== decoded.username) return res.sendStatus(403);
        const accessToken=jwt.sign(
            {
                "username":user.username
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:'1h'
            }
        );
        // console.log(user);
        res.send({id:user._id,username:user.username,accessToken});
    })
};

module.exports={userLogin,userLogout,userRegister,handleRefreshToken};