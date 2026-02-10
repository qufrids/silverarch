-- ============================================
-- Storage Buckets
-- ============================================

INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Public read access
CREATE POLICY "Public read access on all buckets" ON storage.objects FOR SELECT USING (bucket_id IN ('images', 'blog-images', 'project-images', 'avatars'));

-- Admin write access
CREATE POLICY "Admin upload access" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admin update access" ON storage.objects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admin delete access" ON storage.objects FOR DELETE USING (auth.role() = 'authenticated');
