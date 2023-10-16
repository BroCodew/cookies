async function getCookiesText() {
    // Lấy tất cả cookies từ trình duyệt
    const cookies = await chrome.cookies.getAll({});
    // Chuyển đổi cookies thành một chuỗi văn bản
    const cookiesText = cookies
      .map((cookie) => `${cookie.name}: ${cookie.value}`)
      .join("\n");
  
    // Tạo một đối tượng Blob từ chuỗi cookiesText
    const blob = new Blob([cookiesText], { type: "text/plain" });
  
    // Tạo một đường dẫn (URL) cho tệp Blob
    const url = URL.createObjectURL(blob);
  
    // Tạo một thẻ a (link) để tải tệp
    const a = document.createElement("a");
    a.href = url;
    a.download = "cookies.txt";
    a.textContent = "Tải tệp cookies.txt";
  
    // Thêm thẻ a vào trang web và kích hoạt sự kiện click để tải tệp
    document.body.appendChild(a);
    a.click();
  
    // Xóa tệp và đường dẫn URL sau khi đã tải
    URL.revokeObjectURL(url);
  }
  
  // Gọi hàm getCookiesText
  getCookiesText();
  