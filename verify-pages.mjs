import {config} from './config.js';
import {readFile,access} from 'node:fs/promises';
if(config.routes.length!==21 || new Set(config.routes.map(r=>r.liffId)).size!==21)throw Error('Expected 21 unique LIFF IDs');
for(const route of [{path:''},...config.routes]){
 const file=new URL(route.path?`${route.path}/index.html`:'index.html',import.meta.url);
 const html=await readFile(file,'utf8');
 for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g))if(!match[1].startsWith('https:'))await access(new URL(match[1],file));
}
console.log('PASS: 21 unique LIFF IDs; 22 HTML pages and all local asset references resolve.');
