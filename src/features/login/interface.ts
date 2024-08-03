export const API_ROOT = "https://api.aodhagan.link/terror-tracker"

export interface UserData {
  readonly userId: string;
  readonly username: string;
  readonly avatar: string;
  readonly trust: number;
}

export interface OAuthPayload {
  readonly tokenType: string;
  readonly token: string;
}