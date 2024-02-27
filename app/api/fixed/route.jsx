import Res from "@utils/server/Res";
import serverAxios from "@utils/server/serverAxios";

export async function GET() {
  try {
    const response = {};

    const [images, movieGenres, tvGenres, countries] = await Promise.all([
      serverAxios.get("/configuration"),
      serverAxios.get("/genre/movie/list"),
      serverAxios.get("/genre/tv/list"),
      serverAxios.get("/configuration/countries"),
    ]);

    response.imageDetail = images.images;

    const newGenres = new Set([...movieGenres.genres, ...tvGenres.genres]);

    response.genres = [...newGenres];

    response.countries = countries;

    return Res(response);
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
}
