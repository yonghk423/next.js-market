import { NextApiRequest, NextApiResponse } from 'next';
import client from "../../../../libs/server/client"
import Handler, { ResponseType } from "../../../../libs/server/Handler"
import { withApiSession } from '../../../../libs/server/WithSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    const { 
        query: {id},
        session: {user}
     } = req;
    const alreadyExists = await client.fav.findFirst({
        where: {
            productId : +id,
            userId: user?.id
        }
    })
    if(alreadyExists) {
        await client.fav.delete({
            where: {
                id: alreadyExists.id,
            },
        })
    } else {
        await client.fav.create({
            data: {
                user: {
                    connect: {
                        id: user?.id
                    },
                },
                product: {
                    connect: {
                        id: +id
                    }
                }
            }
        })
    }
    res.json({ok: true});
}

export default withApiSession(
  Handler({
    methods: ["POST"],
    handler,
  })
);