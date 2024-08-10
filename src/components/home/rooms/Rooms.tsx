import { getRooms } from "@/_lib/rooms/getRooms";
import React from "react";
import "./rooms.scss";
import Link from "next/link";
import Image from "next/image";
import ImagesRoom from "./imagesRoom/ImagesRoom";

export default async function Rooms() {
  const { rooms } = await getRooms();

  return (
    <div className="rooms">
      <div className="rooms-list">
        <ul>
          {rooms.map((item: any, key: number) => (
            <li key={key}>
              <Link href={`/room/${item._id}`}>
                {/* <div className="image">
                  <Image
                    src={item.images}
                    alt="room"
                    width={1000}
                    height={1000}
                  ></Image>
                </div> */}
                <ImagesRoom item={item} />
                <div className="name location">
                  {item.name}, {item.country}
                </div>
                <div className="hosted-by">{item.host_name}</div>
                <div className="price">{item.price.$numberDecimal} $</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
