function addOneDayToDate(dateRange: string) {
  // "~" 다음에 나오는 날짜 부분만 추출
  const endDateString = dateRange.split(" ~ ")[1];

  // 추출한 문자열을 Date 객체로 변환
  const endDate = new Date(endDateString);

  // 하루 더하기
  endDate.setDate(endDate.getDate() + 2);

  // 더한 날짜를 원하는 포맷으로 변환
  const newDateString = endDate.toISOString().split("T")[0].replace(/-/g, ".");

  return newDateString;
}

export default addOneDayToDate;
