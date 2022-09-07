import type { NextApiRequest, NextApiResponse } from "next";

import getConstructorById from "src/util/json/getConstructorById";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    res.status(200).json(getConstructorById(id));
}
