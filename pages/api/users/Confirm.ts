import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';
import Handler, { ResponseType } from "../../../libs/server/Handler"
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from '../../../libs/server/WithSession';

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
  if(!tokenExists) return res.status(404).end();
  req.session.user = {
    id: tokenExists.userId 
  }
  await req.session.save();
  // await client.token.deleteMany({
  //   where: {
  //     userId: tokenExists.userId,
  //   }
  // })
  console.log(tokenExists);
  console.log(token);
  res.json({ok: true});
}

export default withApiSession(
  Handler({ methods: ["POST"], handler, isPrivate: false })
);