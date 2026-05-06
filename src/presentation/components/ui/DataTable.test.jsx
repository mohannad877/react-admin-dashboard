import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DataTable from './DataTable';

// بيانات اختبار وهمية
const mockColumns = [
  { field: 'name', header: 'الاسم', sortable: true },
  { field: 'email', header: 'البريد', sortable: true },
  { field: 'role', header: 'الدور', sortable: false },
];

const mockData = [
  { id: '1', name: 'فاطمة الحربي', email: 'fatima@company.com', role: 'admin' },
  { id: '2', name: 'محمد العمري', email: 'mohammed@company.com', role: 'editor' },
  { id: '3', name: 'سارة الشمري', email: 'sara@company.com', role: 'viewer' },
];

describe('DataTable Component', () => {
  // ✅ الرندرة الأساسية
  it('renders table headers correctly', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    expect(screen.getByText('الاسم')).toBeInTheDocument();
    expect(screen.getByText('البريد')).toBeInTheDocument();
    expect(screen.getByText('الدور')).toBeInTheDocument();
  });

  it('renders all data rows', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    expect(screen.getByText('فاطمة الحربي')).toBeInTheDocument();
    expect(screen.getByText('محمد العمري')).toBeInTheDocument();
    expect(screen.getByText('سارة الشمري')).toBeInTheDocument();
  });

  it('shows record count', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    expect(screen.getByText(/عرض 3 من 3 سجل/)).toBeInTheDocument();
  });

  // ✅ الحالة الفارغة
  it('renders empty state when no data provided', () => {
    render(<DataTable data={[]} columns={mockColumns} />);
    expect(screen.getByText('لا توجد نتائج مطابقة لبحثك')).toBeInTheDocument();
  });

  // ✅ حقل البحث
  it('shows search input when searchableColumns are provided', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        searchableColumns={['name', 'email']}
      />
    );
    expect(screen.getByRole('textbox', { name: /بحث/i })).toBeInTheDocument();
  });

  it('hides search input when no searchableColumns', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('filters rows based on search input', async () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        searchableColumns={['name']}
      />
    );

    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: 'فاطمة' } });

    // الانتظار حتى يتم تطبيق الـ debounce
    await waitFor(() => {
      expect(screen.getByText('فاطمة الحربي')).toBeInTheDocument();
      expect(screen.queryByText('محمد العمري')).not.toBeInTheDocument();
    }, { timeout: 500 });
  });

  // ✅ الفرز
  it('calls onSort callback when sortable column header is clicked', () => {
    const handleSort = vi.fn();
    render(
      <DataTable data={mockData} columns={mockColumns} onSort={handleSort} />
    );
    fireEvent.click(screen.getByText('الاسم'));
    expect(handleSort).toHaveBeenCalledWith('name', 'asc');
  });

  it('toggles sort direction on second click', () => {
    const handleSort = vi.fn();
    render(
      <DataTable data={mockData} columns={mockColumns} onSort={handleSort} />
    );
    const nameHeader = screen.getByText('الاسم');
    fireEvent.click(nameHeader); // asc
    fireEvent.click(nameHeader); // desc
    expect(handleSort).toHaveBeenLastCalledWith('name', 'desc');
  });

  it('does not call onSort for non-sortable columns', () => {
    const handleSort = vi.fn();
    render(
      <DataTable data={mockData} columns={mockColumns} onSort={handleSort} />
    );
    fireEvent.click(screen.getByText('الدور'));
    expect(handleSort).not.toHaveBeenCalled();
  });

  // ✅ مكون cell مخصص
  it('renders custom cell renderer', () => {
    const columnsWithCell = [
      ...mockColumns,
      {
        field: 'badge',
        header: 'شارة',
        cell: (row) => <span data-testid={`badge-${row.id}`}>🏷️ {row.name}</span>,
      },
    ];
    render(<DataTable data={mockData} columns={columnsWithCell} />);
    expect(screen.getByTestId('badge-1')).toBeInTheDocument();
  });
});
