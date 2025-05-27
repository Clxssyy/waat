import { auth } from "~/server/auth";
import Image from "next/image";
import Link from "next/link";
import { PiSignOutBold } from "react-icons/pi";

const Header = async () => {
  const session = await auth();

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-neutral-800 bg-neutral-900 px-5">
      <div className="text-lg font-bold">
        <Link href="/">WAAT</Link>
      </div>
      <div className="flex gap-8">
        <Link href={"/characters"}>Builds</Link>
        <Link href={"/guides"}>Guides</Link>
        <Link href={"/news"}>News</Link>
      </div>
      <div className="flex items-center gap-2">
        {session ? (
          <Image
            src={
              session?.user.image ??
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
            }
            alt="pfp"
            width={100}
            height={100}
            className="h-8 w-8 rounded-full"
          />
        ) : null}
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          aria-label="Sign out"
        >
          {session ? <PiSignOutBold className="text-lg" /> : "Sign in"}
        </Link>
      </div>
    </header>
  );
};

export default Header;
