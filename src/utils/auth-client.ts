import { localStorageTokenKey } from 'config'
import { client } from 'utils/api-client'

type User = {
  id: string
  username: string
  passwordHash: string
}
type ResponseMe = {
  user: User
}
type ResponseUser = {
  user: User & { token: string }
}
type Credentials = { username: string; password: string }

function isResponseUser(
  response: ResponseMe | ResponseUser
): response is ResponseUser {
  return (response as ResponseUser).user.token !== undefined
}

function handleUserResponse(response: ResponseMe | ResponseUser): User {
  const { id, passwordHash, username } = response.user
  if (isResponseUser(response)) {
    window.localStorage.setItem(localStorageTokenKey, response.user.token)
  }
  return { id, passwordHash, username }
}

function getUser(): Promise<ResponseMe | null> {
  const token = getToken()
  if (!token) {
    return Promise.resolve(null)
  }
  return client<ResponseMe>('me').catch(error => {
    logout()
    // eslint-disable-next-line promise/no-return-wrap
    return Promise.reject(error)
  })
}

function login({ password, username }: Credentials): Promise<User> {
  const body = { password, username }
  return client<ResponseUser>('login', { body }).then(handleUserResponse)
}

function register({ username, password }: Credentials): Promise<User> {
  return client<ResponseUser>('register', {
    body: { password, username },
  }).then(handleUserResponse)
}

function logout(): Promise<void> {
  window.localStorage.removeItem(localStorageTokenKey)
  return Promise.resolve()
}

function getToken(): string | null {
  return window.localStorage.getItem(localStorageTokenKey)
}

export { login, register, logout, getToken, getUser }
