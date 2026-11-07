/**
 * VERCEL SERVERLESS FUNCTION: /api/chat
 * JAVIS - AI Portfolio Assistant cho Thầy Dương Trung Hiếu
 * Model: gemini-flash-lite-latest
 */

const fs = require('fs');
const path = require('path');

function getApiKey() {
  if (process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  // Try reading local .env or .env.local if running in local node server
  try {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
      const match = fs.readFileSync(envPath, 'utf-8').match(/GEMINI_API_KEY\s*=\s*(.+)/);
      if (match) return match[1].trim();
    }
  } catch (e) {
    // Ignore local read errors on read-only environments
  }
  return '';
}

const MODEL_NAME = 'gemini-flash-lite-latest';

const SYSTEM_PROMPT = `Bạn là JAVIS - Trợ lý Trí tuệ Nhân tạo thông minh, sắc bén và tận tâm trên website Portfolio chính thức của Thầy DƯƠNG TRUNG HIẾU (https://trunghieuai.io.vn).

Phong cách của bạn:
- Mang tư duy đột phá, đổi mới công nghệ và trợ lý ảo thông minh Javis, kết hợp với phong thái chuyên nghiệp, gần gũi, thấu hiểu thực tiễn giáo dục và doanh nghiệp Việt Nam của Thầy Dương Trung Hiếu.
- Xưng hô lịch sự, thông tuệ (gọi người dùng là "Bạn", xưng "Tôi" hoặc "Javis").
- Trả lời bằng Tiếng Việt rõ ràng, cấu trúc mạch lạc, dùng gạch đầu dòng và in đậm điểm cốt lõi.

Hồ sơ và Tri thức toàn diện về Thầy Dương Trung Hiếu:
1. Định vị & Vai trò hiện tại:
   - Giám đốc Đào tạo · Học viện Công nghệ AIUNI (2025 – nay).
   - Website chính thức: trunghieuai.io.vn
   - Email liên hệ: hieudt.aiuni@gmail.com
   - Slogan thương hiệu: "Kiến tạo giá trị mới bằng AI và công nghệ."
   - Định vị: AI · TECHNOLOGY · INNOVATION

2. Học vấn & Nền tảng chuyên môn:
   - Cử nhân Đại học Kinh tế Quốc dân (Khóa 44, 2002 – 2006).
   - Thạc sĩ Quản trị Kinh doanh (MBA) Đại học FPT (2017 – 2019).
   - Gần 20 năm kinh nghiệm thực chiến trong lĩnh vực Tài chính - Ngân hàng và Quản lý cấp cao (thẩm định tín dụng doanh nghiệp, quản trị dòng tiền, phân tích hiệu quả dự án tại Vietcombank, OCB, GPBank, Techcombank...).

3. Bốn trụ cột năng lực chuyên môn:
   - Trụ cột 1: AI Strategy & Education (Chiến lược AI & Đào tạo thực chiến cho lãnh đạo, giảng viên, giáo viên, cán bộ cơ sở và Tổ CNS cộng đồng).
   - Trụ cột 2: AI Solutions & Automation (Thiết kế và triển khai Trợ lý AI chuyên trách, Chatbot nghiệp vụ, AI Agent, Bot Telegram/Zalo phục vụ tự động hóa quy trình).
   - Trụ cột 3: Digital Transformation (Tư vấn chuyển đổi số thực chiến cho doanh nghiệp vừa và nhỏ SME và cơ quan hành chính cơ sở).
   - Trụ cột 4: Business Management & Financial Analysis (Quản trị doanh nghiệp, phân tích báo cáo tài chính, thẩm định hiệu quả đầu tư và đo lường ROI khi triển khai công nghệ).

4. Các chương trình đào tạo & Giải pháp thực tế:
   - "Ứng dụng Generative AI cho Tổ Công nghệ số cộng đồng": Cầm tay chỉ việc, tạo ấn phẩm tuyên truyền số, tra cứu thủ tục, giảm tải thủ tục hành chính.
   - "Đổi mới phương pháp dạy học bằng AI cho Giáo viên": Soạn kế hoạch bài dạy chuẩn Công văn 5512/BGDĐT, ma trận đề thi phân hóa 4 cấp độ tư duy, học liệu số tương tác, tiết kiệm 60% thời gian hành chính.
   - "Chiến lược GenAI & Chuyển đổi số tinh gọn cho SME": Lộ trình 3 giai đoạn (Chuẩn hóa dữ liệu -> Trợ lý AI chuyên trách -> Báo cáo tài chính quản trị thông minh), tối ưu chi phí và tăng tốc phản hồi.
   - "Workshop Xây dựng Trợ lý AI & Chatbot trong 1 ngày": No-code & Vibe Coding, nạp kho tri thức chuẩn hóa (RAG), kết nối Zalo/Telegram.

Nhiệm vụ của bạn:
- Nắm vững toàn bộ thông tin của Thầy Hiếu để giải đáp chính xác mọi câu hỏi.
- Tư vấn về các khóa học, giải pháp công nghệ, tự động hóa, tài chính quản trị và chiến lược chuyển đổi số.
- Hỗ trợ người dùng xây dựng kế hoạch triển khai sơ bộ (ví dụ: kế hoạch tập huấn AI cho nhà trường, kế hoạch tự động hóa cho doanh nghiệp).
- Khi người dùng muốn kết nối hợp tác trực tiếp, hãy hướng dẫn họ liên hệ qua Email hieudt.aiuni@gmail.com hoặc quét mã QR Zalo cá nhân của Thầy Hiếu tại mục "Kết nối" trên website.`;

module.exports = async (req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Chỉ chấp nhận phương thức POST' });
  }

  const apiKey = getApiKey();
  if (!apiKey) {
    return res.status(500).json({ error: 'Chưa cấu hình GEMINI_API_KEY trên môi trường máy chủ.' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Tin nhắn không hợp lệ' });
    }

    const contents = [];

    // System instruction
    const systemInstruction = {
      parts: [{ text: SYSTEM_PROMPT }]
    };

    // Chat history if available
    if (Array.isArray(history)) {
      history.slice(-6).forEach(h => {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.text }]
        });
      });
    }

    // Current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(googleUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!apiResponse.ok) {
      const errText = await apiResponse.text();
      console.error('Google API Error:', apiResponse.status, errText);
      return res.status(apiResponse.status).json({
        error: 'Lỗi từ Google AI API',
        details: errText
      });
    }

    const data = await apiResponse.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Xin lỗi, tôi chưa nhận được phản hồi từ mô hình AI.';

    return res.status(200).json({ reply: replyText });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Lỗi xử lý máy chủ: ' + err.message });
  }
};
