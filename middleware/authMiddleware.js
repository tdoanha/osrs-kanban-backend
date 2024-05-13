// authMiddleware.js

const env = require("dotenv");
env.config();

function requireCustomHeader(req, res, next) {
  const customHeaderValue = req.headers["osrs-kanban-auth"];

  if (
    !customHeaderValue ||
    customHeaderValue !== process.env.OSRS_KANBAN_AUTH_VALUE
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // If the header is present and valid, proceed to the next middleware or route handler
  next();
}

module.exports = requireCustomHeader;
