/* Configuración de Firebase, constantes, hash y utilidades de datos */
/* ========= ONLINE · CUENTAS · ADMIN ========= */
const FBC={apiKey:"AIzaSyB-00iyvqPrqkJsmaF8clk8nGyia2_UMJQ",authDomain:"halloween-9c9c6.firebaseapp.com",projectId:"halloween-9c9c6",storageBucket:"halloween-9c9c6.firebasestorage.app",messagingSenderId:"901123628821",appId:"1:901123628821:web:d51111650e5897a85d131c",measurementId:"G-RXHV0EPFLP"};
const ADMIN_NK="roberto figueroa",QM={"309": 1, "320": 1, "557": 2,"601": 1,"623": 2,"630": 2,"632": 2,"691": 2,"692": 2};
const BC=[...Array(10)].map((_,i)=>["n"+(i+1),"Nivel "+(i+1)]).concat([["c0","Comodín"],["ce","Comodín élite"],["cs","Comodín supremo"],["cp","Comodín de poder"],["cpe","Comodín de poder élite"],["magia","Magia"],["trampa","Trampa"],["cu","Ultra especiales"]]);
let db=null,FV=null,U=null,SO=0,CARDS={},CATS={},PR=[],INC=[],OUT=null,VW="auth",AU={tab:"login",err:"",busy:0},ADM={cat:"n1",q:""},PF={err:""},UN=[],UT=[],NU=[],CH={list:[],cur:null,msgs:[],mk:null,add:null,adm:null,first:1,ms:null},WANT={d:null,loading:0,tops:[]};
const ON={on:0,role:null,mid:null,q:[],seq:0,pumping:0,subs:[],bt:null,opp:"",oppId:"",lastSeen:0,oppBeat:null};
const CB={};C.forEach(c=>CB[c[0]]=c);
try{firebase.initializeApp(FBC);db=firebase.firestore();try{db.settings({experimentalAutoDetectLongPolling:true,merge:true})}catch(e){}FV=firebase.firestore.FieldValue}catch(e){db=null}
const K=n=>"duelo_"+n,Co=n=>db.collection(K(n)),D=(n,id)=>Co(n).doc(String(id)),nowS=()=>Date.now()+SO;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const nkey=s=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/\s+/g," ").trim();
function sha256(ascii){function rr(v,a){return(v>>>a)|(v<<(32-a))}var mp=Math.pow,mw=mp(2,32),res="",i,j,words=[],bl=ascii.length*8,hash=sha256.h=sha256.h||[],k=sha256.k=sha256.k||[],pc=k.length,ic={};
for(var cd=2;pc<64;cd++){if(!ic[cd]){for(i=0;i<313;i+=cd)ic[i]=cd;hash[pc]=(mp(cd,.5)*mw)|0;k[pc++]=(mp(cd,1/3)*mw)|0}}
ascii+="\x80";while(ascii.length%64-56)ascii+="\x00";
for(i=0;i<ascii.length;i++){j=ascii.charCodeAt(i);words[i>>2]|=j<<((3-i)%4)*8}
words[words.length]=((bl/mw)|0);words[words.length]=bl;
for(j=0;j<words.length;){var w=words.slice(j,j+=16),oh=hash;hash=hash.slice(0,8);
for(i=0;i<64;i++){var w15=w[i-15],w2=w[i-2],a=hash[0],e=hash[4];
var t1=hash[7]+(rr(e,6)^rr(e,11)^rr(e,25))+((e&hash[5])^((~e)&hash[6]))+k[i]+(w[i]=(i<16)?w[i]:(w[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+w[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10)))|0);
var t2=(rr(a,2)^rr(a,13)^rr(a,22))+((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
hash=[(t1+t2)|0].concat(hash);hash[4]=(hash[4]+t1)|0}
for(i=0;i<8;i++)hash[i]=(hash[i]+oh[i])|0}
for(i=0;i<8;i++)for(j=3;j+1;j--){var b=(hash[i]>>(j*8))&255;res+=((b<16)?0:"")+b.toString(16)}return res}
const hx=s=>sha256(unescape(encodeURIComponent(s)));
const rid=(n,al="ABCDEFGHJKLMNPQRSTUVWXYZ23456789")=>{const a=new Uint32Array(n);crypto.getRandomValues(a);return[...a].map(x=>al[x%al.length]).join("")};
