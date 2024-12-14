import priceInMillions from "@utils/javascript/priceInMillions";

const MediaDetailInfo = ({ details }) => {
  const {
    production_companies,
    production_countries,
    spoken_languages,
    revenue,
    budget,
    overview,
    created_by,
    description,
  } = details;

  return (
    <div className="p-16 tablet:px-5 flex flex-col items-start justify-between gap-12 relative z-10 w-full">
      {overview && (
        <div>
          <p className="details_title">overview</p>
          <p className="tracking-wider leading-6 tablet:text-sm">{overview}</p>
        </div>
      )}
      {description && (
        <div>
          <p className="details_title">DESCRIPTION</p>
          <p className="tracking-wider leading-6 sm:text-sm">{description}</p>
        </div>
      )}

      {budget && budget > 1 && (
        <div>
          <p className="details_title">BUDGET</p>
          <p className="sm:text-sm">{priceInMillions(budget)}</p>
        </div>
      )}

      {revenue && revenue > 1 && (
        <div>
          <p className="details_title">REVENUE</p>
          <p className="sm:text-sm">{revenue}</p>
          <p className="sm:text-sm">{priceInMillions(revenue)}</p>
        </div>
      )}

      {created_by && created_by.length > 0 && (
        <div>
          <p className="details_title">Created By</p>
          <div className="flex justify-start gap-4 flex-wrap">
            {created_by.map((by, i) => {
              return <div key={i}>{by.name}</div>;
            })}
          </div>
        </div>
      )}

      <div>
        <p className="details_title">PRODUCTION COMPANIES</p>
        <div className="flex justify-start gap-8 sm:gap-4 sm:flex-wrap">
          {production_companies.map((company, i) => {
            const { logo_path, name } = company;

            return (
              <p key={i} className="sm:text-sm">
                {name}
              </p>
            );
          })}
        </div>
      </div>

      <div>
        <p className="details_title">PRODUCTION COUNTRIES</p>
        <div className="flex justify-start gap-8">
          {production_countries.map((country, i) => {
            return (
              <p key={i} className="sm:text-sm ">
                {country.name}
              </p>
            );
          })}
        </div>
      </div>

      <div>
        <p className="details_title">AUDIO LANGUAGE</p>
        <div className="flex justify-start gap-6">
          {spoken_languages.map((language, i) => {
            return (
              <p key={i} className="sm:text-sm">
                {language.english_name}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MediaDetailInfo;
