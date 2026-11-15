(function(){
 var b=document.getElementById("menu"),n=document.getElementById("nav");
 function t(o){n.classList.toggle("open",o);b.setAttribute("aria-expanded",o)}
 b.addEventListener("click",function(){t(!n.classList.contains("open"))});
 n.addEventListener("click",function(e){if(e.target.tagName==="A")t(false)});
 var d=String(new Date().getDay()),r=document.querySelector('#hours [data-d="'+d+'"]');
 if(r)r.classList.add("today");
})();

(function(){
 document.querySelectorAll(".car").forEach(function(card){
  var url="car.html?id="+card.querySelector("h3").textContent.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""),
   link=card.querySelector('a[href="inventory.html"]'),btn=card.querySelector("[data-open]");
  if(link)link.href=url;
  if(btn)btn.addEventListener("click",function(){location.href=url});
 });
})();