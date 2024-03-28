const useDistance = () => {
  const MetersToKilometers = (meters: number) => meters / 1000;
  const KilometersToMeters = (kilometers: number) => kilometers * 1000;

  const YardToMiles = (yard: number) => yard / 1760;
  const MilesToYard = (miles: number) => miles * 1760;

  const YardToMeters = (yard: number) => yard / 1.094;
  const MetersToYard = (meters: number) => meters * 1.094;

  const KilometersToMiles = (kilometers: number) => kilometers / 1.60934;
  const MilesToKilometers = (miles: number) => miles * 1.60934;

  const MetreToDistance = (metres: number) => {
    const kilometres = Math.floor(metres / 1000);
    const metresRestants = metres % 1000;

    const kilometreStr = kilometres > 0 ? `${kilometres} km, ` : '';
    const metreStr = metresRestants > 0 ? `${metresRestants} m` : '';

    let distanceString = kilometreStr + metreStr;
    if (distanceString === '') distanceString = '0 m';

    return distanceString;
  };

  return {
    MetreToDistance,
    MetersToKilometers,
    KilometersToMeters,
    YardToMiles,
    MilesToYard,
    YardToMeters,
    MetersToYard,
    KilometersToMiles,
    MilesToKilometers,
  };
};

export default useDistance;
