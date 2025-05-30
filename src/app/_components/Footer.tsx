import Link from "next/link";

const Footer = async () => {
  return (
    <footer className="flex min-h-16 w-full justify-center border-t border-neutral-800 bg-neutral-900">
      <div className="flex w-4/5 items-center justify-center bg-neutral-900 px-5">
        <Link href={"/"} className="text-neutral-300">
          WAA Builder
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
