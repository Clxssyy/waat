"use client";

import { redirect, usePathname } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const newPathname = pathname.replace("/rate", "");
  redirect(newPathname);
};

export default Page;
