import type { IUser } from "../model/user.model.ts"

declare module "socket.io" {
    interface Socket {
        data: {
            user : IUser
        };
    }
}