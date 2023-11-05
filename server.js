const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

// server used to send send emails
const app = express();
const port = 4000

dotenv.config()
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(process.env.PORT|| port, () => console.log("Server Running"));


const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "nc.nclogistics@gmail.com",
    pass: process.env.PASSWORD
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/mail", (req, res) => {
  const name = req.body.full_Name;
  const email = req.body.email;
  const phone = req.body.phone;
  const service= req.body.service;
  const loadingPort= req.body.loadingPort;
  const unloadingPort= req.body.unloadingPort;
  const weight= req.body.weight;
  const dimensions= req.body.dimensions;
  const shiping= req.body.shiping;
  const quantity= req.body.quantity;
  const transport= req.body.transport;
  const commodity= req.body.commodity;
  const message = req.body.message;
  const mail = {
    from: `"${name} " <${email}>`,
    to: "info@n-c-logistics.com",
    subject: "Request for Qoute",
    html: `    <div >
    <table>
      
      <tr>
      <tr> <td>Email : </td>  <td>${email}</td></tr>
      <tr><td>Name : </td>  <td>${name}</td><tr>
      <tr> <td>Phone : </td>  <td>${phone}</td><tr>
      <tr> <td>type of service : </td>  <td>${service}</td><tr>
     <tr> <td>loadingPort : </td>  <td>${loadingPort}</td><tr>
    <tr><td>unloadingPort : </td>  <td>${unloadingPort}</td></tr>
     <tr> <td>weight in kg : </td>  <td>${weight}</td></tr>
     <tr> <td>Dimensions : </td>  <td>${dimensions}</td></tr>
      <tr><td>type of shiping : </td>  <td>${shiping}</td></tr>
      <tr><td>container quantity : </td>  <td>${quantity}</td></tr>
      <tr><td>made of transport : </td>  <td>${transport}</td></tr>
     <tr> <td>commodity :  </td>  <td>${commodity}</td></tr>
     <tr> <td>commodity : </td>  <td>${message}</td></tr>
      <tr></tr>
    </table>
  </div>`
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ code: 405, status: "Message failed" });
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
