import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';
import Handler, { ResponseType } from "../../../libs/server/Handler"
import { withIronSessionApiRoute } from "iron-session/next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  const tokenExists = await client.token.findUnique({
    where:{
      payload: token,
    },
    // include: { user: true },  
  })
  if(!tokenExists) res.status(404).end();
  req.session.user = {
    id: tokenExists?.userId 
  }
  await req.session.save();
  console.log(tokenExists);
  console.log(token);
  res.status(200).end();
}

export default withIronSessionApiRoute(Handler("POST", handler), {
  cookieName: "baechusession",
  password: "7777777777777777777777777777777777777777777777777777"
}) ;