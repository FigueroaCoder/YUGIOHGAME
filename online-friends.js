/* Amigos y búsqueda por nombre de usuario */
/* ---- amigos y busqueda por nombre de usuario ---- */
const FN={},FS={rid:"",fq:""},IDRE=/^[A-Z0-9]{6,8}$/i;
async function resolveUser(txt){txt=(txt||"").trim();if(!txt)return null;
const byId=async()=>{const id=txt.toUpperCase();if(!IDRE.test(id))return null;const u=await D("users",id).get();return u.exists?{uid:id,name:u.data().name}:null};
const byName=async()=>{const nk=nkey(txt);if(!nk||nk.includes("/"))return null;const n=await D("names",nk).get();if(!n.exists)return null;const uid=n.data().uid,u=await D("users",uid).get();return u.exists?{uid,name:u.data().name}:null};
return(await byId())||(await byName())}
const isOn=p=>!!(p&&p.st!="off"&&p.ts&&nowS()-p.ts.toMillis()<70000);
const fname=id=>{const p=PR.find(x=>x.id==id);return(p&&p.name)||FN[id]||id};
async function loadFN(){const need=((U&&U.friends)||[]).filter(id=>!FN[id]&&!PR.some(p=>p.id==id&&p.name));if(!need.length)return;await Promise.all(need.map(async id=>{try{const u=await D("users",id).get();if(u.exists)FN[id]=u.data().name}catch(e){}}));renderList()}
function friendOpts(sel){const F=((U&&U.friends)||[]).slice().sort((a,b)=>fname(a).localeCompare(fname(b)));return'<option value="">'+(F.length?"— Elegir amigo —":"(aún no tienes amigos)")+'</option>'+F.map(id=>`<option value="${id}" ${id==sel?"selected":""}>${isOn(PR.find(x=>x.id==id))?"● ":"○ "}${esc(fname(id))}</option>`).join("")}
function renderFriends(){const e=$("#flist");if(!e||!U)return;
const R=(U.friends||[]).map(id=>({id,name:fname(id),p:PR.find(x=>x.id==id)})).sort((a,b)=>(isOn(b.p)-isOn(a.p))||a.name.localeCompare(b.name));
e.innerHTML=R.length?R.map(f=>{const on=isOn(f.p),du=on&&f.p.st=="duel";return`<div class="pl"><span class="dot ${du?"bz":""}" style="${on?"":"opacity:.25"}"></span><b>${esc(f.name)}</b><small>${!on?"Desconectado":du?"En duelo":f.p.st=="cpu"?"Jugando contra la CPU":"Disponible"}</small><button class="mini" data-act="chu" data-id="${f.id}" ${on&&!du?"":"disabled"}>Retar</button><button class="mini ghost" data-act="trto" data-id="${f.id}">Cambio</button><button class="mini ghost" data-act="frem" data-id="${f.id}">Quitar</button></div>`}).join(""):'<p class="mut">Aún no tienes amigos. Agrégalos desde "Jugadores activos" o escribiendo su ID o nombre.</p>';
["rfs","tfs"].forEach(k=>{const x=$("#"+k);if(x&&document.activeElement!==x)x.innerHTML=friendOpts(x.value)})}
async function addFriend(id){if(!U||!id||id==U.uid)return;if((U.friends||[]).includes(id))return toast("Ya es tu amigo");
try{await D("users",U.uid).update({friends:FV.arrayUnion(id)});if(!(U.friends||[]).includes(id))U.friends=[...(U.friends||[]),id];toast(fname(id)+" ahora es tu amigo");renderList()}catch(e){toast("No se pudo agregar al amigo")}}
async function removeFriend(id){if(!U||!(U.friends||[]).includes(id))return;if(!confirm("¿Quitar a "+fname(id)+" de tus amigos?"))return;
try{await D("users",U.uid).update({friends:FV.arrayRemove(id)});U.friends=U.friends.filter(x=>x!=id);renderList()}catch(e){toast("No se pudo quitar al amigo")}}
app.addEventListener("change",e=>{const s=e.target.closest("select[data-fs]");if(!s)return;const i=$("#"+s.dataset.fs);if(!i)return;i.value=s.value?fname(s.value):"";if(i.id=="rid")FS.rid=i.value;if(i.id=="tid")TV.to=i.value});
app.addEventListener("input",e=>{const i=e.target.id;if(i=="rid")FS.rid=e.target.value;if(i=="fq")FS.fq=e.target.value;if(i=="tid")TV.to=e.target.value});
Object.assign(ACT,{fadd(b){addFriend(b.dataset.id)},frem(b){removeFriend(b.dataset.id)},
async fadq(){const v=($("#fq").value||"").trim();if(!v)return toast("Escribe el ID o el nombre de tu amigo");try{const u=await resolveUser(v);if(!u)return toast("No existe un jugador con ese ID o nombre");if(u.uid==U.uid)return toast("Ese eres tú");FN[u.uid]=u.name;FS.fq="";await addFriend(u.uid);const q=$("#fq");if(q)q.value=""}catch(e){toast("No se pudo buscar al jugador")}}});
