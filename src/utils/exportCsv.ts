export function convertToCSV(data: Record<string, string | number | boolean | null | undefined>[]) {
  if (data.length === 0) return '';

  const keys = Object.keys(data[0]);
  const csvRows = [
    keys.join(','),
    ...data.map(row =>
      keys.map(key => `"${(row[key] ?? '').toString().replace(/"/g, '""')}"`).join(',')
    ),
  ];

  return csvRows.join('\n');
}

export function downloadCSV(csv: string, filename = 'submissions.csv') {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
}
