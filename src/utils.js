/**
 * Some util functions used within the app
 */

const copyText = (text) => {
  // Examine util object. To be removed
  console.log("navigator.clipboard", navigator.clipboard);
  // End of examine util object
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const tmp = document.createElement("TEXTAREA");
    tmp.value = text;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);
  }
};

export { copyText };
