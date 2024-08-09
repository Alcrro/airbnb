export async function getSearchBar() {
  try {
    const response = await fetch(
      `${process.env.HOST_URI}/api/navbar/search-bar`,
      {
        cache: "force-cache",
      }
    );

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
