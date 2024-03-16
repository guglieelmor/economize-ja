export const toCopyText = (text: string) => {
  if (text !== '') {
    navigator.clipboard.writeText(text);
    alert('Copied text.');
  } else {
    alert("Please write text, you don't copy text null.");
  }
};
