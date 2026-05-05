<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layout-dashboard.svg" alt="Admin Dashboard Logo" width="100" />
  <h1>🚀 Modern React Admin Dashboard</h1>
  <p><strong>A highly interactive, responsive, and professional dashboard application built with modern web technologies.</strong></p>
  <p>لوحة تحكم تفاعلية احترافية مبنية بأحدث تقنيات الويب، تدعم اللغتين العربية والإنجليزية.</p>

  <p>
    <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite_5-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/React_Router_6-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
  </p>
  
  <p>
    <a href="#-english"><strong>English</strong></a> · <a href="#-النسخة-العربية"><strong>العربية</strong></a>
  </p>
</div>

<hr />

## 🇬🇧 English

### ✨ Features
- 🌓 **Dark/Light Mode**: Persistent theme toggling powered by Context API & localStorage.
- 📱 **Fully Responsive**: Adapts flawlessly to mobile, tablet, and desktop screens with a collapsible sidebar.
- 🔍 **Advanced Data Tables**: Real-time search (with debounce), sorting, and filtering for Users and Products.
- 📊 **Interactive Charts**: Beautiful data visualizations (Area, Bar, and Pie charts) using Recharts.
- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete functionalities.
- 🏷️ **Dynamic Status Badges**: Automated stock level calculations (Available / Low Stock / Out of Stock).
- 🌐 **RTL Ready**: Built-in support for Right-to-Left languages (Arabic) and customized Tajawal typography.

### 🛠️ Tech Stack
- **Framework**: React 18 + Vite
- **Routing**: React Router v6 (`createBrowserRouter`)
- **Styling**: Tailwind CSS v4
- **State Management**: Context API
- **Charts**: Recharts
- **Icons**: Lucide React
- **API Requests**: Axios
- **Mock Backend**: JSON Server
- **Deployment**: Vercel Ready

### 🚀 Getting Started

#### Prerequisites
- Node.js (v18+)

#### Installation

1. Clone the repository:
```bash
git clone https://github.com/mohannad877/react-admin-dashboard.git
cd react-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server AND the mock API simultaneously:
```bash
npm run dev:all
```

- **Frontend App**: `http://localhost:5173`
- **Mock API**: `http://localhost:3001`

### 🔌 API Endpoints (Mock)
```http
GET    /users          # Fetch all users
POST   /users          # Create a new user
PATCH  /users/:id      # Update user
DELETE /users/:id      # Delete user

GET    /products       # Fetch all products
POST   /products       # Create a new product
PATCH  /products/:id   # Update product
DELETE /products/:id   # Delete product
```

### 📦 Deployment
This project is configured as a Single Page Application (SPA) and is ready to be deployed on Vercel. A `vercel.json` file is included to handle client-side routing. Note: `json-server` is local only; for production, replace it with [MockAPI.io](https://mockapi.io) or host the API on [Render](https://render.com).

<br />
<hr />
<br />

## 🇸🇦 النسخة العربية

### ✨ الميزات الرئيسية
- 🌓 **الوضع الليلي/النهاري**: تبديل سلس للثيم مع حفظ تفضيلات المستخدم.
- 📱 **تصميم متجاوب بالكامل**: يعمل بشكل مثالي على الهواتف، الأجهزة اللوحية، وشاشات سطح المكتب.
- 🔍 **جداول بيانات متقدمة**: بحث فوري (بدون تأخير بفضل Debounce)، فرز، وتصفية للمستخدمين والمنتجات.
- 📊 **رسوم بيانية تفاعلية**: إحصائيات بصرية جذابة باستخدام مكتبة Recharts.
- ✅ **عمليات CRUD كاملة**: إضافة، عرض، تعديل، وحذف البيانات.
- 🏷️ **شارات ديناميكية**: حساب تلقائي لحالة المخزون وتلوين الشارات (متوفر / مخزون منخفض / نفذت الكمية).
- 🌐 **دعم كامل للغة العربية (RTL)**: تصميم مبني من الأساس لدعم الاتجاه من اليمين لليسار مع استخدام خط "Tajawal" الاحترافي.

### 🛠️ التقنيات المستخدمة
- **إطار العمل**: React 18 + Vite
- **التوجيه**: React Router v6
- **تنسيق التصميم**: Tailwind CSS v4
- **إدارة الحالة**: Context API
- **الرسوم البيانية**: Recharts
- **الأيقونات**: Lucide React
- **الطلبات**: Axios
- **الخادم الوهمي**: JSON Server
- **بيئة النشر**: Vercel

### 🚀 التشغيل المحلي

#### المتطلبات
- Node.js (إصدار 18 فما فوق)

#### خطوات التثبيت

1. استنساخ المستودع:
```bash
git clone https://github.com/mohannad877/react-admin-dashboard.git
cd react-admin-dashboard
```

2. تثبيت الحزم:
```bash
npm install
```

3. تشغيل خادم التطبيق و API الوهمي في آن واحد:
```bash
npm run dev:all
```

- **رابط التطبيق**: `http://localhost:5173`
- **رابط الـ API**: `http://localhost:3001`

### 🔌 مسارات الـ API (المحلية)
```http
GET    /users          # جلب المستخدمين
POST   /users          # إضافة مستخدم
PATCH  /users/:id      # تعديل مستخدم
DELETE /users/:id      # حذف مستخدم

GET    /products       # جلب المنتجات
POST   /products       # إضافة منتج
PATCH  /products/:id   # تعديل منتج
DELETE /products/:id   # حذف منتج
```

### 📦 النشر (Deployment)
المشروع جاهز للنشر الفوري كـ تطبيق صفحة واحدة (SPA) على Vercel بفضل وجود ملف الإعداد `vercel.json`. 
ملاحظة: `json-server` يعمل محلياً فقط. في بيئة الإنتاج، يُرجى استخدام خدمة سحابية مثل [MockAPI.io](https://mockapi.io) أو نشر الخادم على [Render](https://render.com).

---

<div align="center">
  <p>Developed with ❤️ by <a href="https://github.com/mohannad877">Mohannad</a></p>
</div>
