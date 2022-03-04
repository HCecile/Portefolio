import express from "express";
import twig from "twig";
import bodyParser from "body-parser";
import fs from "fs";
import nodemailer from "nodemailer";
import { Config } from "./config.js";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    type: "login",
    user: Config.mail,
    pass: Config.mdpMail,
  },
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./assets"));
app.listen(8001, () => {
  console.log("le serveur marche !");
});

app.get("/", async (req, res) => {
  res.render("./template/user/accueil.html.twig", {});
});
app.get("/projets", async (req, res) => {
  res.render("./template/user/projets.html.twig");
});
app.get("/contact", async (req, res) => {
  res.render("./template/user/contact.html.twig");
});
app.post("/contact", async (req, res) => {
  let message = "";
  let mailOptions = {
    from: req.body.adress,
    to: "cecilehugues13@gmail.com",
    subject: `Demande de contact de ${req.body.name} ${req.body.adress}`,
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      message = "Erreur - Votre messsage n'a pas été envoyé!";
      console.log(err);
    } else {
      message = "Votre message a bien été envoyé!";
    }
    res.render("./template/user/contact.html.twig", { message });
  });
});
