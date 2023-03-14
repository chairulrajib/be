const {check, validationResult} = require('express-validator')

module.exports ={
    checkUser:async (req,res,next)=>{
        try {
            // validation process
            if(req.path=='/regis'){

                await check("username").notEmpty().isAlphanumeric().run(req) //lgsg ngerun reqiest body dan cek parameter yg kita tuju
            }
            await check("email").notEmpty().isEmail().run(req)
            await check("password").notEmpty().isStrongPassword({
                minLength:5,
                minLowercase:1,
                minUppercase:1,
                minSymbols:1,
                minNumbers:1
            }).run(req)

            const validation = validationResult(req)
            console.log(validation)
            
            if(validation.isEmpty()){
                next()
            } else {
                return res.status(400).send({
                    success:false,
                    message: `Invalid ${validation.errors[0].param}`,
                    error: validation.errors
                })
            }

        } catch (err) {
            return res.status(500).send(err)
        }
        
    }
}