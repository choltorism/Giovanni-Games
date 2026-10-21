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
 $('#instructions').textContent='هر تکه رو با انگشت بگیر و روی تکه‌ای که باید جاش عوض بشه رها کن تا تصویر کامل بشه.';
 const board=document.createElement('div');board.className='jigsaw-board';
 $('#area').append(board);
 const shuffled=Array.from({length:9},(_,i)=>i);
 // Avoid starting with an already-solved board.
 do{shuffled.sort(()=>Math.random()-.5)}while(shuffled.every((v,i)=>v===i));
 let pieces=[];
 shuffled.forEach((correctIdx,position)=>{
   const p=document.createElement('button');
   p.type='button';p.className='jigsaw-piece';
   p.dataset.correct=String(correctIdx);
   p.setAttribute('aria-label','تکه پازل؛ برای جابه‌جایی بکش');
   p.style.backgroundImage=`url("${img}")`;
   p.style.backgroundPosition=`${(correctIdx%3)*50}% ${Math.floor(correctIdx/3)*50}%`;
   p.style.order=String(position);
   p.addEventListener('pointerdown',e=>{
     if(!pizzaActive)return;
     e.preventDefault();
     const startX=e.clientX,startY=e.clientY;
     p.setPointerCapture(e.pointerId);
     p.classList.add('dragging');
     p.style.pointerEvents='none';
     p.style.transform='scale(1.04)';
     const move=ev=>{p.style.translate=`${ev.clientX-startX}px ${ev.clientY-startY}px`};
     const end=ev=>{
       p.removeEventListener('pointermove',move);
       p.removeEventListener('pointerup',end);
       p.removeEventListener('pointercancel',end);
       p.classList.remove('dragging');
       p.style.pointerEvents='';
       p.style.transform='';
       p.style.translate='';
       const under=document.elementFromPoint(ev.clientX,ev.clientY);
       const other=under&&under.closest?under.closest('.jigsaw-piece'):null;
       if(other&&other!==p&&other.parentElement===board&&pizzaActive){
         const before=pieces.filter(x=>Number(x.style.order)===Number(x.dataset.correct)).length;
         const a=Number(p.style.order),b=Number(other.style.order);
         p.style.order=String(b);other.style.order=String(a);
         const after=pieces.filter(x=>Number(x.style.order)===Number(x.dataset.correct)).length;
         if(after>before)add(after-before);
         pieces.forEach(x=>x.classList.toggle('piece-correct',Number(x.style.order)===Number(x.dataset.correct)));
         if(pieces.every(x=>Number(x.style.order)===Number(x.dataset.correct))){
           pizzaActive=false;finish();
         }
       }
     };
     p.addEventListener('pointermove',move);
     p.addEventListener('pointerup',end);
     p.addEventListener('pointercancel',end);
   });
   pieces.push(p);board.append(p);
 });
 timer=setInterval(()=>{if(!pizzaActive)return;time--;$('#time').textContent=time;if(time<=0)finish()},1000);
}
