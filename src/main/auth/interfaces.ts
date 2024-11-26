import { UserEntity } from "../entities/UserEntity";

export type JwtPayload = {
  sub: string;
  role: string;
};

export type JwtJson = {
  accessToken: string;
  user: UserEntity;
}
