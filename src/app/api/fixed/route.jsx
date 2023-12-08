import Res from "@utils/server/Res";
import fetchReq from "@utils/server/fetchReq";



export async function GET() {
  try {
    const response = {};

    const [images, movieGenres, tvGenres, countries] = await Promise.all([
      fetchReq("/configuration"),
      fetchReq("/genre/movie/list"),
      fetchReq("/genre/tv/list"),
      fetchReq("/configuration/countries"),
    ]);

    const {
      images: { secure_base_url },
    } = images;

    response.imageUrl = `${secure_base_url}original`;

    const newGenres = new Set([...movieGenres.genres, ...tvGenres.genres]);

    response.genres = [...newGenres];

    response.countries = countries;

    return Res(response);
  } catch (error) {
    return Res({ error: error.message }, { status: error.status || 500 });
  }
}
