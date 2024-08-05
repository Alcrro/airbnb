import getUsers from "@/_lib/getUsers/GetUsers";

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

export default async function Home() {
  const users: IUsers[] = await getUsers();

  return (
    <main className="">
      {users.map((item, key) => (
        <li key={key}>{item.name}</li>
      ))}
    </main>
  );
}
