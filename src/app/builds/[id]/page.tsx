const Builds = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <div>{id}</div>
    </div>
  );
};

export default Builds;
