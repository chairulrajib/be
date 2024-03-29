const multer = require('multer')
const fs =require('fs')

module.exports={
    uploader:(directory,filePrefix) =>{
        // define default directory location
        let defaultDir = './src/public'

        //multer configuration
        const storageUploader = multer.diskStorage({
            destination:(req,file,cb)=>{
                //menentukan lokasi penyimpanan
                const pathDir = directory ? defaultDir + directory :defaultDir
                console.log(pathDir)
                //melakukan pemeriksaan pathDir
                if(fs.existsSync(pathDir)){
                    //jika directory ada, maka multer melakukan cb
                    console.log(`Directory $(pathDir) exist`)
                    cb(null,pathDir)
                } else {
                    // jika tidak ada maka bikin directory tsb
                    fs.mkdir(pathDir, { recursive: true }, (err) => {
                        if (err) {
                            console.log(`Error make directory`, err);
                        }

                        cb(err, pathDir);
                    })
                }
            },
            filename : (req,file,cb) =>{
                //membaca ext
                let  ext = file.originalname.split('.')
                console.log(ext)

                let newName = filePrefix+Date.now()+ '.' +ext[ext.length -1]
                console.log('New filename', newName)
                cb(null,newName)
            }
        });

        return multer({
            storage: storageUploader, fileFilter : (req,file,cb)=>{
                const extFilter = /\.(jpg|png|webp|doc|pdf)/;
                let check = file.originalname.toLocaleLowerCase().match(extFilter)
                if (check){
                    cb(null,true)
                } else {
                    cb(new Error('Your file ext denied', false))
                }
            }
        })
    }
}