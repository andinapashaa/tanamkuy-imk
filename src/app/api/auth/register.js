import { writeFile, readFile } from 'fs/promises'
import path from 'path'

const usersFile = path.join(process.cwd(), 'data', 'users.json')

export async function POST(req) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: 'Invalid input' }), { status: 400 })
  }

  const users = JSON.parse(await readFile(usersFile, 'utf-8'))

  const existing = users.find((u) => u.email === email)
  if (existing) {
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 409 })
  }

  users.push({ name, email, password })
  await writeFile(usersFile, JSON.stringify(users, null, 2))

  return new Response(JSON.stringify({ message: 'User registered' }), { status: 200 })
}
