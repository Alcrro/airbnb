export async function getRooms(location?: string, type?: string) {
  try {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (type) params.set("type", type);
    const qs = params.toString() ? `?${params.toString()}` : "";
    const response = await fetch(`${process.env.HOST_URI}/api/rooms${qs}`, {
      next: { revalidate: 86400 },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}
