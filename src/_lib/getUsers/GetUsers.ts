export default async function getUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
      cache: "force-cache",
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
}
