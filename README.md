<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/layout-dashboard.svg" alt="Admin Dashboard Logo" width="100" />
  
  # 🚀 React Admin Dashboard
  
  <p><strong>لوحة تحكم تفاعلية احترافية لمطوري الواجهات الأمامية في كل مكان</strong></p>
  <p><em>Professional Interactive Admin Dashboard for Frontend Developers</em></p>

  <p>
    <img src="https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite_5-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/React_Router_6-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  </p>

  <p>
    <a href="#-english-version">🇬🇧 English</a> · 
    <a href="#-النسخة-العربية">🌐 العربية</a>
  </p>
</div>

---

## 🇬🇧 English Version

### 🎯 Why This Project?
Admin Dashboards are among the most requested skills in Frontend job interviews. This project is designed as a **professional portfolio piece** that demonstrates your ability to build production-ready applications with complex data handling, state management, and modern styling.

### ✨ Features
- 🌓 **Dark/Light Mode**: Persistent theme toggling powered by Context API & `localStorage`.
- 📱 **Fully Responsive**: Adapts flawlessly to mobile, tablet, and desktop screens with a collapsible sidebar.
- 🔍 **Smart Search & Advanced Data Tables**: Real-time search (with debounce), sorting, and filtering for Users and Products.
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

### 🚀 Getting Started

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

<br />
<hr />
<br />

## 🌐 النسخة العربية

### 🎯 لماذا هذا المشروع؟
> 💼 **للمطورين**: لوحات التحكم (Admin Dashboards) هي من أكثر المهارات المطلوبة في مقابلات عمل Frontend. هذا المشروع صُمم ليكون **نموذجاً احترافياً** يُبرز قدرتك على:
> 
> ✅ بناء واجهات معقدة بـ React  
> ✅ إدارة حالة متقدمة (Context/Redux)  
> ✅ تصميم متجاوب يدعم العربية (RTL) والوضع الليلي  
> ✅ التعامل مع APIs وعرض بيانات ديناميكية  
> ✅ تحسين الأداء وتجربة المستخدم  
> ✅ النشر الاحترافي على Vercel

### ✨ الميزات

#### 🎨 الواجهة والتصميم
| الميزة | الوصف |
|--------|-------|
| 🌓 **Dark/Light Mode** | تبديل سلس للثيم مع حفظ التفضيل في `localStorage` |
| 🌐 **RTL + Arabic Support** | دعم كامل للغة العربية مع خط `Tajawal` واتجاه نصوص صحيح |
| 📱 **Fully Responsive** | يعمل بسلاسة على الموبايل، التابلت، والديسكتوب |
| 🎯 **Collapsible Sidebar** | شريط جانبي ذكي ينطوي تلقائياً على الشاشات الصغيرة |

#### 📊 البيانات والجداول
| الميزة | الوصف |
|--------|-------|
| 🔍 **Smart Search** | بحث فوري مع `debounce` لتجنب التأخير |
| 📋 **Sortable Tables** | فرز أي عمود بالضغط على الترويسة (تصاعدي/تنازلي) |
| 🎛️ **Advanced Filters** | فلاتر متعددة: الدور، الحالة، التصنيف، نطاق السعر |

#### 📈 التحليلات والرسوم
| الميزة | الوصف |
|--------|-------|
| 📊 **Recharts Integration** | مخططات تفاعلية: مساحية، شريطية، دائرية |
| 🎴 **Stats Cards** | بطاقات إحصائية مع أيقونات وألوان ديناميكية |
| 🔄 **Live Updates** | تحديث فوري للرسوم عند تغير البيانات |

#### ⚙️ الوظائف الأساسية
| الميزة | الوصف |
|--------|-------|
| ✅ **Full CRUD** | إضافة، عرض، تعديل، وحذف المستخدمين والمنتجات |
| 🏷️ **Dynamic Badges** | شارات حالة تلقائية (متوفر / منخفض / نفذ) |
| ♿ **Accessibility** | دعم إمكانية الوصول وتباين ألوان مناسب |

### 🛠️ المكدس التقني

```text
✅ Framework:      React 18 + Vite
✅ Routing:        React Router v6 (createBrowserRouter)
✅ Styling:        Tailwind CSS 4 (with darkMode: 'class')
✅ State:          Context API
✅ Charts:         Recharts
✅ Icons:          Lucide React
✅ Database:       Supabase (PostgreSQL للإنتاج) / JSON Server (للتطوير المحلي)
✅ Authentication: Firebase Auth
✅ Deployment:     Vercel (SPA-ready with vercel.json)
✅ Language:       JavaScript
✅ Font:           Tajawal (Google Fonts) for Arabic
```

