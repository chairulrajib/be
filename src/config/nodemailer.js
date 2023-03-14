const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user :'smartprivat.one@gmail.com',
        pass : 'tssyqlldtwupkipv'
    }
})

module.exports ={
    transport
}