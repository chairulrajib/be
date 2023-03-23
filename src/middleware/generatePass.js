module.exports={
    generatePassword: (length) => {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz'
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const symbols = '!@#$%^&*()_+~`|}{[]\:;?><,./-='
        const numbers = '0123456789'
      
        let password = ''
        password += lowercase.charAt(Math.floor(Math.random() * lowercase.length))
        password += uppercase.charAt(Math.floor(Math.random() * uppercase.length))
        password += symbols.charAt(Math.floor(Math.random() * symbols.length))
        password += numbers.charAt(Math.floor(Math.random() * numbers.length))
      
        const allowedChars = lowercase + uppercase + symbols + numbers
        for (let i = 4; i <length; i++) {
          password += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length))
        }
        // res.status(200).send({
        //   success: true,
        //   message: 'Random password generated successfully',
        //   password: password
        // })
        return password
        
      }
}

  