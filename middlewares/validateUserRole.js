const validateUserAdmin = (req, res, next)=>{

    if(!req.user){
        return res.status(500).json({
            msg: 'Validate token first'
        });
    };

    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `User ${name} is not admin`
        });
    } 
    
    next();
}

const isRoles = (...roles)=>{

    return (req, res, next) =>{

        if(!req.user){
            return res.status(500).json({
                msg: 'Validate token first'
            });
        };
    
        if(!roles.includes(req.user.role)){
            return res.status(500).json({
                msg: 'User does not have privileges'
            });
        }

        next();
    }
}

module.exports = {
    validateUserAdmin,
    isRoles,
}