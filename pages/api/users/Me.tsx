import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';
import Handler, { ResponseType } from "../../../libs/server/Handler"
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from '../../../libs/server/WithSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  res.json({
    ok: true,
    profile,
  });
  }

export default withApiSession(
  Handler({
    methods: ["GET"],
    handler,
  })
);