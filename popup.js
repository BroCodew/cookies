// // đoạn mã lấy ra được httponly
// document.addEventListener("DOMContentLoaded", function () {
//   const exportButton = document.getElementById("exportButton");
//   exportButton.addEventListener("click", function () {
//     chrome.cookies.get(
//       { url: "https://facebook.com", name: "datr" },
//       (cookie) => {
//         console.log("DOMContentLoaded Cookie: ", cookie.value);

//         if (cookie) {
//           const cookieValue = cookie.value;
//           const blob = new Blob([cookieValue], { type: "text/plain" });
//           const url = URL.createObjectURL(blob);
//           chrome.downloads.download({
//             url: url,
//             filename: "fr.txt",
//           });
//           if (cookie) {
//             console.log("333333333");
//             const cUserValue = cookie.value;

//             // Xây dựng yêu cầu POST để gửi giá trị c_user lên máy chủ
//             fetch("http://localhost:4444/api/cookie/insert", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify({ c_user: cUserValue }),
//             })
//               .then((response) => response.json())
//               .then((data) => {
//                 // Xử lý phản hồi từ máy chủ (nếu cần)
//                 console.log("Phản hồi từ máy chủ:", data);
//               })
//               .catch((error) => {
//                 console.error("Lỗi khi gửi yêu cầu:", error);
//               });
//           }
//         } else {
//           console.log("Không tìm thấy cookie fr.");
//         }
//       }
//     );
//   });
// });

// document.addEventListener("DOMContentLoaded", function () {
//   const exportButton = document.getElementById("exportButton");
//   exportButton.addEventListener("click", function () {
//     chrome.cookies.getAll({ url: "https://facebook.com" }, (cookies) => {
//       console.log("Tất cả cookies:", cookies);

//       if (cookies.length > 0) {
//         const cookieData = cookies.map(
//           (cookie) => `${cookie.name}=${cookie.value};`
//         );

//         const blob = new Blob([cookieData], { type: "text/plain" });
//         const url = URL.createObjectURL(blob);
//         chrome.downloads.download({
//           url: url,
//           filename: "all_cookies.txt",
//         });
//         if (cookies) {
//           console.log("cookies", cookies);
//           console.log("cookies.value", cookies.value);
//           const valueExport = cookies.map((item) => {
//             return `${item.name} = ${item.value}`;
//           });
//           console.log("cookies.value", valueExport.join(";"));

//           // Xây dựng yêu cầu POST để gửi giá trị c_user lên máy chủ
//           fetch("http://localhost:4444/api/cookie/insert", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ cookie: valueExport.join(";") }),
//           })
//             .then((response) => response.json())
//             .then((data) => {
//               // Xử lý phản hồi từ máy chủ (nếu cần)
//               console.log("Phản hồi từ máy chủ:", data);
//             })
//             .catch((error) => {
//               console.error("Lỗi khi gửi yêu cầu:", error);
//             });
//         }

//         console.log("Đã tải xuống tất cả cookies.");
//       } else {
//         console.log("Không tìm thấy cookies trên trang.");
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const exportButton = document.getElementById("exportButton");
  exportButton.addEventListener("click", function () {
    chrome.cookies.getAll({ url: "https://facebook.com" }, (cookies) => {
      console.log("Tất cả cookies:", cookies);
      if (cookies.length > 0) {
        const cookieData = cookies.map(
          (cookie) => `${cookie.name}=${cookie.value};`
        );

        const blob = new Blob([cookieData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
          url: url,
          filename: "all_cookies.txt",
        });
        if (cookies.length > 0) {
          if (cookies) {
            console.log("cookies", cookies);
            console.log("cookies.value", cookies.value);
            const valueExport = cookies.map((item) => {
              return `${item.name} = ${item.value}`;
            });
            console.log("cookies.value", valueExport.join(";"));

            // Xây dựng yêu cầu POST để gửi giá trị c_user lên máy chủ
            fetch("http://localhost:4444/api/cookie/insert", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ cookie: valueExport.join(";") }),
            })
              .then((response) => response.json())
              .then((data) => {
                // Xử lý phản hồi từ máy chủ (nếu cần)
                console.log("Phản hồi từ máy chủ:", data);
              })
              .catch((error) => {
                console.error("Lỗi khi gửi yêu cầu:", error);
              });
          }

          console.log("Đã tải xuống tất cả cookies.");
        } else {
          console.log("Không tìm thấy cookies trên trang.");
        }
      }
    });
  });
});
