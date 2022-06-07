import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../../libs/server/client';
import Handler, { ResponseType } from "../../../../libs/server/Handler"
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from '../../../../libs/server/WithSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
  } = req;
  const favs = await client.fav.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: true,
    },
  });
  res.json({
    ok: true,
    favs,
  });
}
export default withApiSession(
  Handler({
    methods: ["GET"],
    handler,
  })
);