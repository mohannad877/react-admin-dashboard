import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { useDebounce } from '../../../application/hooks/useDebounce';

export default function DataTable({ 
  data = [], 
  columns = [], 
  searchableColumns = [],
  initialSort = { field: null, direction: 'asc' },
  onSort
}) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(initialSort);
  const debouncedSearch = useDebounce(search, 300);

  const filteredData = useMemo(() => {
    if (!debouncedSearch) return data;
    return data.filter(item => 
      searchableColumns.some(col => 
        String(item[col] || '').toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [data, debouncedSearch, searchableColumns]);

  const sortedData = useMemo(() => {
    if (!sort.field) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sort.field];
      const bVal = b[sort.field];
      if (aVal === bVal) return 0;
      const modifier = sort.direction === 'asc' ? 1 : -1;
      return aVal > bVal ? modifier : -modifier;
    });
  }, [filteredData, sort]);

  const handleSort = (field) => {
    const newSort = {
      field,
      direction: sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc'
    };
    setSort(newSort);
    if (onSort) onSort(newSort.field, newSort.direction);
  };

  return (
    <div className="space-y-4">
      {searchableColumns.length > 0 && (
        <div className="relative max-w-xs">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="بحث..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-4 py-2.5 rounded-lg border border-slate-200 
              dark:border-slate-700 bg-white dark:bg-slate-800 
              text-slate-900 dark:text-slate-100 
              focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none
              text-sm transition-colors"
            aria-label="بحث في الجدول"
          />
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-900/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.field}
                  onClick={() => col.sortable && handleSort(col.field)}
                  className={`px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider select-none
                    ${col.sortable ? 'cursor-pointer hover:text-teal-600 dark:hover:text-teal-400 transition-colors' : ''}
                  `}
                  scope="col"
                >
                  <div className="flex items-center gap-1 justify-end">
                    {col.header}
                    {col.sortable && (
                      <span className="flex flex-col">
                        <ChevronUp className={`w-3 h-3 -mb-1 ${sort.field === col.field && sort.direction === 'asc' ? 'text-teal-600' : 'text-slate-300 dark:text-slate-600'}`} />
                        <ChevronDown className={`w-3 h-3 ${sort.field === col.field && sort.direction === 'desc' ? 'text-teal-600' : 'text-slate-300 dark:text-slate-600'}`} />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-100 dark:divide-slate-700/50">
            {sortedData.length > 0 ? (
              sortedData.map((row, idx) => (
                <tr 
                  key={row.id || idx} 
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors duration-150"
                >
                  {columns.map((col) => (
                    <td key={col.field} className="px-4 py-3.5 text-sm text-slate-800 dark:text-slate-200">
                      {col.cell ? col.cell(row) : row[col.field]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Search className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    <p className="text-slate-500 dark:text-slate-400 text-sm">لا توجد نتائج مطابقة لبحثك</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {sortedData.length > 0 && (
        <p className="text-xs text-slate-400 dark:text-slate-500 text-left">
          عرض {sortedData.length} من {data.length} سجل
        </p>
      )}
    </div>
  );
}
