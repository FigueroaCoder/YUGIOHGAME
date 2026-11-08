/* Ajuste del tablero a la pantalla (escala, giro en vertical, notch de iPhone) */
const fitPr=document.createElement("div");fitPr.style.cssText="position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;padding:env(safe-area-inset-top,0px) env(safe-area-inset-right,0px) env(safe-area-inset-bottom,0px) env(safe-area-inset-left,0px)";document.body.appendChild(fitPr);
function fit(){const cs=getComputedStyle(fitPr),t=parseFloat(cs.paddingTop)||0,r=parseFloat(cs.paddingRight)||0,b=parseFloat(cs.paddingBottom)||0,l=parseFloat(cs.paddingLeft)||0,iw=innerWidth,ih=innerHeight,W=Math.max(100,iw-l-r),H=Math.max(100,ih-t-b),vp=$("#vp"),por=ih>iw&&matchMedia("(pointer:coarse)").matches;
vp.style.left=l+"px";vp.style.top=t+"px";vp.style.width=W+"px";vp.style.height=H+"px";
st.style.setProperty("--s",por?Math.min(W/720,H/1280):Math.min(W/1280,H/720));st.style.setProperty("--r",por?"90deg":"0deg");$("#rot").style.display=(ih>iw&&!por)?"block":"none"}
addEventListener("resize",fit);addEventListener("orientationchange",()=>{fit();setTimeout(fit,150);setTimeout(fit,500)});if(window.visualViewport)visualViewport.addEventListener("resize",fit);fit();setTimeout(fit,300);
["gesturestart","gesturechange","gestureend"].forEach(e=>document.addEventListener(e,ev=>ev.preventDefault(),{passive:false}));
