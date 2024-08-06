import ReactGA from "react-ga4";

export const initGA = (measurement_id) => {
  ReactGA.initialize(measurement_id); // Replace with your Measurement ID
};

export const logPageView = (url) => {
  ReactGA.send({ hitType: "pageview", page: url });
};
