import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Key, Smartphone, Clock, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export default function Security() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  // Mock login history
  const loginHistory = [
    { id: 1, device: 'MacBook Pro (Chrome)', location: 'الرياض، السعودية', ip: '192.168.1.1', time: 'الآن', status: 'active' },
    { id: 2, device: 'iPhone 13 (Safari)', location: 'الرياض، السعودية', ip: '10.0.0.4', time: 'أمس، 14:30', status: 'success' },
    { id: 3, device: 'Windows PC (Edge)', location: 'جدة، السعودية', ip: '172.16.0.2', time: 'منذ 3 أيام', status: 'success' },
    { id: 4, device: 'Unknown Device', location: 'موسكو، روسيا', ip: '45.33.22.1', time: 'منذ أسبوع', status: 'failed' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <Helmet>
        <title>الأمان | Admin Dashboard</title>
      </Helmet>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">الأمان والخصوصية</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          إدارة حماية الحساب وسجل نشاطات الدخول
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Security Actions */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Password Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
              <Key className="text-blue-600 dark:text-blue-400" size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2">كلمة المرور</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">تأكد من استخدام كلمة مرور قوية تتكون من أحرف وأرقام ورموز.</p>
            <Button variant="outline" className="w-full">تغيير كلمة المرور</Button>
            <p className="text-xs text-slate-400 mt-3 text-center">آخر تغيير: منذ شهرين</p>
          </div>

          {/* 2FA Section */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${twoFactorEnabled ? 'bg-emerald-50 dark:bg-emerald-900/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
              <Smartphone className={twoFactorEnabled ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'} size={24} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              المصادقة الثنائية (2FA)
              {twoFactorEnabled && <CheckCircle2 size={16} className="text-emerald-500" />}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">أضف طبقة حماية إضافية لحسابك تتطلب رمزاً من هاتفك عند تسجيل الدخول.</p>
            
            {twoFactorEnabled ? (
              <Button variant="danger" className="w-full" onClick={() => setTwoFactorEnabled(false)}>تعطيل المصادقة الثنائية</Button>
            ) : (
              <Button variant="primary" className="w-full" onClick={() => setShow2FAModal(true)}>إعداد المصادقة الثنائية</Button>
            )}
          </div>

        </div>

        {/* Right Column - Audit Log */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Shield size={18} className="text-teal-600 dark:text-teal-400" />
                  سجل نشاط الأمان
                </h3>
                <p className="text-xs text-slate-500 mt-1">آخر الأجهزة ومواقع تسجيل الدخول الناجحة والفاشلة</p>
              </div>
              <Button variant="outline" size="sm">تسجيل الخروج من كل الأجهزة</Button>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {loginHistory.map((log) => (
                <div key={log.id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {log.status === 'active' && <CheckCircle2 className="text-emerald-500" size={20} />}
                      {log.status === 'success' && <Clock className="text-slate-400" size={20} />}
                      {log.status === 'failed' && <XCircle className="text-red-500" size={20} />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        {log.device}
                        {log.status === 'active' && (
                          <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                            الجهاز الحالي
                          </span>
                        )}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                        <span>الموقع: {log.location}</span>
                        <span>IP: {log.ip}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right whitespace-nowrap text-sm">
                    {log.status === 'failed' ? (
                      <span className="text-red-600 dark:text-red-400 font-medium flex items-center gap-1 justify-end">
                        <AlertCircle size={14} /> محاولة فاشلة
                      </span>
                    ) : (
                      <span className="text-slate-500 dark:text-slate-400">{log.time}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center">
              <button className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline">عرض كل السجلات (30 يوم)</button>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal (Mock) */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-6 shadow-xl animate-in zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone size={32} className="text-teal-600 dark:text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">إعداد المصادقة الثنائية</h3>
              <p className="text-slate-500 mt-2 text-sm">امسح كود الـ QR باستخدام تطبيق Google Authenticator وقم بإدخال الرمز المكون من 6 أرقام لتفعيل الحماية.</p>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-900 rounded-xl aspect-square w-48 mx-auto mb-6 flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700">
              <span className="text-slate-400 font-bold">QR CODE</span>
            </div>

            <input type="text" placeholder="أدخل الرمز المكون من 6 أرقام" className="w-full text-center tracking-[0.5em] text-lg px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-teal-500 focus:outline-none mb-6" maxLength="6" />

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShow2FAModal(false)}>إلغاء</Button>
              <Button className="flex-1" onClick={() => { setTwoFactorEnabled(true); setShow2FAModal(false); }}>تفعيل</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
