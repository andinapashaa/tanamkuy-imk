import { readFile } from 'fs/promises'
import path from 'path'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

export async function POST(req) {
  const { email, password } = await req.json()

  const users = JSON.parse(await readFile(usersFile, 'utf-8'))
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 })
  }

  return new Response(JSON.stringify({ message: 'Login success', user }), { status: 200 })
}
