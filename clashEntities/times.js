export const SECONDS = 1
export const MINUTES = 60;
export const HOURS = 3600;
export const DAYS = 86400;

export const convertSeconds = (seconds) => {
  const res = {
    seconds: 0,
    minutes: 0,
    hours: 0,
    days: 0
  }
  res.days = Math.floor(seconds / DAYS)
  seconds = seconds % DAYS;
  res.hours = Math.floor(seconds / HOURS)
  seconds = seconds % HOURS
  res.minutes = Math.floor(seconds / MINUTES)
  seconds = seconds % MINUTES
  res.seconds = seconds
  return res
}
