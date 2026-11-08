// Fler mattefärdigheter som slumpas fram, anpassade efter årskurs (Lgr22).
// Varje färdighet blir ett eget kort i banken (sparar stjärnor), talen slumpas varje gång.
// f(g) ger [fråga, rätt svar, [fel svar]]. g = årskurs (0 = förskoleklass).
window.KLURR_MG=(function(){
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const P=a=>a[Math.floor(Math.random()*a.length)];
const S=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const F=n=>{const r=Math.round(n*1000)/1000;let s=String(Math.abs(r)).replace('.',',');const[i,d]=s.split(',');s=i.replace(/\B(?=(\d{3})+(?!\d))/g,'\u202F')+(d?','+d:'');return(r<0?'−':'')+s};
const near=(ans,step,u)=>{const o=new Set();const st=step||1;S(Math.abs(ans)>=20||st>1?[1,-1,2,-2,3,-3,10,-10]:[1,-1,2,-2,3,-3]).forEach(k=>{const v=Math.round((ans+k*st)*1000)/1000;if((v>=0||ans<0)&&v!==ans)o.add(v)});return[...o].slice(0,3).map(v=>F(v)+(u||''))};
const NAMN=['Alva','Noah','Elsa','Liam','Maja','Hugo','Ella','Omar','Saga','Leo','Nora','Elias','Wilma','Adam','Selma','Ali'];
const SAK=[['kuber','kuber'],['kort','kort'],['mynt','mynt'],['diamanter','diamanter'],['klistermärken','klistermärken'],['pärlor','pärlor'],['stickers','stickers'],['skins','skins']];
const frac=(a,b)=>a+'/'+b;
const gcd=(a,b)=>b?gcd(b,a%b):a;
// Rensa fel svar: inga dubbletter och aldrig samma som rätt svar
const clean=m=>Object.assign({},m,{f:g=>{const[q,b,d]=m.f(g);const B=String(typeof b==='number'?F(b):b);return[q,typeof b==='number'?F(b):b,[...new Set(d.map(String))].filter(x=>x!==B&&x!==String(b))]}});
return [
// Dubbelt och hälften
{id:'dbl',n:'Dubbelt och hälften',g:[1,4],f:g=>{const M=g<=1?10:g<=2?20:g<=3?50:100;
  if(Math.random()<.5){const a=R(1,M/2+ (g<=1?0:5));return[`Dubbelt så mycket som ${a}`,2*a,near(2*a,P([1,2,10]))]}
  const a=R(1,M/2)*2;return[`Hälften av ${a}`,a/2,near(a/2,P([1,2]))]}},
// Talföljder
{id:'tal',n:'Talföljder',g:[1,7],f:g=>{let st,s0,n=4;
  if(g<=1){st=P([1,2]);s0=R(0,10)}else if(g<=2){st=P([1,2,5,10,-1,-2]);s0=st<0?R(12,30):R(0,40)}
  else if(g<=4){st=P([3,4,5,10,25,-3,-5,-10,100]);s0=st<0?R(60,99):R(0,60)}
  else{if(Math.random()<.3){const b=R(1,3),x=P([2,3]);const a=[b,b*x,b*x*x,b*x*x*x];return[`Vilket tal kommer sen? ${a.join(', ')}, ?`,b*x**4,near(b*x**4,b*x)]}
   st=P([6,7,8,9,12,15,25,-6,-7,-8,0.5,0.25]);s0=st<0?R(60,120):R(0,50)}
  const a=Array.from({length:n},(_,i)=>Math.round((s0+i*st)*100)/100),ans=Math.round((s0+n*st)*100)/100;
  return[`Vilket tal kommer sen? ${a.map(F).join(';  ')};  ?`,ans,near(ans,Math.abs(st)<1?Math.abs(st):1).concat(near(ans,Math.abs(st))).filter((v,i,x)=>x.indexOf(v)===i).slice(0,3)]}},
// Positionssystemet
{id:'pos',n:'Tiotal och ental',g:[1,6],f:g=>{
  if(g<=2){const t=R(1,9),e=R(0,9),n=t*10+e;return P([
    ()=>[`Hur många tiotal finns i ${n}?`,t,near(t).concat([String(e)]).filter(x=>x!==String(t))],
    ()=>[`Vilket tal är ${t} tiotal och ${e} ental?`,n,[String(e*10+t),String(t+e),String(n+10)].filter(x=>x!==String(n))],
    ()=>[`Vad är ${t*10} + ${e}?`,n,near(n,P([1,10]))]])()}
  if(g<=4){const h=R(1,9),t=R(0,9),e=R(0,9),n=h*100+t*10+e;return P([
    ()=>[`Vilken siffra står på tiotalsplatsen i ${n}?`,t,[String(h),String(e),String((t+1)%10)].filter(x=>x!==String(t))],
    ()=>[`Vilket tal är ${h} hundratal, ${t} tiotal och ${e} ental?`,n,[String(e*100+t*10+h),String(h*100+e*10+t),String(n+100)].filter(x=>x!==String(n))],
    ()=>[`Vilket värde har siffran ${h} i ${n}?`,h*100,[String(h),String(h*10),String(h*1000)]]])()}
  return P([
    ()=>{const n=R(10000,99999),d=String(n);return[`Vilken siffra står på tusentalsplatsen i ${F(n)}?`,+d[1],S([d[0],d[2],d[3],d[4]].filter(x=>x!==d[1]))]},
    ()=>{const a=R(1,9),b=R(1,9),n=R(1,9)+a/10+b/100;return[`Vilket värde har siffran ${a} i ${F(n)}?`,`${a} tiondelar`,[`${a} hundradelar`,`${a} ental`,`${a} tiotal`]]},
    ()=>{const n=R(2,9)*1000+R(1,9)*100;return[`Hur många hundratal finns i ${F(n)}?`,n/100,[String(n/1000),String(n/10),String(n/100+10)]]}])()}},
// Störst och minst
{id:'stor',n:'Störst och minst',g:[0,6],f:g=>{let a;
  if(g<=1)a=S([...new Set([R(0,20),R(0,20),R(0,20),R(0,20)])]);
  else if(g<=3){const t=R(1,9);a=[t*10+R(0,9),R(0,9)*10+t,t*10+R(0,9)+(R(0,1)?10:-10)].filter(x=>x>=0)}
  else if(g<=4)a=[R(100,999),R(100,999),R(1000,9999)].map(x=>x);
  else{const i=R(0,5),x=R(2,9),y=R(1,9);a=[i+x/10,i+(x-1)/10+y/100,i+x/100+y/1000].map(v=>Math.round(v*1000)/1000)}
  a=[...new Set(a)];if(a.length<3)a=[...new Set(a.concat([R(0,30),R(31,60)]))].slice(0,3);
  const big=Math.random()<.6,ans=big?Math.max(...a):Math.min(...a);
  return[`Vilket tal är ${big?'störst':'minst'}: ${a.map(F).join(';  ')}?`,ans,a.filter(x=>x!==ans).map(F)]}},
// Udda eller jämnt
{id:'udda',n:'Udda och jämnt',g:[1,4],f:g=>{const n=g<=2?R(1,50):R(51,999);return[`Är ${n} udda eller jämnt?`,n%2?'udda':'jämnt',[n%2?'jämnt':'udda']]}},
// Större än, mindre än
{id:'jmf',n:'Större eller mindre',g:[1,5],f:g=>{const M=g<=2?100:g<=3?1000:10000;let a=R(0,M),b=R(0,M);
  if(Math.random()<.3){const t=String(a);b=+(t.split('').reverse().join(''))||a}if(Math.random()<.12)b=a;
  const s=a>b?'>':a<b?'<':'=';return[`Vilket tecken passar? ${F(a)}  ?  ${F(b)}`,s,['<','>','='].filter(x=>x!==s)]}},
// Saknat tal
{id:'saknas',n:'Vilket tal saknas?',g:[1,6],f:g=>{
  if(g<=2){const a=R(1,10),x=R(1,10);return P([()=>[`${a} + ? = ${a+x}`,x,near(x)],()=>[`? − ${a} = ${x}`,a+x,near(a+x)]])()}
  if(g<=3){const a=R(10,60),x=R(5,39);return P([()=>[`${a} + ? = ${a+x}`,x,near(x,P([1,10]))],()=>{const b=P([2,3,4,5,10]),q=R(2,10);return[`${b} · ? = ${b*q}`,q,near(q)]}])()}
  const b=R(3,9),q=R(3,12),a=R(100,500),x=R(25,250);
  return P([()=>[`${b} · ? = ${b*q}`,q,near(q)],()=>[`? / ${b} = ${q}`,b*q,near(b*q,b)],()=>[`${a} − ? = ${a-x}`,x,near(x,P([1,10]))]])()}},
// Klockan
{id:'klo',n:'Klockan',g:[1,6],f:g=>{
  const pad=n=>String(n).padStart(2,'0');
  if(g<=2){const h=R(1,11),hel=Math.random()<.5;
    if(hel)return[`Klockan är ${h}. Hur skrivs det digitalt?`,`${h}:00`,[`${h}:30`,`${h+1}:00`,`${h}:10`]];
    return[`Klockan är halv ${h+1}. Hur skrivs det digitalt?`,`${h}:30`,[`${h+1}:30`,`${h+1}:00`,`${h}:00`]]}
  if(g<=3){const h=R(1,11),k=P(['kvart över','kvart i','halv']);
    if(k==='kvart över')return[`Klockan är kvart över ${h}. Hur skrivs det digitalt?`,`${h}:15`,[`${h}:45`,`${h-1||12}:45`,`${h}:30`]];
    if(k==='kvart i')return[`Klockan är kvart i ${h+1}. Hur skrivs det digitalt?`,`${h}:45`,[`${h+1}:45`,`${h+1}:15`,`${h}:15`]];
    return[`Klockan är halv ${h+1}. Hur skrivs det digitalt?`,`${h}:30`,[`${h+1}:30`,`${h}:00`,`${h+1}:00`]]}
  return P([
    ()=>{const h=R(8,20),m=R(0,11)*5,d=P([20,25,35,40,45,50,75,90,105]);const t=h*60+m+d;return[`Det börjar ${pad(h)}:${pad(m)} och håller på i ${d} minuter. När är det slut?`,`${pad(Math.floor(t/60))}:${pad(t%60)}`,[d+10,d-10,d+60].map(x=>{const y=h*60+m+x;return`${pad(Math.floor(y/60))}:${pad(y%60)}`})]},
    ()=>{const h=R(7,19),m=R(0,11)*5,d=R(3,15)*5;const t=h*60+m+d;return[`Hur många minuter är det mellan ${pad(h)}:${pad(m)} och ${pad(Math.floor(t/60))}:${pad(t%60)}?`,d,near(d,5)]},
    ()=>{const x=P([1.5,2,2.5,0.75,1.25,3]);return[`Hur många minuter är ${F(x)} timmar?`,x*60,near(x*60,15)]},
    ()=>{const h=R(13,23);return[`Klockan är ${h}:00. Vad visar en vanlig visarklocka?`,`${h-12}`,[String(h-10),String(h-2),String(24-h)].filter(x=>x!==String(h-12))]}])()}},
// Pengar
{id:'peng',n:'Pengar',g:[1,6],f:g=>{
  if(g<=2){const har=P([10,20,50]),pris=R(2,har-1);return[`Du har ${har} kr och köper något för ${pris} kr. Hur mycket får du tillbaka?`,har-pris,near(har-pris)]}
  if(g<=4){const a=R(12,95),b=R(5,60);return P([()=>[`Glass kostar ${a} kr och läsk ${b} kr. Vad kostar båda?`,a+b,near(a+b,P([1,10]))],
    ()=>{const har=P([100,200,500]),p=R(23,har-5);return[`Du betalar med en ${har}-lapp för något som kostar ${p} kr. Hur mycket får du tillbaka?`,har-p,near(har-p,P([1,10]))]}])()}
  return P([()=>{const p=R(3,12)*10,n=R(3,8);return[`Ett spel kostar ${p} kr. Vad kostar ${n} stycken?`,p*n,near(p*n,p)]},
    ()=>{const p=P([200,300,400,500,600,800]),r=P([10,25,50]);return[`En tröja kostar ${p} kr. Den är ${r} % billigare på rea. Vad kostar den nu?`,p*(100-r)/100,[String(p-r),String(p*r/100),String(p*(100-r)/100+10)]]},
    ()=>{const v=R(2,6)*5,w=R(3,10);return[`Du sparar ${v} kr i veckan. Hur mycket har du efter ${w} veckor?`,v*w,near(v*w,v)]}])()}},
// Lästal (ord + räknesätt)
{id:'txt',n:'Lästal',g:[1,6],f:g=>{const a=P(NAMN),b=P(NAMN.filter(x=>x!==a)),s=P(SAK)[0];
  if(g<=1){const x=R(2,6),y=R(1,4);return P([()=>[`${a} har ${x} ${s} och får ${y} till. Hur många har ${a} nu?`,x+y,near(x+y)],()=>[`${a} har ${x+y} ${s} och ger bort ${y}. Hur många är kvar?`,x,near(x)]])()}
  if(g<=2){const x=R(5,15),y=R(2,9);return P([
    ()=>[`${a} har ${x} ${s}. ${b} har ${y} fler. Hur många har ${b}?`,x+y,near(x+y)],
    ()=>[`${a} har ${x+y} ${s} och ${b} har ${x}. Hur många fler har ${a}?`,y,near(y)],
    ()=>{const n=R(2,5),k=P([2,5,10]);return[`${n} kompisar har ${k} ${s} var. Hur många är det sammanlagt?`,n*k,near(n*k,k).concat([String(n+k)])]},
    ()=>{const n=P([2,3,4,5]),k=R(2,5);return[`${n*k} ${s} delas lika mellan ${n} kompisar. Hur många får var och en?`,k,near(k)]}])()}
  if(g<=4){const x=R(20,80),y=R(11,49);return P([
    ()=>[`${a} har ${x} ${s}. ${b} har ${y} färre. Hur många har ${b}?`,x-y,near(x-y,P([1,10]))],
    ()=>{const n=R(3,9),k=R(3,9);return[`${a} får ${k} ${s} varje dag i ${n} dagar. Hur många blir det?`,n*k,near(n*k,k)]},
    ()=>{const n=R(3,8),k=R(3,9);return[`${n*k} ${s} delas lika i ${n} grupper. Hur många i varje grupp?`,k,near(k)]},
    ()=>{const k=R(3,9),m=R(2,4);return[`${a} har ${k} ${s}. ${b} har ${m} gånger så många. Hur många har ${b}?`,k*m,near(k*m,k)]}])()}
  return P([
    ()=>{const n=R(4,9),k=R(12,45);return[`${a} får ${k} ${s} per runda och spelar ${n} rundor. Hur många blir det?`,n*k,near(n*k,10)]},
    ()=>{const n=R(3,8),k=R(12,40);return[`${n*k} ${s} delas lika mellan ${n} spelare. Hur många får var och en?`,k,near(k)]},
    ()=>{const x=R(150,600),y=R(60,140),z=R(20,90);return[`${a} har ${x} ${s}, köper för ${y} och vinner ${z}. Hur många har ${a} nu?`,x-y+z,near(x-y+z,10)]},
    ()=>{const t=R(4,12)*4;return[`${a} har ${t} ${s}. En fjärdedel ges till ${b}. Hur många får ${b}?`,t/4,near(t/4).concat([String(t/2)])]}])()}},
// Bråk
{id:'brak',n:'Bråk',g:[3,7],f:g=>{
  if(g<=3)return P([()=>{const n=P([2,3,4]),t=n*R(2,5);return[`Hur mycket är 1/${n} av ${t}?`,t/n,near(t/n)]},
    ()=>{const n=P([2,4,8]);return[`Hur många ${n}-delar är en hel?`,n,near(n)]}])();
  return P([
    ()=>{const n=P([3,4,5,6,8,10]),k=R(1,n-1),t=n*R(2,9);return[`Hur mycket är ${frac(k,n)} av ${t}?`,k*t/n,near(k*t/n,t/n)]},
    ()=>{const n=P([5,6,7,8,9,10,12]),a=R(1,n-2),b=R(1,n-1-a);return[`${frac(a,n)} + ${frac(b,n)}`,frac(a+b,n),[frac(a+b,n+n),frac(a+b+1,n),frac(a*b,n)]]},
    ()=>{const n=P([5,6,8,10]),a=R(3,n-1),b=R(1,a-1);return[`${frac(a,n)} − ${frac(b,n)}`,frac(a-b,n),[frac(a-b,0||n+n),frac(a+b,n),frac(a-b+1,n)]]},
    ()=>{const k=P([2,3,4,5]),[a,b]=P([[1,2],[1,3],[2,3],[1,4],[3,4],[2,5]]);return[`Vilket bråk är lika mycket som ${frac(a,b)}?`,frac(a*k,b*k),[frac(a*k,b*k+1),frac(a+k,b+k),frac(b*k,a*k)]]},
    ()=>{const z=S([[1,2],[1,3],[1,4],[1,5],[1,8],[3,4],[2,3]]).slice(0,3),v=z.map(([a,b])=>a/b),i=v.indexOf(Math.max(...v));return[`Vilket bråk är störst: ${z.map(x=>frac(...x)).join(', ')}?`,frac(...z[i]),z.filter((_,j)=>j!==i).map(x=>frac(...x))]},
    ()=>{const [a,b,d]=P([[1,2,'0,5'],[1,4,'0,25'],[3,4,'0,75'],[1,5,'0,2'],[2,5,'0,4'],[1,10,'0,1'],[7,10,'0,7'],[3,10,'0,3']]);return[`Skriv ${frac(a,b)} som decimaltal`,d,S(['0,5','0,25','0,75','0,2','0,4','0,1','0,7','0,3',`${a},${b}`].filter(x=>x!==d)).slice(0,3)]}])()}},
// Decimaltal
{id:'dec',n:'Decimaltal',g:[4,7],f:g=>P([
  ()=>{const a=R(1,9)/10,b=R(1,99)/100;return[`${F(a)} + ${F(b)}`,a+b,near(a+b,.1).concat([F(Math.round((a*10+b*100))/100)]).slice(0,3)]},
  ()=>{const a=R(20,99)/10,b=R(1,19)/10;return[`${F(a)} − ${F(b)}`,a-b,near(a-b,.1)]},
  ()=>{const a=R(11,999)/100,k=P([10,100]);return[`${F(a)} · ${k}`,a*k,[F(a*k/10),F(a*k*10),F(a+k)]]},
  ()=>{const a=R(1,999),k=P([10,100]);return[`${F(a)} / ${k}`,a/k,[F(a/k*10),F(a/k/10),F(a-k)].filter(x=>x!==F(a/k))]},
  ()=>{const a=R(2,9)/10,k=R(2,9);return[`${F(a)} · ${k}`,a*k,near(a*k,.1).concat([F(a*k*10)]).slice(0,3)]}])()},
// Avrundning
{id:'avr',n:'Avrundning',g:[3,7],f:g=>{
  if(g<=4){const n=R(11,989);return P([()=>{const r=Math.round(n/10)*10;return[`Avrunda ${n} till tiotal`,r,near(r,10)]},()=>{const r=Math.round(n/100)*100;return[`Avrunda ${n} till hundratal`,r,near(r,100)]}])()}
  return P([()=>{const n=R(1000,99999),r=Math.round(n/1000)*1000;return[`Avrunda ${F(n)} till tusental`,r,near(r,1000)]},
    ()=>{const n=R(10,999)/100,r=Math.round(n);return[`Avrunda ${F(n)} till heltal`,r,near(r)]},
    ()=>{const n=R(100,9999)/1000,r=Math.round(n*10)/10;return[`Avrunda ${F(n)} till en decimal`,r,near(r,.1)]}])()}},
// Enheter
{id:'enh',n:'Enheter',g:[3,7],f:g=>{
  const L=g<=3?[['m','cm',100],['dm','cm',10],['cm','mm',10],['kg','g',1000],['l','dl',10]]:[['m','cm',100],['km','m',1000],['cm','mm',10],['kg','g',1000],['l','dl',10],['l','ml',1000],['dl','cl',10],['ton','kg',1000],['h','min',60]];
  const [a,b,k]=P(L);
  if(Math.random()<.5||g<=3){const x=g<=3?R(1,9):P([R(1,9),R(2,19)/2,R(1,9)/10+R(1,9)]);const v=Math.round(x*k*1000)/1000;return[`${F(x)} ${a} = ? ${b}`,v,[F(v*10),F(v/10),F(x)].filter(z=>z!==F(v))]}
  const v=R(2,40)*(k/10||1)*P([1,5]),x=v/k;return[`${F(v)} ${b} = ? ${a}`,x,[F(x*10),F(x/10),F(x*100)].filter(z=>z!==F(x))]}},
// Procent
{id:'proc',n:'Procent',g:[5,9],f:g=>P([
  ()=>{const p=P([10,20,25,50,75]),t=P([20,40,60,80,100,120,200,400]);return[`${p} % av ${t}`,p*t/100,near(p*t/100,P([5,10]))]},
  ()=>{const [a,b,p]=P([[1,2,50],[1,4,25],[3,4,75],[1,10,10],[1,5,20]]);return[`Hur många procent är ${frac(a,b)}?`,p+' %',[p+5+' %',`${a*10} %`,`${b} %`].filter(x=>x!==p+' %')]},
  ()=>{const t=P([20,25,50]),a=R(1,t-1);const p=a*100/t;return[`${a} av ${t} är hur många procent?`,F(p)+' %',[F(a)+' %',F(p*2)+' %',F(100-p)+' %'].filter(x=>x!==F(p)+' %')]}])()},
// Ekvationer
{id:'ekv',n:'Ekvationer',g:[4,9],f:g=>{const x=R(2,15);return P([
  ()=>{const a=R(3,40);return[`x + ${a} = ${x+a}. Vad är x?`,x,near(x)]},
  ()=>{const a=R(2,9);return[`${a}x = ${a*x}. Vad är x?`,x,near(x)]},
  ()=>{const a=R(2,20);return[`x − ${a} = ${x}. Vad är x?`,x+a,near(x+a)]},
  ()=>{const a=R(2,6);return[`x / ${a} = ${x}. Vad är x?`,x*a,near(x*a,a)]},
  ()=>{if(g<6)return[`2x = ${2*x}. Vad är x?`,x,near(x)];const a=R(2,5),b=R(1,9);return[`${a}x + ${b} = ${a*x+b}. Vad är x?`,x,near(x)]}])()}},
// Medelvärde, median, typvärde
{id:'med',n:'Medelvärde',g:[4,9],f:g=>{const n=P([3,4,5]),m=R(3,12);let a=Array.from({length:n},()=>R(m-4,m+4));const s=a.reduce((x,y)=>x+y,0);a[n-1]+=m*n-s;if(a[n-1]<0)a[n-1]=0;
  const mean=a.reduce((x,y)=>x+y,0)/n,b=a.slice().sort((x,y)=>x-y);
  if(g>=5&&Math.random()<.35&&n%2===1){const md=b[(n-1)/2];return[`Medianen av ${a.join(', ')}`,md,near(md)]}
  if(g>=5&&Math.random()<.25){const t=R(1,9),r=S([t,t,t===9?1:t+1,t===1?9:t-1,R(10,15)]);return[`Typvärdet av ${r.join(', ')}`,t,[...new Set(r.filter(x=>x!==t))].map(String).slice(0,3)]}
  return[`Medelvärdet av ${a.join(', ')}`,F(mean),near(mean)]}},
// Negativa tal
{id:'neg',n:'Negativa tal',g:[5,9],f:g=>P([
  ()=>{const t=-R(1,9),d=R(2,12);return[`Det är ${F(t)} °C och blir ${d} grader varmare. Hur varmt blir det?`,F(t+d)+' °C',[F(t-d)+' °C',F(d-t)+' °C',F(t+d+1)+' °C'].filter(x=>x!==F(t+d)+' °C')]},
  ()=>{const t=R(1,6),d=R(t+1,t+10);return[`Det är ${t} °C och blir ${d} grader kallare. Hur kallt blir det?`,F(t-d)+' °C',[F(d-t)+' °C',F(t+d)+' °C',F(t-d+1)+' °C'].filter(x=>x!==F(t-d)+' °C')]},
  ()=>{const a=R(-9,5),b=R(2,12);return[`${F(a)} − ${b}`,a-b,near(a-b)]},
  ()=>{const a=-R(2,15),b=R(2,15);return[`${F(a)} + ${b}`,a+b,near(a+b)]}])()},
// Sannolikhet
{id:'sann',n:'Sannolikhet',g:[5,9],f:g=>P([
  ()=>{const r=R(1,6),b=R(1,6),t=r+b;return[`En påse har ${r} röda och ${b} blå kulor. Vad är chansen att ta en röd?`,frac(r,t),[frac(b,t),frac(r,b),frac(1,t)].filter(x=>x!==frac(r,t))]},
  ()=>P([['Chansen att slå en sexa med en tärning','1/6',['1/2','6/6','1/3']],['Chansen att slå ett jämnt tal med en tärning','1/2','1/6 1/3 2/6'.split(' ')],['Chansen att få krona när man singlar slant','1/2',['1/3','1/4','2/2']],['Chansen att slå mer än 4 med en tärning','2/6',['4/6','1/6','3/6']]])]
  )()},
// Mer geometri
{id:'geo2',n:'Former och mått',g:[1,7],f:g=>{
  if(g<=3)return P([
    ()=>{const f=P([['en kvadrat',4],['en triangel',3],['en sexhörning',6],['en femhörning',5],['en rektangel',4],['en åttahörning',8]]);return[`Hur många sidor har ${f[0]}?`,f[1],near(f[1])]},
    ()=>{const f=P([['en kub',8],['en pyramid med fyrkantig botten',5],['ett rätblock',8]]);return[`Hur många hörn har ${f[0]}?`,f[1],near(f[1])]},
    ()=>{const a=R(2,9),b=R(2,9),c=R(2,9);return[`En triangel har sidorna ${a} cm, ${b} cm och ${c} cm. Hur lång är omkretsen?`,a+b+c+' cm',near(a+b+c).map(x=>x+' cm')]},
    ()=>{const a=R(5,40),t=P(['En penna','En pinne','En linjal','En sax']);return[`${t} är ${a} cm. Hur långt blir det med två i rad?`,2*a+' cm',near(2*a).map(x=>x+' cm')]}])();
  return P([
    ()=>{const s=R(2,12);return[`Arean av en kvadrat med sidan ${s} cm`,s*s+' cm²',[4*s+' cm²',2*s+' cm²',s*s+s+' cm²']]},
    ()=>{const a=R(2,10),b=R(2,10);return[`En rektangel har omkretsen ${2*(a+b)} cm. Ena sidan är ${a} cm. Hur lång är den andra?`,b+' cm',near(b).map(x=>x+' cm')]},
    ()=>{const v=R(2,17)*10;return[`En vinkel är ${v}°. Hur många grader fattas till ett halvt varv (180°)?`,180-v+'°',near(180-v,10).map(x=>x+'°')]},
    ()=>{const a=R(2,9),b=R(2,9);return[`Arean av en rektangel som är ${a} m × ${b} m`,a*b+' m²',[2*(a+b)+' m²',a+b+' m²',a*b+1+' m²']]},
    ()=>{const r=R(2,15);return[`En cirkel har radien ${r} cm. Hur lång är diametern?`,2*r+' cm',[r+' cm',r*r+' cm',2*r+2+' cm']]},
    ()=>{const a=R(2,5),b=R(2,5),c=R(2,4);return[`Hur många kubikcentimeter (cm³) är ett rätblock som är ${a} × ${b} × ${c} cm?`,a*b*c+' cm³',[a+b+c+' cm³',a*b+c+' cm³',a*b*c+a+' cm³']]}])()}}
].map(clean);
})();
