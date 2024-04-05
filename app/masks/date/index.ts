function formatBrazilianDate(isoDate: Date) {
  const date = new Date(isoDate);

  const formatNumber = (value: any) => (value < 10 ? `0${value}` : value);

  const day = formatNumber(date.getDate());
  const month = formatNumber(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = formatNumber(date.getHours());
  const minutes = formatNumber(date.getMinutes());
  const seconds = formatNumber(date.getSeconds());

  return `${day}/${month}/${year} | ${hours}:${minutes}:${seconds}`;
}

function calculateTimeDifference(expirationDate:Date) {
    const expiration = new Date(expirationDate);
    let intervalId: NodeJS.Timeout;
    const updateRemainingTime = () => {
      const now = new Date();
      let differenceInMilliseconds = expiration.getTime() - now.getTime();
  
      if (differenceInMilliseconds < 0) {
        clearInterval(intervalId);
        return "00:00:00";
      }
  
      const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
      const hours = Math.floor(differenceInSeconds / 3600);
      const minutes = Math.floor((differenceInSeconds % 3600) / 60);
      const seconds = differenceInSeconds % 60;
  
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
  
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };
  
    return updateRemainingTime();
  }
export { formatBrazilianDate, calculateTimeDifference };
