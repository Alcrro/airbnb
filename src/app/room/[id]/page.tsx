import { getRoom } from "@/features/listings/lib/getRoom";
import RoomDetail from "@/features/listings/components/RoomDetail";
import HeartButton from "@/features/wishlist/components/HeartButton";
import { notFound } from "next/navigation";
import { Room, RoomImages } from "@/features/listings/types/room";

function getImageUrl(images: Room["images"]): string {
  if (!images) return "";
  if (typeof images === "string") return images;
  const img = images as RoomImages;
  return img.picture_url ?? img.medium_url ?? img.thumbnail_url ?? "";
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const data = await getRoom(params.id);
  const name = data?.room?.name;
  return { title: name ? `${name} - Airbnb` : "Room - Airbnb" };
}

export default async function page({ params }: { params: { id: string } }) {
  const data = await getRoom(params.id);

  if (!data?.room) {
    notFound();
  }

  const room = data.room as Room;

  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
        <HeartButton roomId={room._id} imageUrl={getImageUrl(room.images)} />
      </div>
      <RoomDetail room={room} />
    </div>
  );
}
