/* Catálogo de cartas en la base de datos */
/* ---- catálogo de cartas en la base de datos ---- */
async function syncCards(){try{const cs=await Co("categories").get(),have=new Set(cs.docs.map(d=>d.id)),cd=await Co("cards").get(),ex={};cd.docs.forEach(d=>ex[d.id]=d.data());
const ops=[];BC.forEach(([k,nm],i)=>{if(!have.has(k))ops.push([D("categories",k),{n:nm,o:i,b:1}])});
const valid=new Set([...have,...BC.map(b=>b[0])]);C.forEach(([id,nm,a,d])=>{const e=ex[id];if(!e||!valid.has(e.cat))ops.push([D("cards",id),{id,n:nm,a,d,cat:autoCat(id,a,d)}])});
for(let i=0;i<ops.length;i+=400){const b=db.batch();ops.slice(i,i+400).forEach(([r,v])=>b.set(r,v,{merge:true}));await b.commit()}}catch(e){}}
