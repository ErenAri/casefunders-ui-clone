export function convertToCSV(data: Record<string, string | number | boolean | null | undefined>[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // header row
    ...data.map(row =>
      headers.map(field => {
        const val = row[field];
        const escaped = String(val ?? '').replace(/"/g, '""'); // handle quotes
        return `"${escaped}"`;
      }).join(',')
    )
  ];

  return csvRows.join('\n');
}

export function downloadCSV(csv: string, filename = 'data.csv') {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.display = 'none';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
