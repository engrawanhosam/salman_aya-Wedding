# THE SEALED INVITATION — دعوة زفاف سلمان وآية

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.

## التشغيل
    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm run start

## أين أعدّل؟
كل النصوص والروابط في `data/invitation.ts`:
- `venue.mapsUrl`: رابط Google Maps الدقيق. إن تُرك فارغاً يُستخدم بحث خرائط بالعنوان النصي.

## الأصول (ضعوها بهذه الأسماء دون تعديل الكود)
- `public/images/childhood-memory.jpg`: الصورة التذكارية
- `public/images/venue-evan.jpg`: واجهة فندق إيفان
- `public/audio/wedding-song.mp3`: الأغنية
- اختياري: `public/og.jpg` ثم أضيفوه في `metadata.openGraph.images` داخل `app/layout.tsx`

عند غياب أي ملف يظهر بديل أنيق ولا يتعطل البناء. إن غاب ملف الأغنية يختفي زر الموسيقى.

## النشر على Vercel
1. ارفعوا المشروع إلى GitHub.
2. Vercel ← Add New Project ← اختاروا المستودع (Next.js تلقائياً، Build: `next build`، بلا Output Directory يدوي).
3. Deploy. لا متغيرات بيئة ولا Backend.

الفهرسة معطّلة (noindex) مع بقاء الرابط قابلاً للمشاركة.

## التصميم (النسخة الجديدة)
- الألوان: عاجي · بيج · شمبانيا · خمري — معرّفة في `app/globals.css` (`:root`) و`tailwind.config.ts`.
- الخطوط: Amiri للنصوص، Aref Ruqaa للأسماء والعناوين، Tajawal للواجهة، Cormorant للتسميات اللاتينية.
- الزخارف الخطية في `components/invitation/Ornaments.tsx` (غصن، نجمة ثمانية، إطار محراب، فواصل).
- بعد فتح المظروف تنزل الشاشة وحدها ببطء إلى الآية، وتتوقف فور لمس الضيف للصفحة:
  عدّلوا `GLIDE_DELAY` و`GLIDE_DURATION` (بالمللي ثانية) في `components/invitation/Experience.tsx`.
  الحركة تُعطَّل تلقائياً لمن فعّل «تقليل الحركة» في جهازه.

## التهاني العامة (تظهر لكل الضيوف)
التهاني تُحفظ في قاعدة Upstash Redis عبر `app/api/wishes/route.ts`:
1. في Vercel: Storage ← Create ← Upstash (Redis) ← اربطوه بالمشروع (تُضاف المتغيرات تلقائياً).
2. أعيدوا النشر (Redeploy).
بدون هذه الخطوة تعمل التهاني مؤقتاً في الذاكرة وتختفي عند إعادة التشغيل (للتجربة المحلية فقط).
لحذف تهنئة غير مناسبة: افتحوا قاعدة Upstash ← Data Browser ← المفتاح `wishes`.
