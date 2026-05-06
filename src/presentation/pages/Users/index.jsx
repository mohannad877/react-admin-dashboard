import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import { Button } from '../../components/ui/Button';
import { userRepository } from '../../../infrastructure/repositories/UserRepository';
import { translateRole, formatDate } from '../../../shared/utils/helpers';
import UserModal from '../../components/users/UserModal';

export default function UsersPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ role: '', status: '' });
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filters.role) params.role = filters.role;
      if (filters.status) params.status = filters.status;
      const data = await userRepository.getAll(params);
      setUsers(data);
    } catch {
      setError('تعذّر الاتصال بالخادم. تأكد من تشغيل JSON Server.');
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps, react-hooks/set-state-in-effect
  useEffect(() => { fetchUsers(); }, [filters]);

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`هل أنت متأكد من حذف "${userName}"؟`)) return;
    try {
      await userRepository.delete(userId);
      fetchUsers();
    } catch {
      alert('فشل الحذف، حاول مجدداً.');
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleModalSave = () => {
    handleModalClose();
    fetchUsers();
  };

  const columns = [
    {
      field: 'name',
      header: t('userHeader'),
      sortable: true,
      cell: (user) => (
        <div className="flex items-center gap-3">
          <img
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0d9488&color=fff`}
            alt={user.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0 ring-2 ring-white dark:ring-slate-800"
            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0d9488&color=fff`; }}
          />
          <div className="min-w-0">
            <div className="font-medium text-slate-900 dark:text-slate-100 truncate">{user.name}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</div>
          </div>
        </div>
      )
    },
    {
      field: 'role',
      header: t('roleHeader'),
      sortable: true,
      cell: (user) => (
        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
          user.role === 'admin'
            ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
            : user.role === 'editor'
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
        }`}>
          {translateRole(user.role)}
        </span>
      )
    },
    {
      field: 'status',
      header: 'الحالة',
      sortable: true,
      cell: (user) => (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
          user.status === 'active'
            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
          {user.status === 'active' ? 'نشط' : 'غير نشط'}
        </span>
      )
    },
    {
      field: 'department',
      header: t('departmentHeader'),
      sortable: true,
      cell: (user) => (
        <span className="text-slate-700 dark:text-slate-300">{user.department || '—'}</span>
      )
    },
    {
      field: 'joinDate',
      header: 'تاريخ الانضمام',
      sortable: true,
      cell: (user) => (
        <span className="text-slate-600 dark:text-slate-400 text-xs">{formatDate(user.joinDate)}</span>
      )
    },
    {
      field: 'actions',
      header: 'الإجراءات',
      cell: (user) => (
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleEdit(user)}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors"
            aria-label={`تعديل ${user.name}`}
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={() => handleDelete(user.id, user.name)}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            aria-label={`حذف ${user.name}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-5">
      <Helmet>
        <title>{t('usersManagement')} | Admin Dashboard</title>
        <meta name="description" content="عرض وتعديل وحذف حسابات المستخدمين" />
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">{t('usersManagement')}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {users.length} {t('registeredUsers')}
          </p>
        </div>
        <Button icon={Plus} onClick={() => setShowModal(true)}>
          {t('addUser')}
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{t('filter')}:</span>
          <select
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={filters.role}
            onChange={(e) => setFilters(f => ({ ...f, role: e.target.value }))}
          >
            <option value="">{t('allRoles')}</option>
            <option value="admin">مدير</option>
            <option value="editor">محرر</option>
            <option value="viewer">مطلع</option>
          </select>

          <select
            className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={filters.status}
            onChange={(e) => setFilters(f => ({ ...f, status: e.target.value }))}
          >
            <option value="">{t('allStatuses')}</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </select>

          {(filters.role || filters.status) && (
            <button
              onClick={() => setFilters({ role: '', status: '' })}
              className="px-3 py-2 text-sm text-teal-600 dark:text-teal-400 hover:underline"
            >
              إعادة تعيين
            </button>
          )}

          <button
            onClick={fetchUsers}
            className="mr-auto p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-500/10 rounded-lg transition-colors"
            aria-label="تحديث"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Content */}
      {error ? (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-6 text-center">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          <Button variant="outline" size="sm" onClick={fetchUsers} className="mt-3">إعادة المحاولة</Button>
        </div>
      ) : loading ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 border-b border-slate-100 dark:border-slate-800 animate-pulse bg-slate-50 dark:bg-slate-800/50" />
          ))}
        </div>
      ) : (
        <DataTable
          data={users}
          columns={columns}
          searchableColumns={['name', 'email', 'department']}
          initialSort={{ field: 'joinDate', direction: 'desc' }}
        />
      )}

      {/* Modal */}
      {showModal && (
        <UserModal
          user={editingUser}
          onClose={handleModalClose}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
}
