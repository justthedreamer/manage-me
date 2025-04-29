export function formatDateToEuropean(date: Date): string {
    const d = new Date(date);
    return `${d.getDay()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
}