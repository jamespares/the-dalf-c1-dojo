export const STATUS_MAP: Record<string, { label: string; variant: 'info' | 'warning' | 'success' | 'danger' }> = {
  in_progress: { label: 'In Progress', variant: 'info' },
  pending_marking: { label: 'Pending Marking', variant: 'warning' },
  completed: { label: 'Completed', variant: 'success' },
  marking_failed: { label: 'Marking Failed', variant: 'danger' },
};

export function formatStatus(status: string) {
  return STATUS_MAP[status] || { label: status.replace(/_/g, ' '), variant: 'info' as const };
}

export const SECTION_MAP: Record<string, string> = {
  CO: 'Listening',
  CE: 'Reading',
  PE: 'Writing',
  PO: 'Speaking',
};

export function formatSection(code: string) {
  return SECTION_MAP[code] || code;
}

export function formatErrorType(type: string) {
  if (!type) return type;
  return type.charAt(0).toUpperCase() + type.slice(1);
}
