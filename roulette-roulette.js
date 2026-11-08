/* Ruleta diaria (se reinicia a las 12 de la noche) */
/* ===== RULETA DIARIA (se reinicia a las 12 de la noche) ===== */
const RLDEF=()=>({size:10,pool:[
{k:"pack",t:"p3",n:1,w:2,pin:true},{k:"pack",t:"p2",n:1,w:5,pin:true},{k:"pack",t:"p1",n:1,w:10,pin:true},
{k:"gold",v:25,w:22},{k:"gold",v:40,w:18},{k:"gold",v:60,w:16},{k:"gold",v:100,w:9},{k:"gold",v:150,w:7},{k:"gold",v:250,w:4},{k:"gold",v:400,w:2},
{k:"xp",v:20,w:20},{k:"xp",v:35,w:16},{k:"xp",v:50,w:12},{k:"xp",v:80,w:8},{k:"xp",v:120,w:6},{k:"xp",v:200,w:3}]});
const rlNorm=d=>{if(!d||!Array.isArray(d.pool)||!d.pool.length)return RLDEF();const pool=d.pool.map(p=>{const w=Math.max(.1,+p.w||1),pin=!!p.pin;if(p.k=="pack")return{k:"pack",t:PKI[p.t]?p.t:"p1",n:Math.max(1,Math.min(20,Math.floor(+p.n||1))),w,pin};return{k:p.k=="xp"?"xp":"gold",v:Math.max(1,Math.floor(+p.v||1)),w,pin}});return{size:Math.max(4,Math.min(16,Math.floor(+d.size||10))),pool}};
let RLC=RLDEF(),RL={busy:0,res:null,key:null,ang:0},RA=null;
const rlPad=n=>String(n).padStart(2,"0"),
rlKey=t=>{const d=new Date(t==null?nowS():t);return d.getFullYear()+"-"+rlPad(d.getMonth()+1)+"-"+rlPad(d.getDate())},
rlNext=()=>{const d=new Date(nowS());d.setHours(24,0,0,0);return d.getTime()},
rlCd=()=>{let s=Math.max(0,Math.floor((rlNext()-nowS())/1000));return rlPad(Math.floor(s/3600))+":"+rlPad(Math.floor(s%3600/60))+":"+rlPad(s%60)},
rlAvail=()=>!!U&&(U.roul||{}).d!==rlKey(),
rlRand=()=>{const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296},
rlSeed=s=>{let h=1779033703^s.length;for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),3432918353);h=h<<13|h>>>19}return()=>{h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);return((h^=h>>>16)>>>0)/4294967296}},
rlShuf=(a,r)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a},
rlLab=p=>p.k=="gold"?p.v+" monedas":p.k=="xp"?p.v+" XP":(p.n>1?p.n+" × ":"1 ")+(PKI[p.t]?PKI[p.t][0]:"Sobre"),
rlShort=p=>p.k=="gold"?"🪙 "+p.v:p.k=="xp"?"⭐ "+p.v+" XP":"🎴 "+(/^p\d+$/.test(p.t)?"Nv."+p.t.slice(1):p.t=="pu"?"Ultra":"Bienv.")+(p.n>1?" ×"+p.n:""),
rlCol=p=>p.k=="gold"?"#d99a12":p.k=="xp"?"#1f9ccf":(PKI[p.t]?PKI[p.t][1]:"#ff7ad9");
/* premios del día: los marcados "siempre" salen todos los días; el resto rota con una semilla distinta cada día */
function rlWheel(key,cfg){cfg=cfg||RLC;const n=cfg.size,pool=cfg.pool.filter(p=>p.w>0),r=rlSeed("ruleta|"+key),pin=pool.filter(p=>p.pin).slice(0,n),rest=rlShuf(pool.filter(p=>!p.pin),r);let pick=rlShuf(pin.concat(rest.slice(0,Math.max(0,n-pin.length))),r);const sum=pick.reduce((a,p)=>a+p.w,0)||1;return pick.map(p=>({...p,pct:p.w*100/sum,lab:rlLab(p)}))}
function watchRoul(){UN.push(D("config","roulette").onSnapshot(s=>{RLC=rlNorm(s.exists?s.data():null);if(VW=="roul"&&!RL.busy)render()},()=>{}))}
{const _sn=startNet;startNet=function(){_sn.apply(this,arguments);watchRoul()}}
/* regalo de bienvenida: una carta al azar para el usuario nuevo */
function rlGift(id){if(!U||!CB[id]||!IMG[id])return;const c=CB[id];fx(`<div class="stg"><h2>🎁 ¡Regalo de bienvenida!</h2><p class="mut">Esta carta al azar es tuya para empezar tu colección</p><img class="zimg fin" src="${IMG[id][0]}" alt="" style="box-shadow:0 0 44px #ffd86b"><h3 style="margin:0;font:800 24px Cinzel,serif;color:#fff">${esc(c[1])}</h3><p class="mut">${lvTxt(id)} · ATK ${c[2]} / DEF ${c[3]}</p><p class="mut">Tus sobres de bienvenida te esperan en «Sobres».</p><button onclick="fxClose()">¡A JUGAR!</button></div>`);try{snd(520,.25,"sine",.08,900)}catch(e){}}
{const _su=setUser;setUser=function(uid,d){const nw=!d.col;_su.apply(this,arguments);if(nw&&U){const id=Object.keys((U.col&&U.col.inv)||{})[0];if(id)setTimeout(()=>rlGift(id),700)}}}
/* estilos */
{const s=document.createElement("style");s.textContent=`
.rl{display:grid;grid-template-columns:minmax(300px,460px) 1fr;gap:26px;align-items:start}@media(max-width:860px){.rl{grid-template-columns:1fr}}
.rl-box{position:relative;width:min(440px,92vw);aspect-ratio:1;margin:8px auto 0}
.rl-box svg{width:100%;height:100%;display:block;filter:drop-shadow(0 0 26px #ffb34788);border-radius:50%}
.rl-ptr{position:absolute;left:50%;top:-14px;transform:translateX(-50%);z-index:3;width:0;height:0;border-left:15px solid transparent;border-right:15px solid transparent;border-top:34px solid #fff;filter:drop-shadow(0 3px 6px #000c)}
#app button.rl-hub{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:26%;height:26%;border-radius:50%;padding:0;z-index:2;font:800 clamp(13px,3vw,19px) Cinzel,serif;border:4px solid #fff;box-shadow:0 0 22px #ffd86b,0 4px 14px #000a;letter-spacing:.04em}
#app button.rl-hub:hover{transform:translate(-50%,-50%) scale(1.06)}#app button.rl-hub:disabled{opacity:1;background:linear-gradient(#8a8f9c,#5c616e);color:#fff;box-shadow:0 4px 14px #000a;cursor:default}
.rl-st{font:700 20px/1.35 Rajdhani,sans-serif}.rl-cd{font:800 30px Cinzel,serif;color:var(--gold);letter-spacing:.08em;display:block;margin-top:4px}
.rl-res{margin:12px 0;padding:14px 16px;border-radius:14px;border:2px solid #ffd86b;background:linear-gradient(135deg,#ffb34733,#ff3d8a22);box-shadow:0 0 26px #ffd86b66;font:800 24px Rajdhani,sans-serif;text-align:center;animation:rlpop .6s both}@keyframes rlpop{from{opacity:0;transform:scale(.7)}}
.rl-pz{display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid #ffffff14;font:700 17px Rajdhani,sans-serif}.rl-pz i{width:14px;height:14px;border-radius:50%;flex:none;box-shadow:0 0 8px currentColor}.rl-pz b{flex:1;min-width:0}
.rl-pz .bar{width:90px;height:8px;flex:none}.rl-pz small{width:50px;text-align:right;color:#9fb4ff}.rl-pz.me{background:#ffd86b22}
.rl-mini{height:100%;aspect-ratio:1;border-radius:50%;border:5px solid #ffffffcc;box-shadow:0 0 24px #ffd86b99,inset 0 0 0 10px #0004;background:conic-gradient(#f1c75b 0 36deg,#2aa9d6 0 72deg,#e0a820 0 108deg,#7dff9c 0 144deg,#f1c75b 0 180deg,#2aa9d6 0 216deg,#ffb347 0 252deg,#e0a820 0 288deg,#ff6b6b 0 324deg,#2aa9d6 0 360deg);animation:rlsp 16s linear infinite}@keyframes rlsp{to{transform:rotate(360deg)}}
.rl-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid #ffffff18}
#app .rl-row select{width:auto;max-width:190px;margin:0;font-size:15px;padding:7px 8px}#app .rl-row button{margin-left:auto}#app .rl-row input[type=number]{width:84px;flex:none;padding:7px 8px;font-size:16px}#app .rl-row input[type=checkbox]{width:18px;height:18px;padding:0;accent-color:#ffd86b}
.rl-row label{display:inline-flex!important;align-items:center;gap:6px;margin:0!important;font-size:14px!important}
.rl-chips{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0 12px}.rl-chips span{background:#0007;border:1px solid #ffffff2a;border-radius:20px;padding:3px 11px;font:700 14px Rajdhani,sans-serif}.rl-chips em{font-style:normal;color:#9fb4ff;margin-left:4px}
`;document.head.appendChild(s)}
/* vista del jugador */
function rlSvg(wh,ang){const n=wh.length,sg=360/n,R=176,pt=(a,r)=>[(r*Math.sin(a*Math.PI/180)).toFixed(2),(-r*Math.cos(a*Math.PI/180)).toFixed(2)];
let h=`<svg id="rlw" viewBox="-180 -180 360 360" style="transform:rotate(${ang}deg)"><circle r="179" fill="#1a1204" stroke="#ffd86b" stroke-width="3"/>`;
wh.forEach((p,i)=>{const c=i*sg,a=pt(c-sg/2,R),b=pt(c+sg/2,R),f=i%2?"cc":"ff";h+=`<path d="M0 0L${a[0]} ${a[1]}A${R} ${R} 0 0 1 ${b[0]} ${b[1]}Z" fill="${rlCol(p)}" stroke="#fff" stroke-width="1.6" opacity="${i%2?.86:1}"/><text transform="rotate(${c-90}) translate(${R-22},0)" text-anchor="end" dominant-baseline="central" font-family="Rajdhani,sans-serif" font-weight="800" font-size="${n>12?13:16}" fill="#fff" stroke="#0007" stroke-width=".7" paint-order="stroke">${esc(rlShort(p))}</text>`});
for(let i=0;i<n;i++){const q=pt(i*sg+sg/2,R);h+=`<circle cx="${q[0]}" cy="${q[1]}" r="3.4" fill="#fff"/>`}
return h+`</svg>`}
function rRoul(){const key=rlKey(),wh=rlWheel(key),used=(U.roul||{}).d===key,L=wh.slice().sort((a,b)=>b.pct-a.pct);RL.key=key;
return`<div class="ap" style="width:min(1060px,100%)"><h1>RULETA DIARIA</h1><div class="rl"><div><div class="rl-box ${RL.busy?"go":""} ${RL.res?"win":""}"><div class="rl-ptr"></div>${rlSvg(wh,RL.ang)}<button class="rl-hub" data-act="rspin" ${used||RL.busy?"disabled":""}>${used?"✓":"GIRAR"}</button></div></div>
<div><div class="pn"><div class="rl-st">${used?`Hoy ya giraste${U.roul.l?`: <b class="win">${esc(U.roul.l)}</b>`:""}.<br>La ruleta se reinicia con nuevos premios en:`:`🎡 <b>¡Tienes 1 giro disponible!</b><br>Si no lo usas antes de las 12 de la noche, lo pierdes. Tiempo restante:`}<span class="rl-cd" id="rlcd">${rlCd()}</span></div>${RL.res?`<div class="rl-res">🎉 ¡Ganaste ${esc(RL.res)}!</div>`:""}</div>
<div class="pn"><h2>Premios de hoy</h2><p class="mut" style="margin:0 0 6px">Cada uno tiene distinta probabilidad: los premios pequeños salen más seguido.</p>${L.map(p=>`<div class="rl-pz">${rlIco(p)}<b>${esc(p.lab)}</b><div class="bar"><i style="width:${Math.max(3,p.pct*2.5)}%;background:${rlCol(p)};height:100%;border-radius:8px;box-shadow:none"></i></div><small>${p.pct<10?p.pct.toFixed(1):Math.round(p.pct)}%</small></div>`).join("")}</div></div></div></div>`}
async function rlClaim(key,pz){const ref=D("users",U.uid);await db.runTransaction(async tx=>{const s=await tx.get(ref),d=s.data()||{};if((d.roul||{}).d===key)throw"USED";const u={roul:{d:key,l:pz.lab,k:pz.k,ts:Date.now()}};if(pz.k=="gold")u.gold=FV.increment(pz.v);else if(pz.k=="xp")u.xp=FV.increment(pz.v);else u["col.packs."+pz.t]=FV.increment(pz.n||1);tx.update(ref,u)});
try{const s=await ref.get(),d=s.data()||{};U.gold=d.gold||0;U.xp=d.xp||0;if(d.col)U.col=d.col;U.roul=d.roul||{d:key,l:pz.lab}}catch(e){U.roul={d:key,l:pz.lab}}}
function rlConfetti(){const b=$("#rlw");if(!b)return;const r=b.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,cols=["#ffd86b","#ff7ad9","#52e0ff","#7dff9c","#ff6b6b","#fff"];for(let i=0;i<46;i++){const e=document.createElement("div");e.className="ppt";const a=Math.random()*6.283,d=120+Math.random()*190;e.style.cssText=`left:${cx}px;top:${cy}px;--c:${cols[i%6]};--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px;z-index:950`;document.body.appendChild(e);setTimeout(()=>e.remove(),1100)}}
Object.assign(ACT,{
groul(){RL.res=null;showApp("roul")},
async rspin(){if(RL.busy||!U)return;if(!db)return toast("Necesitas conexión para girar la ruleta");const key=rlKey();if((U.roul||{}).d===key)return toast("Ya usaste tu ruleta de hoy. Vuelve después de las 12 de la noche");
const wh=rlWheel(key);if(!wh.length)return toast("La ruleta no tiene premios hoy");const sum=wh.reduce((a,p)=>a+p.w,0);let x=rlRand()*sum,idx=wh.length-1;for(let i=0;i<wh.length;i++){x-=wh[i].w;if(x<0){idx=i;break}}
const pz=wh[idx];RL.busy=1;RL.res=null;render();
try{await rlClaim(key,pz)}catch(e){RL.busy=0;render();return toast(e==="USED"?"Ya usaste tu ruleta de hoy":"No se pudo girar. Revisa tu conexión e inténtalo de nuevo")}
const sg=360/wh.length,cur=((RL.ang%360)+360)%360,jit=(rlRand()-.5)*sg*.7,add=((((-idx*sg+jit)-cur)%360)+360)%360,tg=RL.ang+360*6+add;RL.ang=tg;
const sv=$("#rlw");if(sv){sv.getBoundingClientRect();sv.style.transition="transform 5.6s cubic-bezier(.12,.62,.08,1)";sv.style.transform=`rotate(${tg}deg)`}
const tk=setInterval(()=>{try{snd(900+rlRand()*200,.04,"triangle",.03)}catch(e){}},210);setTimeout(()=>clearInterval(tk),5000);
await new Promise(r=>setTimeout(r,5800));
try{snd(523,.15,"sine",.09,784);setTimeout(()=>snd(784,.3,"sine",.09,1046),160)}catch(e){}rlConfetti();RL.res=pz.lab;RL.busy=0;setTimeout(()=>rlReveal(pz),700);
await checkLevels();toast("🎡 Ruleta diaria: "+pz.lab,5000);if(VW=="roul")render()},
gradm(){rlAInit();showApp("radm")},
radd(){rlAsync();RA.pool.push({k:"gold",v:50,w:5,pin:false});render()},
rdel(b){rlAsync();RA.pool.splice(+b.dataset.i,1);render()},
rdef(){if(!confirm("¿Restaurar los premios iniciales?"))return;const d=RLDEF();RA={size:d.size,pool:d.pool};render()},
async rsave(){rlAsync();const c=rlNorm(RA);if(c.pool.length<4)return toast("Pon al menos 4 premios");if(c.pool.filter(p=>p.pin).length>c.size)return toast("Hay más premios fijos («Siempre») que casillas");if(!db)return toast("Sin conexión");try{await D("config","roulette").set({size:c.size,pool:c.pool,upd:Date.now()});RLC=c;RA={size:c.size,pool:c.pool.map(p=>({...p}))};toast("Ruleta guardada para todos los jugadores");render()}catch(e){toast("No se pudo guardar la ruleta")}},
async rreset(){if(!U||!db)return;try{await D("users",U.uid).update({"roul.d":""});U.roul={};toast("Tu ruleta de hoy fue reiniciada (prueba)");render()}catch(e){toast("No se pudo reiniciar")}}
});
/* admin de la ruleta */
function rlAInit(){RA={size:RLC.size,pool:RLC.pool.map(p=>({...p}))}}
function rlAsync(){if(!RA)return;const sz=$("#rlsz");if(sz)RA.size=+sz.value||10}
function rlPrev(){const e=$("#rlprev");if(!e||!RA)return;rlAsync();const c=rlNorm(RA),k0=rlKey(),k1=rlKey(rlNext()+3600e3),f=k=>`<div class="rl-chips">${rlWheel(k,c).sort((a,b)=>b.pct-a.pct).map(p=>`<span>${esc(rlShort(p))}<em>${p.pct<10?p.pct.toFixed(1):Math.round(p.pct)}%</em></span>`).join("")}</div>`;e.innerHTML=`<p class="mut" style="margin:6px 0 0">Hoy:</p>${f(k0)}<p class="mut" style="margin:6px 0 0">Mañana:</p>${f(k1)}`}
function rRAdm(){if(!RA)rlAInit();const rows=RA.pool.map((p,i)=>`<div class="rl-row"><select data-rf="${i}:k"><option value="gold" ${p.k=="gold"?"selected":""}>Monedas</option><option value="xp" ${p.k=="xp"?"selected":""}>Experiencia</option><option value="pack" ${p.k=="pack"?"selected":""}>Sobre</option></select>${p.k=="pack"?`<select data-rf="${i}:t">${Object.keys(PKI).map(t=>`<option value="${t}" ${p.t==t?"selected":""}>${esc(PKI[t][0])}</option>`).join("")}</select><label>Cantidad<input type="number" min="1" max="20" data-rf="${i}:n" value="${p.n||1}"></label>`:`<label>${p.k=="xp"?"XP":"Monedas"}<input type="number" min="1" data-rf="${i}:v" value="${p.v}"></label>`}<label>Peso<input type="number" min="0.1" step="0.1" data-rf="${i}:w" value="${p.w}"></label><label><input type="checkbox" data-rf="${i}:pin" ${p.pin?"checked":""}>Siempre</label><button class="mini ghost" data-act="rdel" data-i="${i}">✕</button></div>`).join("");
return`<div class="ap" style="width:min(1000px,100%)"><h1>ADMIN RULETA</h1>
<div class="pn"><h2>Cómo funciona</h2><p>Aquí defines el <b>catálogo</b> de premios. Cada día a las 12 de la noche la ruleta se reinicia: todos vuelven a tener 1 giro (el que no se usa se pierde) y se arman las casillas del día con los premios marcados <b>«Siempre»</b> más una selección distinta del resto del catálogo. La <b>probabilidad</b> de cada premio es su <b>peso</b> entre las casillas del día: pesos altos = salen más; usa pesos bajos para los premios grandes.</p>
<label>Casillas por día (4 a 16)</label><input id="rlsz" type="number" min="4" max="16" value="${RA.size}" style="max-width:120px"></div>
<div class="pn"><h2>Catálogo de premios</h2>${rows}<div class="row" style="margin-top:12px"><button class="mini" data-act="radd">＋ AGREGAR PREMIO</button><button class="mini ghost" data-act="rdef">RESTAURAR INICIALES</button></div></div>
<div class="pn"><h2>Vista previa</h2><div id="rlprev"></div></div>
<div class="pn"><div class="row"><button data-act="rsave">GUARDAR PARA TODOS</button><button class="ghost" data-act="rreset">REINICIAR MI RULETA DE HOY (PRUEBA)</button></div></div></div>`}
app.addEventListener("input",e=>{const t=e.target;if(t.id=="rlsz"){rlPrev();return}const f=t.dataset&&t.dataset.rf;if(!f||!RA)return;const[i,k]=f.split(":"),p=RA.pool[+i];if(!p||k=="k")return;if(k=="pin")p.pin=t.checked;else if(k=="t")p.t=t.value;else p[k]=+t.value;rlPrev()});
app.addEventListener("change",e=>{const t=e.target,f=t.dataset&&t.dataset.rf;if(!f||!RA)return;const[i,k]=f.split(":"),p=RA.pool[+i];if(!p)return;if(k=="k"){const o=t.value;if(o=="pack")RA.pool[+i]={k:"pack",t:"p1",n:1,w:p.w||5,pin:!!p.pin};else RA.pool[+i]={k:o,v:o=="xp"?50:50,w:p.w||5,pin:!!p.pin};render()}else if(k=="t"||k=="pin"){rlPrev()}});
new MutationObserver(()=>{if(VW=="radm")rlPrev()}).observe(app,{childList:true});
setInterval(()=>{if(!U||VW!="roul"||app.style.display=="none"||RL.busy)return;const k=rlKey();if(RL.key&&RL.key!=k){RL.res=null;render();return}const e=$("#rlcd");if(e)e.textContent=rlCd()},1000);
