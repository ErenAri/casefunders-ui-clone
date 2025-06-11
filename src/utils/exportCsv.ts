export function convertToCSV(objArray: any[]) {
  const header = Object.keys(objArray[0]).join(',');
  const rows = objArray.map(obj => Object.values(obj).join(','));
  return [header, ...rows].join('\r\n');
}

export function downloadCSV(data: string, filename = 'submissions.csv') {
  const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
}
