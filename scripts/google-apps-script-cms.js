/**
 * PORTFOLIO DƯƠNG TRUNG HIẾU - CLOUD CMS AUTOMATION APPS SCRIPT
 * File sao lưu mã nguồn Google Apps Script trong dự án
 */

const SHEET_NAME = "Bài viết";

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("🚀 Portfolio CMS")
    .addItem("⚡ 1. Khởi tạo / Cập nhật cấu trúc chuẩn", "khoiTaoBangCMS")
    .addItem("➕ 2. Thêm một bài viết mẫu mới", "themBaiVietMau")
    .addSeparator()
    .addItem("🔗 3. Lấy Sheet ID & Link kết nối Web", "layThongTinKetNoi")
    .addToUi();
}

function khoiTaoBangCMS() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME, 0);
  } else {
    sheet.activate();
  }

  const headers = [
    "id",
    "title",
    "category",
    "categorySlug",
    "date",
    "author",
    "authorRole",
    "readTime",
    "thumbnail",
    "excerpt",
    "tags",
    "content"
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setBackground("#142b49")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setFontSize(10.5)
    .setFontFamily("Segoe UI")
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(false);

  sheet.setRowHeight(1, 40);
  sheet.setFrozenRows(1);

  const columnWidths = {
    1: 170, // A: id
    2: 280, // B: title
    3: 150, // C: category
    4: 120, // D: categorySlug
    5: 100, // E: date
    6: 140, // F: author
    7: 220, // G: authorRole
    8: 100, // H: readTime
    9: 200, // I: thumbnail
    10: 280, // J: excerpt
    11: 180, // K: tags
    12: 350  // L: content
  };

  for (let col in columnWidths) {
    sheet.setColumnWidth(parseInt(col), columnWidths[col]);
  }

  const categories = [
    "Giáo dục 4.0",
    "Quản trị SME",
    "Đào tạo cộng đồng",
    "Ứng dụng AI"
  ];
  const catRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(categories, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange(2, 3, 500, 1).setDataValidation(catRule);

  sheet.getRange(2, 1, 500, 1).setHorizontalAlignment("left");
  sheet.getRange(2, 4, 500, 1).setHorizontalAlignment("center");
  sheet.getRange(2, 5, 500, 1).setHorizontalAlignment("center");
  sheet.getRange(2, 8, 500, 1).setHorizontalAlignment("center");
  sheet.getRange(2, 10, 500, 1).setWrap(true);
  sheet.getRange(2, 12, 500, 1).setWrap(true);

  if (sheet.getLastRow() === 1) {
    themDuLieuMauGoc(sheet);
  }

  SpreadsheetApp.getUi().alert("🎉 Hoàn tất!\nBảng tính CMS đã được khởi tạo chuẩn hóa 100%. Bạn có thể bắt đầu đăng bài viết.");
}

function themDuLieuMauGoc(sheet) {
  const sampleData = [
    [
      "tap-huan-ai-truc-ninh-cns",
      "Ứng dụng Generative AI trong công tác Tổ Công nghệ số cộng đồng tại xã Trực Ninh",
      "Đào tạo cộng đồng",
      "cong-dong",
      Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy"),
      "Dương Trung Hiếu",
      "Giám đốc Đào tạo Học viện Công nghệ AIUNI",
      "4 phút đọc",
      "public/images/gallery/event1.svg",
      "Chuyên đề tập huấn kỹ năng ứng dụng AI tạo sinh cho đội ngũ cán bộ cơ sở và thành viên Tổ công nghệ số cộng đồng.",
      "Generative AI, Tổ CNS cộng đồng, Chuyển đổi số",
      "<h3>1. Bối cảnh</h3><p>Chương trình tập huấn thực chiến do Thầy Dương Trung Hiếu trực tiếp giảng dạy giúp cán bộ cơ sở làm chủ công nghệ và tạo sản phẩm tuyên truyền số ngay tại lớp.</p>"
    ],
    [
      "ai-trong-giao-duc-doi-moi-day-hoc",
      "Đổi mới phương pháp dạy học bằng AI: Cơ hội và lộ trình cho giáo viên",
      "Giáo dục 4.0",
      "giao-duc",
      Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy"),
      "Dương Trung Hiếu",
      "Giám đốc Đào tạo Học viện Công nghệ AIUNI",
      "5 phút đọc",
      "public/images/gallery/event2.svg",
      "Hướng dẫn giáo viên ứng dụng AI soạn giáo án chuẩn Công văn 5512, ngân hàng đề kiểm tra phân hóa và học liệu số.",
      "Giáo dục số, Chuẩn 5512, EdTech",
      "<h3>1. Tháo gỡ áp lực hồ sơ</h3><p>Ứng dụng AI giúp giáo viên tiết kiệm 60% thời gian hành chính để tập trung truyền cảm hứng cho học sinh.</p>"
    ]
  ];

  sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
}

function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (sheet.getName() !== SHEET_NAME) return;

  const row = e.range.getRow();
  const col = e.range.getColumn();

  if (row <= 1) return;

  if (col === 2) {
    const titleVal = e.range.getValue().toString().trim();
    const idCell = sheet.getRange(row, 1);
    if (titleVal && !idCell.getValue()) {
      idCell.setValue(taoSlugKhongDau(titleVal));
    }

    const dateCell = sheet.getRange(row, 5);
    if (!dateCell.getValue()) {
      dateCell.setValue(Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy"));
    }

    const authorCell = sheet.getRange(row, 6);
    if (!authorCell.getValue()) {
      authorCell.setValue("Dương Trung Hiếu");
    }
    const roleCell = sheet.getRange(row, 7);
    if (!roleCell.getValue()) {
      roleCell.setValue("Giám đốc Đào tạo Học viện Công nghệ AIUNI");
    }

    const timeCell = sheet.getRange(row, 8);
    if (!timeCell.getValue()) {
      timeCell.setValue("4 phút đọc");
    }
  }

  if (col === 3) {
    const catVal = e.range.getValue().toString().trim();
    const slugCell = sheet.getRange(row, 4);
    const slugMap = {
      "Giáo dục 4.0": "giao-duc",
      "Quản trị SME": "doanh-nghiep",
      "Đào tạo cộng đồng": "cong-dong",
      "Ứng dụng AI": "cong-nghe"
    };
    if (slugMap[catVal]) {
      slugCell.setValue(slugMap[catVal]);
    }
  }
}

function taoSlugKhongDau(str) {
  if (!str) return "";
  let slug = str.toLowerCase();
  slug = slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  slug = slug.replace(/[đĐ]/g, "d");
  slug = slug.replace(/[^a-z0-9\s-]/g, "");
  slug = slug.replace(/[\s-]+/g, "-");
  slug = slug.replace(/^-+|-+$/g, "");
  return slug;
}

function layThongTinKetNoi() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetId = ss.getId();
  const msg = `Mã SHEET ID của bạn là:\n\n${sheetId}\n\n👉 Bạn chỉ cần gửi mã này (hoặc đường link Google Sheet) để kết nối trực tiếp vào website trunghieuai.io.vn.`;
  SpreadsheetApp.getUi().alert("THÔNG TIN KẾT NỐI CLOUD CMS", msg, SpreadsheetApp.getUi().ButtonSet.OK);
}

function themBaiVietMau() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) return;

  const nextRow = sheet.getLastRow() + 1;
  const todayStr = Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy");

  sheet.getRange(nextRow, 1, 1, 12).setValues([[
    "bai-viet-moi-" + nextRow,
    "Tiêu đề bài viết mới số " + (nextRow - 1),
    "Ứng dụng AI",
    "cong-nghe",
    todayStr,
    "Dương Trung Hiếu",
    "Giám đốc Đào tạo Học viện Công nghệ AIUNI",
    "4 phút đọc",
    "public/images/gallery/event1.svg",
    "Tóm tắt nội dung bài viết mới...",
    "AI, Đào tạo, Công nghệ",
    "<h3>1. Giới thiệu</h3><p>Nội dung chi tiết bài viết...</p>"
  ]]);

  sheet.setActiveRange(sheet.getRange(nextRow, 2));
  SpreadsheetApp.getUi().alert(`Đã thêm dòng bài viết mẫu tại dòng số ${nextRow}. Bạn hãy chỉnh sửa tiêu đề và nội dung theo ý muốn.`);
}
