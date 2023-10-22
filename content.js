console.log("content script running", chrome);

function getSelectedText() {
  var selectedText = "";

  // window.getSelection
  if (window.getSelection) {
    selectedText = window.getSelection();
  }
  // document.getSelection
  else if (document.getSelection) {
    selectedText = document.getSelection();
  }
  // document.selection
  else if (document.selection) {
    selectedText = document.selection.createRange().text;
  } else return;
  // To write the selected text into the textarea
  return selectedText;
}
const selectionText = getSelectedText();
console.log("selectionText", selectionText);
