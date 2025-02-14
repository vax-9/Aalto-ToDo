export function capitalizeFirstLetter(phrase: string): string {
  return String(phrase).charAt(0).toUpperCase() + String(phrase).slice(1);
}
