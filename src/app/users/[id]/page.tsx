import Image from "next/image";
import CharacterCard from "~/app/_components/characterCard";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

const User = async (props: { params: { id: string } }) => {
  const { id } = await props.params;
  const session = await auth();

  const isCurrentUser = session?.user.id === id;

  const [user, characters] = await Promise.all([
    api.user.getById({
      userId: id,
    }),
    api.character.getAllByUserId({
      userId: id,
    }),
  ]);

  const filteredCharacters = characters.filter((character) => {
    if (isCurrentUser) {
      return true;
    }
    return character.private === false;
  });

  return (
    <main className="flex w-4/5 grow gap-2 bg-gray-700/10 p-2">
      <div className="flex flex-col items-center gap-2 p-2">
        <Image
          src={
            user?.image ??
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
          }
          alt="User profile picture"
          width={360}
          height={360}
          quality={100}
          className="h-72 w-72 rounded-full outline-4 outline-white"
        />
        <h1 className="text-4xl font-bold">{user?.name}</h1>
        <div className="rounded bg-neutral-900 p-2">
          <h3 className="text-center">About</h3>
          <p>Details about the user will be displayed here.</p>
        </div>
      </div>
      <div className="flex grow flex-col gap-2">
        <h2 className="text-3xl font-bold">Characters</h2>
        <ul className="grid grid-cols-2 gap-2">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </ul>
      </div>
    </main>
  );
};
export default User;
