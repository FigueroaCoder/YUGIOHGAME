/* Partida en línea entre dos jugadores */
/* ---- partida en línea ---- */
function tx(m){if(!ON.on)return;m.n=ON.seq++;m.by=ON.role;D("matches",ON.mid).collection("moves").doc(String(m.n).padStart(5,"0")).set(m).catch(()=>toast("Problema de conexión al enviar tu jugada"))}
async function rxPump(){if(ON.pumping||!ON.on)return;ON.pumping=1;try{while(ON.on&&!G.over&&G.t!=0&&!G.bw){ON.q.sort((a,b)=>a.n-b.n);while(ON.q.length&&ON.q[0].n<ON.seq)ON.q.shift();const m=ON.q[0];if(!m||m.n!==ON.seq)break;ON.q.shift();ON.seq++;await rxApply(m)}}finally{ON.pumping=0}}
async function rxApply0(m){const q=P[1];
if(m.t=="draw"){G.busy=1;await takeCards(1);if(!G.over)await spend()}
else if(m.t=="sum"){G.busy=1;await summon(1,q.hand[m.h],m.s,m.i);await spend()}
else if(m.t=="flip"){await flip(AR(1,m.p)[m.i],1)}
else if(m.t=="atk"){const a=q.A[m.i];a.mode=m.m||null;await pAttack(a,m.c,1)}else if(m.t=="gyatk"){const g=q.gy.find(x=>fxk(x)=="infi"&&!x.neg&&!x.gyUsed);fxInit(g);g.gy=1;await pAttack(g,m.c,1)}
else if(m.t=="end"){G.busy=1;clr();await startTurn(0)}
else if(m.t=="res"){ON.oppAb=1;end(1)}}
function startOnline(mid,role,m){if(ON.on)return;cleanupOnline();Object.assign(ON,{on:1,role,mid,q:[],seq:0,pumping:0,lastSeen:Date.now(),oppBeat:null});const o=role=="a"?"b":"a";ON.opp=role=="a"?m.bn:m.an;ON.oppId=role=="a"?m.b:m.a;
app.style.display="none";INC=[];showInc();beat("duel");
ON.subs.push(D("matches",mid).collection("moves").orderBy("n").onSnapshot(s=>{s.docChanges().forEach(ch=>{if(ch.type!="added")return;const x=ch.doc.data();if(x.by!==ON.role)ON.q.push(x)});rxPump()}));
ON.subs.push(D("matches",mid).onSnapshot(d=>{const x=d.data();if(!x)return;const ob=x["beat_"+o];if(ob!==ON.oppBeat){ON.oppBeat=ob;ON.lastSeen=Date.now();$("#claim").style.display="none"}}));
ON.bt=setInterval(()=>{D("matches",mid).update({["beat_"+role]:Date.now()}).catch(()=>{});if(!G.over&&Date.now()-ON.lastSeen>45000)$("#claim").style.display="block"},10000);
$("#surr").style.display="block";$("#claim").style.display="none";
start([m.decks[role].map(x=>({...x})),m.decks[o].map(x=>({...x}))],m.first==role?0:1);bonusRoll(mid)}
function cleanupOnline(){ON.subs.forEach(f=>{try{f()}catch(e){}});ON.subs=[];clearInterval(ON.bt);ON.on=0;ON.q=[];$("#surr").style.display="none";$("#claim").style.display="none"}
function exitOnline(){const t3=G.n3;cleanupOnline();$("#ov").style.display="none";U?(beat("lobby"),showApp(t3?"trio":"lobby")):showApp("auth")}
function startCpu(){STORY.cur=null;if(U&&dn(U.col)!=30){toast("Arma tu mazo de 30 cartas primero");$("#ov").style.display="none";return showApp("col")}cleanupOnline();app.style.display="none";beat("cpu");start()}
function toMenu(){STORY.cur=null;$("#ov").style.display="none";U?(beat("lobby"),showApp("lobby")):showApp("auth")}
function reportResult(win){try{settle(win)}catch(e){console.error(e)}if(!U||!db)return;const e={r:win?"w":"l",vs:ON.on?ON.opp:(STORY.cur?STORY.cur.name:"CPU"),m:ON.on?"online":(STORY.cur?"story":"cpu"),d:Date.now(),t:G.n};if(G.n3)e.pl=win?1:(G.place||3);
U.stats=U.stats||{};U.stats.played=(U.stats.played||0)+1;U.stats[win?"wins":"losses"]=(U.stats[win?"wins":"losses"]||0)+1;U.history=[...(U.history||[]),e];
D("users",U.uid).update({"stats.played":FV.increment(1),["stats."+(win?"wins":"losses")]:FV.increment(1),history:FV.arrayUnion(e)}).catch(()=>{});
if(ON.on&&(!G.n3||G.over))D("matches",ON.mid).update({status:"finished"}).catch(()=>{})}
$("#surr").onclick=()=>{if(G.over||!ON.on)return;if(G.n3){if(!confirm("¿Abandonar el duelo de tres? Perderás 25 monedas y 25 XP"))return;if(G.t==0)tx({t:"res"});D("matches",ON.mid).update({["gone_"+ON.my]:true}).catch(()=>{});ON.ab=1;end(0);return}if(!confirm("¿Rendirte y dar la victoria a tu rival?"))return;tx({t:"res"});ON.ab=1;end(0)};
$("#claim").onclick=()=>{if(G.over||!ON.on)return;if(G.n3)return doKick();D("matches",ON.mid).update({status:"abandoned"}).catch(()=>{});ON.oppAb=1;end(1)};
$("#mbtn").onclick=()=>ON.on?exitOnline():STORY.cur?(STORY.cur.practice?(G.n3?(toMenu(),showApp("trio")):(toMenu(),showApp("prac"))):storyBack()):toMenu();
