    const {Router} = require('express');
    const express = require('express');
    const nodemailer = require('nodemailer');
    const { google, GoogleApis } = require('googleapis');
    const router = express.Router();

    router.get('/' , (req, res) => res.render('index.html'));
    router.post("/enviar_correo", (req, res)=>{
            
            //  console.log(req.body);  //datos enviados desde el body de html
            const{nombre,email,phone,mensaje} = req.body; // guardamos en una constante los datos del formulario(nombre,ema,pho,men)
           
            contentHtml =`<h1>Informacion del servicio</h1>
            <ul>
                <li>NOMBRE:${nombre} </li>
                <li>CORREO:${email} </li>
                <li>CELULAR:${phone} </li>
                <li>MENSAJE:${mensaje} </li>
            </ul>`

            console.log(contentHtml);

            res.send('mensaje enviado exitosamente');
        //  res.render('index'); // renderiza a index.ejs

        const CLIENT_ID="482077326358-5i4460bt2eb3rpd1pe7nmkmrifjp33kl.apps.googleusercontent.com";
        const CLIENT_SECRET="xCCTtAs7yAa1FXr0OqPveT5T";
        const REDIRECT_URI="https://developers.google.com/oauthplayground";
        const REFRESH_TOKEN="1//04B3sL8uDbsG6CgYIARAAGAQSNwF-L9IrYodsiNR-Iqv4-KbpEdb7zRuMq45pjrw4gP5ahEYGf1uPtcr_WQJfTYVz9_fMNb6EL7k";
        
        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,CLIENT_SECRET,REDIRECT_URI
        );

        oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

        async function correoenviar(){
            try{
                const accestoken= await oAuth2Client.getAccessToken()
                const transport = nodemailer.createTransport({
                    service:"gmail",
                    auth :{
                        type: "oAuth2",
                        user:"tecnicentervillavicencio@gmail.com",
                        clientid: CLIENT_ID,
                        clientsecret:CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accestoken:accestoken
                    },       
                
                });

                const mailOptions={
                    from: "TECNICENTER WEB <tecnicentervillavicencio@gmail.com>",
                    to: "tecnicentervillavicencio@gmail.com",            //duda si es el correo de la empresa o del cliente.
                    subject:"PRUEBA TECNICENTER WEB",
                    html: contentHtml,
                };

               const result= await transport.correoenviar(mailOptions);
               return result;

            } catch(err){
                console.log(err);
            }
        }
        correoenviar()
        .then(result=>res.status(200).send("enviado"))
        .catch ((error)=> console.log(error.mensaje));
    });

    module.exports = router ;

    // token de api de gmailpara correo 

    // https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&prompt=consent&response_type=code&client_id=407408718192.apps.googleusercontent.com&scope=https%3A%2F%2Fmail.google.com&access_type=offline