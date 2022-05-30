import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';
import Handler from "../../../libs/server/Handler"
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

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  const { phone, email }:Data = req.body;
  console.log(phone);
  let user;
  if(email) {
      user = await client.user.findUnique({
      where: {
        email: email
      },
    });
    if(user) console.log("found it.")
    if(!user) {
      console.log("Did not find. Will create")
      user = await client.user.create({
        data: {
          name:"Anonymous",
          email:email,
        }
      })
    }
    console.log(user);
  }
//--------------------------------------------------------------------------------
  if(phone) {
    // console.log(phone);
      user = await client.user.findUnique({
      where: {
        phone:+phone,
      },
    });
    if(user) console.log("found it.")
    if(!user) {
      console.log("Did not find. Will create")
      user = await client.user.create({
        data: {
          name:"Anonymous",
          phone:+phone,
        }
      })
    }
    console.log(user);
  }
  return res.status(200).end()
}

export default Handler("POST", handler)