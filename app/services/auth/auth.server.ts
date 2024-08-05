import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/auth/session.server";

export const authenticator = new Authenticator<{ id: string }>(sessionStorage);
