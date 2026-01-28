#!/usr/bin/env tsx

/**
 * SETUP GITHUB - Verifica usuário e prepara repositório
 * ------------------------------------------------------
 * Este script:
 * - Verifica se o usuário Git é "devtavares97"
 * - Cria o repositório no GitHub (se possível)
 * - Configura o remote e faz push
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('╔════════════════════════════════════════╗');
console.log('║                                        ║');
console.log('║   🚀 SETUP GITHUB - BAIANÊ LP         ║');
console.log('║                                        ║');
console.log('╚════════════════════════════════════════╝\n');

function execCommand(command: string): string {
  try {
    return execSync(command, { encoding: 'utf-8', stdio: 'pipe' }).trim();
  } catch (error: any) {
    return '';
  }
}

function execCommandWithError(command: string): { success: boolean; output: string } {
  try {
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' }).trim();
    return { success: true, output };
  } catch (error: any) {
    return { success: false, output: error.message || String(error) };
  }
}

async function main() {
  // 1. Verificar usuário Git configurado
  console.log('📋 Verificando configuração do Git...\n');
  
  const gitUser = execCommand('git config user.name');
  const gitEmail = execCommand('git config user.email');
  
  console.log(`   Usuário Git: ${gitUser || '(não configurado)'}`);
  console.log(`   Email Git: ${gitEmail || '(não configurado)'}\n`);
  
  // 2. Verificar se é devtavares97
  const expectedUser = 'devtavares97';
  const isCorrectUser = gitUser.toLowerCase().includes('devtavares') || 
                        gitUser.toLowerCase().includes('tavares');
  
  if (!isCorrectUser && gitUser !== expectedUser) {
    console.log(`⚠️  ATENÇÃO: O usuário Git configurado é "${gitUser}"`);
    console.log(`   Esperado: "${expectedUser}"\n`);
    console.log('💡 Para configurar como devtavares97, execute:');
    console.log('   git config user.name "devtavares97"');
    console.log('   git config user.email "seu-email@exemplo.com"\n');
    
    const shouldContinue = process.argv.includes('--force');
    if (!shouldContinue) {
      console.log('❌ Abortando. Use --force para continuar mesmo assim.\n');
      process.exit(1);
    }
  } else {
    console.log(`✅ Usuário verificado: ${gitUser}\n`);
  }
  
  // 3. Verificar se já existe repositório Git
  const hasGitRepo = existsSync('.git');
  if (!hasGitRepo) {
    console.log('📦 Inicializando repositório Git...\n');
    execCommand('git init');
    execCommand('git branch -M main');
  } else {
    console.log('✅ Repositório Git já inicializado\n');
  }
  
  // 4. Verificar se há mudanças não commitadas
  const { output: statusOutput } = execCommandWithError('git status --porcelain');
  if (statusOutput) {
    console.log('📝 Adicionando arquivos ao staging...\n');
    execCommand('git add .');
    
    const { output: diffOutput } = execCommandWithError('git diff --cached --quiet');
    if (!diffOutput) {
      console.log('💾 Fazendo commit...\n');
      execCommand('git commit -m "chore: atualizar projeto antes do push"');
    }
  } else {
    console.log('✅ Nenhuma mudança pendente\n');
  }
  
  // 5. Verificar remote
  const remoteUrl = execCommand('git remote get-url origin 2>/dev/null || echo ""');
  const repoName = 'baiane-lp';
  const githubUser = expectedUser;
  const expectedRemote = `https://github.com/${githubUser}/${repoName}.git`;
  
  if (remoteUrl && remoteUrl !== expectedRemote) {
    console.log(`⚠️  Remote atual: ${remoteUrl}`);
    console.log(`   Esperado: ${expectedRemote}\n`);
    console.log('🔄 Removendo remote antigo...\n');
    execCommand('git remote remove origin 2>/dev/null || true');
  }
  
  if (!remoteUrl || remoteUrl !== expectedRemote) {
    console.log(`🔗 Configurando remote: ${expectedRemote}\n`);
    execCommand(`git remote add origin ${expectedRemote}`);
  } else {
    console.log('✅ Remote já configurado corretamente\n');
  }
  
  // 6. Tentar fazer push
  console.log('🚀 Tentando fazer push para o GitHub...\n');
  const { success, output } = execCommandWithError('git push -u origin main');
  
  if (!success) {
    if (output.includes('Repository not found') || output.includes('not found')) {
      console.log('❌ Repositório não encontrado no GitHub!\n');
      console.log('📝 INSTRUÇÕES PARA CRIAR O REPOSITÓRIO:\n');
      console.log('   1. Acesse: https://github.com/new');
      console.log(`   2. Nome do repositório: ${repoName}`);
      console.log('   3. Deixe vazio (sem README, .gitignore ou license)');
      console.log('   4. Clique em "Create repository"');
      console.log('\n   Depois execute novamente:');
      console.log('   npm run setup:github\n');
      console.log('   Ou manualmente:');
      console.log(`   git push -u origin main\n`);
    } else {
      console.log(`❌ Erro ao fazer push:\n${output}\n`);
      console.log('💡 Verifique suas credenciais do GitHub.\n');
    }
    process.exit(1);
  } else {
    console.log('✅ Push realizado com sucesso!\n');
    console.log(`🌐 Repositório disponível em: https://github.com/${githubUser}/${repoName}\n`);
  }
}

main().catch((error) => {
  console.error('❌ Erro:', error);
  process.exit(1);
});
