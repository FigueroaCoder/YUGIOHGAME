/* Modo historia: nivel, progreso, premios y mapa */
/* ---- nivel, progreso y desbloqueos ---- */
const xpFor=L=>25*L*(L-1),lvlOf=xp=>Math.floor((1+Math.sqrt(1+(xp||0)/6.25))/2),myLv=()=>lvlOf(U.xp);
function prog(){const sp=((U.sp||{})[STY.sid])||{};if(STY.sid!="s1")return sp;const o={...((U.story||{}).done||{})};for(const k in sp)o[k]=Math.max(o[k]||0,sp[k]);return o}
const nDone=id=>prog()[id]||0,parentsOf=id=>Object.keys(STY.nodes).filter(k=>(STY.nodes[k].next||[]).includes(id));
function nState(id){const n=STY.nodes[id];if(!n)return"lock";if(nDone(id)>0)return"done";const ps=parentsOf(id);if(ps.some(p=>(STY.nodes[p].next||[]).some(s=>s!=id&&nDone(s)>0)))return"lock";const ok=!ps.length||(n.need=="all"?ps.every(p=>nDone(p)>0):ps.some(p=>nDone(p)>0));if(!ok)return"lock";return(n.minLv||0)>myLv()?"lvl":"open"}
const isOpenS=id=>{const s=nState(id);return s=="open"||s=="done"};
function seasonInfo(){const ids=Object.keys(STY.nodes),total=ids.length,done=ids.filter(i=>nDone(i)>0).length;let over=0,left="";if(/^\d{4}-\d{2}-\d{2}$/.test(STY.end||"")){const ms=new Date(STY.end+"T23:59:59").getTime()-Date.now();if(ms<=0){over=1;left="Temporada finalizada"}else{const dd=Math.floor(ms/864e5),hh=Math.floor(ms%864e5/36e5);left=dd>0?`Termina en ${dd} d ${hh} h`:`Termina en ${hh} h`}}return{total,done,pct:total?Math.round(done/total*100):0,over,left}}
function layers(){const ids=Object.keys(STY.nodes),dep={};ids.forEach(i=>dep[i]=0);for(let it=0;it<=ids.length;it++){let ch=0;ids.forEach(i=>(STY.nodes[i].next||[]).forEach(j=>{if(dep[j]!=null&&dep[j]<dep[i]+1&&dep[i]+1<=ids.length){dep[j]=dep[i]+1;ch=1}}));if(!ch)break}
const L=[];ids.forEach(i=>(L[dep[i]]=L[dep[i]]||[]).push(i));return L.filter(Boolean).map(r=>r.sort((a,b)=>(STY.nodes[a].ord||0)-(STY.nodes[b].ord||0)))}
function defSel(){const L=layers().flat();return L.find(i=>nState(i)=="open")||L.find(i=>nState(i)=="done")||L[0]||null}
const xpBar=xp=>{const L=lvlOf(xp),a=xpFor(L),b=xpFor(L+1),pc=Math.max(0,Math.min(100,Math.round((xp-a)/(b-a)*100)));return`<div class="sy-bar"><i style="width:${pc}%"></i></div><small class="sy-sm">${xp-a} / ${b-a} XP para el nivel ${L+1}</small>`};
const chips=()=>`<span class="sy-chip">${IC.coin} ${U.gold||0}</span><span class="sy-chip">${IC.xp} ${U.xp||0} XP</span>`;
function hero(lob){const xp=U.xp||0,si=seasonInfo();return`<div class="sy-hero ${lob?"lob":""}"><div><span class="sy-eye">Temporada ${STY.num}</span><h2 class="sy-ti">${esc(STY.name)}</h2>${lob?"":`<p>${esc(STY.desc)}</p>`}<div class="sy-pg"><div class="sy-bar"><i style="width:${si.pct}%"></i></div><small class="sy-sm">${si.done} de ${si.total} rivales derrotados${si.left?" · "+si.left:""}</small></div>${lob?'<div class="row" style="margin-top:14px"><button data-act="gstory">JUGAR TEMPORADA</button><button class="ghost" data-act="gshop">Tienda de sobres</button></div>':""}</div>
<div class="sy-hr"><div class="sy-lv"><b>${lvlOf(xp)}</b><div><small class="sy-sm" style="margin:0">NIVEL</small><div class="sy-cp">${chips()}</div></div></div>${xpBar(xp)}</div></div>`}
const storyPanel=()=>hero(1);
/* ---- premios (vista previa) ---- */
const pips=(v,k)=>`<div class="sy-pips">${[...Array(k)].map((_,i)=>`<i class="${i<v?"on":""}"></i>`).join("")}</div>`;
function poolIds(n){const r=n.rw||{};if(r.cm=="spec")return CB[r.cid]?[+r.cid]:[];if(r.cm=="list")return(r.cl||[]).map(Number).filter(i=>CB[i]);if(r.cm=="rand"){const ks=(r.cats&&r.cats.length)?r.cats:["n"+Math.min(10,Math.max(1,n.diff||1))];return C.filter(c=>ks.includes(catKey(c[0]))).map(c=>c[0])}return[]}
const rep=()=>Math.max(0,+META.cfg.repeat||0)/100;
const gt=`<span class="gt">${IC.check}</span>`;
function cardEl(id,got){const q=RAR(id);return`<div class="sy-c" data-act="zoom" data-id="${id}" style="--g:${q[1]}"><img loading="lazy" src="${IMG[id][0]}" alt=""><span class="rt">${q[0]}</span><span class="ad">${CB[id][2]} / ${CB[id][3]}</span>${got?gt:""}</div>`}
const tl=(ic,v,lab,x="")=>`<div class="sy-t" ${x}><div class="ti">${ic}</div><b>${v}</b><small>${lab}</small></div>`;
function rwTiles(n,done){const r=n.rw||{},f=done?rep():1,o=[tl(IC.coin,"+"+Math.round((r.gold||0)*f),done?"Monedas · repetición":"Monedas"),tl(IC.xp,"+"+Math.round((r.xp||0)*f),done?"XP · repetición":"Experiencia")];
Object.keys(PKI).forEach(k=>{const v=+((r.packs||{})[k])||0;if(v)o.push(`<div class="sy-t" style="border-color:${PKI[k][1]}"><div class="ti"><img src="${PKIMG[k]}" alt=""></div><b>×${v}</b><small>${esc(PKI[k][0])}</small>${done?gt:""}</div>`)});
if(r.cm=="spec"&&CB[r.cid])o.push(`<div class="sy-cw">${cardEl(+r.cid,done)}<small>${esc(cnm(r.cid))}<br><span style="opacity:.6">Garantizada</span></small></div>`);
return`<div class="sy-rw">${o.join("")}</div>`}
function poolStrip(n,done){const r=n.rw||{};if(r.cm!="rand"&&r.cm!="list")return"";const ids=poolIds(n);if(!ids.length)return"";ids.sort((a,b)=>RAR(b)[2]-RAR(a)[2]||CB[b][2]-CB[a][2]);const M=14,show=ids.slice(0,M);
return`<div class="sy-sec">Posibles cartas · 1 al azar entre ${ids.length}</div><div class="sy-strip">${show.map(i=>cardEl(i,0)).join("")}${ids.length>M?`<div class="sy-more">+${ids.length-M}</div>`:""}</div>${done?'<p class="sy-note">Ya obtuviste el premio de carta de este rival.</p>':""}`}
function reqText(id){const n=STY.nodes[id],ps=parentsOf(id).map(p=>nState(p)=="lock"?"???":esc(STY.nodes[p].name));return n.need=="all"?`Derrota a todos: ${ps.join(", ")}.`:`Derrota a uno de: ${ps.join(", ")}.`}
/* ---- mapa ---- */
function nodeHtml(i){const n=STY.nodes[i],s=nState(i),h=s=="lock",r=n.rw||{},bg={done:IC.check,open:IC.play,lvl:IC.lock,lock:IC.lock}[s],hint=((r.cm&&r.cm!="none")?IC.card:"")+(Object.values(r.packs||{}).some(v=>+v>0)?IC.pack:"");
return`<div class="sy-n ${s} ${i==ST.sel?"sel":""}" data-act="snode" data-id="${i}" data-nid="${i}" style="--c:${esc(n.col||"#9fb4ff")}"><div class="sy-md">${h?'<span class="q">?</span>':esc(n.av||"🧑")}<i class="sy-bg">${bg}</i>${hint?`<i class="sy-hint">${hint}</i>`:""}</div><div class="sy-nm">${h?"???":esc(n.name)}</div>${s=="lvl"?`<small class="sy-sm" style="margin:0">Nivel ${n.minLv}</small>`:pips(Math.ceil((n.diff||1)/2),5)}</div>`}
function rStory(){const L=layers();if(!ST.sel||!STY.nodes[ST.sel])ST.sel=defSel();
return`<div class="ap" style="width:min(1240px,100%)"><div class="hd"><button class="mini" data-act="goback">← Volver</button><button class="mini ghost" data-act="gshop">Tienda de sobres</button></div>${hero(0)}
<div class="sy-grid"><div class="sy-map">${L.length?`<div id="sin">${L.map(r=>`<div class="sy-row">${r.map(nodeHtml).join("")}</div>`).join("")}</div>`:'<p class="mut" style="text-align:center">Esta temporada todavía no tiene rivales.</p>'}</div><div id="sdet" class="sy-side" data-act="sclose">${detail(ST.sel)}</div></div></div>`}
function drawLinks(){const w=$("#sin");if(!w)return;const o=w.querySelector("svg");o&&o.remove();const r=w.getBoundingClientRect();let h="";
Object.keys(STY.nodes).forEach(i=>(STY.nodes[i].next||[]).forEach(j=>{const a=w.querySelector(`[data-nid="${i}"]`),b=w.querySelector(`[data-nid="${j}"] .sy-md`);if(!a||!b)return;const ra=a.getBoundingClientRect(),rb=b.getBoundingClientRect(),x1=ra.left+ra.width/2-r.left,y1=ra.bottom-r.top+2,x2=rb.left+rb.width/2-r.left,y2=rb.top-r.top-6,my=y1+(y2-y1)*.5,on=nDone(i)>0,op=on&&isOpenS(j);
h+=`<path class="${on?"on":""}" d="M${x1} ${y1}C${x1} ${my} ${x2} ${my} ${x2} ${y2}" fill="none" stroke="${on?(op?"#ffd86b":"#ffd86b99"):"#ffffff2e"}" stroke-width="${on?3:2}" stroke-linecap="round" ${on?"":'stroke-dasharray="3 7"'}/>`}));
w.insertAdjacentHTML("afterbegin",`<svg width="${w.offsetWidth}" height="${w.offsetHeight}" xmlns="http://www.w3.org/2000/svg">${h}</svg>`)}
window.addEventListener("resize",()=>{if(VW=="story"&&app.style.display!="none")drawLinks()});
function detail(id){const n=STY.nodes[id];if(!n)return'<div class="sy-det"><p class="mut">Elige un rival del mapa para ver sus premios.</p></div>';const s=nState(id),h=s=="lock",done=nDone(id)>0,d=n.deck||{},si=seasonInfo(),col=esc(n.col||"#9fb4ff");
let act;if(si.over)act='<p class="sy-warn">La temporada terminó. Espera a la siguiente.</p>';else if(s=="lock")act=`<p class="sy-warn">${IC.lock} ${reqText(id)}</p>`;else if(s=="lvl")act=`<p class="sy-warn">${IC.lock} Necesitas nivel ${n.minLv} (tienes ${myLv()}). Gana experiencia con otros rivales.</p>`;else act=done?`<p class="sy-note" style="color:#7dffb0">✓ Ya superaste este rival en esta temporada. No se puede repetir hasta que empiece la siguiente.</p>`:`<button class="sy-go" data-act="sgo" data-id="${id}">¡A DUELAR!</button>`;
return`<div class="sy-det" style="--c:${col}"><button class="sy-x" data-act="sclose" aria-label="Cerrar">✕</button><div class="sy-dh"><div class="sy-md">${h?'<span class="q">?</span>':esc(n.av||"🧑")}</div><div><span class="sy-eye" style="color:${col}">${esc(n.path||"Rival")}</span><h3>${h?"Rival desconocido":esc(n.name)}</h3>${pips(n.diff||1,10)}<small class="sy-sm" style="margin:4px 0 0;display:block">Dificultad ${n.diff||1} / 10${done?" · Victorias: "+nDone(id):""}</small></div></div>
${!h&&n.intro?`<p class="sy-q">“${esc(n.intro)}”</p>`:""}<div class="sy-sec">Premios por ganar</div>${rwTiles(n,done)}${poolStrip(n,done)}

${h?"":`<div class="sy-sec">Rival</div><div class="sy-kv"><span>Cartas del mazo</span><b>Niveles ${d.lo||1} a ${d.hi||d.lo||1}</b><span>Estilo</span><b>${STYL[d.style]||STYL.bal}</b></div>`}${act}</div>`}
