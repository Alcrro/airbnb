export async function getRooms() {
  try {
    const response = await fetch(`${process.env.HOST_URI}/api/rooms`, {
      next: { revalidate: 86400 },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
