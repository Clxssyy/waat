import Link from "next/link";

const Footer = async () => {
  return (
    <footer className="flex w-full justify-center bg-neutral-800 p-4 text-neutral-300">
      <Link href={"/"}>WAA Builder</Link>
    </footer>
  );
};

export default Footer;
