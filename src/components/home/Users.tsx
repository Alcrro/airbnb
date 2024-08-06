import getUsers from "@/_lib/getUsers/GetUsers";
import React from "react";

interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: [Object];
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export default async function Users() {
  const users: IUsers[] = await getUsers();
  return (
    <div>
      {users.map((item, key) => (
        <li key={key}>{item.name}</li>
      ))}
    </div>
  );
}
