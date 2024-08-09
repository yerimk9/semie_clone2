function addOneDayToDate(dateRange: string) {
  const endDateString = dateRange.split(" ~ ")[1];

  const endDate = new Date(endDateString);

  endDate.setDate(endDate.getDate() + 2);

  const newDateString = endDate.toISOString().split("T")[0].replace(/-/g, ".");

  return newDateString;
}

export default addOneDayToDate;
