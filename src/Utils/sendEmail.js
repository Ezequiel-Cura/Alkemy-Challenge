
const nodemailer = require("nodemailer")


const sendEmail = async (email)=>{
    try {
        
        let transporter = nodemailer.createTransport({
          host:"smtp.gmail.com",
          service:"gmail",
          port:465,
          secure:true,
          auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          }
        })
        
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to:email,
            subject:"Welcome to the API ALKEMY",
            text:"I hope you have a fantastic day, and enjoy the api :)",

        })


    } catch (error) {
        console.log(error)
    }

}





module.exports = {sendEmail};