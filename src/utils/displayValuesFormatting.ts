export const formatDate = (date: Date, locale = 'pl-PL'): string => {
  return date.toLocaleDateString(locale);
};

export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const formatHour = (hour: number, locale = 'pl-PL'): string => {
  return new Date(hour).toLocaleTimeString(locale);
};
