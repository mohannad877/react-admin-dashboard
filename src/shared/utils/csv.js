/**
 * 📄 CSV Utility
 * 
 * أدوات تحويل البيانات من/إلى صيغة CSV
 * - تدعم القيم التي تحتوي على فواصل وأسطر جديدة وعلامات اقتباس
 * - تدعم اللغة العربية بترميز UTF-8
 */

/**
 * تحويل مصفوفة من الكائنات إلى نص CSV
 * @param {Object[]} data - مصفوفة الكائنات
 * @param {string[]} [columns] - أعمدة محددة (اختياري، الافتراضي: جميع المفاتيح)
 * @returns {string} - نص CSV
 */
export const objectsToCSV = (data, columns = null) => {
  if (!data || data.length === 0) return '';

  const headers = columns ?? Object.keys(data[0]);

  const escapeCell = (value) => {
    const str = value === null || value === undefined ? '' : String(value);
    // إذا كانت القيمة تحتوي على فاصلة أو سطر جديد أو علامة اقتباس، نضعها بين علامتَي اقتباس
    if (str.includes(',') || str.includes('\n') || str.includes('"')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(h => escapeCell(row[h])).join(',')
    )
  ];

  return '\uFEFF' + rows.join('\n'); // BOM للدعم الصحيح في Excel
};

/**
 * تحويل نص CSV إلى مصفوفة من الكائنات
 * @param {string} csvText - نص CSV
 * @returns {{ headers: string[], rows: Object[] }}
 */
export const csvToObjects = (csvText) => {
  // إزالة BOM إذا وُجد
  const text = csvText.replace(/^\uFEFF/, '').trim();
  if (!text) return { headers: [], rows: [] };

  const lines = text.split('\n').map(l => l.replace(/\r$/, ''));
  if (lines.length < 2) return { headers: parseLine(lines[0]), rows: [] };

  const headers = parseLine(lines[0]);
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const values = parseLine(lines[i]);
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = values[idx] ?? '';
    });
    rows.push(obj);
  }

  return { headers, rows };
};

/**
 * تحليل سطر CSV واحد مع احترام علامات الاقتباس
 * @param {string} line
 * @returns {string[]}
 */
const parseLine = (line) => {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
  }
  result.push(current);
  return result;
};

/**
 * تنزيل نص CSV كملف
 * @param {string} csvContent - محتوى CSV
 * @param {string} filename - اسم الملف
 */
export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * قراءة ملف CSV من input type=file
 * @param {File} file
 * @returns {Promise<string>}
 */
export const readCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = () => reject(new Error('فشل قراءة الملف'));
    reader.readAsText(file, 'UTF-8');
  });
};
