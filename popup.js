// đoạn mã lấy ra được httponly
document.addEventListener("DOMContentLoaded", function () {
  const exportButton = document.getElementById("exportButton");

  exportButton.addEventListener("click", function () {
    chrome.cookies.get(
      { url: "https://facebook.com", name: "fr" },
      (cookie) => {
        if (cookie) {
          const cookieValue = cookie.value;
          const blob = new Blob([cookieValue], { type: "text/plain" });
          const url = URL.createObjectURL(blob);

          chrome.downloads.download({
            url: url,
            filename: "fr.txt",
          });
        } else {
          console.log("Không tìm thấy cookie fr.");
        }
      }
    );
  });
});

// chrome.cookies.get(
//   { url: "https://www.facebook.com", name: "fr" },
//   (cookie) => {
//     if (cookie) {
//       const cookieValue = cookie.value;
//       const textBlob = new Blob([cookieValue], { type: "text/plain" });

//       chrome.downloads.download({
//         url: URL.createObjectURL(textBlob),
//         filename: "fr.txt",
//       });
//     } else {
//       console.log("Không tìm thấy cookie fr.");
//     }
//   }
// );
