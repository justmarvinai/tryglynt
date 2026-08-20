/** Completed years between an ISO birth date and a reference date. */
export function ageInYears(birthDate: string, on: Date = new Date()): number {
  const [y, m, d] = birthDate.split("-").map(Number);
  let age = on.getFullYear() - y;
  const beforeBirthday =
    on.getMonth() + 1 < m || (on.getMonth() + 1 === m && on.getDate() < d);
  if (beforeBirthday) age -= 1;
  return age;
}
