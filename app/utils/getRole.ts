const roles = ['مشرف', 'إداري', 'أكاديمي', 'مندوب', 'طالب']

export function getRole(id: number | string): string {
  return roles[Number(id) - 1]
}
