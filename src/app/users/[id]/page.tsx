import { api } from "~/trpc/server";

const User = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const user = await api.user.getById({
    userId: id,
  });

  return (
    <div>
      <h1>{user?.name}</h1>
      <p>Details about the user will be displayed here.</p>
    </div>
  );
};
export default User;
