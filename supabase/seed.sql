-- ============================================================
-- Demo / seed data — run AFTER schema.sql
-- Run in: Supabase Dashboard > SQL Editor
-- ============================================================

insert into public.services (title, slug, description, price, icon, image_url) values
('تصميم شعار احترافي', 'logo-design', 'تصميم هوية بصرية وشعار مميز لمشروعك التجاري بثلاث مفاهيم مختلفة.', 4500, '🎨', 'https://images.unsplash.com/photo-1626785774573-4b799315345d'),
('إنشاء متجر إلكتروني', 'ecommerce-setup', 'بناء متجر إلكتروني متكامل مع نظام دفع وشحن.', 25000, '🛒', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d'),
('إدارة حسابات التواصل الاجتماعي', 'social-media', 'إدارة شهرية لحسابات مشروعك مع خطة محتوى متكاملة.', 8000, '📱', 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7'),
('كتابة محتوى تسويقي', 'content-writing', 'كتابة محتوى عربي احترافي للمواقع والإعلانات.', 3000, '✍️', 'https://images.unsplash.com/photo-1455390582262-044cdead277a');

insert into public.courses (title, slug, description, thumbnail_url, price, is_free, instructor_name, level) values
('أساسيات الذكاء الاصطناعي للمبتدئين', 'ai-basics', 'تعلم أساسيات الذكاء الاصطناعي وكيفية استخدام أدواته في حياتك المهنية.', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485', 0, true, 'فريق Cloud AI', 'beginner'),
('تصميم الصور بالذكاء الاصطناعي', 'ai-image-design', 'احتراف أدوات تصميم الصور بالذكاء الاصطناعي مثل Gemini وClaude.', 'https://images.unsplash.com/photo-1677442136019-21780ecad995', 3500, false, 'فريق Cloud AI', 'beginner'),
('تطوير الويب باستخدام Next.js', 'nextjs-development', 'دورة متكاملة لتعلم بناء تطبيقات ويب حديثة باستخدام Next.js وSupabase.', 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613', 12000, false, 'فريق Cloud AI', 'intermediate'),
('التسويق الرقمي من الصفر', 'digital-marketing', 'دليلك الشامل لتعلم التسويق الرقمي واستراتيجيات النمو.', 'https://images.unsplash.com/photo-1533750349088-cd871a92f312', 6000, false, 'فريق Cloud AI', 'beginner');

insert into public.course_lessons (course_id, title, content, order_index, is_preview)
select id, 'مقدمة عن الدورة', 'في هذا الدرس نتعرف على محتوى الدورة وأهدافها.', 1, true
from public.courses where slug = 'ai-basics';

insert into public.course_lessons (course_id, title, content, order_index, is_preview)
select id, 'ما هو الذكاء الاصطناعي؟', 'شرح مبسط لمفهوم الذكاء الاصطناعي وتطبيقاته.', 2, false
from public.courses where slug = 'ai-basics';

insert into public.products (title, slug, description, price, file_url, thumbnail_url, category) values
('حزمة قوالب تصميم احترافية', 'design-templates-pack', 'حزمة من 50 قالب تصميم جاهز للتعديل لمواقع التواصل الاجتماعي.', 2500, 'https://example.com/files/templates.zip', 'https://images.unsplash.com/photo-1561070791-2526d30994b5', 'تصميم'),
('قالب Notion لإدارة المشاريع', 'notion-project-template', 'قالب جاهز لتنظيم مشاريعك ومهامك اليومية على Notion.', 1200, 'https://example.com/files/notion-template.zip', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71', 'إنتاجية'),
('مكتبة أيقونات عربية', 'arabic-icons-pack', 'أكثر من 300 أيقونة بتصميم يدعم الطابع العربي.', 1800, 'https://example.com/files/icons.zip', 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e', 'تصميم');

insert into public.blog_posts (title, slug, excerpt, content, cover_image, is_published) values
('كيف تبدأ مشروعك الرقمي في 2026', 'start-digital-project-2026', 'خطوات عملية لإطلاق أول مشروع رقمي لك بثقة.', 'محتوى المقالة الكامل يوضع هنا...', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c', true),
('أفضل أدوات الذكاء الاصطناعي للمصممين', 'best-ai-tools-designers', 'تعرف على أهم الأدوات التي يستخدمها المصممون المحترفون اليوم.', 'محتوى المقالة الكامل يوضع هنا...', 'https://images.unsplash.com/photo-1558655146-d09347e92766', true);

insert into public.library_items (title, description, file_url, category) values
('دليل التسويق بالمحتوى', 'ملف PDF مجاني يشرح أساسيات التسويق بالمحتوى.', 'https://example.com/files/content-marketing-guide.pdf', 'تسويق'),
('قالب سيرة ذاتية عربي', 'قالب Word جاهز لسيرة ذاتية احترافية باللغة العربية.', 'https://example.com/files/cv-template-ar.docx', 'وظائف'),
('checklist إطلاق المتجر الإلكتروني', 'قائمة تحقق شاملة قبل إطلاق متجرك الإلكتروني.', 'https://example.com/files/ecommerce-checklist.pdf', 'تجارة إلكترونية');

insert into public.memberships (name, price, interval, features) values
('مجاني', 0, 'monthly', '["الوصول للمكتبة المجانية","تصفح المدونة"]'),
('برو', 1900, 'monthly', '["جميع مزايا الخطة المجانية","خصم 20% على الدورات","تحميل غير محدود من المتجر"]'),
('بزنس', 4900, 'monthly', '["جميع مزايا خطة برو","دعم مخصص","استشارة شهرية مجانية"]');
