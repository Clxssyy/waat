import Link from "next/link";

const Footer = async () => {
  return (
    <footer className="flex w-full justify-center bg-stone-800 p-4 text-stone-300">
      <Link href={"/"}>WAA Builder</Link>
    </footer>
  );
};

export default Footer;
