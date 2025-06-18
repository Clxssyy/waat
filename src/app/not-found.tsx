import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found flex w-full grow flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-4">
        <h2 className="border-r-1 border-neutral-600 py-2 pr-4 text-xl font-bold">
          404
        </h2>
        <p className="text-sm">This page could not be found.</p>
      </div>
      <Link href="/">Return</Link>
    </div>
  );
}
