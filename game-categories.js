/* Categorías de cartas (niveles, comodines, etc.) */
/* ---- categorías ---- */
function autoCat(id,a,d){const q=QM[id]||0;if(q>1)return"cpe";if(q)return"cp";if(d==0)return a>3500?"cs":a>2500?"ce":"c0";const m=Math.max(a,d),L=[1000,1500,2000,2400,3000,3500,4000,4500,5000],i=L.findIndex(x=>m<=x);return"n"+(i<0?10:i+1)}
var ULT={};const catKey=id=>{if(ULT[id])return"cu";const e=CARDS[id];return e&&CATS[e.cat]?e.cat:autoCat(id,CB[id][2],CB[id][3])};
const catLabel=id=>{if(!CB[id])return"";const k=catKey(id);return CATS[k]?CATS[k].n:(BC.find(b=>b[0]==k)||[0,""])[1]};
