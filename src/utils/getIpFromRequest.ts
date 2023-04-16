import { Request } from "express";
export function getIp(req: Request): string | undefined {
  if (req.headers["X-Real-IP"]) {
    return req.headers["X-Real-IP"] as string;
  }
  if (req.ip) {
    return req.ip.split(":").pop()!;
  }
}
