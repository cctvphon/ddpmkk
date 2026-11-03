# Frontend LIFF — ชุดเริ่มต้น

มี 21 Endpoint ตาม config.js และหน้ารวม index.html ชื่อและ LIFF ID ถอดจากภาพ Console ต้องตรวจอักษรเล็ก/ใหญ่กับค่าจริงก่อนเปิดใช้ โดยเฉพาะ I/l และ O/0

สถานะ: หน้าเข้า LIFF และฟอร์มลงทะเบียนสำหรับเตรียมเชื่อมต่อเท่านั้น ไม่มีการส่งข้อมูลสมาชิก ไม่มีการอนุมัติ ไม่มี API อ่านข้อมูลจริง และไม่มีการส่ง LINE ไม่ใช้สถานะเข้าสู่ LINE แทนสิทธิ์ปฏิบัติงาน

รัน `npm run build` ภายในโฟลเดอร์นี้เมื่อต้องสร้าง HTML ใหม่ เปิดทดสอบผ่าน HTTP server ไม่เปิดไฟล์ด้วย file://

เผยแพร่เนื้อหาใน frontend เป็น root ของ repository cctvphon/ddpmkk เพื่อให้ตรง Endpoint https://cctvphon.github.io/ddpmkk/ ไม่อัปโหลดโฟลเดอร์ frontend ซ้อนอีกชั้น ถ้าอัปโหลดทั้งโปรเจกต์ต้องเปลี่ยนวิธี build/deploy ไม่เช่นนั้น URL จะไม่ตรง

อย่าอัปโหลด Server, เอกสารส่วนตัว หรือ secret ไปกับเว็บ ตั้ง Pages main / (root) หลังอัปโหลดเฉพาะไฟล์เว็บ ตรวจ Actions และเปิดหน้า auth/register/ ก่อนทดลองใน LINE

ตรวจทั้ง 21 ตัวใน Console: Full, openid/profile/chat_message.write, Endpoint ตรง config.js เชื่อม OA ใน LINE Login channel ขณะ Developing ใช้บัญชีที่มี role ทดสอบ

ขั้นพัฒนาถัดไป: API ตรวจ ID token กับ LINE และตรวจสมาชิก/สิทธิ์ฝั่ง Server, สมัครสมาชิกแบบ idempotent, ตรวจสถานะอนุมัติ, จากนั้นเชื่อมบริการเคส ห้ามใส่ channel secret หรือ access token ใน config.js

UI ใช้ Prompt โทน primary #355379, teal #0e7c86 และการ์ดโค้งตามองค์ประกอบ Demo เป็น shell เริ่มต้น ยังไม่ได้ตรวจภาพเทียบ Demo บน desktop/mobile จึงยังไม่ถือว่าส่งมอบ UI ทั้งระบบแล้ว
