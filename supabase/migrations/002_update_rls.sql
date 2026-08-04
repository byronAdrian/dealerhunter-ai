-- Eliminar las políticas anónimas creadas para desarrollo
DROP POLICY IF EXISTS "Allow anon read access" ON companies;
DROP POLICY IF EXISTS "Allow anon insert access" ON companies;
DROP POLICY IF EXISTS "Allow anon update access" ON companies;

-- Crear políticas exclusivas para usuarios autenticados
CREATE POLICY "Allow authenticated read access" ON companies FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert access" ON companies FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update access" ON companies FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated delete access" ON companies FOR DELETE USING (auth.role() = 'authenticated');
