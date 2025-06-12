export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email dan password wajib diisi.' }), {
      status: 400,
    });
  }
const dummyUser = {
  email: 'chococaolate@gmail.com',
  password: 'cokelatenak',
  name: 'Andina Pasha',
};

  if (email === dummyUser.email && password === dummyUser.password) {
    return new Response(
      JSON.stringify({ message: 'Login berhasil', user: dummyUser }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({ message: 'Email atau password salah' }),
      { status: 401 }
    );
  }
}
