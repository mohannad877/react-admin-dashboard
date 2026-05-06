import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component', () => {
  // ✅ الرندرة الأساسية
  it('renders children correctly', () => {
    render(<Button>انقر هنا</Button>);
    expect(screen.getByText('انقر هنا')).toBeInTheDocument();
  });

  // ✅ التفاعل مع النقر
  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>زر</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ✅ الحالة المعطلة
  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>زر معطل</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ✅ التغيرات (Variants)
  it('applies primary variant classes by default', () => {
    render(<Button>أساسي</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-teal-600');
  });

  it('applies danger variant classes', () => {
    render(<Button variant="danger">حذف</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-red-500');
  });

  it('applies outline variant classes', () => {
    render(<Button variant="outline">إلغاء</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('border-2');
  });

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">شبح</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('hover:bg-slate-100');
  });

  // ✅ الأحجام (Sizes)
  it('applies small size classes', () => {
    render(<Button size="sm">صغير</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3');
  });

  it('applies large size classes', () => {
    render(<Button size="lg">كبير</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6');
  });

  // ✅ نوع الزر
  it('has type="button" by default', () => {
    render(<Button>زر</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects custom type attribute', () => {
    render(<Button type="submit">إرسال</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  // ✅ الكلاسات المخصصة
  it('merges custom className', () => {
    render(<Button className="my-custom-class">زر</Button>);
    expect(screen.getByRole('button')).toHaveClass('my-custom-class');
  });

  // ✅ الأيقونة
  it('renders with an icon when icon prop is provided', () => {
    const FakeIcon = ({ className }) => <svg className={className} data-testid="icon" />;
    render(<Button icon={FakeIcon}>مع أيقونة</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByText('مع أيقونة')).toBeInTheDocument();
  });
});
