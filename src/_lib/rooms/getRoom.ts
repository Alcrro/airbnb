export async function getRoom(id: string) {
  try {
    const response = await fetch(`${process.env.HOST_URI}/api/room/${id}`, {
      next: { revalidate: 86400 },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
