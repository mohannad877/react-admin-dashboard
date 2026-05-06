import DataTable from './DataTable';

const sampleColumns = [
  { field: 'name', header: 'الاسم', sortable: true },
  { field: 'email', header: 'البريد الإلكتروني', sortable: true },
  {
    field: 'role',
    header: 'الدور',
    sortable: false,
    cell: (row) => {
      const colors = {
        admin: 'bg-purple-100 text-purple-700',
        editor: 'bg-blue-100 text-blue-700',
        viewer: 'bg-slate-100 text-slate-600',
      };
      const labels = { admin: 'مدير', editor: 'محرر', viewer: 'مطلع' };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors[row.role] || ''}`}>
          {labels[row.role] || row.role}
        </span>
      );
    },
  },
];

const sampleData = [
  { id: '1', name: 'فاطمة الحربي', email: 'fatima@company.sa', role: 'admin' },
  { id: '2', name: 'محمد العمري', email: 'mohammed@company.sa', role: 'editor' },
  { id: '3', name: 'سارة الشمري', email: 'sara@company.sa', role: 'viewer' },
  { id: '4', name: 'خالد القحطاني', email: 'khaled@company.sa', role: 'editor' },
];

/**
 * مكون DataTable: جدول بيانات تفاعلي يدعم البحث والفرز.
 */
export default {
  title: 'UI/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'جدول بيانات ديناميكي يدعم البحث الفوري مع Debounce، الفرز بالضغط على الرأس، وعرض مكونات مخصصة داخل الخلايا.',
      },
    },
  },
  tags: ['autodocs'],
};

// ✅ الجدول الأساسي مع بيانات
export const Default = {
  args: {
    data: sampleData,
    columns: sampleColumns,
  },
};

// ✅ مع بحث
export const WithSearch = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    searchableColumns: ['name', 'email'],
  },
};

// ✅ مع فرز افتراضي
export const WithDefaultSort = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    searchableColumns: ['name'],
    initialSort: { field: 'name', direction: 'asc' },
  },
};

// ✅ الحالة الفارغة
export const EmptyState = {
  args: {
    data: [],
    columns: sampleColumns,
    searchableColumns: ['name'],
  },
};
