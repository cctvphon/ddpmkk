import {mkdir, writeFile} from 'node:fs/promises';
import {config} from './config.js';
const root=new URL('./',import.meta.url);
for(const route of [{path:'',title:'ระบบเจ้าหน้าที่ ปภ.จังหวัดขอนแก่น'},...config.routes]){
 const depth=route.path?route.path.split('/').length:0;
 const prefix='../'.repeat(depth)||'./';
 const html=`<!doctype html>
<html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${route.title}</title><link rel="icon" href="https://dpmpotchp.disaster.go.th/favicon.ico"><link rel="stylesheet" href="${prefix}app.css"><link rel="stylesheet" href="${prefix}brand.css"></head>
<body data-route="${route.path}"><header><img class="brand-logo" src="https://backofficeminisite.disaster.go.th/upload/minisite/203/thumbnail_picture/240/img-feb7a0468c340eca3607bb7f8c20071c.jpg" alt="ตราสัญลักษณ์ ปภ." onerror="this.hidden=true"><div><small>กรมป้องกันและบรรเทาสาธารณภัย</small><h1>${route.title}</h1><small>จังหวัดขอนแก่น</small></div></header><main id="app"></main><noscript>กรุณาเปิด JavaScript เพื่อใช้งานระบบ</noscript><script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script><script type="module" src="${prefix}app.js"></script></body></html>
`;
 await mkdir(new URL(route.path?`${route.path}/`:'./',root),{recursive:true});
 await writeFile(new URL(route.path?`${route.path}/index.html`:'index.html',root),html);
}
await writeFile(new URL('.nojekyll',root),'');
console.log(`Generated ${config.routes.length} LIFF endpoints and home page.`);
