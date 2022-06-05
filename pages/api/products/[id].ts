import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';
import Handler, { ResponseType } from "../../../libs/server/Handler"
import { withApiSession } from '../../../libs/server/WithSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const product = await client.product.findUnique({
        where: {
            id: +req.query.id
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    avater: true,
                }
            }
        }
    });
    console.log(product);
    res.json({ok:true, product})
}

export default withApiSession(
  Handler({
    methods: ["GET"],
    handler,
  })
);