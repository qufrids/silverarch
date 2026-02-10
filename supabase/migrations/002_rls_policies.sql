-- ============================================
-- RLS Policies
-- ============================================

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- SERVICES
CREATE POLICY "Public can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access to services" ON public.services FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- PACKAGES
CREATE POLICY "Public can view active packages" ON public.packages FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access to packages" ON public.packages FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- PROJECTS
CREATE POLICY "Public can view active projects" ON public.projects FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access to projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- BLOG POSTS
CREATE POLICY "Public can view published posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admin full access to blog posts" ON public.blog_posts FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- LEADS
CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view leads" ON public.leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin can update leads" ON public.leads FOR UPDATE USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- TESTIMONIALS
CREATE POLICY "Public can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access to testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- SITE SETTINGS
CREATE POLICY "Public can view settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access to settings" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
