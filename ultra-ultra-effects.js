/* Cartas ultra especiales: tipos, utilidades y efectos */
/* ===== ultra especiales: tipos, utilidades ===== */
let FXA=null;
const NM=c=>String(c.n||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase(),
hasT=(c,t)=>ULT[c.id]&&ULT[c.id].t.includes(t),
isSpell=c=>ULT[c.id]?hasT(c,"Spellcaster"):/\b(mago|maga|magician|sorcerer|hechicer|sabio|sacerdot|bruj)/.test(NM(c)),
isBeast=c=>ULT[c.id]?hasT(c,"Beast"):/(leon|lobo|toro|buey|tigre|bestia|\boso\b|zorro|gato|halcon|colmillo|escarabajo|mamut|hombre seta)/.test(NM(c)),
isDark=c=>ULT[c.id]?ULT[c.id].at=="dark":/(oscur|sombra|demon|diablo|infiern|muert|abismo|vampir|zombi|calavera|craneo|fantasm|maldit|dark|cursed|chaos|ghost|death|skull|parca|segadora|ryu-kishin|diablillo)/.test(NM(c)),
isFire=c=>ULT[c.id]?ULT[c.id].at=="fire":/(fuego|llama|flame|fire|lava|ardiente|fenix|volcan|magma|infern)/.test(NM(c)),
isLight=c=>ULT[c.id]?ULT[c.id].at=="light":/(\bluz\b|light|angel|sagrad|divin|holy|dragon blanco|ojos azules|blue-eyes|alado)/.test(NM(c)),
fxImmune=(a,c)=>fxOn(c,"luz")&&isLight(a),
isGod=c=>/(slifer|obelisc|avatar de ra|dios alado|\bra\b)/.test(NM(c)),
fxk=c=>c.fx!==undefined?c.fx:(ULT[c.id]?ULT[c.id].k:null),
fxOn=(c,k)=>c&&c.fx==k&&!c.neg,
field=p=>[...P[p].A,...P[p].D].filter(Boolean),
onField=c=>c.el&&AR(c.owner,c.pos)[c.i]===c;
function fxInit(c){if(c.fx===undefined)c.fx=ULT[c.id]?ULT[c.id].k:null;if(c.ba==null){c.ba=c.a;c.bd=c.d}if(!c.tm)c.tm={a:0,d:0};if(!c.used)c.used={}}
function fxReset(c){delete c.dying;delete c.el;delete c.he;fxInit(c);c.a=c.ba;c.d=c.bd;c.tm={a:0,d:0};c.mode=null;c.jumping=0}
function fxPopFx(c,t){pop(c,"⚡ "+t,"#ff3df2");try{burst(SX(c.i,c.owner)+40,SY(c.owner,c.pos)+50,"#ff3df2",24)}catch(e){}log("⚡ "+c.n+": "+t);snd(700,.25,"sine",.08,1200)}
async function fxLP(p,d){await lp(p,Math.max(0,P[p].lp+d));await chk3()}
function fxAddHand(p,c){const q=P[p];q.hand.push(c);const e=c.he=document.createElement("img");e.className="hc"+(p?" o":"")+(G.n3&&p?" t3":"");e.src=p?BK:IMG[c.id][0];e.style.left=DK[p][0]+"px";e.style.top=DK[p][1]+"px";if(!p){e.onmouseenter=()=>pv(c);e.onclick=ev=>{ev.stopPropagation();handClick(c,e)}}ly.appendChild(e);e.offsetWidth;updDk(p);layout(p)}
function fxDiscard(p,c){const q=P[p];if(c.he)c.he.remove();q.hand.splice(q.hand.indexOf(c),1);q.gy.push(c);updGY(p);layout(p)}
function fxFromGY(p,c){const q=P[p];q.gy.splice(q.gy.indexOf(c),1);updGY(p);fxReset(c)}
async function fxSpawn(p,c,pos,i){const ar=AR(p,pos);if(i==null||ar[i])i=ar.indexOf(null);if(i<0)return false;Object.assign(c,{pos,owner:p,i});ar[i]=c;const e=c.el=document.createElement("div");e.className="fc"+(p?" en":"")+(G.n3&&p?" o3":"");e.style.cssText=`left:${SX(i,p)}px;top:${SY(p,pos)}px;opacity:0;transform:translateY(${p?-130:130}px) scale(1.6);--c:${p?"#ff5468":"#52e0ff"}`;e.innerHTML=`<img class="ci" src="${IMG[c.id][0]}"><div class="sw"></div><img class="fl" src="${IMG[c.id][1]}"><div class="lb"></div>`;e.onmouseenter=()=>pv(c);e.onclick=ev=>{ev.stopPropagation();fclick(c)};ly.appendChild(e);setPos(c);e.offsetWidth;e.style.opacity=1;e.style.transform="";snd(260,.4,"triangle",.09,760);await W(350);burst(SX(i,p)+40,SY(p,pos)+30,p?"#ff8a98":"#8ceeff",22);msg(`${p?"El rival invoca":"Invocas"} de Modo Especial a ${c.n}`);pv(c);await W(500);return true}
async function fxAnnounce(c){const u=ULT[c.id];c.el.classList.add("ult");try{burst(SX(c.i,c.owner)+40,SY(c.owner,c.pos)+40,"#ff3df2",46);flash("#ff3df255");beam(SX(c.i,c.owner),SY(c.owner,c.pos),"#ff3df2")}catch(e){}[520,660,880].forEach((f,i)=>setTimeout(()=>snd(f,.35,"triangle",.09,f*1.5),i*140));log(`⚡ ${c.owner?"El rival jugó":"Jugaste"} ${c.n}: ¡carta con efecto!`);const b=document.createElement("div");b.id="fxbox";b.innerHTML=`<img src="${IMG[c.id][0]}" alt=""><div><small>⚡ ¡CARTA CON EFECTO!</small><h2>${esc(c.n)}</h2><p>${esc(u.d)}</p></div>`;b.onclick=()=>b.remove();st.appendChild(b);await W(2800);b.remove()}
/* efectos continuos */
function fxRecalc(){for(let pass=0;pass<2;pass++)for(const p of P.map((_,i)=>i))for(const c of field(p)){fxInit(c);let da=0,dd=0;const own=field(c.owner);own.forEach(k=>{if(k!==c&&fxOn(k,"khep"))da+=1000});P.forEach((_,pp)=>field(pp).forEach(k=>{if(k!==c&&fxOn(k,"kits")&&isSpell(c))da-=1000}));
if(!c.neg){const sib=own.filter(x=>x!==c&&!x.neg&&["tri1","tri2","tri3"].includes(x.fx)).length;
if(c.fx=="tri1"||c.fx=="tri2"){da+=sib==1?300:sib>=2?1000:0;const t3=own.find(x=>x.fx=="tri3");if(t3)dd+=t3.d}
if(c.fx=="tri3"){dd+=sib==1?300:sib>=2?1000:0;const t1=own.find(x=>x.fx=="tri1");if(t1)da+=(t1.a-c.ba)-c.ba}
if(c.fx=="div"&&P[c.owner].gy.some(x=>fxk(x)=="bish"))da+=500}
const pr=c.tm||{a:0,d:0};if(da!==pr.a||dd!==pr.d){c.a=Math.max(0,c.a+da-pr.a);c.d=Math.max(0,c.d+dd-pr.d);c.tm={a:da,d:dd};setPos(c)}}}
/* al invocar */
async function summon(p,c,pos,i){await summon0(p,c,pos,i);await fxOnSummon(c)}
async function fxOnSummon(c){fxInit(c);if(G.godNerf&&!c.godDone&&isGod(c)){c.godDone=1;["a","d","ba","bd"].forEach(k=>c[k]=Math.floor(c[k]/2));setPos(c);pop(c,"☀ Poder divino -50%","#ffb347")}
if(!c.fx||c.fx=="vanilla"){fxRecalc();return}
if(ULT[c.id])await fxAnnounce(c);
const p=c.owner,o=OP(p),K=c.fx,q=P[p];
if(K=="tri1"||K=="tri2"||K=="tri3"){const t=field(o).filter(x=>x.pos=="a").sort((x,y)=>x.a-y.a)[0];if(t){if(K=="tri2"){t.a=Math.floor(t.a/2);t.ba=Math.floor((t.ba==null?t.a:t.ba)/2);fxPopFx(t,"ATK -50%")}else{t.d=Math.floor(t.d/2);t.bd=Math.floor((t.bd==null?t.d:t.bd)/2);fxPopFx(t,"DEF -50%")}setPos(t);await W(800)}}
else if(K=="kits"){const g=q.gy.filter(x=>x!==c&&isSpell(x)).sort((x,y)=>y.a-x.a)[0];if(g&&q.hand.length<5){fxFromGY(p,g);fxAddHand(p,g);fxPopFx(c,"recupera a "+g.n);await W(600)}const od=P[o].deck,ix=od.findIndex(x=>NM(x)=="mago oscuro");if(ix>=0){const m=od.splice(ix,1)[0];q.deck.push(m);updDk(o);updDk(p);fxPopFx(c,"se lleva al Mago Oscuro del Deck rival");await W(600)}}
else if(K=="kuku"){const x=field(o).filter(y=>y.fx&&y.fx!="vanilla"&&!y.neg).sort((y,z)=>z.a-y.a)[0];if(x){x.neg=1;fxPopFx(x,"efecto NEGADO para toda la partida");await W(800)}}
else if(K=="hall"){for(const x of field(o).filter(y=>y.pos=="d")){fxPopFx(x,"alma devorada");await kill(x,"effect")}}
else if(K=="susa"){G.godNerf=1;P.flatMap((_,i)=>field(i)).filter(isGod).forEach(x=>{if(!x.godDone){x.godDone=1;["a","d","ba","bd"].forEach(k=>x[k]=Math.floor((x[k]==null?0:x[k])/2));setPos(x);fxPopFx(x,"poder -50%")}});await W(600)}
else if(K=="fog"){c.fog=1;fxPopFx(c,"campo de niebla activo")}
fxRecalc()}
/* al morir */
async function kill(c,cause,killer){cause=cause||"battle";if(cause=="battle")killer=killer||FXA;if(c.dying)return;
if(cause=="battle"&&fxOn(c,"fog")&&!c.fogUsed){c.fogUsed=1;pop(c,"🌫 ¡NIEBLA PROTECTORA!","#d6ecff");log(c.n+" resiste el ataque gracias a la niebla");flash("#d6ecff55");burst(SX(c.i,c.owner)+40,SY(c.owner,c.pos)+56,"#d6ecff",30);await W(900);return}
c.dying=1;const col=c.i;await kill0(c);fxRecalc();
if(cause=="battle"&&killer&&fxOn(killer,"huit")&&killer.owner!=c.owner){fxPopFx(killer,"el sol cae: -200 LP al rival");await fxLP(c.owner,-200)}
await fxOnDeath(c,cause,killer);
if(cause=="battle"&&c.fx!="mict"&&P[c.owner].gy.includes(c)){const m=field(c.owner).find(x=>fxOn(x,"mict")&&x.i==col);if(m&&P[c.owner].hand.length<5){fxFromGY(c.owner,c);fxAddHand(c.owner,c);fxPopFx(m,"recupera a "+c.n+" del Cementerio");await W(600)}}
fxRecalc()}
async function fxOnDeath(c,cause,killer){fxInit(c);if(!c.fx||c.fx=="vanilla"||c.neg)return;const p=c.owner,o=(killer&&killer.owner!=p?killer.owner:OP(p)),q=P[p],K=c.fx;
if(K=="oscur"){if(cause=="battle"||cause=="effect"){const g=q.gy.filter(x=>x!==c&&isDark(x)&&NM(x)!="mago de la oscuridad").sort((x,y)=>y.a-x.a)[0],pos=q.A.includes(null)?"a":q.D.includes(null)?"d":null;if(g&&pos){fxPopFx(c,"revive a "+g.n);fxFromGY(p,g);await W(500);if(await fxSpawn(p,g,pos))await fxOnSummon(g)}else fxPopFx(c,"sin objetivo para revivir")}}
else if(K=="fus"){const h=q.hand.slice().sort((x,y)=>y.a-x.a);if(h.length>=2){const A=h[0],B=h[1];[A,B].forEach(x=>{if(x.he)x.he.remove();q.hand.splice(q.hand.indexOf(x),1)});layout(p);const f={id:A.id,n:A.n+" + "+B.n,a:A.a+B.a,d:A.d+B.d,fx:"vanilla",fused:1};f.ba=f.a;f.bd=f.d;f.tm={a:0,d:0};f.used={};fxPopFx(c,"fusiona "+A.n+" y "+B.n);await W(600);if(await fxSpawn(p,f,c.pos,c.i))await fxOnSummon(f)}}
else if(K=="mict"){if(q.hand.length&&q.deck.length){const dc=q.hand.slice().sort((x,y)=>x.a-y.a)[0];fxDiscard(p,dc);const nx=q.deck.shift();updDk(p);fxAddHand(p,nx);fxPopFx(c,"descarta "+dc.n+" y toma la última carta del Deck");await W(700)}}
else if(K=="amat"){if(cause=="battle"&&killer){fxPopFx(c,"su destructor pierde 500 LP");await fxLP(killer.owner,-500)}}
else if(K=="ajo"){field(p).forEach(x=>{x.d=x.bd+(x.tm?x.tm.d:0);setPos(x);try{burst(SX(x.i,x.owner)+40,SY(p,x.pos)+50,"#7dff9c",18)}catch(e){}});fxPopFx(c,"regeneración: +1000 LP");await fxLP(p,1000);const g=q.gy.find(x=>fxk(x)=="carch");if(g&&q.hand.length<5){fxFromGY(p,g);fxAddHand(p,g);fxPopFx(c,"Carcharadraconis vuelve a tu mano")}await W(500)}
else if(K=="khep"){if(cause=="battle"&&killer&&killer.owner!=p&&onField(killer)){fxPopFx(c,"arrastra a su verdugo");await W(600);await kill(killer,"effect")}}
else if(K=="dom"){if(!c.back){const hb=q.hand.filter(isBeast),fb=field(p).filter(x=>x!==c&&isBeast(x));if(hb.length+fb.length>=2){c.back=1;let need=2;for(const x of hb){if(need>0){need--;fxDiscard(p,x)}}for(const x of fb){if(need>0){need--;await kill(x,"cost")}}fxFromGY(p,c);fxAddHand(p,c);fxPopFx(c,"vuelve a tu mano (2 bestias sacrificadas)");await W(500)}}}
else if(K=="maho"){if(!c.revived){const v={id:c.id,n:c.n,a:0,d:c.d,ba:0,bd:c.d,fx:"vanilla",revived:1,tm:{a:0,d:0},used:{}},pos=q.A.includes(null)?"a":q.D.includes(null)?"d":null;if(q.hand.length<5||pos){c.revived=1;q.gy.splice(q.gy.indexOf(c),1);updGY(p);fxPopFx(c,"regresa del Cementerio con ATK 0");if(q.hand.length<5)fxAddHand(p,v);else{await W(400);if(await fxSpawn(p,v,pos))await fxOnSummon(v)}await W(500)}}}
else if(K=="kuku"){const od=P[o].deck;if(od.length){const t=od.pop();P[o].gy.push(t);updGY(o);updDk(o);fxPopFx(c,"envía "+t.n+" del Deck rival al Cementerio");await W(600)}}
else if(K=="bish"){if(q.deck.length){const t=q.deck.pop();q.gy.push(t);updGY(p);updDk(p);fxPopFx(c,"se lleva "+t.n+" del Deck al Cementerio");await W(600)}}
else if(K=="div"){q.hm=8;fxPopFx(c,"podrás tener 8 cartas en mano esta vez")}}
/* al atacar */
function fxLane(a,col,E){if(col==null)return[];const D=E.D[col],A=E.A[col];if(!a.neg&&D&&A&&((a.fx=="merc"&&(a.jump!==G.n||a.jumping))||(a.fx=="carch"&&a.mode=="dive")))return[A];return[D,A].filter(Boolean)}
function fxFront(a,col,E){return fxLane(a,col,E)[0]||null}
function fxSplit(a,col){const E=P[OP(a.owner)],half=Math.floor(a.a/2),ev=[];let lpx=0;for(const t of[E.D[col],E.A[col]]){if(!t){lpx+=half;continue}if(fxImmune(a,t))ev.push({c:t,k:0,x:0});else if(t.pos=="d"&&t.d==0)ev.push({c:t,k:1,x:0,s:1});else if(half>=t.d)ev.push({c:t,k:1,x:t.d});else ev.push({c:t,k:0,x:half})}return{ev,lp:lpx,e:OP(a.owner)}}
function fxCanAtk(c){return!oppsF(c.owner).some(x=>fxOn(x,"dom"))||!(isBeast(c)||isDark(c))}
function fxAtkItems(c,it){if(!fxCanAtk(c)){msg("¡Domador de Monstruos impide que "+c.n+" ataque!");return}fxInit(c);it.push(["Atacar",()=>{c.mode=null;begin(c)}]);if(fxOn(c,"carch")){if(!c.used.dive)it.push(["Atacar sumergiéndose",()=>{c.mode="dive";begin(c)}]);if(!c.used.split)it.push(["Atacar dividiendo ATK",()=>{c.mode="split";begin(c)}])}}
function fxPreAttack(a,col){fxInit(a);a.tmpA=0;if(a.neg)return;const E=P[OP(a.owner)],front=col==null?null:fxFront(a,col,E);
if(a.gy)a.gyUsed=1;if(a.mode)a.used[a.mode]=1;
if(a.fx=="merc"&&col!=null&&E.D[col]&&E.A[col]&&a.jump!==G.n){a.jump=G.n;a.jumping=1;fxPopFx(a,"salta sobre la defensa")}
if(a.fx=="carch"&&a.mode&&col!=null&&E.D[col]&&E.A[col])fxPopFx(a,a.mode=="dive"?"se sumerge bajo la defensa":"divide su ATK en dos");
if(a.fx=="arco"&&front){front.a=Math.max(0,front.a-1000);front.ba=Math.max(0,(front.ba==null?front.a:front.ba)-1000);setPos(front);fxPopFx(a,"el objetivo pierde 1000 ATK para siempre");if(front.pos=="d"&&!a.arcoUsed){a.arcoUsed=1;a.a+=400;a.tmpA=400}}
if(a.fx=="luz"&&front&&a.defT!==G.n){a.defT=G.n;a.d+=200;a.bd+=200;setPos(a);fxPopFx(a,"+200 DEF (una vez por turno)")}
if(a.fx=="susa"&&front&&isFire(front)){a.a+=100;a.ba+=100;setPos(a);fxPopFx(a,"+100 ATK (carta de fuego)")}}
async function attack(a,col){FXA=a;fxPreAttack(a,col);try{await attack0(a,col)}finally{if(a.tmpA){a.a-=a.tmpA;a.tmpA=0;try{setPos(a)}catch(e){}}a.mode=null;a.jumping=0;FXA=null}fxRecalc()}
function pv(c){pv0(c);const u=ULT[c.id];if(u&&c.fx!=="vanilla"){$("#pi").insertAdjacentHTML("beforeend",`<small class="ufx">⚡ ${esc(u.d)}${c.neg?" (EFECTO NEGADO)":""}</small>`)}}
/* botón: atacar desde el cementerio */
const gyb=document.createElement("button");gyb.id="gyb";gyb.className="ghost";gyb.textContent="☠ ATACAR DESDE EL CEMENTERIO";gyb.style.display="none";stb.appendChild(gyb);
const gyCard=()=>{try{return P[0].gy.find(x=>fxk(x)=="infi"&&!x.neg&&!x.gyUsed)}catch(e){return null}};
setInterval(()=>{try{gyb.style.display=(!G.t&&!G.busy&&!G.over&&G.mv>0&&G.n>ATKN()&&gyCard())?"block":"none"}catch(e){}},400);
gyb.onclick=()=>{const g=gyCard();if(!g)return;fxInit(g);g.gy=1;clr();begin3(g)};
