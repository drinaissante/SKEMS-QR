export default async function Page({ searchParams }) {
  const { id } = await searchParams;

  if (!id) {
    return <div>No ID provided</div>;
  }

  const res = await fetch(
    `${process.env.VERCEL_URL}/api/equipments?id=${id}`,
    {
      next: { revalidate: 30 },
    },
  );
  const data = await res.json();

  if (data.error) {
    return <div>Error: {data.error}</div>;
  }

  // TODO style
  return (
    <div className="p-20 bg-gray-300 text-black">
      <h1>{data.name}</h1>
      <p>{data.type}</p>
      <p>{data.owner}</p>
      <p>{data.date_given}</p>
      <p>{data.status}</p>
      <p>{data.created_at}</p>
    </div>
  );
}
