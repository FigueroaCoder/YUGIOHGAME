/* Acciones de la interfaz (ACT) */
/* ---- acciones de la interfaz ---- */
const ACT={
tab(b){AU.tab=b.dataset.v;AU.err="";AU.msg="";render()},
async auth(){if(AU.busy)return;AU.busy=1;AU.err="";AU.msg="";const n=$("#un").value,p=$("#pw").value;try{AU.tab=="login"?await doLogin(n,p):await doReg(n,p)}catch(e){AU.err=String(e);AU.busy=0;render();$("#un").value=n;return}AU.busy=0;if(AU.msg)render()},
cpu(){startCpu()},copy(){navigator.clipboard&&navigator.clipboard.writeText(U.uid).then(()=>toast("ID copiado"),()=>toast("Tu ID es "+U.uid))||toast("Tu ID es "+U.uid)},
goprof(){PF.err="";showApp("prof")},goadm(){showApp("adm")},goback(){showApp("lobby")},logout,
chid(){challenge($("#rid").value)},chu(b){challenge(b.dataset.id)},
async rename(){try{await doRename($("#nn").value);PF.err="";toast("Nombre actualizado");render()}catch(e){PF.err=String(e);render()}},
admcat(b){ADM.cat=b.dataset.k;renderAdm()},
async addcat(){const n=$("#newcat").value.trim();if(!n)return;if(aCats().some(c=>nkey(c.n)==nkey(n)))return toast("Ya existe una categoría con ese nombre");const o=Math.max(0,...aCats().map(c=>c.o||0))+1,k="x"+Date.now().toString(36);await D("categories",k).set({n,o,b:0});ADM.cat=k;$("#newcat").value="";toast("Categoría creada")},
async rencat(){const c=CATS[ADM.cat];const n=(prompt("Nuevo nombre de la categoría",c.n)||"").trim();if(!n||n==c.n)return;if(aCats().some(x=>x.k!=ADM.cat&&nkey(x.n)==nkey(n)))return toast("Ya existe una categoría con ese nombre");await D("categories",ADM.cat).update({n})},
async delcat(){const c=CATS[ADM.cat];if(!c||c.b)return;const L=cardsIn(ADM.cat);if(!confirm(`¿Eliminar "${c.n}"? Sus ${L.length} cartas se reasignarán automáticamente.`))return;
const b=db.batch();L.forEach(x=>{const k=autoCat(x[0],x[2],x[3]);b.set(D("cards",x[0]),{id:x[0],n:x[1],a:x[2],d:x[3],cat:k},{merge:true})});b.delete(D("categories",ADM.cat));await b.commit();ADM.cat=null;toast("Categoría eliminada")},
autocat(){autoAssign()}};
app.addEventListener("click",e=>{const b=e.target.closest("[data-act]");if(b&&ACT[b.dataset.act])ACT[b.dataset.act](b,e)});
app.addEventListener("keydown",e=>{if(e.key=="Enter"){const f=e.target.dataset&&e.target.dataset.enter;if(f&&ACT[f])ACT[f]()}});
app.addEventListener("change",e=>{const s=e.target.closest("select[data-mv]");if(s)moveCard(+s.dataset.mv,s.value)});
app.addEventListener("input",e=>{if(e.target.id=="admq"){ADM.q=e.target.value;renderAdm()}});
