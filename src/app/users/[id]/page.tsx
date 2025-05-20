import Link from "next/link";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";

const User = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await auth();

  const isCurrentUser = session?.user.id === id;

  const user = await api.user.getById({
    userId: id,
  });

  const characters = await api.character.getAllByUserId({
    userId: id,
  });

  const filteredCharacters = characters.filter((character) => {
    if (isCurrentUser) {
      return true;
    }
    return character.private === false;
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1>{user?.name}</h1>
        <p>Details about the user will be displayed here.</p>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg">Characters</h2>
        <ul className="flex flex-col">
          {filteredCharacters.map((character) => (
            <Link key={character.id} href={`/builds/${character.id}`}>
              {character.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default User;
