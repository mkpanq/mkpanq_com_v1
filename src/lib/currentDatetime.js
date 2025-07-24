const datetimeOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
  hour12: false,
  timeZone: "Europe/Warsaw",
};

export const returnNewDateTime = () => {
  return new Date().toLocaleString("en-US", datetimeOptions);
};

export const updateDateTime = (id) => {
  document.getElementById(id).textContent = returnNewDateTime();
};
