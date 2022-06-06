import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../../libs/server/client';
import Handler, { ResponseType } from "../../../libs/server/Handler"
import { withIronSessionApiRoute } from "iron-session/next";
import { withApiSession } from '../../../libs/server/WithSession';

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
      query: { id },
  } = req;
  const post = await client.post.findUnique({
      where: {
          id: +id,
      },
      include: {
          user: {
              select: {
                  id: true,
                  name: true,
                  avatar: true,
              }
          },
          answers: {
            select: {
              answer:true,
              id:true,
              user: {
                select: {
                  id:true, 
                  name:true,
                  avatar:true,
                },
              }
            }
          },
          _count: {
            select: {
              answers:true,
              wondering:true,
            }            
          }
      }
  })  
  res.json({
    ok: true,
    post,
  });
}


export default withApiSession(
  Handler({
    methods: ["GET"],
    handler,
  })
);