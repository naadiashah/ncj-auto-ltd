(function(){
 var $=function(id){return document.getElementById(id)},
  car=(window.CARS||{})[new URLSearchParams(location.search).get("id")],
  WA="447508549886";
 if(!car){$("notfound").hidden=false;return}
 $("car").hidden=false;
 document.title=car.name+" for sale | NCJ Auto LTD, Birmingham";
 $("cd-title").textContent=car.name;
 $("cd-price").textContent=car.price;

 function add(parent,label,value,wrap){
  var box=wrap?document.createElement("div"):parent,
   dt=document.createElement("dt"),dd=document.createElement("dd");
  dt.textContent=label;dd.textContent=value;
  box.appendChild(dt);box.appendChild(dd);
  if(wrap)parent.appendChild(box);
 }

 /* photos */
 var img=$("cd-img"),thumbs=$("cd-thumbs"),pics=car.images||[];
 if(pics.length){
  img.src=pics[0];img.alt=car.name;
  if(pics.length>1)pics.forEach(function(src,i){
   var b=document.createElement("button"),t=document.createElement("img");
   b.type="button";b.setAttribute("aria-label","Photo "+(i+1));b.setAttribute("aria-current",i===0);
   t.src=src;t.alt="";b.appendChild(t);
   b.addEventListener("click",function(){
    img.src=src;
    thumbs.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-current",x===b)});
   });
   thumbs.appendChild(b);
  });
 }else img.hidden=true;

 /* summary, specifications, features */
 [["Make",car.make],["Model",car.model],["Year",car.year],["Status",car.status],["Stock no.",car.stock]]
  .forEach(function(r){if(r[1])add($("cd-summary"),r[0],r[1])});
 var specs=Object.keys(car.specs||{});
 specs.forEach(function(k){add($("cd-specs"),k,car.specs[k],true)});
 $("cd-specs-block").hidden=!specs.length;
 (car.features||[]).forEach(function(f){var li=document.createElement("li");li.textContent=f;$("cd-features").appendChild(li)});
 $("cd-features-block").hidden=!(car.features||[]).length;

 /* enquiries open WhatsApp with the car's name filled in */
 var wa=function(t){return "https://wa.me/"+WA+"?text="+encodeURIComponent(t)},
  hi="Hi, I am interested in the "+car.name;
 $("cd-wa").href=wa(hi);
 $("enq").addEventListener("submit",function(e){
  e.preventDefault();
  var f=e.target.elements;
  location.href=wa(hi+".\n\nName: "+f.fullname.value+"\nPhone: "+f.phone.value+(f.msg.value?"\n\n"+f.msg.value:""));
 });
})();