import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Carrega .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

async function testKey() {
  console.log('--- TESTANDO CHAVE DO .ENV.LOCAL ---');
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY || '';

  // Simula a limpeza que estamos fazendo
  const cleanKey = privateKey.replace(/\\n/g, '\n');
  
  console.log('Project ID:', projectId);
  console.log('Client Email:', clientEmail);
  console.log('Key Sample:', cleanKey.substring(0, 50) + '...');
  console.log('Key Length:', cleanKey.length);

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: cleanKey,
      }),
    }, 'test-app');
    console.log('✅ SUCESSO: A chave do .env.local é válida!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ ERRO: A chave do .env.local é INVÁLIDA!');
    console.error(error.message);
    process.exit(1);
  }
}

testKey();
