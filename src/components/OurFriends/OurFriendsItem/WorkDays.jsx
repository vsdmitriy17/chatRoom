const WorkDays = ({  workDays }) => {
  const data = new Date();
  const getTodayIndex = (data) => (data.getDay() + 6) % 7;
  const day = getTodayIndex(data)
  const workInfoToday = workDays[day]

  function getOpenNow(workInfoToday, date) {
    const { isOpen, from, to } = workInfoToday;
    const hour = date.getHours();
    const openTime = parseInt(from);
    const closeTime = parseInt(to);

    return `${hour}`.padStart(2, '0').slice(0, 2) >= openTime && `${hour}`.padStart(2, '0').slice(0, 2) < closeTime;
}

  const isOpenNow = getOpenNow(workInfoToday, data)

  return <p>
    {isOpenNow
      ? workInfoToday.from + ' - ' + workInfoToday.to
      : 'Closed now'}
  </p>
}

export default WorkDays