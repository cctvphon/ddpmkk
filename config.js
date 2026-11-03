// Public configuration only. Never place channel secrets or access tokens here.
export const config = {
  channelId: '2012348639',
  baseUrl: 'https://cctvphon.github.io/ddpmkk/',
  backendUrl: '',
  // Transcribed from the supplied console screenshots; verify in the console before rollout.
  routes: [
    ['auth/register', 'ลงทะเบียนเจ้าหน้าที่', 'R7UUElhz'],
    ['auth/status', 'สถานะการอนุมัติ', '7qlcMErl'],
    ['officer/report', 'แจ้งเหตุ', 'CeDfnQAP'],
    ['officer/personnel-map', 'แผนที่กำลังพล', 'rqvzPUfS'],
    ['officer/requests', 'ขอทรัพยากร', 'zkRellW4'],
    ['officer/shelters', 'ศูนย์อพยพ', 'WgofpfDu'],
    ['officer/my-cases', 'เคสของฉัน', 'bGObNwyh'],
    ['officer/profile', 'โปรไฟล์', 'y66ko6Cq'],
    ['central/inbox', 'งานเข้า', 'azprqKSK'],
    ['central/incidents', 'ตรวจสอบเหตุ', '15lZoghk'],
    ['central/assignments', 'มอบหมายงาน', 'PRkUNCY1'],
    ['central/overview-launcher', 'ภาพรวมและผลงาน', 'idE3zZPe'],
    ['central/requests', 'คำขอสนับสนุน', 'KFkB3cNp'],
    ['central/documents', 'หนังสือและรายงาน', 'YV7wsO6Z'],
    ['central/follow-up', 'ติดตามและปิดเหตุ', 'CeyiTHk8'],
    ['central/profile', 'โปรไฟล์และตั้งค่า', 'b9ZpvLx2'],
    ['central/personnel-map', 'แผนที่กำลังพลส่วนกลาง', 'KoLflnZ3'],
    ['central/shelters', 'ศูนย์อพยพส่วนกลาง', 'zqpaJOKe'],
    ['central/overview', 'ภาพรวมจังหวัด', 'waLMAXBL'],
    ['notices', 'ประกาศและหนังสือแจ้ง', 'wk9qp7Jf'],
    ['cases', 'รายละเอียดเคส', 'o7vdKP3R']
  ].map(([path, title, suffix]) => ({path, title, liffId: `2012348639-${suffix}`}))
};
