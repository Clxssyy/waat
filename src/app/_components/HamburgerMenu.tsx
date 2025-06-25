"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  IoBook,
  IoClose,
  IoHammer,
  IoHome,
  IoLogIn,
  IoLogOut,
  IoMenu,
  IoNewspaper,
  IoPerson,
} from "react-icons/io5";

export default function HamburgerToggle() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  if (!hasMounted) return null;

  const MenuLink = ({
    href,
    icon,
    label,
  }: {
    href: string;
    icon: React.ReactNode;
    label: string;
  }) => (
    <li className="w-full">
      <Link
        href={href}
        className="flex w-full items-center justify-center gap-2 p-3 transition hover:bg-neutral-800"
        onClick={() => setOpen(false)}
      >
        {icon} {label}
      </Link>
    </li>
  );

  return (
    <div className="relative flex items-center sm:hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle Menu"
        className="text-2xl"
      >
        {open ? <IoClose /> : <IoMenu />}
      </button>

      {/* Backdrop */}
      {open && <div className="fixed inset-0 z-40 bg-black/50" />}

      {/* Slide-in menu */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-neutral-900 shadow-lg transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-1 pt-16">
          <MenuLink href="/" icon={<IoHome />} label="Home" />
          <MenuLink href="/characters" icon={<IoHammer />} label="Builds" />
          <MenuLink href="/guides" icon={<IoBook />} label="Guides" />
          <MenuLink href="/news" icon={<IoNewspaper />} label="News" />

          {session?.user ? (
            <>
              <MenuLink
                href={`/users/${session.user.id}`}
                icon={<IoPerson />}
                label="Profile"
              />
              <MenuLink
                href="/api/auth/signout"
                icon={<IoLogOut />}
                label="Logout"
              />
            </>
          ) : (
            <MenuLink
              href="/api/auth/signin"
              icon={<IoLogIn />}
              label="Login"
            />
          )}
        </ul>
      </div>
    </div>
  );
}
