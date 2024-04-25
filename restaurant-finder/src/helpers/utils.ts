export function convertKilometersToMiles(kilometres: number) {
  const output = Number(kilometres) / 1.609344;
  return output;
}

export function convertMetresToMiles(metres: number) {
  return metres * 0.000621371192;
}

export function convertMileToMeters(miles: number) {
  return miles * 1609.344;
}

export function convertMetersToKilometers(meters: number) {
  return meters / 1000;
}
