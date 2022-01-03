export type Dr = 'u' | 'r' | 'l' | 'd'
export type Dg = 0 | 90 | 180 | 270
export type V = { v: string; dg: Dg }

export const drMapper: { [key in Dr]: string } = {
  u: '↑',
  d: '↓',
  r: '→',
  l: '←',
}
