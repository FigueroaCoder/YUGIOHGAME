/* Modo historia: temporadas, rivales y datos por defecto */
/* ---- modo historia por temporadas, premios y tienda ---- */
const STORY={cur:null},ST={sel:null},SA={meta:null,drafts:{},mod:{},del:[],sid:null,sel:null,dirty:0,sq:""};
const svg=(b,x="")=>`<svg class="ico" viewBox="0 0 24 24" ${x}>${b}</svg>`;
const IC={coin:svg('<circle cx="12" cy="12" r="10" fill="#f5c542" stroke="#a87408" stroke-width="2"/><circle cx="12" cy="12" r="6" fill="none" stroke="#a87408" stroke-width="1.6"/>'),
xp:svg('<path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.8-6.3 3.8 1.7-7L2 9.2l7.1-.6z" fill="#6fd8ff" stroke="#1d6f95" stroke-width="1.2" stroke-linejoin="round"/>'),
lock:svg('<rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 11V8a4 4 0 018 0v3" fill="none" stroke="currentColor" stroke-width="2"/>'),
check:svg('<path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'),
play:svg('<path d="M8 5l11 7-11 7z" fill="currentColor"/>'),
card:svg('<rect x="5" y="2.5" width="14" height="19" rx="2.5" fill="#c77dff" stroke="#fff" stroke-opacity=".75" stroke-width="1.4"/>'),
pack:svg('<path d="M4 8l8-5 8 5v9l-8 5-8-5z" fill="#ffb347" stroke="#fff" stroke-opacity=".75" stroke-width="1.4" stroke-linejoin="round"/>')};
const STYL={bal:"Equilibrado",atk:"Ofensivo",def:"Defensivo"},clone=o=>JSON.parse(JSON.stringify(o));
/* ---- temporada 1 por defecto ---- */
function defSeason(){const byA=C.slice().sort((a,b)=>b[2]-a[2]),top=byA[0][0],top3=byA.slice(0,3).map(c=>c[0]),GD=[0,30,50,80,110,150,200,260,330,420,500];let o=0;
const N=(id,name,av,col,diff,next,x={})=>[id,{name,av,col,diff,next,ord:o++,path:x.path||"",intro:x.intro||"",minLv:x.minLv||0,need:x.need||"any",deck:{lo:x.lo||Math.max(1,diff-2),hi:x.hi||Math.min(10,diff+1),style:x.style||"bal",err:x.err??Math.max(0,45-diff*5),xn:x.xn??Math.max(0,diff-7)},rw:{gold:x.gold??GD[diff],xp:x.xp??diff*25,cm:x.cm||"none",cats:x.cats||[],cid:x.cid||top,cl:x.cl||[],packs:{p1:0,p2:0,p3:0,pw:0,...(x.packs||{})}}}];
const B="#4cff8a",M="#ffb347",Dd="#ff6b6b",Cs="#52e0ff",G="#ffd86b";
const nodes=Object.fromEntries([
N("a1","Leo, el aprendiz","🧑‍🎓","#9fb4ff",1,["b1","m1","d1","c1"],{path:"Prólogo",intro:"¡Nunca he perdido un duelo… de práctica!",packs:{p1:1}}),
N("b1","Mara la guardabosques","🌲",B,2,["b2","bx"],{path:"Bosque",intro:"El bosque protege a los suyos."}),
N("b2","Fenris el cazador","🐺",B,3,["b3"],{path:"Bosque",intro:"Te seguí el rastro desde la entrada."}),
N("bx","Lyra la arquera","🏹",B,3,["b3"],{path:"Bosque",style:"atk",intro:"Mi primera flecha ya está en camino."}),
N("b3","Sylva la druida","🌿",B,4,["e1"],{path:"Bosque",style:"def",intro:"Las raíces no se rompen fácilmente.",cm:"rand",cats:["n3","n4"]}),
N("m1","Brokk el minero","⛏️",M,2,["m2"],{path:"Montaña",style:"def",intro:"Aquí abajo nadie me gana."}),
N("m2","Ingrid, escudo de hielo","❄️",M,3,["m3"],{path:"Montaña",style:"def",intro:"Mi guardia es de hielo eterno."}),
N("m3","Thorin el centinela","🛡️",M,4,["e1","mx"],{path:"Montaña",intro:"Nadie pasa de este punto.",cm:"rand",cats:["n3","n4"]}),
N("mx","Gorm, gigante de roca","🗿",M,5,["e2"],{path:"Montaña",style:"atk",intro:"¡Siente el peso de la montaña!",cm:"rand",cats:["n5","n6"]}),
N("d1","Zafira la saqueadora","🏜️",Dd,2,["d2"],{path:"Desierto",style:"atk",intro:"Todo lo que tengas ahora es mío."}),
N("d2","Karim el espadachín","⚔️",Dd,3,["d3"],{path:"Desierto",style:"atk",intro:"Mi espada es más rápida que tu estrategia."}),
N("d3","Amón, sacerdote de arena","🔥",Dd,4,["e1","s1"],{path:"Desierto",style:"atk",intro:"La arena guarda secretos antiguos.",cm:"rand",cats:["n3","n4"]}),
N("s1","Ryu, el maestro oculto","🥷","#c77dff",7,["e2"],{path:"Secreto",minLv:3,style:"atk",intro:"Pocos llegan hasta aquí. Pocos se van.",cm:"rand",cats:["cs","cp","cpe"]}),
N("c1","Marina la pescadora","🎣",Cs,2,["c2"],{path:"Costa",intro:"La marea siempre vuelve a mi favor."}),
N("c2","Capitán Duarte","🏴‍☠️",Cs,3,["c3"],{path:"Costa",style:"atk",intro:"¡Todos a sus puestos, marineros!"}),
N("c3","Coral la hechicera","🔮",Cs,4,["e2","cx"],{path:"Costa",intro:"Las olas me susurran tus jugadas.",cm:"rand",cats:["n3","n4"]}),
N("cx","El Kraken Rojo","🦑",Cs,5,["e1"],{path:"Costa",style:"def",intro:"Nadie sale del fondo del mar.",cm:"rand",cats:["n5","n6"]}),
N("e1","Kael, campeón del Norte","🏆",G,5,["f1","g1"],{path:"Torneo",intro:"Bienvenido al torneo del Norte.",packs:{p2:1},cm:"rand",cats:["n5","n6"]}),
N("e2","Luna, campeona del Sur","🌙",G,5,["g1","h1"],{path:"Torneo",intro:"El Sur tiene su propia campeona.",packs:{p2:1},cm:"rand",cats:["n5","n6"]}),
N("f1","Valeria la estratega","🧠","#74c0fc",6,["i1"],{path:"Semifinal",lo:4,hi:7,intro:"Cada jugada tuya ya la tengo calculada."}),
N("g1","Draco el implacable","🐉","#ff5468",6,["i1","i2"],{path:"Semifinal",style:"atk",lo:4,hi:7,intro:"¡Que arda todo!"}),
N("h1","Nyx, maestra de sombras","🌑","#9b7bff",6,["i2"],{path:"Semifinal",style:"def",lo:4,hi:7,intro:"Ni siquiera verás mis cartas."}),
N("i1","Orion, campeón nacional","⭐",G,8,["j1"],{path:"Final",intro:"El título nacional es mío.",packs:{p3:1},cm:"rand",cats:["n8","n9","n10"]}),
N("i2","Selene, la invicta","🌠",G,8,["j1"],{path:"Final",intro:"Jamás he conocido la derrota.",packs:{p3:1},cm:"rand",cats:["n8","n9","n10"]}),
N("j1","Zeno, el Gran Maestro","👑","#ffe27a",10,["z1"],{path:"Gran final",need:"all",intro:"Demuéstrame que mereces la corona.",cm:"list",cl:top3,packs:{p3:2}}),
N("z1","Azrael, el Rey Caído","💀","#ff3b6b",10,[],{path:"Jefe oculto",minLv:7,intro:"Yo existía antes que el primer duelo.",cm:"spec",cid:top,packs:{p3:3},gold:900,xp:500})]);
return{num:1,name:"El Torneo de las Cuatro Tierras",desc:"Cuatro regiones, un solo campeón. Elige tu camino, derrota a los rivales y reclama la corona.",end:"",nodes}}
const DCFG=()=>({repeat:25,prices:{p1:100,p2:250,p3:600,p4:1200,p5:2200,p6:3800,p7:6000,p8:9000,p9:13000,p10:20000,pu:8000,pw:0}});
function normSeason(d,sid){const f=d&&d.nodes&&typeof d.nodes=="object"?d:{...defSeason(),...(d||{}),nodes:defSeason().nodes};const num=+f.num||(parseInt(String(sid).slice(1))||1),o={sid,num,name:f.name||("Temporada "+num),desc:f.desc||"",end:f.end||"",nodes:f.nodes};
Object.keys(o.nodes).forEach(k=>{const n=o.nodes[k];n.next=Array.isArray(n.next)?n.next.filter(x=>o.nodes[x]&&x!=k):[];n.deck=n.deck||{};n.rw=n.rw||{};n.rw.packs=n.rw.packs||{};n.rw.cats=Array.isArray(n.rw.cats)?n.rw.cats:[];n.rw.cl=Array.isArray(n.rw.cl)?n.rw.cl:[];n.diff=n.diff||1;n.ord=n.ord||0});return o}
function normMeta(d){d=d||{};const dc=DCFG(),c=d.cfg||{},cur=d.cur||"s1",se=(d.seasons&&typeof d.seasons=="object"&&Object.keys(d.seasons).length)?d.seasons:{[cur]:{num:1,name:defSeason().name}};if(!se[cur])se[cur]={num:1,name:"Temporada 1"};return{cur,seasons:se,cfg:{repeat:c.repeat??dc.repeat,prices:{...dc.prices,...(c.prices||{})}}}}
let META=normMeta(null),STY=normSeason(null,"s1"),CURSUB=null;
const syPaint=()=>{if(U&&["story","shop","lobby"].includes(VW))rr()};
function attachSeason(sid){if(CURSUB&&CURSUB.sid==sid)return;if(CURSUB){try{CURSUB.f()}catch(e){}}const f=D("config","season_"+sid).onSnapshot(s=>{STY=normSeason(s.exists?s.data():null,sid);syPaint()},()=>{});CURSUB={sid,f}}
function watchStory(){UN.push(()=>{if(CURSUB){try{CURSUB.f()}catch(e){}CURSUB=null}});UN.push(D("config","story").onSnapshot(s=>{const d=s.exists?s.data():null;
if(d&&d.nodes&&!d.cur){META=normMeta({cur:"s1",cfg:d.cfg});if(CURSUB){try{CURSUB.f()}catch(e){}CURSUB=null}STY=normSeason({num:1,name:"Temporada 1",nodes:d.nodes},"s1");syPaint();return}
META=normMeta(d);attachSeason(META.cur);syPaint()},()=>{}))}
