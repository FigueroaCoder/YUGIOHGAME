/* Modo trío (3 jugadores) y salas en línea */
/* ===== MODO TRÍO (3 jugadores) ===== */
const alive=p=>!!P&&!!P[p]&&!P[p].out,
NX=t=>{const n=P.length;for(let k=1;k<=n;k++){const q=(t+k)%n;if(alive(q))return q}return t},
OP=p=>{if(!G.n3)return 1-p;if(p===G.t)return(G.tg!==p&&alive(G.tg))?G.tg:NX(p);return(alive(G.t)&&G.t!==p)?G.t:NX(p)},
NAME=p=>G.n3?(p==0?"Tú":(G.names&&G.names[p])||"Rival "+p):(p?"El rival":"Tú"),
ATKN=()=>G.n3?3:1,
ABS=l=>(l+(ON.my||0))%3,LOC=a=>(a-(ON.my||0)+3)%3,
oppsF=p=>P.map((_,i)=>i).filter(i=>i!==p&&alive(i)).flatMap(i=>field(i));
{const s=document.createElement("style");s.textContent=`#st.t3 .fc.o3,#st.t3 .sl.o3{transform-origin:0 0;scale:.6}#st.t3 .hc.t3{scale:.62}#st.t3 #dk1,#st.t3 #dk2,#st.t3 #gy1,#st.t3 #gy2{transform-origin:0 0;scale:.55}#st.t3 #lp1,#st.t3 #lp2{transform-origin:0 0;scale:.72;right:auto}.lp.out{opacity:.4;filter:grayscale(1)}.lp.out:after{content:"ELIMINADO";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:800 24px Cinzel,serif;color:#ff5468;background:#000a;border-radius:14px}.lp.tgp{outline:3px solid #ff4455;cursor:pointer;animation:pu .8s infinite}#spec{position:absolute;left:50%;top:8px;transform:translateX(-50%);z-index:70;background:#000b;border:1px solid var(--gold,#ffd86b);color:var(--gold,#ffd86b);padding:6px 16px;border-radius:20px;font:700 15px Rajdhani,sans-serif;letter-spacing:.1em}.trr{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding:10px 12px;background:#0004;border-radius:10px;margin-top:8px}.trr b{font:800 18px Rajdhani,sans-serif}`;document.head.appendChild(s)}
function applyMode(){const t3=!!G.n3;st.classList.toggle("t3",t3);
if(t3&&!$("#lp2")){st.insertAdjacentHTML("beforeend",`<div class="lp" id="lp2"><b>RIVAL</b><div class="n">8000</div><div class="bar"><i></i></div></div><div class="dk" id="dk2" style="background-image:url(${BK})"><b></b></div><div class="gy" id="gy2"></div>`+["a","d"].map(s=>[0,1,2].map(i=>`<div class="sl n" data-p="2" data-s="${s}" data-i="${i}" data-t="${s=="a"?"ATAQUE":"DEFENSA"}"></div>`).join("")).join(""));st.querySelectorAll('.sl[data-p="2"]').forEach(e=>st.insertBefore(e,ly));[1,2].forEach(k=>{const e=$("#lp"+k);e.onclick=ev=>{if(G.sel&&e.classList.contains("tgp")){ev.stopPropagation();const a=G.sel;clr();pAttack(a,null,0,k)}}})}
const set=(e,l,t)=>{if(e){e.style.left=l+"px";e.style.top=t+"px"}};
DK[1]=t3?[300,24]:[1160,100];DK[2]=t3?[1204,24]:[1160,100];
set($("#lp1"),t3?44:1030,t3?214:14);set($("#lp2"),936,214);set($("#dk1"),DK[1][0],DK[1][1]);set($("#dk2"),DK[2][0],DK[2][1]);set($("#gy1"),t3?300:1040,t3?118:DK[1][1]);set($("#gy2"),1204,118);
st.querySelectorAll(".sl[data-p]").forEach(e=>{const p=+e.dataset.p;e.style.left=SX(+e.dataset.i,p)+"px";e.style.top=SY(p,e.dataset.s)+"px";e.classList.toggle("o3",t3&&p>0);e.style.display=(p==2&&!t3)?"none":""});
st.querySelectorAll(".bd.e").forEach(e=>e.style.display=t3?"none":"");
["#lp2","#dk2","#gy2"].forEach(q=>{const e=$(q);if(e)e.style.display=t3?"":"none"});
st.querySelectorAll(".lp").forEach(e=>e.classList.remove("out","tgp"));const sp=$("#spec");if(sp)sp.remove();
const lb=$("#leaveb");if(lb)lb.style.display="none"}
function setNames(){const n=G.names||[];[0,1,2].forEach(p=>{const e=$("#lp"+p+" b");if(e&&n[p])e.textContent=(p==0?"TÚ":n[p]).toUpperCase()})}
function begin3(c){const opps=P.map((_,i)=>i).filter(i=>i>0&&alive(i)),en=opps.flatMap(o=>field(o)),emp=opps.filter(o=>!field(o).length);if(!en.length&&emp.length==1)return pAttack(c,null,0,emp[0]);G.sel=c;c.el.classList.add("sel");en.forEach(e=>e.el.classList.add("tg"));if(G.n3)emp.forEach(o=>{const e=$("#lp"+o);e&&e.classList.add("tgp")});msg(G.n3?"Elige a quién atacar: toca un monstruo rival"+(emp.length?" o a un jugador sin monstruos":""):"Elige la columna enemiga a atacar")}
async function elimP(p){const q=P[p];if(!q||q.out)return;const nal=P.filter((_,i)=>alive(i)).length;q.out=1;if(p==0)G.place=nal;[...q.A,...q.D].filter(Boolean).forEach(c=>{if(c.el){c.el.classList.add("dead");setTimeout(()=>{try{c.el.remove()}catch(e){}},700)}});q.A=[null,null,null];q.D=[null,null,null];q.hand.forEach(c=>{if(c.he)c.he.remove()});q.hand=[];
const l=$("#lp"+p);if(l)l.classList.add("out");flash("#ff5468aa");shake();snd(150,.7,"sawtooth",.12,40);msg(p==0?"¡Has sido eliminado! Ahora solo observas la partida":NAME(p)+" ha sido eliminado");log(NAME(p)+" fue eliminado");
if(p==0){G.spec=1;G.specDone=1;if(!$("#spec"))st.insertAdjacentHTML("beforeend",'<div id="spec">👁 ERES ESPECTADOR</div>');try{reportResult(0)}catch(e){}notify("Eliminado","Sigues viendo la partida hasta que quede un ganador.")}
await W(1200);fxRecalc()}
async function chk3(){if(!G.n3){if(P[1].lp<=0)end(1);else if(P[0].lp<=0)end(0);return}
for(const p of P.map((_,i)=>i).filter(i=>alive(i)&&P[i].lp<=0).sort((a,b)=>P[a].lp-P[b].lp||a-b))await elimP(p);
const al=P.map((_,i)=>i).filter(alive);if(al.length<=1&&!G.over)end(al[0]===0)}
async function npc3(){await W(600);const s=G.t,me=P[s];let mv=2;
while(mv>0&&!G.over&&!me.out){const hs=me.hand,opps=P.map((_,i)=>i).filter(i=>i!==s&&alive(i));let best=null,bs=0;
if(G.n>ATKN())for(const a of me.A.filter(c=>c&&fxCanAtk(c))){for(const o of opps){G.tg=o;const op=P[o],cs=[0,1,2].filter(i=>op.A[i]||op.D[i]);for(const col of cs.length?cs:[null]){const r=calc(a,col),sc=r.ev.reduce((t,x)=>t+(x.s?400:x.k?1500+x.c.a:x.x),0)+r.lp*1.5+(op.lp<3000?900:0)+(o==0?150:0);if((r.lp>0||r.ev.some(x=>x.k))&&sc>bs){bs=sc;best={a,col,o}}}}}
G.tg=NX(s);
if(best&&!(STORY.cur&&STORY.cur.err&&Math.random()*100<STORY.cur.err)){G.tg=best.o;await attack(best.a,best.col);break}
let did=0;
if(hs.length<=2&&me.deck.length){await takeCards(s);did=1}
else if(hs.length){const nd=me.A.findIndex((c,i)=>c&&!me.D[i]);
if(nd>=0){const bd=hs.slice().sort((x,y)=>y.d-x.d)[0],sc=hs.filter(c=>c.d==0).sort((x,y)=>x.a-y.a)[0];await summon(s,sc&&bd.d<3000?sc:bd,"d",nd);did=1}
else if(me.A.includes(null)){await summon(s,hs.slice().sort((x,y)=>y.a-x.a)[0],"a");did=1}
else if(me.D.includes(null)){await summon(s,hs.slice().sort((x,y)=>y.d-x.d)[0],"d");did=1}}
if(!did&&hs.length<5&&me.deck.length){await takeCards(s);did=1}
if(!did)break;mv--;await W(400)}
if(G.over)return;await startTurn(NX(s))}
async function npc(){return G.n3?npc3():npc2()}
async function rxApply(m){if(!G.n3)return rxApply0(m);const A=G.t,q=P[A];
if(m.t=="draw"){G.busy=1;await takeCards(A);if(!G.over)await spend()}
else if(m.t=="sum"){G.busy=1;await summon(A,q.hand[m.h],m.s,m.i);await spend()}
else if(m.t=="flip"){await flip(AR(A,m.p)[m.i],1)}
else if(m.t=="atk"){const a=q.A[m.i];a.mode=m.m||null;await pAttack(a,m.c,1,LOC(m.tp))}
else if(m.t=="gyatk"){const g=q.gy.find(x=>fxk(x)=="infi"&&!x.neg&&!x.gyUsed);fxInit(g);g.gy=1;await pAttack(g,m.c,1,LOC(m.tp))}
else if(m.t=="end"){G.busy=1;clr();await startTurn(NX(A))}
else if(m.t=="res"||m.t=="kick"){await elimP(A);if(!G.over){G.busy=1;await startTurn(NX(A))}}}
async function doKick(){if(G.over||!G.n3||G.t==0||!alive(G.t))return;const s=G.t;tx({t:"kick"});await elimP(s);if(!G.over){G.busy=1;await startTurn(NX(s))}}
function startTrioCPU(d){if(!U)return;if(dn(U.col)!=30){toast("Arma tu mazo de 30 cartas primero");$("#ov").style.display="none";return showApp("col")}cleanupOnline();$("#ov").style.display="none";ON.my=0;STORY.cur={id:"_p",name:"Trío "+PN[d-1],err:Math.round((10-d)*5.5),practice:d,trio:1};app.style.display="none";beat("cpu");const mkd=()=>storyDeck({deck:{lo:Math.max(1,d-1),hi:Math.min(10,d+1),style:"bal",xn:d>7?d-7:0}});G.n3p=1;start([deckOf(U.col),mkd(),mkd()],0);G.names=["Tú","CPU A","CPU B"];setNames()}
function startOnline3(r){if(ON.on)return;cleanupOnline();const my=r.seats.indexOf(U.uid);if(my<0)return;Object.assign(ON,{on:1,role:String(my),my,mid:r.mid,q:[],seq:0,pumping:0,lastSeen:Date.now(),oppBeat:null,trio:1,opp:"Trío",ab:0,oppAb:0,bonus:null,beats:null,goneDone:{},kickFor:-1});
app.style.display="none";INC=[];showInc();beat("duel");
ON.subs.push(D("matches",r.mid).collection("moves").orderBy("n").onSnapshot(s=>{s.docChanges().forEach(ch=>{if(ch.type!="added")return;const x=ch.doc.data();if(x.by!==ON.role)ON.q.push(x)});rxPump()}));
ON.subs.push(D("matches",r.mid).onSnapshot(d=>{const x=d.data();if(!x)return;ON.beats=x;[0,1,2].forEach(a=>{if(x["gone_"+a]&&a!==ON.my&&!ON.goneDone[a]){ON.goneDone[a]=1;notify("Jugador fuera",NAME(LOC(a))+" abandonó la partida")}});if(!G.over&&G.n3&&G.t!=0&&alive(G.t)&&x["gone_"+ABS(G.t)]&&ON.kickFor!==G.n){ON.kickFor=G.n;const n=G.n;setTimeout(()=>{if(G.n===n)doKick()},1800)}}));
ON.bt=setInterval(()=>{D("matches",r.mid).update({["beat_"+my]:Date.now()}).catch(()=>{});const cl=$("#claim");if(!G.over&&G.n3&&G.t!=0&&alive(G.t)){const b=(ON.beats||{})["beat_"+ABS(G.t)]||0;cl.textContent="ELIMINAR A "+NAME(G.t).toUpperCase()+" (INACTIVO)";cl.style.display=(Date.now()-b>40000&&Date.now()-(G.tst||0)>25000)?"block":"none"}else cl.style.display="none"},5000);
$("#surr").style.display="block";$("#claim").style.display="none";
const decks=[0,1,2].map(i=>r.decks[r.seats[ABS(i)]].map(x=>({...x})));
G.n3p=1;start(decks,LOC(r.first));G.names=[0,1,2].map(i=>i==0?U.name:(r.names[r.seats[ABS(i)]]||"Rival"));setNames()}
/* salas en línea */
const TRO={rooms:[],mine:null,subs:[],started:{},d:5};
function watchRooms(){TRO.subs.forEach(f=>{try{f()}catch(e){}});TRO.subs=[];if(!db)return;
TRO.subs.push(Co("rooms").where("status","==","open").onSnapshot(s=>{TRO.rooms=s.docs.map(d=>({id:d.id,...d.data()})).filter(r=>Date.now()-(r.created||0)<30*60000);if(VW=="trio"&&app.style.display!="none")render()},()=>{}));
TRO.subs.push(Co("rooms").where("mem","array-contains",U.uid).onSnapshot(s=>{const rs=s.docs.map(d=>({id:d.id,...d.data()})).sort((a,b)=>(b.created||0)-(a.created||0));TRO.mine=rs.find(r=>r.status=="open"&&Date.now()-(r.created||0)<30*60000||(r.status=="playing"&&Date.now()-(r.startedAt||0)<90000))||null;const r=TRO.mine;if(r&&r.status=="playing"&&r.mid&&!TRO.started[r.mid]&&!ON.on){TRO.started[r.mid]=1;startOnline3(r)}if(VW=="trio"&&app.style.display!="none")render()},()=>{}));
UN.push(()=>{TRO.subs.forEach(f=>{try{f()}catch(e){}});TRO.subs=[];TRO.mine=null})}
function rTrio(){const m=TRO.mine,opts=PN.map((n,i)=>`<option value="${i+1}" ${TRO.d==i+1?"selected":""}>${i+1}. ${n}</option>`).join("");
let rooms="";if(m){const names=m.mem.map(u=>esc((m.names||{})[u]||"?")+(u==m.host?" (anfitrión)":"")).join(" · ");rooms=`<div class="trr"><b>Tu sala (${m.mem.length}/3)</b><span>${names}</span>${m.host==U.uid?`<button data-act="tstart" ${m.mem.length<3?"disabled":""}>INICIAR DUELO</button>`:""}<button class="ghost" data-act="tleave">SALIR DE LA SALA</button></div><p class="mut">${m.mem.length<3?"Esperando jugadores… (se necesitan 3)":m.host==U.uid?"¡Sala completa! Pulsa INICIAR DUELO.":"Esperando a que el anfitrión inicie el duelo."}</p>`}
else rooms=`<button data-act="tcreate">CREAR SALA</button>`;
const list=TRO.rooms.filter(r=>!m||r.id!=m.id).map(r=>`<div class="trr"><b>Sala de ${esc(r.hn||"?")}</b><span>${r.mem.length}/3 jugadores</span>${r.mem.length<3&&!m?`<button data-act="tjoin" data-id="${r.id}">UNIRME</button>`:""}</div>`).join("")||'<p class="mut">No hay salas abiertas.</p>';
return`<div class="ap"><h1>MODO TRÍO</h1><div class="pn"><h2>Reglas</h2><p class="mut">Tres duelistas en la misma partida. Cada quien elige a quién atacar. Gana el último que quede en pie. Si pierdes tus puntos de vida (o te quedas sin cartas) quedas eliminado, pero sigues viendo el duelo como espectador. Nadie ataca en la primera ronda.</p><p class="mut"><b>Premios:</b> todos ganan monedas y XP según su puesto. 1.er lugar: ${T3R[0][0]} monedas / ${T3R[0][1]} XP (en línea) y además una carta aleatoria de nivel 3 a 5. 2.º lugar: ${T3R[1][0]} / ${T3R[1][1]}. 3.er lugar: ${T3R[2][0]} / ${T3R[2][1]}. Contra la CPU los premios escalan con la dificultad. Abandonar la partida resta ${ABN} monedas y ${ABN} XP.</p></div><div class="pn"><h2>Contra 2 CPU</h2><div class="row"><select id="trd">${opts}</select><button data-act="trcpu">JUGAR</button></div></div><div class="pn"><h2>En línea con 2 amigos</h2>${onlineOK()?rooms+'<h3 style="margin:14px 0 0">Salas abiertas</h3>'+list:'<p class="mut">🔒 Bloqueado: se desbloquea al completar el tutorial y el siguiente duelo de la historia ('+onProg()+'/2).</p>'}</div></div>`}
Object.assign(ACT,{gtrio(){watchRooms();showApp("trio")},trcpu(){TRO.d=+($("#trd")||{}).value||5;startTrioCPU(TRO.d)},
async tcreate(){if(!onlineOK())return toast("🔒 El modo en línea aún está bloqueado");if(dn(U.col)!=30){toast("Arma tu mazo de 30 cartas primero");return showApp("col")}try{await Co("rooms").doc(U.uid).set({host:U.uid,hn:U.name,mem:[U.uid],names:{[U.uid]:U.name},decks:{[U.uid]:deckOf(U.col)},status:"open",created:Date.now()});toast("Sala creada. Espera a tus rivales")}catch(e){toast("No se pudo crear la sala")}},
async tjoin(b){if(!onlineOK())return toast("🔒 El modo en línea aún está bloqueado");if(dn(U.col)!=30){toast("Arma tu mazo de 30 cartas primero");return showApp("col")}const id=b.dataset.id;try{await db.runTransaction(async t=>{const ref=D("rooms",id),s=await t.get(ref);if(!s.exists)throw"La sala ya no existe";const r=s.data();if(r.status!="open")throw"La partida ya empezó";if(r.mem.includes(U.uid))return;if(r.mem.length>=3)throw"La sala está llena";t.update(ref,{mem:[...r.mem,U.uid],["names."+U.uid]:U.name,["decks."+U.uid]:deckOf(U.col)})});toast("Te uniste a la sala")}catch(e){toast(String(e))}},
async tleave(){const m=TRO.mine;if(!m)return;try{if(m.host==U.uid)await D("rooms",m.id).delete();else await db.runTransaction(async t=>{const ref=D("rooms",m.id),s=await t.get(ref);if(!s.exists)return;const r=s.data();t.update(ref,{mem:r.mem.filter(x=>x!=U.uid),["names."+U.uid]:FV.delete(),["decks."+U.uid]:FV.delete()})});TRO.mine=null;render()}catch(e){toast("No se pudo salir de la sala")}},
async tstart(){const m=TRO.mine;if(!m||m.host!=U.uid)return;try{await db.runTransaction(async t=>{const ref=D("rooms",m.id),s=await t.get(ref);if(!s.exists)throw"La sala ya no existe";const r=s.data();if(r.status!="open"||r.mem.length!=3)throw"Faltan jugadores";const mid=U.uid+"_"+Date.now(),first=Math.floor(Math.random()*3);t.set(D("matches",mid),{trio:true,seats:r.mem,status:"playing",beat_0:Date.now(),beat_1:Date.now(),beat_2:Date.now()});t.update(ref,{status:"playing",seats:r.mem,first,mid,startedAt:Date.now()})})}catch(e){toast(String(e))}}});

const leaveb=document.createElement("button");leaveb.id="leaveb";leaveb.className="ghost";leaveb.textContent="SALIR DE LA PARTIDA";leaveb.style.display="none";stb.appendChild(leaveb);
leaveb.onclick=()=>{if(ON.on)exitOnline();else{const pr=STORY.cur;G.over=1;G.busy=1;STORY.cur=null;$("#ov").style.display="none";beat("lobby");showApp("trio")}};
setInterval(()=>{leaveb.style.display=(G.n3&&G.spec&&!G.over)?"block":"none"},500);
