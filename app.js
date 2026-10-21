const $=s=>document.querySelector(s);let name='دوست جیووانی',game='',score=0,time=30,timer=null,loop=null,timeout=null,pizzaCountdown=null,pizzaActive=false;
const info={memory:['جفت‌یابی','کارت‌ها رو برگردون و ۶ جفت مشابه پیدا کن.'],target:['هدف‌گیری سریع','هر بار هدف ظاهر شد سریع لمسش کن.'],catch:['Catch & Win','خوراکی‌ها رو بگیر و از زباله‌ها دوری کن؛ چپ و راست صفحه رو لمس کن.'],tap:['سرعت لمس','در ۱۵ ثانیه تا می‌تونی دکمه رو لمس کن.'],pizza:['پازل پیتزا','اول تصویر رو ببین؛ بعد تکه‌ها رو داخل همین صفحه با انگشت جابه‌جا کن تا پیتزا کامل بشه.']};
function show(id){['welcome','menu','game','result'].forEach(x=>$('#'+x).classList.toggle('hidden',x!==id))}
$('#name-form').onsubmit=e=>{e.preventDefault();name=$('#player-name').value.trim().slice(0,24);if(!name)return;$('#hello-name').textContent=name;show('menu')};
document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{game=b.dataset.game;$('#game-title').textContent=info[game][0];$('#instructions').textContent=info[game][1];$('#area').innerHTML='';$('#score').textContent='0';$('#start').classList.remove('hidden');show('game')});
function stop(){clearInterval(timer);clearInterval(loop);clearTimeout(timeout);clearInterval(pizzaCountdown);timer=loop=timeout=pizzaCountdown=null;pizzaActive=false}
$('#back').onclick=()=>{stop();show('menu')};$('#again').onclick=()=>show('menu');$('#start').onclick=start;
function add(n){score=Math.max(0,score+n);$('#score').textContent=score}
function start(){stop();score=0;time=game==='tap'?15:game==='pizza'?33:30;$('#score').textContent=0;$('#time').textContent=time;$('#start').classList.add('hidden');$('#area').innerHTML='';if(game==='pizza'){pizza();return}({memory,target,catch:catchGame,tap}[game])();timer=setInterval(()=>{time--;$('#time').textContent=time;if(time<=0)finish()},1000)}
function finish(){stop();$('#final-score').textContent=score;$('#result-title').textContent='آفرین '+name+'!';$('#result-copy').textContent=(score>=8?'سرعتت عالی بود!':score>=4?'خوبه! یه رکورد قابل احترام زدی.':'گرم‌کردن بود؛ دفعه بعد رکوردتو بهتر کن.')+' ☕';show('result')}
function memory(){let a=['☕','🍕','🍰','🍝','🥤','🍪','☕','🍕','🍰','🍝','🥤','🍪'].sort(()=>Math.random()-.5),first=null,lock=false,found=0,g=document.createElement('div');g.className='memory';a.forEach(v=>{let b=document.createElement('button');b.textContent='؟';b.onclick=()=>{if(lock||b.classList.contains('open')||b.classList.contains('matched'))return;b.textContent=v;b.classList.add('open');if(!first){first={b,v};return}if(first.v===v){first.b.classList.add('matched');b.classList.add('matched');first=null;found++;add(2);if(found===6)finish()}else{lock=true;let old=first;first=null;setTimeout(()=>{old.b.textContent='؟';b.textContent='؟';old.b.classList.remove('open');b.classList.remove('open');lock=false},650)}};g.append(b)});$('#area').append(g)}
function target(){let f=document.createElement('div');f.className='targetfield';$('#area').append(f);function spawn(){if(time<=0)return;f.innerHTML='';let b=document.createElement('button');b.className='target';b.textContent='🎯';b.style.left=Math.random()*78+'%';b.style.top=Math.random()*65+'%';b.onclick=()=>{add(1);spawn()};f.append(b);timeout=setTimeout(spawn,1000)}spawn()}
function tap(){let b=document.createElement('button');b.className='tapzone';b.textContent='بزن! ⚡';b.onclick=()=>{add(1);b.textContent='آفرین! '+score};$('#area').append(b)}
function catchGame(){let f=document.createElement('div');f.className='catchfield';f.innerHTML='<span class="basket" style="left:40%">🧺</span>';$('#area').append(f);let pos=40,basket=f.querySelector('.basket');function move(e){let r=f.getBoundingClientRect();pos=Math.max(0,Math.min(85,(e.clientX-r.left)/r.width*100-7));basket.style.left=pos+'%'}f.onpointerdown=move;f.onpointermove=e=>{if(e.buttons)move(e)};loop=setInterval(()=>{let bad=Math.random()<.23,b=document.createElement('span');b.className='item';b.textContent=bad?'🗑️':['☕','🍕','🍰','🍝','🥤'][Math.floor(Math.random()*5)];b.style.left=Math.random()*88+'%';b.style.top='-4px';f.append(b);let y=-4,x=parseFloat(b.style.left),fall=setInterval(()=>{y+=5;b.style.top=y+'px';if(y>145&&y<190&&x>pos-10&&x<pos+20){add(bad?-2:1);b.remove();clearInterval(fall)}else if(y>210){b.remove();clearInterval(fall)}},70)},550)}
function pizza(){
 const area=$('#area'); area.classList.add('pizza-area');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"><defs><radialGradient id="cr"><stop stop-color="#ffe7a1"/><stop offset=".82" stop-color="#f5bd52"/><stop offset="1" stop-color="#bd6428"/></radialGradient></defs><circle cx="150" cy="150" r="145" fill="#7b4428"/><circle cx="150" cy="150" r="137" fill="#e9a747"/><circle cx="150" cy="150" r="126" fill="url(#cr)" stroke="#ffd980" stroke-width="8"/><circle cx="150" cy="150" r="111" fill="#f7e4a0"/>${Array.from({length:16},(_,i)=>{let a=i*Math.PI/8,x=150+Math.cos(a)*82,y=150+Math.sin(a)*82;return `<circle cx="${x}" cy="${y}" r="${i%3===0?13:9}" fill="${i%2?'#cf3d2c':'#a72d20'}" stroke="#f17a43" stroke-width="3"/>`}).join('')}${Array.from({length:11},(_,i)=>{let a=i*2.399,x=150+Math.cos(a)*((i%3)*25+25),y=150+Math.sin(a)*((i%3)*25+25);return `<ellipse cx="${x}" cy="${y}" rx="8" ry="5" transform="rotate(${i*23} ${x} ${y})" fill="#2c4e27"/>`}).join('')}${Array.from({length:8},(_,i)=>{let x=90+(i*37)%120,y=78+(i*53)%140;return `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" transform="rotate(${i*29} ${x} ${y})" fill="#f3d14c"/>`}).join('')}</svg>`;
 const img='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);let preview=document.createElement('div');preview.className='pizza-preview';preview.style.backgroundImage=`url("${img}")`;preview.innerHTML='<div class="pizza-count">آماده‌ای؟ <strong>3</strong></div>';area.append(preview);$('#instructions').textContent='تصویر رو خوب نگاه کن؛ پازل تا ۳ ثانیه دیگه به‌هم می‌ریزه.';let n=3;$('#time').textContent='3';pizzaCountdown=setInterval(()=>{n--;if(n>0){preview.querySelector('strong').textContent=n;$('#time').textContent=n}else{clearInterval(pizzaCountdown);pizzaCountdown=null;preview.remove();beginPizza(img)}},1000)
}
function beginPizza(img){
 if(game!=='pizza')return;
 pizzaActive=true;time=30;$('#time').textContent='30';
 $('#instructions').textContent='هر تکه رو با انگشت بگیر و روی جای تکه‌ی دیگه رها کن تا جاشون عوض بشه.';
 const area=$('#area');
 area.innerHTML='';
 area.classList.add('pizza-area');
 const board=document.createElement('div');board.className='jigsaw-board';board.setAttribute('aria-label','پازل پیتزا ۹ تکه');
 area.append(board);
 // Each piece keeps its correct source crop. Its grid position is tracked separately.
 const order=Array.from({length:9},(_,i)=>i);
 for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
 if(order.every((v,i)=>v===i)){[order[0],order[1]]=[order[1],order[0]];}
 const pieces=[];
 order.forEach((correct,index)=>{
   const p=document.createElement('button');p.type='button';p.className='jigsaw-piece';
   p.dataset.correct=String(correct);p.dataset.position=String(index);
   p.setAttribute('aria-label',`تکه ${index+1} از ۹`);
   p.style.backgroundImage=`url("${img}")`;
   const col=correct%3,row=Math.floor(correct/3);
   p.style.backgroundPosition=`${col*50}% ${row*50}%`;
   place(p,index);pieces.push(p);board.append(p);
 });
 function place(piece,pos){piece.style.gridColumn=String((pos%3)+1);piece.style.gridRow=String(Math.floor(pos/3)+1);piece.dataset.position=String(pos);}
 function checkSolved(){
   let solved=0;
   pieces.forEach(piece=>{
     const ok=Number(piece.dataset.position)===Number(piece.dataset.correct);
     piece.classList.toggle('piece-correct',ok);if(ok)solved++;
   });
   $('#score').textContent=String(solved);
   score=solved;
   if(solved===9&&pizzaActive){pizzaActive=false;finish();}
 }
 let drag=null;
 board.addEventListener('pointerdown',e=>{
   const p=e.target.closest('.jigsaw-piece');
   if(!p||!pizzaActive||drag)return;
   e.preventDefault();
   const r=p.getBoundingClientRect();
   drag={piece:p,id:e.pointerId,startX:e.clientX,startY:e.clientY,dx:0,dy:0,rect:r};
   p.classList.add('dragging');
   try{p.setPointerCapture(e.pointerId)}catch{}
 });
 board.addEventListener('pointermove',e=>{
   if(!drag||e.pointerId!==drag.id)return;
   drag.dx=e.clientX-drag.startX;drag.dy=e.clientY-drag.startY;
   drag.piece.style.transform=`translate(${drag.dx}px,${drag.dy}px) scale(1.04)`;
 });
 function finishDrag(e){
   if(!drag||e.pointerId!==drag.id)return;
   const moving=drag.piece;moving.style.transform='';moving.classList.remove('dragging');
   // Calculate the destination cell from the board geometry; this works on touch screens
   // and does not rely on elementFromPoint while the dragged tile captures the pointer.
   const r=board.getBoundingClientRect();
   const x=e.clientX-r.left,y=e.clientY-r.top;
   const cellW=r.width/3,cellH=r.height/3;
   let dest=-1;
   if(x>=0&&y>=0&&x<r.width&&y<r.height){dest=Math.floor(y/cellH)*3+Math.floor(x/cellW);}
   if(dest>=0){
     const from=Number(moving.dataset.position);
     const other=pieces.find(piece=>Number(piece.dataset.position)===dest);
     if(other&&other!==moving){place(moving,dest);place(other,from);}
   }
   drag=null;checkSolved();
 }
 board.addEventListener('pointerup',finishDrag);
 board.addEventListener('pointercancel',finishDrag);
 checkSolved();
 timer=setInterval(()=>{if(!pizzaActive)return;time--;$('#time').textContent=String(time);if(time<=0)finish()},1000);
}

