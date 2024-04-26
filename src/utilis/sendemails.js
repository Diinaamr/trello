import nodemailer from 'nodemailer';
export const sendEmail= async ({to,subject,html})=>{
    // sender information
const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 465,
  secure: true,
  service:"gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

///////////// reciever information
const info = await transporter.sendMail({
    from: `"trello"<${process.env.EMAIL}>`, // sender address
    to, // list of receivers
    subject, // Subject line
  
    html, // html body
  });
  if(info.accepted.length>0){ // here we mean that this email is already exists in the real life 
    return true;
  }
 
return false

}
