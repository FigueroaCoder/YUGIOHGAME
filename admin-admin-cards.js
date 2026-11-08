/* Administrador: categorías y cartas */
/* ---- administrador ---- */
const aCats=()=>Object.entries(CATS).map(([k,v])=>({k,...v})).sort((a,b)=>(a.o||0)-(b.o||0));
const cardsIn=k=>C.filter(c=>k=="_all"||(k=="_none"?!(CARDS[c[0]]&&CATS[CARDS[c[0]].cat]):catKey(c[0])==k));
function rAdm(){return`<div class="ap" style="width:min(1200px,100%)"><div class="hd"><button class="mini" data-act="goback">← Volver</button><b class="nm">Administrador de cartas</b></div>
<div class="adm"><div class="side pn"><h2>Categorías</h2><div id="admcats"></div><div class="row" style="margin-top:10px"><input id="newcat" maxlength="30" placeholder="Nueva categoría" data-enter="addcat"><button class="mini" data-act="addcat">Agregar</button></div><button class="mini ghost" data-act="autocat" style="margin-top:10px">Asignar categoría a las que no tienen</button></div>
<div class="main"><div class="pn"><div class="row"><h2 id="admtt" style="margin:0;flex:1"></h2><span id="admbt"></span></div><input id="admq" placeholder="Buscar carta…" value="${esc(ADM.q)}" style="margin-top:10px"></div><div id="admgrid" class="cg"></div></div></div></div>`}
function renderAdm(){const cs=aCats(),none=cardsIn("_none").length,e=$("#admcats");if(!e)return;
if(!ADM.cat||(!CATS[ADM.cat]&&!["_all","_none"].includes(ADM.cat)))ADM.cat=cs[0]?cs[0].k:"_all";
e.innerHTML=`<button class="ct ${ADM.cat=="_all"?"on":""}" data-act="admcat" data-k="_all">Todas<i>${C.length}</i></button>`+(none?`<button class="ct ${ADM.cat=="_none"?"on":""}" data-act="admcat" data-k="_none">Sin categoría<i>${none}</i></button>`:"")+cs.map(c=>`<button class="ct ${ADM.cat==c.k?"on":""}" data-act="admcat" data-k="${c.k}">${esc(c.n)}<i>${cardsIn(c.k).length}</i></button>`).join("");
const cur=CATS[ADM.cat];$("#admtt").textContent=ADM.cat=="_all"?"Todas las cartas":ADM.cat=="_none"?"Sin categoría":cur?cur.n:"";
$("#admbt").innerHTML=cur?`<button class="mini ghost" data-act="rencat">Renombrar</button> ${cur.b?"":'<button class="mini ghost" data-act="delcat">Eliminar</button>'}`:"";
const q=nkey(ADM.q||""),L=cardsIn(ADM.cat).filter(c=>!q||nkey(c[1]).includes(q)),opts=k=>cs.map(c=>`<option value="${c.k}" ${c.k==k?"selected":""}>${esc(c.n)}</option>`).join("");
$("#admgrid").innerHTML=L.length?L.map(c=>{const k=catKey(c[0]);return`<div class="cc"><img loading="lazy" src="${IMG[c[0]][0]}"><b>${esc(c[1])}</b><small>ATK ${c[2]} / DEF ${c[3]}</small><select data-mv="${c[0]}">${opts(k)}</select></div>`}).join(""):'<p class="mut">No hay cartas en esta categoría.</p>'}
const moveCard=(id,k)=>{const c=CB[id];D("cards",id).set({id,n:c[1],a:c[2],d:c[3],cat:k},{merge:true}).then(()=>toast("Carta movida a "+(CATS[k]?CATS[k].n:k),1800)).catch(()=>toast("No se pudo mover la carta"))};
async function autoAssign(){const ops=C.filter(c=>!(CARDS[c[0]]&&CATS[CARDS[c[0]].cat])).map(c=>[c[0],autoCat(c[0],c[2],c[3])]);if(!ops.length)return toast("Todas las cartas ya tienen categoría");
for(let i=0;i<ops.length;i+=400){const b=db.batch();ops.slice(i,i+400).forEach(([id,k])=>{const c=CB[id];b.set(D("cards",id),{id,n:c[1],a:c[2],d:c[3],cat:k},{merge:true})});await b.commit()}toast(ops.length+" cartas asignadas")}
