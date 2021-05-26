let dateTimeFormat;

function getDateTimeFormat() {
  if (!dateTimeFormat) {
    dateTimeFormat = new Intl.DateTimeFormat("es", {
      timeStyle: "short",
      dateStyle: "short"
    });
  }

  return dateTimeFormat;
}

function getDateTime(date) {
  if (typeof date === "string") {
    date = new Date(date);
  }

  const timestamp = `${date.getHours()}:${date.getMinutes()}`;
  const dtf = getDateTimeFormat();

  return {
    datetime: dtf.format(date),
    timestamp
  };
}

export default getDateTime;
