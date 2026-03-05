import { Router, Request, Response } from "express";
import { requireAuth, optionalAuth } from "../middleware/auth";
const router = Router();
router.get("/", optionalAuth, (req: Request, res: Response) => res.render("home"));
router.get("/login", optionalAuth, (req: Request, res: Response) => {
  const err = req.query.err;
  const success = req.query.success;
  res.render("login", { err, success });
});
router.get("/profile", requireAuth, (req: Request, res: Response) => {
  res.render("profile", { user: (req as any).user });
});
export default router;
