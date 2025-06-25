import { auth } from "~/server/auth";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import HamburgerToggle from "./HamburgerMenu";
import { SessionProvider } from "next-auth/react";

const Header = async () => {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-center border-b border-neutral-800 bg-neutral-900">
      <div className="flex w-4/5 items-center justify-between">
        <h1>
          <Link
            href="/"
            className="text-2xl font-bold transition-colors hover:text-neutral-200"
          >
            WAAT
          </Link>
        </h1>
        <nav aria-label="Main Navigation" className="hidden sm:block">
          <ul className="flex gap-4">
            <li>
              <Link
                href={"/characters"}
                className="rounded px-2 py-1 transition-colors hover:bg-white/10"
              >
                Builds
              </Link>
            </li>
            <li>
              <Link
                href={"/guides"}
                className="rounded px-2 py-1 transition-colors hover:bg-white/10"
              >
                Guides
              </Link>
            </li>
            <li>
              <Link
                href={"/news"}
                className="rounded px-2 py-1 transition-colors hover:bg-white/10"
              >
                News
              </Link>
            </li>
          </ul>
        </nav>
        {session ? (
          <div className="group relative hidden sm:block">
            <Image
              src={session.user.image ?? "/default-avatar.jpg"}
              alt="User profile picture"
              width={100}
              height={100}
              className="h-8 w-8 rounded-full outline-2 group-hover:outline-white"
            />
            <nav className="absolute right-0 hidden translate-2 rounded border-1 border-neutral-700 transition-colors group-hover:block before:absolute before:-top-4 before:h-4 before:w-full">
              <ul>
                <li className="bg-neutral-800 hover:brightness-110">
                  <Link
                    href={`/users/${session.user.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    <FaRegUser className="text-lg" /> Profile
                  </Link>
                </li>
                <li className="bg-neutral-800 hover:brightness-110">
                  <Link
                    href={"/api/auth/signout"}
                    className="flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    <FiLogOut className="text-lg" />
                    Logout
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <Link
            href={"/api/auth/signin"}
            className="hidden items-center gap-2 rounded px-2 py-1 transition-colors hover:bg-white/10 sm:flex"
          >
            Sign In <FiLogIn className="text-lg" />
          </Link>
        )}
      </div>
      <SessionProvider session={session}>
        <HamburgerToggle />
      </SessionProvider>
    </header>
  );
};

export default Header;