// Isolated styles for the puzzle are injected by this script so no separate CSS edit is needed.
(function installPizzaStyles(){
 if(document.getElementById('pizza-puzzle-v4-style'))return;
 const style=document.createElement('style');style.id='pizza-puzzle-v4-style';
 style.textContent=`
 #area.pizza-area{display:block!important;overflow:visible!important;min-height:0!important;padding:0!important}
 #area.pizza-area .pizza-preview{width:min(100%,290px);aspect-ratio:1;margin:8px auto;position:relative;background-size:100% 100%;border-radius:50%;box-shadow:0 8px 24px #0005}
 #area.pizza-area .pizza-count{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:white;font-weight:800;text-shadow:0 2px 6px #000;background:#0003;border-radius:50%;font-size:20px}
 #area.pizza-area .pizza-count strong{font-size:40px}
 #area.pizza-area .jigsaw-board{box-sizing:border-box;width:min(100%,440px);aspect-ratio:1;margin:0 auto;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:3px;background:#e7b96a;padding:4px;border-radius:12px;overflow:hidden;touch-action:none;position:relative}
 #area.pizza-area .jigsaw-piece{box-sizing:border-box;display:block;width:100%;height:100%;min-width:0;min-height:0;background-size:300% 300%!important;background-repeat:no-repeat!important;border:1px solid #f7d99b;border-radius:5px;box-shadow:0 2px 5px #0004;padding:0;margin:0;touch-action:none;cursor:grab;user-select:none;-webkit-user-select:none;position:relative;z-index:1}
 #area.pizza-area .jigsaw-piece.dragging{z-index:10;box-shadow:0 8px 18px #0009;cursor:grabbing}
 #area.pizza-area .jigsaw-piece.piece-correct{border-color:#78c878}
 @media(max-width:420px){#area.pizza-area .jigsaw-board{width:100%;gap:2px;padding:3px}#area.pizza-area .jigsaw-piece{border-radius:4px}}
 `;
 document.head.append(style);
})();
