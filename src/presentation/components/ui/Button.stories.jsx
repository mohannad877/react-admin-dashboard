import { Button } from './Button';

/**
 * مكون Button: زر قابل لإعادة الاستخدام يدعم أربعة أنواع (Variants) وثلاثة أحجام (Sizes).
 * يستخدم في جميع أنحاء التطبيق للتفاعلات الأساسية.
 */
export default {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'مكون زر مرن يدعم 4 أنواع: `primary`، `outline`، `ghost`، `danger`، وثلاثة أحجام: `sm`، `md`، `lg`. يمكن إضافة أيقونة من مكتبة Lucide.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline', 'ghost', 'danger'],
      description: 'نوع الزر',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'حجم الزر',
    },
    disabled: {
      control: 'boolean',
      description: 'هل الزر معطل؟',
    },
    children: {
      control: 'text',
      description: 'نص الزر',
    },
  },
};

// ✅ الأنواع الأساسية
export const Primary = {
  args: { children: 'حفظ التغييرات', variant: 'primary' },
};

export const Outline = {
  args: { children: 'إلغاء', variant: 'outline' },
};

export const Ghost = {
  args: { children: 'المزيد', variant: 'ghost' },
};

export const Danger = {
  args: { children: 'حذف المستخدم', variant: 'danger' },
};

// ✅ الأحجام
export const Small = {
  args: { children: 'صغير', variant: 'primary', size: 'sm' },
};

export const Medium = {
  args: { children: 'متوسط', variant: 'primary', size: 'md' },
};

export const Large = {
  args: { children: 'كبير', variant: 'primary', size: 'lg' },
};

// ✅ الحالات الخاصة
export const Disabled = {
  args: { children: 'لا يمكن النقر', variant: 'primary', disabled: true },
};

export const Loading = {
  args: { children: 'جارٍ الحفظ...', variant: 'primary', disabled: true },
};
