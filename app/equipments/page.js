import EquipmentForm from "./EquipmentForm";

export default async function Page({ searchParams }) {
  const { id } = await searchParams;

  if (!id)
    return (
      <div className="min-h-screen bg-[#00000b] text-white flex items-center justify-center">
        No ID provided
      </div>
    );

  const res = await fetch(`${process.env.UURL}/api/equipments?id=${id}`, {
    next: { revalidate: 30 },
  });
  const data = await res.json();

  if (data.error)
    return (
      <div className="min-h-screen bg-[#00000b] text-white flex items-center justify-center">
        Error: {data.error}
      </div>
    );

  return <EquipmentForm data={data} id={id} />;
}
