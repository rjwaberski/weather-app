export const getLocation = (): Promise<Position> => {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not available.'));
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        resolve(pos);
      },
      err => {
        reject(err);
      },
    );
  });
};
