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
    if(req.method === "GET") {
      const products = await client.product.findMany({
        include: {
          _count : {
            select : {
              favs: true,
            }
          }
        }
      });
      res.json({
        ok:true,
        products,
      })
    }
    if(req.method === "POST") {
      const {
        body: { name, price, description },
        session: { user },
    } = req;
    
  const product = await client.product.create({
        data: {
            name,
            price: +price,
            description,
            image: "",
            user: {
                connect: {
                    id: user?.id,
                }
            }
        }
    })
    res.json({
        ok:true,
        product,
    })  
    }
  }

export default withApiSession(
  Handler({
    methods: ["GET" , "POST"],
    handler,
  })
);