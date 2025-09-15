export {};

export type Roles = "admin" | "judge";

export type Judge = "static" | "chall-1" | "chall-2" | "chall-3";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      judge?: Judge;
    };
  }
}
