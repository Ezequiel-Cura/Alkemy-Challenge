
const nodemailer = require("nodemailer")

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SEND_GRID_APIKEY)

const sendGridMail = ()=>{
    const msg = {
      to: "ezequiel2808@yahoo.com.ar", // Change to your recipient
      from: process.env.EMAIL_USER, // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    
    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      })

}

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





module.exports = {sendEmail,sendGridMail};