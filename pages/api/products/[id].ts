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
    const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: +req.query.id,
        }
      }
    }
  })
    res.json({ok:true, product, relatedProducts})
}

export default withApiSession(
  Handler({
    methods: ["GET"],
    handler,
  })
);