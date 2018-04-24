 //  _           _   _                __
 // | |         | | | |              /_ |
 // | |__  _   _| |_| |_ ___  _ __    | |
 // | '_ \| | | | __| __/ _ \| '_ \   | |
 // | |_) | |_| | |_| || (_) | | | |  | |
 // |_.__/ \__,_|\__|\__\___/|_| |_|  |_|

let button1 = document.getElementById("button1");
let form1 = document.getElementById("form1");
function button1clicked(){

  form1.style.display = "block";
  button1.style.display = "none";
}
button1.addEventListener("click", button1clicked);

form1.addEventListener('submit', function (e) {
  e.preventDefault();
  let question = form1.question.value;
  let parent = form1.getAttribute("parent");
  $.ajax({
    type: "POST",
    url: "/question",
    data: {question:question, parent: parent},
    success: function(){
      window.location = window.location.href;
    }
  });
}, false);

//  _           _   _                ___
// | |         | | | |              |__ \
// | |__  _   _| |_| |_ ___  _ __      ) |
// | '_ \| | | | __| __/ _ \| '_ \    / /
// | |_) | |_| | |_| || (_) | | | |  / /_
// |_.__/ \__,_|\__|\__\___/|_| |_| |____|

let button2 = document.getElementById("button2");
let form2 = document.getElementById("form2");

function button2clicked(){
  form2.style.display = "block";
  button2.style.display = "none";
}
button2.addEventListener("click", button2clicked);

form2.addEventListener('submit', function (e) {
  e.preventDefault();
  let question = form2.question.value;
  let parent = form2.getAttribute("parent");
  $.ajax({
    type: "POST",
    url: "/question",
    data: {question:question, parent: parent},
    success: function(){
      window.location = window.location.href;
    }
  });
}, false);

// form2.addEventListener('submit', function (e) {
//   e.preventDefault();
// }, false);
