import {config} from './config.js';
const app = document.querySelector('#app');
const route = config.routes.find(r => r.path === document.body.dataset.route);
const el = (tag, text, cls) => {const node=document.createElement(tag);if(text)node.textContent=text;if(cls)node.className=cls;return node;};
document.querySelector('h1').textContent = route?.title || 'ระบบเจ้าหน้าที่ ปภ.จังหวัดขอนแก่น';
document.title = `${route?.title || 'หน้าแรก'} • ปภ.ขอนแก่น`;
const base = new URL('./', import.meta.url);
function link(r){const a=el('a',r.title,'tile');a.href=new URL(`${r.path}/`,base);a.append(el('small',r.path));return a;}
function card(title){const box=el('section',null,'card');box.append(el('h2',title));app.append(box);return box;}
const status=card('สถานะการเชื่อมต่อ');
status.append(el('p','กำลังเตรียมระบบ • ยังไม่เปิดรับข้อมูลจริง','notice'));
const identity=el('p','กำลังตรวจสอบการเปิดผ่าน LIFF…');identity.id='identity';status.append(identity);
const detail={
 'officer/report':'รับแจ้งเหตุพร้อมพิกัด ภาพ และข้อมูลผู้แจ้ง เมื่อเชื่อมระบบแล้วจะสร้างเคส เอกสาร และแจ้งส่วนกลางตามผลสำเร็จจริง',
 'officer/personnel-map':'ภาพรวมเคสและกำลังพลทั้งจังหวัด เรียงตามสถานะตั้งแต่รับแจ้งจนปิดเหตุ',
 'officer/requests':'ส่งคำขอสนับสนุนและติดตามผลการประสาน',
 'officer/shelters':'ภาพรวมศูนย์อพยพที่เชื่อมกับเคส พร้อมสถานะและข้อมูลจำนวนผู้พักพิง',
 'officer/my-cases':'เคสที่แจ้งและงานที่ได้รับมอบหมาย พร้อมปุ่มรับงานตามสิทธิ์',
 'central/inbox':'รวมเหตุ คำขอ และรายงานที่เข้ามาใหม่ พร้อมทางเปิดรายการโดยตรง',
 'central/incidents':'ตรวจข้อมูลและเคสซ้ำ ขอข้อมูลเพิ่มเติม และรับดำเนินการ',
 'central/assignments':'มอบหมายเจ้าหน้าที่และติดตามการกดรับงาน',
 'central/requests':'ตรวจคำขอและบันทึกการประสานหน่วยสนับสนุน',
 'central/documents':'เปิด PDF และประวัติเอกสารของแต่ละเคส',
 'central/follow-up':'ติดตามงานค้าง ตรวจรายงานผล และสั่งปิดเหตุตามสิทธิ์',
 'central/overview':'ภาพรวมการปฏิบัติงานของจังหวัดจากข้อมูลจริง',
 'notices':'หนังสือประกาศที่ผ่านการตรวจ พร้อมพื้นที่ที่เกี่ยวข้องและประวัติการส่งแจ้ง',
 'cases':'รายละเอียดเคส ไทม์ไลน์ เอกสาร และปุ่มดำเนินงานตามสิทธิ์'
};
if(route?.path==='auth/register'){
 const box=card('ข้อมูลเจ้าหน้าที่');
 box.append(el('p','กรอกตรวจรูปแบบได้ แต่ยังไม่บันทึกหรือส่งข้อมูล กรุณาเชื่อมบริการลงทะเบียนก่อน','muted'));
 const form=el('form');
 for(const [name,title,type] of [['fullName','ชื่อ–นามสกุล','text'],['position','ตำแหน่ง','text'],['phone','เบอร์โทรศัพท์','tel']]){
  const label=el('label',title);label.htmlFor=name;const input=el('input');input.id=name;input.name=name;input.type=type;input.required=true;input.maxLength=120;
  if(type==='tel'){input.inputMode='tel';input.pattern='0[0-9]{8,9}';input.maxLength=10;}
  form.append(label,input);
 }
 const label=el('label','หน่วยงาน');label.htmlFor='unit';const select=el('select');select.id='unit';select.required=true;
 for(const value of ['','สำนักงาน ปภ.จังหวัดขอนแก่น','สนง.ปภ.ขอนแก่น สาขาพล','สนง.ปภ.ขอนแก่น สาขาชุมแพ']){const o=el('option',value||'เลือกหน่วยงาน');o.value=value;select.append(o);}form.append(label,select);
 form.append(el('p','การเลือกหน่วยงานเป็นข้อมูลประกอบการสมัคร ต้องได้รับการตรวจสอบก่อนให้สิทธิ์ใช้งาน','muted'));
 const submit=el('button','เข้าสู่ระบบ LINE ก่อนส่งสมัคร');submit.type='submit';submit.disabled=true;form.append(submit);
 form.addEventListener('submit',async e=>{e.preventDefault();if(!config.backendUrl||!window.liff||!liff.isLoggedIn()){identity.textContent='กรุณาเข้าสู่ระบบ LINE ก่อนส่งสมัคร';return;}submit.disabled=true;submit.textContent='กำลังส่งข้อมูล…';try{const idToken=liff.getIDToken();if(!idToken)throw Error('ไม่พบ LIFF ID token');const response=await fetch(config.backendUrl,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'register',idToken,fullName:form.elements.fullName.value,position:form.elements.position.value,phone:form.elements.phone.value,unitId:form.elements.unit.value,areaId:'KHONKAEN'})});const result=await response.json();if(!result.ok)throw Error(result.error||'ส่งข้อมูลไม่สำเร็จ');identity.textContent='ส่งใบสมัครแล้ว • สถานะรออนุมัติ';submit.textContent='ส่งใบสมัครแล้ว';}catch(error){identity.textContent=`ส่งใบสมัครไม่สำเร็จ: ${error.message}`;submit.disabled=false;submit.textContent='ลองส่งอีกครั้ง';}});box.append(form);
}else if(route?.path==='auth/status'){
 card('ผลการตรวจสอบสมาชิก').append(el('p','ยังตรวจสถานะการอนุมัติไม่ได้ เนื่องจากบริการสมาชิกยังไม่เชื่อมต่อ ไม่ถือว่าเป็นสถานะรออนุมัติหรือได้รับอนุมัติแล้ว','notice'));
}else if(route?.path==='central/overview-launcher'){
 const box=card('ภาพรวมและผลงาน');box.append(el('p','เตรียมรายการสำหรับ Flex carousel การส่งเข้าแชตจะเปิดเมื่อเชื่อมตัวตนและสิทธิ์ส่วนกลางแล้ว','muted'));
 const grid=el('div',null,'grid');for(const path of ['central/personnel-map','central/shelters','central/overview'])grid.append(link(config.routes.find(r=>r.path===path)));box.append(grid,el('p','Looker Studio: ยังไม่ได้กำหนด URL รายงาน','muted'));
}else if(route){card('พื้นที่ทำงาน').append(el('p',detail[route.path]||'หน้านี้จะใช้ข้อมูลสมาชิกและสิทธิ์ที่ตรวจสอบจาก Backend'),el('p','ยังไม่เชื่อมข้อมูลจริง จึงยังไม่แสดงยอดเคส รายชื่อบุคลากร หรือตำแหน่งปฏิบัติงาน','muted'));}
if(!route){for(const [prefix,title] of [['auth/','เริ่มต้นใช้งาน'],['officer/','เจ้าหน้าที่ภาคสนาม'],['central/','ส่วนกลางจังหวัด'],['other','รายละเอียดและประกาศ']]){const box=card(title),grid=el('div',null,'grid');config.routes.filter(r=>prefix==='other'?!r.path.includes('/'):r.path.startsWith(prefix)).forEach(r=>grid.append(link(r)));box.append(grid);} }
else {const a=el('a','กลับหน้ารวมระบบ');a.href=base;app.append(a);}
app.append(el('footer','สำหรับเจ้าหน้าที่ • ปภ.จังหวัดขอนแก่น สาขาพล และสาขาชุมแพ'));
async function init(){
 if(!route){identity.textContent='เลือกหน้าที่ต้องการตรวจสอบด้านล่าง';return;}
 if(!window.liff){identity.textContent='โหลด LIFF SDK ไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตแล้วลองใหม่';return;}
 try{
  await liff.init({liffId:route.liffId});
  if(!liff.isLoggedIn()){
   identity.textContent='ยังไม่ได้เข้าสู่ระบบด้วยบัญชี LINE';
   const b=el('button','เข้าสู่ระบบด้วย LINE');b.onclick=()=>liff.login({redirectUri:location.href});status.append(b);return;
  }
  identity.textContent='เข้าสู่ระบบ LINE แล้ว • กรอกข้อมูลเพื่อส่งใบสมัคร';
  if(route.path==='auth/register'){submit.disabled=false;submit.textContent='ส่งใบสมัครเจ้าหน้าที่';}
  // Never treat browser profile/decoded claims as authorization. The future API must verify the ID token.
 }catch(error){identity.textContent=`เปิด LIFF ไม่สำเร็จ: ${error?.code||'UNKNOWN'}${error?.message?' — '+error.message:''}`;console.warn('LIFF initialization failed',error?.code||'UNKNOWN',error?.message||'');}
}
init();