### 🚀 التشغيل المحلي

#### إعداد بيئة التطوير
قم بنسخ ملف `.env.example` إلى `.env.local` وأضف مفاتيحك الخاصة لتشغيل بيئة الإنتاج محلياً:
```bash
cp .env.example .env.local
```

#### خطوات التثبيت

```bash
# 1. استنساخ المستودع
git clone https://github.com/mohannad877/react-admin-dashboard.git
cd react-admin-dashboard

# 2. تثبيت الاعتماديات
npm install

# 3. تشغيل التطبيق + الـ API الوهمي معاً
npm run dev:all

# 4. فتح المتصفح
🌐 التطبيق:  http://localhost:5173
🔌 API:     http://localhost:3001
```

### 🔌 مسارات الـ API (JSON Server)

#### المستخدمين | Users
```http
GET    /users              # جلب جميع المستخدمين
GET    /users?q=فاطمة      # بحث باسم المستخدم
GET    /users?role=admin   # فلتر حسب الدور
GET    /users?_sort=joinDate&_order=desc  # فرز حسب التاريخ

POST   /users              # إضافة مستخدم جديد
PATCH  /users/:id          # تعديل مستخدم موجود
DELETE /users/:id          # حذف مستخدم
```

#### المنتجات | Products
```http
GET    /products                 # جلب جميع المنتجات
GET    /products?category=furniture  # فلتر حسب التصنيف
GET    /products?price_gte=100&price_lte=500  # نطاق سعر
GET    /products?stock_lte=10    # منتجات مخزونها منخفض

POST   /products                 # إضافة منتج جديد
PATCH  /products/:id             # تعديل منتج
DELETE /products/:id             # حذف منتج
```

### 📁 هيكلية المشروع

```text
react-admin-dashboard/
├── public/
│   └── db.json                 # قاعدة البيانات الوهمية
├── src/
│   ├── components/             # المكونات (UI, Layout, Users, Products)
│   ├── pages/                  # صفحات التطبيق
│   ├── contexts/               # ThemeContext.jsx (Dark Mode)
│   ├── hooks/                  # useDebounce.js
│   ├── services/               # api.js (Axios instance)
│   ├── utils/                  # helpers.js
│   ├── App.jsx                 # التوجيه الرئيسي
│   ├── main.jsx                # نقطة الدخول + Providers
│   └── index.css               # Tailwind + CSS Variables
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json                 # إعدادات النشر على Vercel
```

### 📦 النشر على Vercel (موصى به)

```bash
# 1. ارفع الكود على GitHub
git add . && git commit -m "feat: production ready"
git push origin main

# 2. انشر على Vercel:
#    - ادخل https://vercel.com وسجل بـ GitHub
#    - اضغط "New Project" > اختر المستودع
#    - اترك الإعدادات الافتراضية (Vite يُكتشف تلقائياً)
#    - اضغط "Deploy" 🚀
```

> ⚠️ **ملاحظة هامة للـ API في الإنتاج**:
`json-server` يعمل محلياً فقط. للخيار السحابي استخدم خدمات مثل MockAPI.io أو استضافة مجانية لـ JSON Server على Render.com.

---

## 🤝 المساهمة | Contributing
المساهمات مرحب بها! افتح Pull Request إذا كان لديك إضافة رائعة.

## 📄 الرخصة | License
هذا المشروع مفتوح المصدر تحت [رخصة MIT](LICENSE).

## 📬 تواصل معي | Connect With Me

<div align="center">

**Mohannad Nabil Ahmed Mohammed Abdullah**  
📍 Ibb – Yemen | 📱 +967 777 354 821

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mohannadnabil)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mohannad877)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mohannad.nabil.it@gmail.com)

</div>

---

<div align="center">
  <p>
    <strong>صُنع بـ ❤️ في كل مكان 🌍</strong><br />
    Developed with ❤️ by <a href="https://github.com/mohannad877">Mohannad Nabil</a>
  </p>
  
  <p>
    <sub>⭐ إذا أعجبك المشروع، لا تنسَ إضافة نجمة على GitHub! ⭐</sub>
  </p>
</div>
