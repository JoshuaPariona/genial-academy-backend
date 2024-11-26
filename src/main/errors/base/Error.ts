export interface Error {
  code: string;
  msg: string;
  cause?: string;
  solution?: string;
}

export enum ErrorTokens {
  "Code",
  "Msg"
}
