/*Debounce function - Updates the database live when we type but doesnt send
  a request every single time a letter is typed, wait for the user to stop 
  typing before updating the database so its not going crazy at the database
  with all these HTTP calls*/
export default function debounce(a, b, c) {
  var d, e;
  return function () {
    function h() {
      d = null;
      c || (e = a.apply(f, g));
    }
    var f = this,
      g = arguments;
    return (
      clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
    );
  };
}

/*This function is for the preview on the sidebar - removes the HTML tags */
export function removeHTMLTags(str) {
  return str.replace(/<[^>]*>?/gm, "");
}
