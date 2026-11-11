مشروع 𝕽𝕺𝕶𝕬 — دليل النشر المختصر
الموقع مبني لـ Cloudflare Pages + D1 + R2.

1) ارفع مجلد المشروع إلى GitHub مع الحفاظ على نفس ترتيب الملفات.
2) من Cloudflare اختر Workers & Pages ثم Create application ثم Pages ثم Connect to Git.
3) اختر المستودع. Build command اتركه فارغًا، وBuild output directory اكتب: public
4) أنشئ D1 database باسم rora-content، وافتح SQL Console ونفّذ محتوى schema.sql.
5) أنشئ R2 bucket باسم rora-media.
6) داخل إعدادات Pages > Settings > Functions > D1 database bindings:
   Variable name: DB
   Database: rora-content
7) أضف R2 binding:
   Variable name: MEDIA_BUCKET
   Bucket: rora-media
8) داخل Settings > Variables and Secrets أضف:
   ADMIN_PASSWORD = كلمة سر أدمن قوية تختارها بنفسك (لا تستخدم كلمة سر الزائر).
   SESSION_SECRET = قيمة عشوائية سرية طويلة لا تقل عن 32 حرفًا.
9) أعد نشر الموقع Deploy.
10) الصفحة الرئيسية: رابط الموقع/
    دخول الأدمن: رابط الموقع/login.html

مهم:
- كلمة سر الزائر 5/11/2026 هي للدخول العام لو أضفت لها شاشة دخول مستقبلًا؛ في هذه النسخة الصفحة الرئيسية مفتوحة، ولوحة الأدمن محمية بكلمة سر مستقلة.
- لا تضع ADMIN_PASSWORD أو SESSION_SECRET داخل ملفات الموقع أو GitHub.
- الصور: JPG/PNG/WEBP/GIF حتى 8MB. الصوت: MP3/MP4/OGG/WAV/AAC حتى 15MB.
- استخدم صورًا وملفات صوتية تملكها أو لديك إذن باستخدامها.
- ارفع الموقع على GitHub خاص Private إذا كنت لا تريد إظهار ملفات المصدر للعامة.
