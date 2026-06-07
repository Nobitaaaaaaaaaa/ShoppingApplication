import jwt from 'jsonwebtoken';

const authUser=async(req,res,next)=>{

    const {token} =req.headers;
    if(!token){
        return res.status(401).json({ success: false, message: 'Not Authorized to Login' });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        if (req.body) {
            req.body.userId = decoded.id;
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success:false ,  message: error.message });
    }
};

export default authUser;