import { type NextApiRequest, type NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request (CORS)
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  res.status(200).json({ message: "This is a hidden API route" });
};

export default handler;
