// eslint-disable-next-line unicorn/filename-case
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}
