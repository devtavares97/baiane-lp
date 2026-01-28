#!/usr/bin/env tsx

/**
 * 📤 Script de Upload Automático para Supabase
 * 
 * Este script facilita o upload em massa de imagens para o Supabase Storage
 * e automaticamente insere os registros nas tabelas.
 * 
 * USO:
 * 
 * 1. Instalar dependências:
 *    npm install tsx @supabase/supabase-js
 * 
 * 2. Preparar as imagens:
 *    - Coloque os logos em: ./uploads/logos/
 *    - Coloque as imagens do portfólio em: ./uploads/portfolio/
 * 
 * 3. Executar:
 *    npx tsx scripts/upload-to-supabase.ts
 * 
 * ESTRUTURA DE PASTAS:
 * 
 * uploads/
 * ├── logos/
 * │   ├── logo-1.png
 * │   ├── logo-2.png
 * │   └── ...
 * └── portfolio/
 *     ├── portfolio-1.jpg
 *     ├── portfolio-2.jpg
 *     └── ...
 */

import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import { join, extname, basename } from 'path';

// ============================================
// CONFIGURAÇÃO
// ============================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Variáveis de ambiente não encontradas!');
  console.error('Certifique-se de que .env.local existe e está configurado.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

async function uploadFile(
  bucketName: string,
  folderPath: string,
  filePath: string,
  fileBuffer: Buffer
): Promise<string | null> {
  const fileName = basename(filePath);
  const storagePath = `${folderPath}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(storagePath, fileBuffer, {
      contentType: getMimeType(fileName),
      upsert: true, // Sobrescrever se já existir
    });

  if (error) {
    console.error(`❌ Erro ao fazer upload de ${fileName}:`, error.message);
    return null;
  }

  // Construir URL pública
  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(storagePath);

  return publicUrlData.publicUrl;
}

function getMimeType(fileName: string): string {
  const ext = extname(fileName).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

async function getFilesFromDirectory(directory: string): Promise<string[]> {
  try {
    const files = await readdir(directory);
    return files
      .filter((file) => ['.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(extname(file).toLowerCase()))
      .sort(); // Ordenar alfabeticamente
  } catch (error) {
    console.error(`❌ Erro ao ler diretório ${directory}:`, (error as Error).message);
    return [];
  }
}

// ============================================
// UPLOAD DE LOGOS
// ============================================

async function uploadLogos() {
  console.log('\n📤 Fazendo upload dos LOGOS...\n');

  const logosDir = join(process.cwd(), 'uploads', 'logos');
  const files = await getFilesFromDirectory(logosDir);

  if (files.length === 0) {
    console.log('⚠️  Nenhum logo encontrado em ./uploads/logos/');
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = join(logosDir, file);
    const fileBuffer = await readFile(filePath);

    console.log(`📸 ${i + 1}/${files.length} - ${file}...`);

    const publicUrl = await uploadFile('baiane-assets', 'logos', file, fileBuffer);

    if (publicUrl) {
      // Inserir na tabela
      const { error } = await supabase
        .from('company_logos')
        .insert({
          name: `Empresa ${i + 1}`, // Você pode personalizar isso
          image_url: publicUrl,
          order: i + 1,
          active: true,
        });

      if (error) {
        console.error(`   ❌ Erro ao inserir no banco:`, error.message);
      } else {
        console.log(`   ✅ Upload e registro criado!`);
      }
    }
  }

  console.log('\n✅ LOGOS: Upload concluído!\n');
}

// ============================================
// UPLOAD DE PORTFÓLIO
// ============================================

async function uploadPortfolio() {
  console.log('\n📤 Fazendo upload do PORTFÓLIO...\n');

  const portfolioDir = join(process.cwd(), 'uploads', 'portfolio');
  const files = await getFilesFromDirectory(portfolioDir);

  if (files.length === 0) {
    console.log('⚠️  Nenhuma imagem encontrada em ./uploads/portfolio/');
    return;
  }

  const captions = [
    'Cultura e identidade',
    'Salvador, Bahia',
    'Branding estratégico',
    'Performance criativa',
    'Estratégia visual',
    'Time em ação',
    'Criatividade baiana',
    'Cases de sucesso',
    'Marketing autêntico',
    'Resultados reais',
  ];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = join(portfolioDir, file);
    const fileBuffer = await readFile(filePath);

    console.log(`📸 ${i + 1}/${files.length} - ${file}...`);

    const publicUrl = await uploadFile('baiane-assets', 'portfolio', file, fileBuffer);

    if (publicUrl) {
      // Inserir na tabela
      const { error } = await supabase
        .from('portfolio_images')
        .insert({
          image_url: publicUrl,
          caption: captions[i] || `Imagem ${i + 1}`,
          alt: `Portfólio Baianê - ${captions[i] || `Imagem ${i + 1}`}`,
          order: i + 1,
          active: true,
        });

      if (error) {
        console.error(`   ❌ Erro ao inserir no banco:`, error.message);
      } else {
        console.log(`   ✅ Upload e registro criado!`);
      }
    }
  }

  console.log('\n✅ PORTFÓLIO: Upload concluído!\n');
}

// ============================================
// MAIN
// ============================================

async function main() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║                                        ║');
  console.log('║  📤 UPLOAD AUTOMÁTICO - SUPABASE      ║');
  console.log('║                                        ║');
  console.log('╚════════════════════════════════════════╝');

  // Verificar conexão
  console.log('\n🔗 Testando conexão com Supabase...');
  const { data, error } = await supabase.from('company_logos').select('count');
  
  if (error) {
    console.error('❌ Erro de conexão:', error.message);
    console.error('Verifique se as tabelas foram criadas corretamente.');
    process.exit(1);
  }

  console.log('✅ Conexão estabelecida!\n');

  // Upload
  await uploadLogos();
  await uploadPortfolio();

  console.log('╔════════════════════════════════════════╗');
  console.log('║                                        ║');
  console.log('║  ✅ UPLOAD CONCLUÍDO!                 ║');
  console.log('║                                        ║');
  console.log('║  Acesse: http://localhost:3000         ║');
  console.log('║                                        ║');
  console.log('╚════════════════════════════════════════╝');
}

main().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
