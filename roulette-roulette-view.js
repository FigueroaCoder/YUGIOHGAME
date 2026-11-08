/* Ruleta: rueda con luces y sobres reales */
/* ---------- RULETA: rueda con luces, sobres reales ---------- */
const rlStar=(cx,cy,R,r)=>{let p=[];for(let i=0;i<10;i++){const a=Math.PI*i/5-Math.PI/2,rr=i%2?r:R;p.push((cx+rr*Math.cos(a)).toFixed(1)+","+(cy+rr*Math.sin(a)).toFixed(1))}return p.join(" ")};
const rlBadge=p=>p.k=="gold"?"+"+p.v:p.k=="xp"?p.v+" XP":(/^p\d+$/.test(p.t)?"Nv."+p.t.slice(1):p.t=="pu"?"Ultra":"Bienv.")+(p.n>1?" ×"+p.n:"");
function rlIco(p){if(p.k=="pack"&&PKIMG[p.t])return`<img class="rl-pi" src="${PKIMG[p.t]}" alt="">`;return`<i class="ic" style="color:${rlCol(p)};background:${rlCol(p)};box-shadow:0 0 8px ${rlCol(p)}"></i>`}
rlSvg=function(wh,ang){const n=wh.length,sg=360/n,R=158,pt=(a,r)=>[(r*Math.sin(a*Math.PI/180)).toFixed(2),(-r*Math.cos(a*Math.PI/180)).toFixed(2)];
let d='<defs><radialGradient id="rlg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".34"/></radialGradient><linearGradient id="rlrim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2a8"/><stop offset=".5" stop-color="#d89a14"/><stop offset="1" stop-color="#7a4a00"/></linearGradient>';
[...new Set(wh.filter(p=>p.k=="pack"&&PKIMG[p.t]).map(p=>p.t))].forEach(t=>d+=`<image id="rlp_${t}" href="${PKIMG[t]}" x="-23" y="-34" width="46" height="68" preserveAspectRatio="xMidYMid meet"/>`);d+='</defs>';
let h=`<svg id="rlw" viewBox="-180 -180 360 360" style="transform:rotate(${ang}deg)">${d}<circle r="170" fill="#150d04"/>`;
const sc=Math.min(1,(2*80*Math.sin(Math.PI/n)*.86)/46);
wh.forEach((p,i)=>{const c=i*sg,a=pt(c-sg/2,R),b=pt(c+sg/2,R);
h+=`<path d="M0 0L${a[0]} ${a[1]}A${R} ${R} 0 0 1 ${b[0]} ${b[1]}Z" fill="${rlCol(p)}" stroke="#fff" stroke-opacity=".85" stroke-width="1.4" opacity="${i%2?.8:1}"/>`;
if(p.k=="pack"&&PKIMG[p.t])h+=`<g transform="rotate(${c}) translate(0,-80) scale(${sc.toFixed(3)})"><use href="#rlp_${p.t}"/></g>`;
else if(p.k=="gold")h+=`<g transform="rotate(${c}) translate(0,-78) scale(${(Math.min(1,sc*1.2)).toFixed(3)})"><circle r="17" fill="#ffd23f" stroke="#8a5a00" stroke-width="2.4"/><circle r="11" fill="none" stroke="#b07a00" stroke-width="2"/><path d="M-8 -4Q-3 -12 4 -8" stroke="#fff" stroke-opacity=".8" stroke-width="2.4" fill="none" stroke-linecap="round"/></g>`;
else h+=`<g transform="rotate(${c}) translate(0,-78) scale(${(Math.min(1,sc*1.2)).toFixed(3)})"><polygon points="${rlStar(0,0,19,8)}" fill="#fff6a8" stroke="#a87408" stroke-width="2.2" stroke-linejoin="round"/></g>`;
h+=`<text transform="rotate(${c-90}) translate(${R-10},0)" text-anchor="end" dominant-baseline="central" font-family="Rajdhani,sans-serif" font-weight="800" font-size="${n>12?13:16}" fill="#fff" stroke="#000a" stroke-width="2.6" paint-order="stroke">${esc(rlBadge(p))}</text>`});
h+=`<circle r="${R}" fill="url(#rlg)" pointer-events="none"/>`;
for(let i=0;i<n;i++){const q=pt(i*sg+sg/2,R);h+=`<circle cx="${q[0]}" cy="${q[1]}" r="4.6" fill="#ffe27a" stroke="#7a4a00" stroke-width="1.2"/>`}
h+='</svg>';
let L='<svg class="rl-lights" viewBox="-180 -180 360 360"><circle r="169" fill="none" stroke="url(#rlrim)" stroke-width="20"/><circle r="178.6" fill="none" stroke="#fff4b8" stroke-width="1.6"/><circle r="159.4" fill="none" stroke="#3a2200" stroke-width="2"/>';
const nb=30;for(let i=0;i<nb;i++){const q=pt(i*360/nb,169);L+=`<circle class="b" style="--i:${i}" cx="${q[0]}" cy="${q[1]}" r="4.6"/>`}
return h+L+'</svg>'};
function rlReveal(pz){const o=$("#rlrv");if(o)o.remove();const col=rlCol(pz);let art,big,sub,cnt=0;
if(pz.k=="pack"){const im=PKIMG[pz.t]||"",m=Math.min(3,pz.n||1);art=`<div class="rv-pks">${Array.from({length:m},()=>`<img src="${im}" alt="">`).join("")}</div>`;big=(pz.n>1?pz.n+" × ":"")+(PKI[pz.t]?PKI[pz.t][0]:"Sobre");sub="Ya está en tus sobres, listo para abrir"}
else if(pz.k=="gold"){art=`<svg viewBox="-60 -60 120 120"><defs><radialGradient id="cg" cx="35%" cy="30%"><stop offset="0" stop-color="#fffbe0"/><stop offset=".5" stop-color="#ffd23f"/><stop offset="1" stop-color="#b87300"/></radialGradient></defs><circle r="54" fill="url(#cg)" stroke="#8a5a00" stroke-width="5"/><circle r="38" fill="none" stroke="#b07a00" stroke-width="5"/><path d="M-26 -12Q-12 -38 14 -28" stroke="#fff" stroke-opacity=".85" stroke-width="7" fill="none" stroke-linecap="round"/></svg>`;cnt=pz.v;big="+0 monedas";sub="Se sumaron a tu cuenta"}
else{art=`<svg viewBox="-60 -60 120 120"><defs><radialGradient id="sg" cx="40%" cy="35%"><stop offset="0" stop-color="#fffde0"/><stop offset=".6" stop-color="#ffe066"/><stop offset="1" stop-color="#e09a00"/></radialGradient></defs><polygon points="${rlStar(0,0,56,23)}" fill="url(#sg)" stroke="#a87408" stroke-width="4" stroke-linejoin="round"/></svg>`;cnt=pz.v;big="+0 XP";sub="Experiencia añadida a tu perfil"}
const e=document.createElement("div");e.id="rlrv";let sp="";for(let i=0;i<34;i++)sp+=`<i class="rv-sp" style="--x:${Math.random()*100}%;--y:${Math.random()*100}%;--s:${8+Math.random()*16}px;--d:${1.2+Math.random()*1.8}s;--dl:${Math.random()*2}s;background:${["#fff","#ffd86b","#7dffe0","#ff9de0"][i%4]}"></i>`;
e.innerHTML=`<div class="rv-rays"></div>${sp}<div class="rv-box" style="--c:${col}"><div class="rv-top">¡PREMIO!</div><div class="rv-art">${art}</div><div class="rv-big" id="rvb">${esc(big)}</div><p>${sub}</p><div class="rv-btns">${pz.k=="pack"?'<button data-rv="pk">ABRIR SOBRES</button>':""}<button class="ghost" data-rv="x">¡GENIAL!</button></div></div>`;
document.body.appendChild(e);e.querySelectorAll("[data-rv]").forEach(b=>b.onclick=()=>{e.remove();if(b.dataset.rv=="pk")showApp("pk");else if(VW=="roul")render()});
try{[523,659,784,1046].forEach((f,i)=>setTimeout(()=>snd(f,.25,"sine",.08,f*1.3),i*120))}catch(x){}
if(cnt){const t0=performance.now(),el=e.querySelector("#rvb"),u=pz.k=="gold"?" monedas":" XP";const st=t=>{const k=Math.min(1,(t-t0)/1100);if(!document.body.contains(e))return;el.textContent="+"+Math.round(cnt*(1-Math.pow(1-k,3)))+u;if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)}}
