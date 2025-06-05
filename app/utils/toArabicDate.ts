export function toArabicDate(date: Date | string) {
  return new Date(date).toLocaleString('ar', {
    weekday: 'long', // Output: "الخميس"
    year: 'numeric', // Output: "2025"
    month: 'long', // Output: "مايو"
    day: 'numeric', // Output: "29"
  })
}
