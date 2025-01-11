
export { }

export type Roles = user | admin | guest | dashboard_admin

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      target?: string
      role?: Roles
    }
  }
}
