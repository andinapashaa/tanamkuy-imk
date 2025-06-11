export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Data tidak lengkap' }), {
      status: 400,
    });
  }

  // Simulasi sukses register
  return new Response(JSON.stringify({ message: 'Register sukses!', user: body }), {
    status: 201,
  });
}
