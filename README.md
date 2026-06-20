# Cloud Platform — منصة الخدمات والدورات والمنتجات الرقمية

مشروع Next.js 14 (App Router) + Supabase + Tailwind CSS، بواجهة عربية كاملة (RTL).

## محتوى المشروع

- صفحات عامة: الرئيسية، الخدمات، الدورات، المتجر الرقمي، المدونة، المكتبة المجانية
- مصادقة: تسجيل دخول / إنشاء حساب (Supabase Auth)
- لوحة مستخدم: `/dashboard` (الدورات المسجَّل بها، الطلبات)
- لوحة إدارة: `/admin` (إحصائيات + إدارة الخدمات كنموذج CRUD كامل)
- قاعدة بيانات كاملة مع صلاحيات (RLS) في `supabase/schema.sql`
- بيانات تجريبية في `supabase/seed.sql`

---

## 1) التشغيل محلياً على جهازك

### المتطلبات
- Node.js 18 أو أحدث
- حساب على [supabase.com](https://supabase.com) (مجاني)

### الخطوات

```bash
# 1. ثبّت الحزم
npm install

# 2. أنشئ ملف البيئة
cp .env.example .env.local
```

ثم عدّل `.env.local` بالقيم الحقيقية (انظر الخطوة 2 أدناه لمعرفة من أين تجلبها).

```bash
# 3. شغّل المشروع
npm run dev
```

افتح المتصفح على: http://localhost:3000

---

## 2) إعداد قاعدة بيانات Supabase

1. أنشئ مشروعاً جديداً على [supabase.com](https://supabase.com) → **New project**.
2. من القائمة الجانبية اذهب إلى **SQL Editor** → **New query**.
3. الصق محتوى ملف `supabase/schema.sql` كاملاً واضغط **Run**. هذا سينشئ كل الجداول وصلاحيات الحماية (RLS).
4. كرّر نفس الخطوة بملف `supabase/seed.sql` لإضافة بيانات تجريبية (خدمات، دورات، منتجات، مقالات...).
5. اذهب إلى **Project Settings → API** وانسخ:
   - `Project URL` → ضعه في `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → ضعه في `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → ضعه في `SUPABASE_SERVICE_ROLE_KEY` (هذا المفتاح سرّي، لا تنشره أو تضعه في كود يعمل على المتصفح)

### تفعيل تسجيل الدخول بالبريد
من **Authentication → Providers** تأكد أن **Email** مفعّل. لتعطيل تأكيد البريد الإلكتروني أثناء التجربة (اختياري للتسريع فقط)، عطّل **Confirm email** من **Authentication → Settings**.

---

## 3) إنشاء حساب الأدمن (Admin)

كل مستخدم جديد يُسجَّل بصلاحية `user` تلقائياً. لترقية حسابك إلى `admin`:

1. سجّل حساباً عادياً من صفحة `/register` في الموقع.
2. في Supabase اذهب إلى **SQL Editor** ونفّذ (استبدل البريد ببريدك):

```sql
update public.profiles
set role = 'admin'
where id = (select id from auth.users where email = 'you@example.com');
```

3. سجّل خروجاً ثم دخولاً من جديد — ستظهر لك لوحة `/admin`.

---

## 4) رفع المشروع إلى GitHub

```bash
git init
git add .
git commit -m "Initial commit: Cloud Platform"
```

أنشئ مستودعاً جديداً (فارغاً، بدون README) من [github.com/new](https://github.com/new)، ثم:

```bash
git remote add origin https://github.com/USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

> تأكد أن ملف `.env.local` غير مرفوع (هو مستثنى تلقائياً عبر `.gitignore`).

---

## 5) النشر على Vercel

1. اذهب إلى [vercel.com/new](https://vercel.com/new) وسجّل دخولك بحساب GitHub.
2. اختر المستودع الذي رفعته (`Import`).
3. في خانة **Environment Variables** أضف نفس المتغيرات الثلاثة من `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - أضف أيضاً `NEXT_PUBLIC_SITE_URL` بقيمة رابط موقعك على Vercel (مثل `https://your-app.vercel.app`)
4. اضغط **Deploy**. بعد دقيقة أو دقيقتين سيكون موقعك مباشراً على الإنترنت.

### تحديث رابط إعادة التوجيه في Supabase
من **Authentication → URL Configuration** في Supabase، أضف رابط موقعك على Vercel إلى:
- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: `https://your-app.vercel.app/auth/callback`

---

## الخطوات التالية المقترحة (لم تُبنَ في هذه النسخة)

- **الدفع الفعلي**: حالياً عند الشراء يُسجَّل طلب بحالة "قيد الانتظار" بدون تحصيل فعلي للمال. لتفعيل الدفع الحقيقي يجب ربط بوابة دفع (Stripe عالمياً، أو بوابة محلية مثل CIB/Edahabia في الجزائر) وتحديث حالة الطلب تلقائياً عبر Webhook.
- **صفحات إدارة إضافية**: صفحة `/admin/services` مبنية كنموذج كامل (Create / Toggle / Delete متصل بـ Supabase). يمكن تكرار نفس النمط تماماً لإنشاء `/admin/courses`، `/admin/products`، `/admin/blog`، `/admin/library` — أخبرني إن رغبت ببنائها بالكامل في رسالة لاحقة.
- **رفع الملفات**: حقول الصور والملفات تُدخل حالياً كروابط (URLs). يمكن ربطها بـ Supabase Storage لرفع الملفات مباشرة من لوحة الإدارة.
- **صفحات الدروس بالفيديو**: حقل `video_url` موجود في قاعدة البيانات، يحتاج فقط لمشغّل فيديو (مثل YouTube مضمّن أو Mux) في صفحة الدورة.
