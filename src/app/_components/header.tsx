import { auth } from "~/server/auth";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const session = await auth();

  return (
    <header className="flex h-16 w-full items-center justify-between bg-white/[1%] px-5">
      <div className="">
        <Link href="" className="">
          WAA Builder
        </Link>
      </div>
      <div className="flex gap-8">
        <Link href={""}>Builds</Link>
        <Link href={""}>Guides</Link>
      </div>
      <div className="flex items-center gap-2">
        {/* add default pfp image */}
        <Image
          src={session?.user.image || ""}
          alt="pfp"
          width={100}
          height={100}
          className="h-8 w-8 rounded-full"
        />
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
    </header>
  );
};

export default Header;
