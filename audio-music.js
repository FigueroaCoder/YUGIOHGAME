/* Música: 3 canciones en bucle, volumen bajo en combate y botón de configuración */
/* ===== MUSICA: 3 canciones en bucle, mas bajita en combate, boton de configuracion ===== */
(function(){
const TR=["music/musica1.mp3","music/musica2.mp3","music/musica3.mp3"],VM=.35,VC=.12,K="duelo_music";
let on=true,idx=0,gest=0;
try{on=localStorage.getItem(K)!=="0"}catch(e){}
const au=new Audio();au.preload="auto";au.volume=VM;
const load=()=>{au.src=TR[idx]};
au.onended=()=>{idx=(idx+1)%TR.length;load();au.play().catch(()=>{})};
au.onerror=()=>{idx=(idx+1)%TR.length;setTimeout(()=>{load();if(on&&gest)au.play().catch(()=>{})},1500)};
load();
const st=document.createElement("style");
st.textContent=`#mbtn{position:fixed;left:max(10px,env(safe-area-inset-left));bottom:max(10px,env(safe-area-inset-bottom));z-index:2500;width:34px;height:34px;padding:0;border-radius:50%;border:1px solid #ffffff55;background:#000a;color:#fff;font-size:17px;line-height:1;cursor:pointer;opacity:.7;display:none;align-items:center;justify-content:center;clip-path:none;box-shadow:none;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}#mbtn:hover{opacity:1}
#mpn{position:fixed;left:max(10px,env(safe-area-inset-left));bottom:calc(max(10px,env(safe-area-inset-bottom)) + 42px);z-index:2500;display:none;background:#10142cf0;border:1px solid #ffffff44;border-radius:12px;padding:12px 14px;color:#fff;font:700 14px Rajdhani,sans-serif;min-width:190px;box-shadow:0 8px 24px #000a}#mpn.show{display:block}#mpn h4{margin:0 0 8px;font:italic 800 16px "Barlow Condensed",Rajdhani,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#cfe9ff}#mpn button{width:100%;padding:9px 12px;border-radius:8px;border:1px solid #ffffff55;background:#ffffff14;color:#fff;font:700 14px Rajdhani,sans-serif;letter-spacing:.06em;cursor:pointer;clip-path:none;box-shadow:none}#mpn small{display:block;margin-top:8px;opacity:.65;font-weight:600}`;
document.head.appendChild(st);
const b=document.createElement("button");b.id="mbtn";b.title="Configuración";b.textContent="⚙";
const pn=document.createElement("div");pn.id="mpn";
pn.innerHTML='<h4>Configuración</h4><button id="mtg"></button><small>Las canciones suenan en bucle.</small>';
document.body.append(b,pn);
const tg=pn.querySelector("#mtg"),lab=()=>{tg.textContent=on?"🔊 Música: ACTIVADA":"🔇 Música: DESACTIVADA"};lab();
b.onclick=e=>{e.stopPropagation();pn.classList.toggle("show")};
pn.onclick=e=>e.stopPropagation();
document.addEventListener("click",()=>pn.classList.remove("show"));
tg.onclick=()=>{on=!on;try{localStorage.setItem(K,on?"1":"0")}catch(e){}lab();if(on){gest=1;au.play().catch(()=>{})}else au.pause()};
const g=()=>{gest=1};
["pointerdown","keydown","touchstart"].forEach(t=>document.addEventListener(t,g,{capture:true,once:true}));
setInterval(()=>{
 const inGame=typeof U!=="undefined"&&!!U;
 b.style.display=inGame?"flex":"none";
 if(!inGame){pn.classList.remove("show");if(!au.paused)au.pause();return}
 const combat=app.style.display=="none";
 const v=combat?VC:VM;if(Math.abs(au.volume-v)>.005)au.volume=v;
 if(on&&gest&&au.paused&&!au.ended)au.play().catch(()=>{});
 if(!on&&!au.paused)au.pause();
},400);
})();
