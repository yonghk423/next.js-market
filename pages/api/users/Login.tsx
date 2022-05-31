
import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';
import Handler, { ResponseType } from "../../../libs/server/Handler"

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

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

interface Data {
  email:string;
  phone:string;
}

async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ResponseType>
  ) {
  console.log(req.body);
  const { phone, email }:Data = req.body;  
  const user = phone ? { phone: +phone } : email ? { email} : null;
  if(!user) return res.status(400).json({ok: false});
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
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}.`,
    });
    console.log(message);
  }  
  return res.json({
    ok: true,
  })
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
}

export default Handler("POST", handler)