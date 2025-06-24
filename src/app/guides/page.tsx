import Link from "next/link";
import Footer from "../_components/Footer";
import PlaceholderCard from "../_components/PlaceholderCard";

const Guides = () => {
  return (
    <>
      <main className="flex w-4/5 grow flex-col divide-y divide-neutral-700 bg-gray-700/10">
        <div className="p-2">
          <h1 className="text-center text-2xl font-bold text-shadow-black text-shadow-sm">
            Guides
          </h1>
          <p className="text-center text-xs text-neutral-300">
            ({" "}
            <span className="text-red-400">
              No guides available as of now, consider trying the character
              creator{" "}
            </span>
            <Link href={"/characters"} className="text-neutral-300 underline">
              here
            </Link>
            <span className="text-red-400">!</span> )
          </p>
        </div>
        <div className="grid-col-1 grid gap-2 p-2 sm:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <PlaceholderCard key={i} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Guides;
