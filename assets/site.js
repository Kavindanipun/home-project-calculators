
(()=>{'use strict';
const $=s=>document.querySelector(s); const $$=s=>[...document.querySelectorAll(s)];
const n=(id,d=0)=>{const e=$(id);const v=e?parseFloat(e.value):NaN;return Number.isFinite(v)?v:d};
const fmt=(v,d=2)=>Number(v||0).toLocaleString('en-US',{maximumFractionDigits:d,minimumFractionDigits:d});
const money=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(v||0);
function set(id,v){const e=$(id);if(e)e.textContent=v}
function bind(ids,fn){ids.forEach(id=>{const e=$(id);if(e){e.addEventListener('input',fn);e.addEventListener('change',fn)}});fn()}
function concreteSlab(){
 const ids=['#cs-length','#cs-width','#cs-thickness','#cs-waste','#cs-price'];
 bind(ids,()=>{const l=n('#cs-length'),w=n('#cs-width'),t=n('#cs-thickness')/12,waste=Math.max(0,n('#cs-waste',10));const ft3=l*w*t;const total=ft3*(1+waste/100),yd3=total/27,m3=total/35.3146667;set('#cs-main',fmt(yd3)+' yd³');set('#cs-ft3',fmt(total,1));set('#cs-m3',fmt(m3,3));set('#cs-raw',fmt(ft3/27));set('#cs-80',Math.ceil(total/.60));set('#cs-60',Math.ceil(total/.45));set('#cs-40',Math.ceil(total/.30));const p=n('#cs-price');set('#cs-cost',p?money(yd3*p):'Add a price');});
}
function concreteBag(){
 const ids=['#cb-length','#cb-width','#cb-thickness','#cb-waste','#cb-bag','#cb-price']; const yields={40:.30,60:.45,80:.60};
 bind(ids,()=>{const ft3=n('#cb-length')*n('#cb-width')*(n('#cb-thickness')/12)*(1+Math.max(0,n('#cb-waste',10))/100);const size=parseInt($('#cb-bag')?.value||80),count=ft3>0?Math.ceil(ft3/yields[size]):0;set('#cb-main',count+' bags');set('#cb-ft3',fmt(ft3,1));set('#cb-yd3',fmt(ft3/27));set('#cb-yield',fmt(yields[size],3)+' ft³');set('#cb-size',size+' lb');const p=n('#cb-price');set('#cb-cost',p?money(count*p):'Add a price');});
}
function drywall(){
 const ids=['#dw-length','#dw-width','#dw-height','#dw-doors','#dw-windows','#dw-doorarea','#dw-windowarea','#dw-sheet','#dw-waste','#dw-ceiling'];
 bind(ids,()=>{const l=n('#dw-length'),w=n('#dw-width'),h=n('#dw-height');let area=2*(l+w)*h;if($('#dw-ceiling')?.checked)area+=l*w;area-=n('#dw-doors')*n('#dw-doorarea',21);area-=n('#dw-windows')*n('#dw-windowarea',15);area=Math.max(0,area);const waste=Math.max(0,n('#dw-waste',10));const adjusted=area*(1+waste/100);const parts=($('#dw-sheet')?.value||'4x8').split('x').map(Number),sheetArea=parts[0]*parts[1],sheets=adjusted>0?Math.ceil(adjusted/sheetArea):0;set('#dw-main',sheets+' sheets');set('#dw-area',fmt(area,0)+' ft²');set('#dw-adjusted',fmt(adjusted,0)+' ft²');set('#dw-sheetarea',sheetArea+' ft²');});
}
function fence(){
 const ids=['#fn-length','#fn-spacing','#fn-picket','#fn-gap','#fn-rails','#fn-gates','#fn-gatewidth','#fn-waste'];
 bind(ids,()=>{const L=n('#fn-length'),spacing=Math.max(.5,n('#fn-spacing',8)),gates=Math.max(0,Math.round(n('#fn-gates'))),gw=n('#fn-gatewidth',4);const net=Math.max(0,L-gates*gw),posts=L>0?Math.ceil(L/spacing)+1+gates:0;const rails=Math.ceil(net/spacing)*Math.max(1,Math.round(n('#fn-rails',2)));const pw=Math.max(.1,n('#fn-picket',5.5))/12,gap=Math.max(0,n('#fn-gap',.25))/12,waste=Math.max(0,n('#fn-waste',10));const pickets=net>0?Math.ceil(net/(pw+gap)*(1+waste/100)):0;set('#fn-main',posts+' posts');set('#fn-railsout',rails);set('#fn-pickets',pickets);set('#fn-net',fmt(net,1)+' ft');set('#fn-sections',Math.ceil(net/spacing));});
}
function gravel(){
 const ids=['#gr-length','#gr-width','#gr-depth','#gr-waste','#gr-density','#gr-price'];
 bind(ids,()=>{const ft3=n('#gr-length')*n('#gr-width')*(n('#gr-depth')/12);const yd3=ft3/27*(1+Math.max(0,n('#gr-waste',10))/100),density=Math.max(.1,n('#gr-density',1.4)),tons=yd3*density;set('#gr-main',fmt(yd3)+' yd³');set('#gr-tons',fmt(tons,2)+' tons');set('#gr-ft3',fmt(yd3*27,1)+' ft³');set('#gr-depthout',fmt(n('#gr-depth'),1)+' in');const p=n('#gr-price');set('#gr-cost',p?money(tons*p):'Add a price');});
}
const type=document.body.dataset.calculator;({concreteSlab,concreteBag,drywall,fence,gravel}[type]||(()=>{}))();
$$('[data-copy-results]').forEach(btn=>btn.addEventListener('click',async()=>{const box=btn.closest('.panel.result');try{await navigator.clipboard.writeText(box.innerText);btn.textContent='Copied';setTimeout(()=>btn.textContent='Copy results',1500)}catch(e){}}));
$$('[data-print]').forEach(btn=>btn.addEventListener('click',()=>window.print()));
})();
