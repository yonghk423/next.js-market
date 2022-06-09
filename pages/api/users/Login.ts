import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';
import Handler, { ResponseType } from "../../../libs/server/Handler"
const nodemailer = require("nodemailer");

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    /*  const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}.`,
    });
    console.log(message); */
  } else if (email) {
    /* const email = await mail.send({
      from: "nico@nomadcoders.co",
      to: "nico@nomadcoders.co",
      subject: "Your Carrot Market Verification Email",
      text: `Your token is ${payload}`,
      html: `<strong>Your token is ${payload}</strong>`,
    });
    console.log(email); */
  }
  return res.json({
    ok: true,
  });
}

// const transporter = nodemailer.createTransport({
//   service: "Naver",
//   host: 'smtp.naver.com',
//   port: 587,

//   auth: {
//     user: process.env.NAVER_ID,
//     pass: process.env.NAVER_PWD,
//     },
//   });

// const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

// interface Data {
//   email:string;
//   phone:string;
// }

// async function handler(
//   req: NextApiRequest, 
//   res: NextApiResponse<ResponseType>
//   ) {  
//   const { phone, email  }:Data = req.body;  
//   const user = phone ? { phone: phone } : email ? { email } : null;
//     console.log(user)
//   if(!user) return res.status(400).json({ok: false});
//   const payload = Math.floor(100000 + Math.random() * 900000) + "";
//   const token = await client.token.create({
//     data: {
//       payload,
//       user: {
//         connectOrCreate: {
//           where: {
//             ...user,
//           },
//           create: {
//             name: "Anonymous",
//             ...user,
//           },
//         },
//       },
//     },    
//   });

  // if (phone) {
  //   const message = await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_MSID,
  //     to: process.env.MY_PHONE!,
  //     body: `Your login token is ${payload}.`,
  //   });
  //   console.log(message);
  // } else if (email) {
  //     const sendEmail = await transporter.sendMail({
  //       from: `hello <yonghk423@naver.com>`,
  //       to: email,
  //       subject: 'token',
  //       text: `your login token is ${payload}`,
  //       html: `
  //         <div style="text-align: center;">
  //           <h3 style="color: #FA5882">hello</h3>
  //           <br />
  //           <p>your login token is ${payload}</p>
  //         </div>
  //     `})
  //     .then((result: any) => console.log(result))
  //     .catch((err: any) => console.log(err))
  //   }
  
  

  // return res.json({
  //   ok: true,
  // })  

  // export default async function handler(
//     req:NextApiRequest, 
//     res:NextApiResponse
// ){
//   if(req.method !== "POST") {
//     res.status(401).end();
//   }
//   console.log(req.body);
//   res.json({ ok: true });
// }

  // if(email) {
  //     user = await client.user.findUnique({
  //     where: {
  //       email: email
  //     },
  //   });
  //   if(user) console.log("found it.")
  //   if(!user) {
  //     console.log("Did not find. Will create")
  //     user = await client.user.create({
  //       data: {
  //         name:"Anonymous",
  //         email:email,
  //       }
  //     })
  //   }
  //   console.log(user);
  // }
//--------------------------------------------------------------------------------
  // if(phone) {
  //   // console.log(phone);
  //     user = await client.user.findUnique({
  //     where: {
  //       phone:+phone,
  //     },
  //   });
  //   if(user) console.log("found it.")
  //   if(!user) {
  //     console.log("Did not find. Will create")
  //     user = await client.user.create({
  //       data: {
  //         name:"Anonymous",
  //         phone:+phone,
  //       }
  //     })
  //   }
  //   console.log(user);
  // }
// }

export default Handler({ methods: ["POST"], handler, isPrivate: false });