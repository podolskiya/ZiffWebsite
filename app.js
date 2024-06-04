const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const util = require("util")

const nodemailer = require("nodemailer");

let ziffEmailAccount = nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: "alexander.khab@mail.ru",
        pass: "E7FMC5d2ggLWG7atKh78",

    },

});

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");

});

app.get("/technology", function (request, response) {
    response.sendFile(__dirname + "/html/technology.html");

});

app.post("/get-involved", function (request, response) {
    let name = request.body.name;
    let email = request.body.email;
    let message = request.body.message;

    if (!name || !email || !message) {
        return response.sendStatus(400)

    } 
    
    else {
        let result = transporter.sendMail({
            from: "ZIFF <alexander.khab@mail.ru>",
            to: "contact@ziff-net.com",
            subject: util.format("Message from %s", name),
            text: util.format("Message: %s From: %s Feedback: %s", message, name, email),
            html:
                util.format("Message: <i>%s</i><br>From: <i>%s</i><br>Feedback: <i>%s</i><br><br>This <i>message</i> was sent from <strong>ZIFF</strong> server.", message, name, email),
        
        });
        
        console.log(result);
        
    };

    console.log(request.body);

});

app.get("/get-involved", function (request, response) {
    response.sendFile(__dirname + "/html/get-involved.html");

});

app.get("/about", function (request, response) {
    response.sendFile(__dirname + "/html/about.html");

});

app.listen(3000);