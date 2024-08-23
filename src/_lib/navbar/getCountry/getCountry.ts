export async function getCountries() {
  try {
    const response = await fetch(`${process.env.HOST_URI}/api/navbar-filters`);

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
