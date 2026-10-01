import rateLimit from "express-rate-limit";

const createLimiter = (limit, message) =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { success: false, message },
  });

export const loginLimiter = createLimiter(
  5,
  "Too many login attempts. Try again in 15 minutes."
);

export const contactLimiter = createLimiter(
  5,
  "Too many contact submissions. Try again in 15 minutes."
);

export const pageViewLimiter = createLimiter(
  120,
  "Too many page-view events."
);