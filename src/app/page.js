import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* KIRI: Logo dan brand */}
      <div className="w-1/2 bg-[#E1E4B5] flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo-tanamkuy.png" // Logo disimpan di public/images/
            alt="TanamKuy Logo"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>

      {/* KANAN: Teks + ilustrasi + tombol */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center text-center px-8 py-12">
        <h2 className="text-2xl font-semibold text-[#3c5529] mb-8">
          Make your life greener!
        </h2>

        <Image
          src="/images/tanamkuy.png" 
          alt="Plant Girl Illustration"
          width={300}
          height={300}
        />

        <div className="flex gap-6 mt-10">
          <Link href="/login">
            <button className="bg-[#5e6845] hover:bg-[#4f5738] text-white px-8 py-2 rounded-full font-medium">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-[#c2cd89] hover:bg-[#b0bb74] text-white px-8 py-2 rounded-full font-medium">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
