import Link from "next/link";
import { auth } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { IoClose } from "react-icons/io5";

export default async function Builds() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex w-4/5 grow flex-col items-center divide-y divide-white/10">
        <div className="flex w-full flex-col gap-2 p-4">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">Character Builds</h1>
            <p className="w-1/2 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit at ad cumque consequatur soluta labore atque,
              praesentium voluptatibus tempore rerum, saepe eaque. Animi nisi,
              eos facere eius ea nostrum nobis.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href={session ? "/builds/create" : "/api/auth/signin"}
              className="rounded bg-green-600 px-4 py-2 font-bold text-shadow-black text-shadow-xs"
            >
              Create
            </Link>
            <Link
              href={session ? "/" : "/api/auth/signin"}
              className="rounded bg-white/10 px-4 py-2 font-bold text-shadow-2xs text-shadow-black"
            >
              Your Builds
            </Link>
          </div>
        </div>
        <div className="w-full p-4">
          <form action="" className="flex w-fit flex-col gap-2">
            <div className="flex gap-2">
              <select className="rounded bg-white/5 px-4 py-1 text-lg text-stone-500">
                <option value="" hidden>
                  Role
                </option>
                <option value="dps">DPS</option>
                <option value="healer">Healer</option>
                <option value="tank">Tank</option>
              </select>
              <select className="rounded bg-white/5 px-4 py-1 text-lg text-stone-500">
                <option value="" hidden>
                  Drifter
                </option>
                <option value="shadowseer">Shadowseer</option>
                <option value="kyra">Kyra</option>
                <option value="overdrive">Overdrive</option>
                <option value="varnax">Varnax</option>
                <option value="hive_queen">Hive Queen</option>
                <option value="raven">Raven</option>
                <option value="sirokos">Sirokos</option>
                <option value="stormblade">Stormblade</option>
                <option value="durion">Durion</option>
                <option value="helix">Helix</option>
                <option value="illusarch">Illusarch</option>
                <option value="draknor">Draknor</option>
                <option value="elektrix">Elektrix</option>
                <option value="firestorm">Firestorm</option>
                <option value="zero">Zero</option>
                <option value="nyxa">Nyxa</option>
                <option value="veska">Veska</option>
                <option value="solenne">Solenne</option>
                <option value="aegis">Aegis</option>
                <option value="revelation">Revelation</option>
                <option value="vryssia">Vryssia</option>
                <option value="mole">Mole</option>
                <option value="astral_magnus">Astral Magnus</option>
                <option value="auri">Auri</option>
                <option value="izzy">Izzy</option>
                <option value="sanguor">Sanguor</option>
                <option value="umbra">Umbra</option>
                <option value="moonveil">Moonveil</option>
              </select>
              <button
                type="reset"
                className="rounded bg-white/5 px-2 text-lg text-stone-500"
              >
                <IoClose />
              </button>
            </div>
            <div>
              <input
                type="search"
                name=""
                id="build_search_box"
                placeholder="Search..."
                className="w-full rounded bg-white/5 p-1 text-lg text-stone-500"
              />
            </div>
          </form>
        </div>
        <div className="flex w-full flex-col p-4">
          <h2>Builds</h2>
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded bg-white/5 p-2">
              <h2>Name</h2>
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
