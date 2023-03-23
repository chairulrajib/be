const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports ={
    hashPassword: (password) =>{
        // membuat random secure key
        const salt = bcrypt.genSaltSync(10)

        // membuat proses hasihng password
        const hashPass = bcrypt.hashSync(password,salt);
        return hashPass;
    },
    createToken: (payload, expired = '24h') => {
        // console.log(payload);
        let token = jwt.sign(payload, process.env.KEY, {
            expiresIn: expired
        })

        return token;
    },
    readToken : (req,res,next)=>{
        // pengecekan token
        jwt.verify(req.token, process.env.KEY,(err, decript) =>{
            if(err) { 
                return res.data.status(401).send({
                    success:false,
                    message: 'Authenticate token failed'
                })
            }
            // console.log(`req di readtoken: ${decript}`)
            req.decript = decript // menampung data hasil terjemah token
            next()
        } ) //prw adalah kunci, dia harus sama dengan yg di encript
        }
}
