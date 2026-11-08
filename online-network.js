/* Red: presencia, retos entre jugadores y cartas */
/* ---- red: presencia, retos, cartas ---- */
function stopNet(){UN.forEach(f=>{try{f()}catch(e){}});UN=[];UT.forEach(clearInterval);UT=[];INC=[];OUT=null;showInc()}
function beat(st){if(!U||!db)return;if(st)U.st=st;D("presence",U.uid).set({name:U.name,st:U.st,ts:FV.serverTimestamp(),lc:Date.now()}).catch(()=>{})}
function startNet(){stopNet();beat("lobby");watchNotifs();UT.push(setInterval(()=>{beat();if((VW=="lobby"||VW=="online")&&app.style.display!="none")renderList()},20000));
document.addEventListener("visibilitychange",()=>{if(!document.hidden)beat()});
UN.push(Co("presence").onSnapshot(s=>{PR=s.docs.map(d=>({id:d.id,...d.data({serverTimestamps:"estimate"}),pend:d.metadata.hasPendingWrites}));const me=PR.find(p=>p.id==U.uid);if(me&&!me.pend&&me.ts&&me.lc)SO=me.ts.toMillis()-me.lc;if(VW=="lobby"||VW=="online")renderList();else if(VW=="chat")chUpd()},()=>{}));
UN.push(Co("categories").onSnapshot(s=>{CATS={};s.docs.forEach(d=>CATS[d.id]=d.data());if(VW=="adm")renderAdm(1)},()=>{}));
UN.push(Co("cards").onSnapshot(s=>{CARDS={};s.docs.forEach(d=>CARDS[d.id]=d.data());if(VW=="adm")renderAdm(1)},()=>{}));
UN.push(Co("challenges").where("to","==",U.uid).onSnapshot(s=>s.docChanges().forEach(ch=>{if(ch.type=="removed")return;const c={id:ch.doc.id,...ch.doc.data({serverTimestamps:"estimate"})};
 if(c.status=="pending"&&c.createdAt&&nowS()-c.createdAt.toMillis()<90000){if(ON.on){D("challenges",c.id).update({status:"busy"}).catch(()=>{});return}if(!onlineOK()){D("challenges",c.id).update({status:"declined"}).catch(()=>{});return}if(!INC.find(x=>x.id==c.id)){INC.push(c);showInc();notify("⚔️ ¡Te retan a un duelo!",c.fromName+" te reta. Acepta o rechaza el reto.");setTimeout(()=>{INC=INC.filter(x=>x.id!=c.id);showInc()},Math.max(1000,90000-(nowS()-c.createdAt.toMillis())))}}
 else{const n=INC.length;INC=INC.filter(x=>x.id!=c.id);if(n!=INC.length)showInc()}}),()=>{}));
UN.push(Co("challenges").where("from","==",U.uid).onSnapshot(s=>s.docChanges().forEach(ch=>{if(ch.type=="removed"||!OUT||ch.doc.id!=OUT.id)return;const c=ch.doc.data(),nm=OUT.name;
 if(c.status=="declined"){OUT=null;showInc();notify("Reto rechazado",nm+" rechazó tu reto")}else if(c.status=="busy"){OUT=null;showInc();toast(nm+" está ocupado en otro duelo")}
 else if(c.status=="accepted"){const id=ch.doc.id;OUT=null;showInc();notify("Reto aceptado",nm+" aceptó tu reto. ¡A duelar!");beginFrom(id)}}),()=>{}));
watchStory();watchMine();syncCards()}
async function beginFrom(id){if(ON.on)return;try{const m=await D("matches",id).get();if(!m.exists)return;await D("challenges",id).update({status:"started"}).catch(()=>{});startOnline(id,"a",m.data())}catch(e){toast("No se pudo iniciar el duelo")}}
function showInc(){mdl.querySelectorAll(".ch").forEach(e=>e.remove());const c=INC[0];
if(c){const e=document.createElement("div");e.className="ch";e.innerHTML=`<b>${esc(c.fromName)}</b> te reta a un duelo<div class="row"><button data-m="y">ACEPTAR</button><button class="ghost" data-m="n">RECHAZAR</button></div>`;
e.onclick=ev=>{const b=ev.target.closest("[data-m]");if(!b)return;b.dataset.m=="y"?acceptCh(c):declineCh(c)};mdl.appendChild(e);try{snd(660,.2,"sine",.08,990)}catch(e){}}
else if(OUT){const e=document.createElement("div");e.className="ch";e.innerHTML=`Esperando respuesta de <b>${esc(OUT.name)}</b>…<div class="row"><button class="ghost" data-m="c">CANCELAR</button></div>`;e.onclick=()=>{D("challenges",OUT.id).update({status:"cancelled"}).catch(()=>{});OUT=null;showInc()};mdl.appendChild(e)}}
function declineCh(c){INC=INC.filter(x=>x.id!=c.id);showInc();D("challenges",c.id).update({status:"declined"}).catch(()=>{})}
async function acceptCh(c){INC=INC.filter(x=>x.id!=c.id);showInc();if(ON.on){D("challenges",c.id).update({status:"busy"}).catch(()=>{});return}
if(dn(U.col)!=30){toast("Arma tu mazo de 30 cartas primero");return showApp("col")}const fu=await D("users",c.from).get(),fd=(fu.data()||{}).col;if(!fd||dn(fd)!=30){D("challenges",c.id).update({status:"declined"}).catch(()=>{});return toast("El retador no tiene un mazo de 30 cartas")}const m={a:c.from,b:c.to,an:c.fromName,bn:c.toName,decks:{a:deckOf(fd),b:deckOf(U.col)},first:"a",status:"playing",beat_a:Date.now(),beat_b:Date.now()};
try{await db.runTransaction(async tx=>{const r=await tx.get(D("challenges",c.id));if(!r.exists||r.data().status!="pending")throw"GONE";tx.set(D("matches",c.id),m);tx.update(D("challenges",c.id),{status:"accepted",matchId:c.id})});startOnline(c.id,"b",m)}catch(e){toast(e==="GONE"?"El reto ya no está disponible":"No se pudo aceptar el reto")}}
async function challenge(id){if(!onlineOK())return toast("🔒 El modo en línea se desbloquea al completar el tutorial y el siguiente duelo de la historia",5000);if(dn(U.col)!=30){toast("Arma tu mazo de 30 cartas primero");return showApp("col")}id=(id||"").trim();if(!id)return toast("Escribe el ID o el nombre del rival");if(OUT)return toast("Ya tienes un reto pendiente");
try{const u=await resolveUser(id);if(!u)return toast("No existe un jugador con ese ID o nombre");id=u.uid;if(id==U.uid)return toast("Ese eres tú");const inc=INC.find(c=>c.from==id);if(inc)return acceptCh(inc);
const ref=Co("challenges").doc();await ref.set({from:U.uid,fromName:U.name,to:id,toName:u.name,status:"pending",createdAt:FV.serverTimestamp()});OUT={id:ref.id,to:id,name:u.name};showInc();
setTimeout(()=>{if(OUT&&OUT.id==ref.id){D("challenges",ref.id).update({status:"expired"}).catch(()=>{});OUT=null;showInc();toast("El reto expiró sin respuesta")}},90000)}catch(e){toast("No se pudo enviar el reto")}}
