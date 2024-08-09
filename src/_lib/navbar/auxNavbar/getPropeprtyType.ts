export async function getPropertyType() {
  try {
    const response = await fetch(`${process.env.HOST_URI}/api/aux-bar`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      next: { revalidate: 86400 },
    });

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
