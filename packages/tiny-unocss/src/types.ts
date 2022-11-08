export type TinyUnocssCssObject = Record<string, string | undefined>
export type TinyUnocssCssRule = [string, TinyUnocssCssObject]
export type TinyUnocssRule = [RegExp, (match: string[]) => string | TinyUnocssCssRule | undefined]
export interface TinyUnocssConfig {
  rules: TinyUnocssRule[]
}
