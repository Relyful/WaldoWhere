export function convertDateToString(date) {
    const newDate = new Date(date);
    return (newDate.toLocaleString("en-GB"));
  };