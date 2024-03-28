const useTime = () => {
  const SecondeToTime = (seconde: number) => {
    const jours = Math.floor(seconde / (3600 * 24));
    const heures = Math.floor((seconde % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconde % 3600) / 60);
    const secondes = seconde % 60;

    const joursStr = jours > 0 ? `${jours} jour${jours > 1 ? 's' : ''}, ` : '';
    const heuresStr =
      heures > 0 ? `${heures} heure${heures > 1 ? 's' : ''}, ` : '';
    const minutesStr =
      minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : '';

    let timeString = joursStr + heuresStr + minutesStr;
    if (timeString === '')
      timeString = `${secondes.toFixed(0)} seconde${secondes > 1 ? 's' : ''}`;

    return timeString;
  };

  return { SecondeToTime };
};

export default useTime;
