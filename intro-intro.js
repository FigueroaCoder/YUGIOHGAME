/* Intro: video sin sesión y pantalla de temporada con sesión */
/* ===== INTRO: video sin sesion, pantalla de temporada con sesion, admin ===== */
const INTRO_VID="intro.mp4",INTRO_END=78,INTRO_LAB="Temporada 1",INTRO_IMG0=IMGX["intro/temporada-intro.jpg"];
let ICFG=(()=>{try{return JSON.parse(localStorage.getItem("duelo_icfg")||"null")||{}}catch(e){return{}}})();
const iImg=()=>ICFG.img||INTRO_IMG0,iLab=()=>ICFG.lab||INTRO_LAB,iEnd=()=>ICFG.vend==null?INTRO_END:(ICFG.vend>0?ICFG.vend:1e9);
const iSave=c=>{ICFG=c;try{localStorage.setItem("duelo_icfg",JSON.stringify(c))}catch(e){try{localStorage.setItem("duelo_icfg",JSON.stringify({vend:c.vend,lab:c.lab}))}catch(_){}}};
async function loadIntroCfg(){if(!db)return;try{const s=await Promise.race([D("config","intro").get(),new Promise((_,r)=>setTimeout(r,2500))]);if(s&&s.exists){const d=s.data();iSave({img:d.img||"",vend:d.vend==null?null:+d.vend,lab:d.lab||""})}}catch(e){}}
{const s=document.createElement("style");s.textContent=`
#isp,#ivd{position:fixed;inset:0;z-index:3000;background:#000;overflow:hidden;opacity:1;transition:opacity .4s}
#isp.out,#ivd.out{opacity:0;pointer-events:none}
#isp .bg{position:absolute;inset:-6%;background:center/cover no-repeat;filter:blur(26px) brightness(.55) saturate(1.2)}
#isp .fg{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;animation:ispin .9s ease-out both}
@keyframes ispin{from{opacity:0;transform:scale(1.04)}}
#isp:after{content:"";position:absolute;left:0;right:0;bottom:0;height:40%;background:linear-gradient(transparent,#000d);pointer-events:none}
#isp .br{position:absolute;right:max(22px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));z-index:2;text-align:right;color:#fff;text-shadow:0 2px 12px #000}
#isp .br b{display:block;font:italic 800 clamp(28px,5vw,48px)/1 "Barlow Condensed",Rajdhani,sans-serif;text-transform:uppercase;letter-spacing:.04em}
#isp .br span{display:block;margin-top:6px;font:700 clamp(15px,2.4vw,20px) Rajdhani,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#cfe9ff}
#isp .br span i{font-style:normal;animation:ispd 1.2s infinite both}#isp .br span i:nth-child(2){animation-delay:.2s}#isp .br span i:nth-child(3){animation-delay:.4s}
@keyframes ispd{0%,20%{opacity:.15}50%{opacity:1}100%{opacity:.15}}
#isp .bar{position:relative;margin:14px 0 0 auto;width:min(260px,52vw);height:5px}
#isp .bar .tr{height:100%;border-radius:3px;background:#ffffff33;overflow:hidden}
#isp .cb{position:absolute;top:50%;left:0;width:24px;height:auto;transform:translate(-50%,-50%) rotate(-12deg);filter:drop-shadow(0 2px 6px #000);animation:ispc linear both}
@keyframes ispc{from{left:0}to{left:100%}}
#isp .sd{position:absolute;display:flex;align-items:center;justify-content:space-around;z-index:1;pointer-events:none;overflow:hidden}
#isp .sd.v{flex-direction:column}
#isp .sd img{border-radius:5px;box-shadow:0 8px 22px #000a;transform:rotate(var(--r));animation:iscd .7s ease-out both}
@keyframes iscd{from{opacity:0;transform:translateY(16px) rotate(var(--r)) scale(.9)}to{opacity:.93;transform:rotate(var(--r))}}
#isp .bar u{display:block;height:100%;width:100%;text-decoration:none;transform-origin:left;background:linear-gradient(90deg,#00e5ff,#00ff9d);animation:ispb linear both}
@keyframes ispb{from{transform:scaleX(0)}to{transform:scaleX(1)}}
#ivd video{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000}
#ivd .ld{position:absolute;left:0;right:0;top:50%;margin-top:-12px;text-align:center;color:#ffffff99;font:700 18px Rajdhani,sans-serif;letter-spacing:.2em;text-transform:uppercase;pointer-events:none}
#ivd button{position:absolute;z-index:2;border:1.5px solid #ffffff88;background:#000000a6;color:#fff;font:italic 800 18px/1 "Barlow Condensed",Rajdhani,sans-serif;letter-spacing:.1em;text-transform:uppercase;padding:12px 24px;border-radius:30px;box-shadow:none;clip-path:none;cursor:pointer;-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}
#ivd .sk{right:max(18px,env(safe-area-inset-right));bottom:max(18px,env(safe-area-inset-bottom))}
#ivd .sn{display:none;left:50%;top:50%;transform:translate(-50%,-50%);width:max-content;max-width:88vw;padding:18px 34px;font-size:clamp(20px,4vw,28px);border-color:#fff;background:#000c}
#app .ipv{display:block;width:min(460px,100%);border-radius:10px;border:1px solid #ffffff33;margin:12px 0}
`;document.head.appendChild(s)}
function mkSplash(ms,c){const gi=()=>c?(c.img||INTRO_IMG0):iImg(),gl=()=>c?(c.lab||INTRO_LAB):iLab();const e=document.createElement("div");e.id="isp";
e.innerHTML='<div class="bg"></div><img class="fg" alt=""><div class="sd"></div><div class="sd"></div><div class="br"><b></b><span>Cargando<i>.</i><i>.</i><i>.</i></span><div class="bar"><div class="tr"><u></u></div><img class="cb" alt=""></div></div>';
const f=e.querySelector(".fg"),bx=e.querySelectorAll(".sd"),cb=e.querySelector(".cb"),pool=sh(C.map(x=>x[0]).filter(id=>IMG[id]&&IMG[id][0])).slice(0,16);
cb.src=BK;cb.style.animationDuration=ms+"ms";
const fill=(box,x,y,w,h,vert,n,ch,k)=>{box.style.cssText="left:"+x+"px;top:"+y+"px;width:"+w+"px;height:"+h+"px;display:flex";box.className="sd"+(vert?" v":"");box.innerHTML="";for(let i=0;i<n;i++){const im=new Image(),r=(((k+i)*37)%21)-10;im.src=IMG[pool[(k+i)%pool.length]][0];im.style.cssText="height:"+Math.round(ch)+"px;width:"+Math.round(ch*.686)+"px;--r:"+r+"deg;animation-delay:"+((k+i)*.12)+"s";box.appendChild(im)}};
const lay=()=>{const W=innerWidth,H=innerHeight,ar=(f.naturalWidth||900)/(f.naturalHeight||638);bx.forEach(b=>b.style.display="none");
 if(W/H>ar){const sw=(W-H*ar)/2;if(sw<56)return;const n=Math.max(1,Math.min(4,Math.floor(H/(sw*1.15)))),ch=Math.min(H/n*.92,sw*.9/.686);fill(bx[0],0,0,sw,H,1,n,ch,0);fill(bx[1],W-sw,0,sw,H,1,n,ch,n)}
 else{const bh=(H-W/ar)/2;if(bh<56)return;const ch=bh*.86,m=Math.max(2,Math.min(7,Math.floor(W/(ch*.686*1.25))));fill(bx[0],0,0,W,bh,0,m,ch,0);fill(bx[1],0,H-bh,W*.52,bh,0,Math.max(1,Math.floor(W*.52/(ch*.686*1.1))),ch,m)}};
f.onload=lay;addEventListener("resize",lay);
const paint=()=>{const u=gi();e.querySelector(".bg").style.backgroundImage='url("'+u+'")';if(f.getAttribute("src")!=u)f.src=u;e.querySelector("b").textContent=gl()};paint();e.querySelector(".bar u").style.animationDuration=ms+"ms";document.body.appendChild(e);
return{paint,close(){removeEventListener("resize",lay);e.classList.add("out");setTimeout(()=>e.remove(),450)}}}
function playIntro(o){o=o||{};return new Promise(res=>{const e=document.createElement("div");e.id="ivd";e.innerHTML='<video playsinline webkit-playsinline preload="auto"></video><div class="ld">Cargando video…</div><button class="sk">SKIP VIDEO ▸</button><button class="sn">▶ TOCA PARA COMENZAR</button>';document.body.appendChild(e);
const v=e.querySelector("video"),sk=e.querySelector(".sk"),sn=e.querySelector(".sn"),ld=e.querySelector(".ld");let done=0,tm,iv;
const end=()=>{if(done)return;done=1;clearInterval(iv);clearTimeout(tm);try{v.pause();v.removeAttribute("src");v.load()}catch(_){}e.classList.add("out");setTimeout(()=>{e.remove();res()},380)};
const lim=()=>o.end!=null?o.end:iEnd();if(o.end==null){try{autoFS()}catch(_){}}
sk.onclick=ev=>{ev.stopPropagation();end()};
v.onended=end;v.onerror=end;v.onplaying=()=>{clearTimeout(tm);ld.style.display="none";sn.style.display="none";if(v.muted)v.muted=false};
iv=setInterval(()=>{if(v.currentTime>=lim())end()},100);tm=setTimeout(end,20000);
const unm=ev=>{if(ev)ev.stopPropagation();try{autoFS()}catch(_){}v.muted=false;sn.style.display="none";const p=v.play();if(p&&p.catch)p.catch(()=>{})};sn.onclick=unm;
v.src=INTRO_VID;v.muted=false;v.volume=1;const gate=()=>{clearTimeout(tm);ld.style.display="none";sn.style.display="block"};const p=v.play();if(p&&p.catch)p.catch(er=>{if(er&&er.name=="NotAllowedError")gate();else end()})})}
function autoFS(){const d=document,el=d.documentElement,q=el.requestFullscreen||el.webkitRequestFullscreen;if(!q)return;const inFS=()=>d.fullscreenElement||d.webkitFullscreenElement,go=()=>{if(inFS())return;try{const r=q.call(el);if(r&&r.catch)r.catch(()=>{})}catch(e){}};go();if(!inFS())d.addEventListener("pointerup",go,{once:true,capture:true})}
(async()=>{
 if(ses()){const sp=mkSplash(3000);autoFS();const cp=loadIntroCfg().then(()=>sp.paint());await Promise.all([loadSession(),W(3000),cp]);if(U){showApp("lobby");sp.close();return}sp.close()}
 else await loadSession();
 if(!U){const cp=loadIntroCfg();await playIntro();const sp=mkSplash(3000);autoFS();await Promise.all([W(3000),cp.then(()=>sp.paint())]);showApp("auth");sp.close()}
})();
