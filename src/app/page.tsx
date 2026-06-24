import Rooms from "@/features/listings/components/Rooms";

interface Props {
  searchParams: { location?: string; checkIn?: string; checkOut?: string; guests?: string };
}

export default function Home({ searchParams }: Props) {
  return (
    <main>
      <Rooms searchParams={searchParams} />
    </main>
  );
}
