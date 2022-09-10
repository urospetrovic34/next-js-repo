import type { NextApiRequest, NextApiResponse } from "next";

import getSeasonByDecade from "src/util/json/getSeasonByDecade";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    res.status(200).json(getSeasonByDecade(id));
}
