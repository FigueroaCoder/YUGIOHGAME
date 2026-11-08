/* Foto de perfil, pantalla completa y login adaptable */
/* ===== foto, pantalla completa, login adaptable ===== */
const setDev=()=>{const h=document.documentElement;h.dataset.dev=(matchMedia("(pointer:coarse)").matches||innerWidth<860)?"mob":"pc";h.dataset.ori=innerWidth>innerHeight?"land":"port"};setDev();addEventListener("resize",setDev);
{const s=document.createElement("style");s.textContent=`
.hm-av img,.hm-av2 img{width:100%;height:100%;border-radius:50%;object-fit:cover}
.sh-ph{width:34px;height:34px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px var(--ac);display:flex;align-items:center;justify-content:center;font:800 17px Rajdhani,sans-serif;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#06122c}
.sh-nm{display:inline!important}.sh-fs{padding:6px 10px;background:#ffffff16;color:#fff;font-size:18px;line-height:1;margin-right:6px}
#app .au{position:relative;background:radial-gradient(900px 520px at 15% 25%,#2a1b7a77,transparent),radial-gradient(700px 500px at 95% 95%,#00e5ff26,transparent)}
#app .au-art img{animation:aflt 6s ease-in-out infinite}#app .au-art img:nth-child(2){animation-delay:-2s}#app .au-art img:nth-child(3){animation-delay:-4s}@keyframes aflt{50%{translate:0 -14px}}
#app .au-box{position:relative;width:min(500px,100%);padding:34px 34px 30px;box-shadow:0 30px 80px #000c,0 0 0 1px #ffffff14 inset;backdrop-filter:blur(10px)}
#app .au-box input{width:100%;box-sizing:border-box;font-size:18px;padding:14px 16px}
#app .au-box button[data-act=auth],#app .au-box button[data-act=cpu]{width:100%;margin-top:12px;padding:15px;font-size:20px}
#app .au-logo b{font-size:clamp(38px,5.2vw,72px)}
.au-feat{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}.au-feat span{font:700 13px Rajdhani,sans-serif;letter-spacing:.06em;text-transform:uppercase;background:#ffffff14;border:1px solid #ffffff22;border-radius:20px;padding:4px 11px}
.au-fs{position:absolute;right:12px;top:12px;padding:6px 10px;background:#ffffff16;color:#fff;font-size:18px;line-height:1;clip-path:none}
html[data-dev=mob] #app .au{grid-template-columns:1fr;gap:6px;padding:max(14px,env(safe-area-inset-top)) 14px max(14px,env(safe-area-inset-bottom));min-height:100svh;align-content:start}
html[data-dev=mob] #app .au-art{display:block;height:170px;margin-top:6px}html[data-dev=mob] #app .au-art img{width:30vw;max-width:130px}
html[data-dev=mob] #app .au-art img:nth-child(1){left:6%;top:24%}html[data-dev=mob] #app .au-art img:nth-child(2){left:34%;top:4%}html[data-dev=mob] #app .au-art img:nth-child(3){left:62%;top:26%}
html[data-dev=mob] #app .au-box{padding:22px 18px 22px}html[data-dev=mob] #app .au-box input{font-size:16px}html[data-dev=mob] #app .au-logo b{font-size:clamp(34px,11vw,52px)}
html[data-dev=mob][data-ori=land] #app .au{grid-template-columns:1fr 1fr;align-content:center}html[data-dev=mob][data-ori=land] #app .au-art{height:200px}
html[data-dev=mob] .sh-nm{display:none!important}
`;document.head.appendChild(s)}
app.addEventListener("change",e=>{if(e.target.id!="phf"||!e.target.files[0])return;const im=new Image(),u=URL.createObjectURL(e.target.files[0]);im.onload=async()=>{const c=document.createElement("canvas"),S=160;c.width=c.height=S;const m=Math.min(im.width,im.height);c.getContext("2d").drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,S,S);URL.revokeObjectURL(u);const d=c.toDataURL("image/jpeg",.85);try{await D("users",U.uid).update({ph:d});U.ph=d;render();toast("Foto actualizada")}catch(_){toast("No se pudo guardar la foto")}};im.onerror=()=>toast("Esa imagen no se pudo leer");im.src=u});
Object.assign(ACT,{phpick(){const i=$("#phf");i&&i.click()},async phdel(){try{await D("users",U.uid).update({ph:""});U.ph="";render();toast("Foto quitada")}catch(_){toast("No se pudo quitar la foto")}},
fs(){const d=document,el=d.documentElement;if(d.fullscreenElement||d.webkitFullscreenElement){(d.exitFullscreen||d.webkitExitFullscreen).call(d);return}const q=el.requestFullscreen||el.webkitRequestFullscreen;if(!q)return toast("Tu navegador no permite pantalla completa. En iPhone usa «Añadir a pantalla de inicio».");Promise.resolve(q.call(el)).then(()=>{try{if(document.documentElement.dataset.dev=="mob"&&app.style.display=="none")screen.orientation.lock("landscape")}catch(_){}}).catch(()=>toast("No se pudo activar la pantalla completa"))}});

/* imagen del recuadro de modo historia (inicio) */
{const s=document.createElement("style");s.textContent=`#app .hm-t.big[data-act=gstory]{background:url(${IMGX["intro/temporada-intro.jpg"]}) center/cover no-repeat,#0b0f30}#app .hm-t[data-act=gstory] .hm-mon{display:none}`;document.head.appendChild(s)}
