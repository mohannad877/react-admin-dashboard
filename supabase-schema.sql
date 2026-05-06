-- ==========================================
-- 🗄️ Supabase Schema & Initial Data Migration
-- ==========================================
-- انسخ هذا الكود والصقه في الـ SQL Editor داخل لوحة تحكم Supabase
-- لتجهيز الجداول والبيانات الأساسية للمشروع.

-- 1️⃣ إنشاء جدول المستخدمين (Users)
CREATE TABLE IF NOT EXISTS public.users (
  id text PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  role text NOT NULL,
  status text NOT NULL,
  "joinDate" date,
  avatar text,
  phone text,
  department text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2️⃣ إنشاء جدول المنتجات (Products)
CREATE TABLE IF NOT EXISTS public.products (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  "minStockAlert" integer NOT NULL DEFAULT 10,
  status text NOT NULL,
  "createdAt" date,
  image text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3️⃣ إعداد سياسات الأمان (Row Level Security - RLS)
-- لتسهيل التطوير حالياً، سنسمح بالوصول الكامل. 
-- ⚠️ في بيئة إنتاج حقيقية يجب تقييد هذه الصلاحيات بناءً على المستخدم المسجل.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read/write access on users" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read/write access on products" ON public.products FOR ALL USING (true) WITH CHECK (true);

-- ==========================================
-- 📦 إدراج البيانات التجريبية (Seed Data)
-- ==========================================

-- تفريغ الجداول لتجنب التكرار إذا قمت بتشغيل السكريبت مسبقاً
TRUNCATE TABLE public.users;
TRUNCATE TABLE public.products;

-- إدراج المستخدمين
INSERT INTO public.users (id, name, email, role, status, "joinDate", avatar, phone, department) VALUES
('1', 'فاطمة الحربي', 'fatima@company.sa', 'admin', 'active', '2025-02-15', 'https://i.pravatar.cc/150?img=47', '+966501234567', 'تقنية المعلومات'),
('2', 'محمد العمري', 'mohammed@company.sa', 'editor', 'active', '2025-03-10', 'https://i.pravatar.cc/150?img=12', '+966507654321', 'التسويق'),
('3', 'سارة الشمري', 'sara@company.sa', 'viewer', 'inactive', '2025-01-20', 'https://i.pravatar.cc/150?img=32', '+966512345678', 'الموارد البشرية'),
('4', 'خالد القحطاني', 'khaled@company.sa', 'editor', 'active', '2025-04-05', 'https://i.pravatar.cc/150?img=68', '+966598765432', 'المبيعات'),
('5', 'نورة السبيعي', 'noura@company.sa', 'viewer', 'active', '2025-05-01', 'https://i.pravatar.cc/150?img=25', '+966511223344', 'المحاسبة'),
('6', 'عبدالله الدوسري', 'abdullah@company.sa', 'admin', 'inactive', '2024-12-10', 'https://i.pravatar.cc/150?img=53', '+966544332211', 'الإدارة'),
('7', 'منى الشهراني', 'mona@company.sa', 'editor', 'active', '2025-05-15', 'https://i.pravatar.cc/150?img=29', '+966555112233', 'تطوير الأعمال'),
('8', 'فيصل العتيبي', 'faisal@company.sa', 'viewer', 'active', '2025-04-22', 'https://i.pravatar.cc/150?img=41', '+966550998877', 'الدعم الفني'),
('9', 'هدى الغامدي', 'houda@company.sa', 'admin', 'active', '2025-03-30', 'https://i.pravatar.cc/150?img=36', '+966500223344', 'الامتثال والجودة'),
('10', 'نايف الحربي', 'naif@company.sa', 'editor', 'inactive', '2025-01-05', 'https://i.pravatar.cc/150?img=79', '+966588776655', 'الخدمات اللوجستية'),
('11', 'أمل القحطاني', 'amal@company.sa', 'viewer', 'active', '2025-05-20', 'https://i.pravatar.cc/150?img=58', '+966544998877', 'التسويق الرقمي'),
('12', 'ياسر المالكي', 'yasser@company.sa', 'admin', 'active', '2025-02-28', 'https://i.pravatar.cc/150?img=91', '+966512334455', 'الأمن السيبراني');

-- إدراج المنتجات
INSERT INTO public.products (id, name, category, price, stock, "minStockAlert", status, "createdAt", image) VALUES
('101', 'كرسي مكتبي إرجونوميك', 'furniture', 450, 23, 10, 'available', '2025-03-01', 'https://picsum.photos/seed/chair1/300/200'),
('102', 'طاولة اجتماعات خشبية', 'furniture', 1200, 5, 10, 'low_stock', '2025-02-20', 'https://picsum.photos/seed/table1/300/200'),
('103', 'ماوس لاسلكي احترافي', 'electronics', 89, 150, 20, 'available', '2025-04-01', 'https://picsum.photos/seed/mouse1/300/200'),
('104', 'شاشة 27 بوصة 4K', 'electronics', 899, 0, 5, 'out_of_stock', '2025-03-15', 'https://picsum.photos/seed/monitor1/300/200'),
('105', 'حزمة أوراق A4 (500 ورقة)', 'supplies', 25, 200, 50, 'available', '2025-04-10', 'https://picsum.photos/seed/paper1/300/200'),
('106', 'لوحة مفاتيح ميكانيكية', 'electronics', 320, 8, 10, 'low_stock', '2025-04-15', 'https://picsum.photos/seed/keyboard1/300/200'),
('107', 'خزانة ملفات معدنية', 'furniture', 750, 12, 5, 'available', '2025-03-25', 'https://picsum.photos/seed/cabinet1/300/200'),
('108', 'أقلام جافة (علبة 12)', 'supplies', 15, 300, 50, 'available', '2025-04-20', 'https://picsum.photos/seed/pens1/300/200'),
('109', 'سماعة لاسلكية (Bluetooth)', 'electronics', 199, 45, 10, 'available', '2025-05-01', 'https://picsum.photos/seed/headset1/300/200'),
('110', 'حقيبة ظهر مقاومة للماء', 'supplies', 89, 32, 10, 'available', '2025-04-18', 'https://picsum.photos/seed/bag1/300/200'),
('111', 'مكتب زجاجي أنيق', 'furniture', 1850, 3, 5, 'low_stock', '2025-03-10', 'https://picsum.photos/seed/desk1/300/200'),
('112', 'شاحن سريع (65W)', 'electronics', 129, 0, 5, 'out_of_stock', '2025-05-05', 'https://picsum.photos/seed/charger1/300/200'),
('113', 'دفتر ملاحظات (100 ورقة)', 'supplies', 12, 500, 100, 'available', '2025-04-25', 'https://picsum.photos/seed/notebook1/300/200'),
('114', 'كرسي ألعاب إرغونوميك', 'furniture', 899, 7, 10, 'low_stock', '2025-04-12', 'https://picsum.photos/seed/gamingchair1/300/200');

-- رسالة تأكيد
SELECT 'تم إنشاء الجداول وإدراج البيانات بنجاح! 🎉' as status;

-- إحصائيات الإدراج
SELECT 
    '👥 إجمالي المستخدمين: ' || (SELECT COUNT(*) FROM public.users) AS users_count,
    '🛍️ إجمالي المنتجات: ' || (SELECT COUNT(*) FROM public.products) AS products_count;