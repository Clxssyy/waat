import { auth } from "~/server/auth";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const Header = async () => {
  const session = await auth();

  return (
    <header className="flex min-h-16 w-full justify-center border-b border-neutral-800 bg-neutral-900">
      <div className="flex w-4/5 items-center justify-between bg-neutral-900 px-5">
        <h1>
          <Link
            href="/"
            className="text-2xl font-bold transition-colors hover:text-neutral-100"
          >
            WAAT
          </Link>
        </h1>
        <nav aria-label="Main Navigation">
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
          <div className="group relative">
            <Image
              src={
                session.user.image ??
                "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
              }
              alt="User profile picture"
              width={100}
              height={100}
              className="h-8 w-8 rounded-full outline-2 group-hover:outline-white"
            />
            <nav className="absolute right-0 hidden translate-2 rounded border-1 border-neutral-700 transition-colors group-hover:block before:absolute before:-top-4 before:h-4 before:w-full">
              <ul>
                <li className="bg-neutral-800 hover:brightness-125">
                  <Link
                    href={`/users/${session.user.id}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    <FaRegUser className="text-lg" /> Profile
                  </Link>
                </li>
                <li className="bg-neutral-800 hover:brightness-125">
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
            className="flex items-center gap-2 rounded px-2 py-1 transition-colors hover:bg-white/10"
          >
            Sign In <FiLogIn className="text-lg" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
