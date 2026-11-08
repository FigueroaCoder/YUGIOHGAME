/* Modo historia: combate contra rivales simulados */
/* ---- combate contra rivales simulados ---- */
function storyDeck(n){const d=n.deck||{},lo=Math.min(10,Math.max(1,+d.lo||1)),hi=Math.min(10,Math.max(lo,+d.hi||lo));let ks=ORD.slice(lo-1,hi),pool=C.filter(c=>ks.includes(lv(c[0])));
for(let w=1;pool.length<30&&w<10;w++){ks=ORD.slice(Math.max(0,lo-1-w),Math.min(10,hi+w));pool=C.filter(c=>ks.includes(lv(c[0])))}
if(pool.length<10)pool=C.slice();let P2=pool.slice();
if(d.style=="atk")P2=pool.slice().sort((a,b)=>b[2]-a[2]).slice(0,Math.max(30,Math.round(pool.length*.6)));else if(d.style=="def")P2=pool.slice().sort((a,b)=>b[3]-a[3]).slice(0,Math.max(30,Math.round(pool.length*.6)));
sh(P2);const out=[],used=new Set(),xn=Math.max(0,Math.min(10,+d.xn||0));
if(xn)sh(C.filter(c=>["cs","cp","cpe"].includes(lv(c[0])))).slice(0,xn).forEach(c=>{out.push(c);used.add(c[0])});
for(const c of P2){if(out.length>=30)break;if(!used.has(c[0])){out.push(c);used.add(c[0])}}
for(let i=0;out.length<30&&P2.length;i++)out.push(P2[i%P2.length]);
return sh(out.slice(0,30)).map(([id,nm,a,df])=>({id,n:nm,a,d:df}))}
function startStory(id){const n=STY.nodes[id];if(!n||!U)return;if(seasonInfo().over)return toast("La temporada ya terminó");const s=nState(id);if(nDone(id)>0)return toast("Ya superaste este rival en esta temporada. No se puede repetir hasta la siguiente");if(s=="lock")return toast("Aún no has desbloqueado este camino");if(s=="lvl")return toast("Necesitas nivel "+n.minLv);
if(dn(U.col)!=30){toast("Arma tu mazo de 30 cartas primero");return showApp("col")}
cleanupOnline();ST.sel=id;STORY.cur={id,name:n.name,err:+((n.deck||{}).err)||0};app.style.display="none";beat("cpu");start([deckOf(U.col),storyDeck(n)],0);log(`${n.name}: «${n.intro||"¡Que comience el duelo!"}»`)}
function storyBack(){STORY.cur=null;$("#ov").style.display="none";beat("lobby");showApp("story")}
function storyRetry(){const id=STORY.cur&&STORY.cur.id;STORY.cur=null;if(id)startStory(id)}
async function storyWin(id){const n=STY.nodes[id];if(!n||!U)return null;const first=!(nDone(id)>0),r=n.rw||{},pc=first?1:rep(),sid=STY.sid,
g=Math.round((r.gold||0)*pc),x=Math.round((r.xp||0)*pc),got={first,gold:g,xp:x,card:0,packs:{},up:0,newOpen:[]},was=new Set(Object.keys(STY.nodes).filter(isOpenS)),oldL=myLv();
const u={gold:FV.increment(g),xp:FV.increment(x),[`sp.${sid}.${id}`]:FV.increment(1)};
if(first){const pl=(r.cm=="rand"||r.cm=="list")?poolIds(n):(r.cm=="spec"&&CB[r.cid]?[+r.cid]:[]);if(pl.length)got.card=pl[Math.floor(Math.random()*pl.length)];
if(got.card)u["col.inv."+got.card]=FV.increment(1);
Object.keys(PKI).forEach(k=>{const v=Math.max(0,Math.floor(+((r.packs||{})[k])||0));if(v){got.packs[k]=v;u["col.packs."+k]=FV.increment(v)}})}
U.gold=(U.gold||0)+g;U.xp=(U.xp||0)+x;U.sp=U.sp||{};U.sp[sid]=U.sp[sid]||{};U.sp[sid][id]=(U.sp[sid][id]||0)+1;
if(got.card){U.col.inv=U.col.inv||{};U.col.inv[got.card]=(U.col.inv[got.card]||0)+1}
Object.keys(got.packs).forEach(k=>{U.col.packs=U.col.packs||{};U.col.packs[k]=(U.col.packs[k]||0)+got.packs[k]});
got.up=myLv()>oldL?myLv():0;got.newOpen=(n.next||[]).filter(j=>STY.nodes[j]&&isOpenS(j)&&!was.has(j)).map(j=>STY.nodes[j].name);
try{await D("users",U.uid).update(u)}catch(e){toast("No se pudieron guardar los premios. Revisa tu conexión")}return got}
function rewardFx(n,g){let d=0;const dl=()=>`style="--d:${(d+=.12).toFixed(2)}s"`,o=[`<div class="sy-t sy-pop" ${dl()}><div class="ti">${IC.coin}</div><b>+${g.gold}</b><small>Monedas</small></div>`,`<div class="sy-t sy-pop" ${dl()}><div class="ti">${IC.xp}</div><b>+${g.xp}</b><small>Experiencia</small></div>`];
Object.keys(g.packs).forEach(k=>o.push(`<div class="sy-t sy-pop" ${dl()} ><div class="ti"><img src="${PKIMG[k]}" alt=""></div><b>×${g.packs[k]}</b><small>${esc(PKI[k][0])}</small></div>`));
if(g.card){const q=RAR(g.card);o.push(`<div class="sy-cw sy-pop" ${dl()}><div class="sy-c" style="--g:${q[1]};cursor:default"><img src="${IMG[g.card][0]}" alt=""><span class="rt">${q[0]}</span><span class="ad">${CB[g.card][2]} / ${CB[g.card][3]}</span></div><small>${esc(cnm(g.card))}</small></div>`)}
fx(`<div class="stg sy-win"><span class="sy-eye">Temporada ${STY.num}</span><h2 class="sy-vt">VICTORIA</h2><p style="opacity:.8">Derrotaste a ${esc(n.name)}${g.first?"":" · repetición"}</p>${g.up?`<div class="sy-up">¡Subes al nivel ${g.up}!</div>`:""}<div class="sy-rw" style="justify-content:center">${o.join("")}</div>${g.newOpen.length?`<p>${IC.lock} Nuevos caminos: <b>${g.newOpen.map(esc).join(", ")}</b></p>`:""}<button onclick="fxClose();storyBack()">CONTINUAR</button></div>`)}
async function storyEnd(){const c=STORY.cur;if(!c)return;const n=STY.nodes[c.id];if(!n)return;const g=await storyWin(c.id);if(g)rewardFx(n,g)}
