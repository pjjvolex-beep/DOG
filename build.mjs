import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
cpSync('index.html', 'dist/index.html');
cpSync('assets', 'dist/assets', { recursive: true });
mkdirSync('dist/.openai', { recursive: true });
cpSync('.openai/hosting.json', 'dist/.openai/hosting.json');
mkdirSync('dist/server', { recursive: true });
const html = JSON.stringify(readFileSync('index.html', 'utf8'));
writeFileSync('dist/server/index.js', `export default { fetch() { return new Response(${html}, { headers: { 'content-type': 'text/html; charset=utf-8' } }); } };\n`);
