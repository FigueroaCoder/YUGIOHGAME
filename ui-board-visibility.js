/* El tablero solo se ve durante el combate */
/* ===== el tablero solo se ve en combate ===== */
(function(){const sync=()=>document.body.classList.toggle("bt",app.style.display=="none");new MutationObserver(sync).observe(app,{attributes:true,attributeFilter:["style"]});setInterval(sync,300);sync()})();
