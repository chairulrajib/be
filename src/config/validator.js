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
        
    },
    checkChangePass: [
        check('oldPassword').notEmpty().withMessage('Old Password is required'),
        check('newPassword').notEmpty().withMessage('New Password is required'),
        check('confirmationPassword').notEmpty().withMessage('Confirmation Password is required'),
        check('confirmationPassword').custom((value, { req }) => {
          if (value !== req.body.newPassword) {
            throw new Error('Confirmation Password is different from New Password');
          }
          return true;
        }),
      ],
    checkIdNumber : (req, res, next) => {
        const idNumber = req.body.idNumber;
        if (!idNumber || typeof idNumber !== "number" || idNumber.toString().length !== 16) {
          return res.status(400).send({
            success: false,
            message: "Invalid Id Number",
          });
        }
        next();
      },
}