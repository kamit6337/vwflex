const inHourAndMin = (runtime) => {
  if (!runtime) return null;

  const movieHour = Math.floor(runtime / 60);
  const movieMinute = runtime % 60;

  return `${movieHour}h ${movieMinute}min`;
};

export default inHourAndMin;
