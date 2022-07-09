import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../libs/server/client';
import Handler, { ResponseType } from "../../libs/server/Handler"
import { withApiSession } from '../../libs/server/WithSession';
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/7224a58f02977a44e7016381631c5cfa
/images/v1/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer -tHiOYxTSwnDqfeGL79ylStCXc59VuNPn1b9CYeq`,
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