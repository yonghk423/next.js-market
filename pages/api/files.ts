import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/server/client';
import Handler, { ResponseType } from "../../libs/server/Handler"
import { withApiSession } from '../../libs/server/WithSession';
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log(req.body);
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ID}/images/v1/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
        },
      }
    )
  ).json();
  console.log(response);
  res.json({
    ok: true,
    ...response.result,
  });
}

export default withApiSession(
  Handler({
    methods: ["GET"],
    handler,
  })
);