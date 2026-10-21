const $=s=>document.querySelector(s);
let name='دوست جیووانی',game='',score=0,time=30,timer=null,loop=null,timeout=null;
const info={memory:['جفت‌یابی','کارت‌ها رو برگردون و ۶ جفت مشابه پیدا کن.'],target:['هدف‌گیری سریع','هر بار هدف ظاهر شد سریع لمسش کن.'],catch:['Catch & Win','خوراکی‌ها رو بگیر و از زباله‌ها دوری کن؛ چپ و راست صفحه رو لمس کن.'],tap:['سرعت لمس','در ۱۵ ثانیه تا می‌تونی دکمه رو لمس کن.'],pizza:['پازل پیتزا','تصویر رو ببین، بعد تکه‌ها رو با کشیدن جابه‌جا کن تا پیتزا کامل بشه.']};
function show(id){['welcome','menu','game','result'].forEach(x=>$('#'+x).classList.toggle('hidden',x!==id))}
$('#name-form').onsubmit=e=>{e.preventDefault();name=$('#player-name').value.trim().slice(0,24);if(!name)return;$('#hello-name').textContent=name;show('menu')};
document.querySelectorAll('[data-game]').forEach(b=>b.onclick=()=>{game=b.dataset.game;$('#game-title').textContent=info[game][0];$('#instructions').textContent=info[game][1];$('#area').innerHTML='';$('#score').textContent='0';$('#start').classList.remove('hidden');show('game')});
function stop(){clearInterval(timer);clearInterval(loop);clearTimeout(timeout);timer=loop=timeout=null}
$('#back').onclick=()=>{stop();show('menu')};$('#again').onclick=()=>show('menu');$('#start').onclick=start;
function add(n){score=Math.max(0,score+n);$('#score').textContent=score}
function start(){stop();score=0;time=game==='tap'?15:30;$('#score').textContent=0;$('#time').textContent=time;$('#start').classList.add('hidden');$('#area').innerHTML='';if(game==='pizza'){pizza();return}({memory,target,catch:catchGame,tap}[game])();timer=setInterval(()=>{time--;$('#time').textContent=time;if(time<=0)finish()},1000)}
function finish(){stop();$('#final-score').textContent=score;$('#result-title').textContent='آفرین '+name+'!';$('#result-copy').textContent=(score>=8?'سرعتت عالی بود!':score>=4?'خوبه! یه رکورد قابل احترام زدی.':'گرم‌کردن بود؛ دفعه بعد رکوردتو بهتر کن.')+' ☕';show('result')}
function memory(){let a=['☕','🍕','🍰','🍝','🥤','🍪','☕','🍕','🍰','🍝','🥤','🍪'].sort(()=>Math.random()-.5),first=null,lock=false,found=0,g=document.createElement('div');g.className='memory';a.forEach(v=>{let b=document.createElement('button');b.textContent='؟';b.onclick=()=>{if(lock||b.classList.contains('open')||b.classList.contains('matched'))return;b.textContent=v;b.classList.add('open');if(!first){first={b,v};return}if(first.v===v){first.b.classList.add('matched');b.classList.add('matched');first=null;found++;add(2);if(found===6)finish()}else{lock=true;let old=first;first=null;setTimeout(()=>{old.b.textContent='؟';b.textContent='؟';old.b.classList.remove('open');b.classList.remove('open');lock=false},650)}};g.append(b)});$('#area').append(g)}
function target(){let f=document.createElement('div');f.className='targetfield';$('#area').append(f);function spawn(){if(time<=0)return;f.innerHTML='';let b=document.createElement('button');b.className='target';b.textContent='🎯';b.style.left=Math.random()*78+'%';b.style.top=Math.random()*65+'%';b.onclick=()=>{add(1);spawn()};f.append(b);timeout=setTimeout(spawn,1000)}spawn()}
function tap(){let b=document.createElement('button');b.className='tapzone';b.textContent='بزن! ⚡';b.onclick=()=>{add(1);b.textContent='آفرین! '+score};$('#area').append(b)}
function catchGame(){let f=document.createElement('div');f.className='catchfield';f.innerHTML='<span class="basket" style="left:40%">🧺</span>';$('#area').append(f);let pos=40,basket=f.querySelector('.basket');function move(e){let r=f.getBoundingClientRect();pos=Math.max(0,Math.min(85,(e.clientX-r.left)/r.width*100-7));basket.style.left=pos+'%'}f.onpointerdown=move;f.onpointermove=e=>{if(e.buttons||e.pressure)move(e)};loop=setInterval(()=>{let bad=Math.random()<.23,b=document.createElement('span');b.className='item';b.textContent=bad?'🗑️':['☕','🍕','🍰','🍝','🥤'][Math.floor(Math.random()*5)];b.style.left=Math.random()*88+'%';b.style.top='-4px';f.append(b);let y=-4,x=parseFloat(b.style.left),fall=setInterval(()=>{y+=5;b.style.top=y+'px';if(y>145&&y<190&&x>pos-10&&x<pos+20){add(bad?-2:1);b.remove();clearInterval(fall)}else if(y>210){b.remove();clearInterval(fall)}},70)},550)}
function pizza(){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" rx="30" fill="#27462b"/><circle cx="300" cy="300" r="260" fill="#8c3d1e"/><circle cx="300" cy="300" r="242" fill="#f1bd61" stroke="#f9d28a" stroke-width="12"/><circle cx="300" cy="300" r="213" fill="#ffd96e"/><g fill="#c92f24" stroke="#8d211a" stroke-width="5"><circle cx="220" cy="170" r="31"/><circle cx="360" cy="150" r="29"/><circle cx="420" cy="270" r="31"/><circle cx="320" cy="365" r="30"/><circle cx="175" cy="340" r="28"/><circle cx="255" cy="260" r="26"/><circle cx="390" cy="420" r="25"/><circle cx="160" cy="230" r="22"/><circle cx="285" cy="455" r="24"/><circle cx="440" cy="390" r="22"/></g><g fill="#47783a"><ellipse cx="290" cy="145" rx="12" ry="22" transform="rotate(25 290 145)"/><ellipse cx="385" cy="220" rx="12" ry="22" transform="rotate(-30 385 220)"/><ellipse cx="235" cy="410" rx="12" ry="22" transform="rotate(35 235 410)"/><ellipse cx="355" cy="300" rx="12" ry="22"/><ellipse cx="130" cy="300" rx="11" ry="20"/><ellipse cx="300" cy="465" rx="11" ry="20"/><ellipse cx="205" cy="210" rx="10" ry="18" transform="rotate(30 205 210)"/></g><g fill="#fff0ca"><circle cx="195" cy="285" r="10"/><circle cx="340" cy="205" r="10"/><circle cx="375" cy="350" r="10"/><circle cx="250" cy="330" r="10"/><circle cx="285" cy="220" r="9"/></g></svg>`;
  const image='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
  injectPuzzleCss();
  const wrap=document.createElement('section');wrap.className='gv-puzzle-wrap';
  const status=document.createElement('div');status.className='gv-puzzle-status';status.textContent='تصویر رو خوب به خاطر بسپار';
  const stage=document.createElement('div');stage.className='gv-puzzle-stage';
  const preview=document.createElement('img');preview.className='gv-puzzle-preview';preview.alt='تصویر کامل پیتزا';preview.src=image;
  const grid=document.createElement('div');grid.className='gv-puzzle-grid';grid.setAttribute('aria-label','پازل پیتزا');
  stage.append(preview,grid);wrap.append(status,stage);$('#area').append(wrap);
  let tiles=[0,1,2,3,4,5,6,7,8],dragFrom=null,dragging=null,started=false;
  // Fisher-Yates shuffle; ensure no piece starts in its solved position when possible.
  do {for(let i=tiles.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[tiles[i],tiles[j]]=[tiles[j],tiles[i]]}} while(tiles.some((v,i)=>v===i));
  function attemptSwap(from,to){
    if(!started||time<=0||from===to)return;
    // Correctly placed pieces are locked, so they cannot be moved away or used to farm points.
    if(tiles[from]===from||tiles[to]===to)return;
    const before=tiles.reduce((n,t,i)=>n+(t===i?1:0),0);
    [tiles[from],tiles[to]]=[tiles[to],tiles[from]];
    const after=tiles.reduce((n,t,i)=>n+(t===i?1:0),0);
    const earned=Math.max(0,after-before);
    if(earned>0)add(earned);
    draw();
    if(tiles.every((v,i)=>v===i)){
      started=false;
      status.textContent='🍕 آفرین! پیتزا کامل شد!';
      finish();
    }
  }
  function draw(){
    grid.innerHTML='';
    tiles.forEach((tile,pos)=>{
      const el=document.createElement('div');el.className='gv-pizza-tile';el.dataset.pos=String(pos);el.dataset.tile=String(tile);el.setAttribute('role','button');el.setAttribute('aria-label','تکه پیتزا '+(tile+1));
      el.style.backgroundImage=`url("${image}")`;
      el.style.backgroundSize='300% 300%';
      el.style.backgroundPosition=(tile%3*50)+'% '+(Math.floor(tile/3)*50)+'%';
      el.tabIndex=0;
      if(tile===pos){el.classList.add('gv-correct');el.setAttribute('aria-label','تکهٔ درست پیتزا '+(tile+1));}
      el.addEventListener('pointerdown',e=>{
        if(!started||time<=0||tile===pos)return;
        dragFrom=Number(el.dataset.pos);dragging=el;el.classList.add('gv-dragging');
        el.setPointerCapture?.(e.pointerId);
        e.preventDefault();
      });
      el.addEventListener('pointerup',e=>{
        if(dragFrom===null)return;
        const from=dragFrom;dragFrom=null;
        if(dragging)dragging.classList.remove('gv-dragging');
        dragging=null;
        const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('.gv-pizza-tile');
        if(target&&grid.contains(target))attemptSwap(from,Number(target.dataset.pos));
      });
      el.addEventListener('pointercancel',()=>{dragFrom=null;if(dragging)dragging.classList.remove('gv-dragging');dragging=null});
      el.addEventListener('keydown',e=>{
        if(!started)return;
        if(e.key==='Enter'||e.key===' '){
          e.preventDefault();
          if(dragFrom===null){if(tile!==pos){dragFrom=pos;el.classList.add('gv-selected')}}
          else{
            const from=dragFrom;
            grid.querySelectorAll('.gv-selected').forEach(x=>x.classList.remove('gv-selected'));
            dragFrom=null;
            attemptSwap(from,pos);
          }
        }
      });
      grid.append(el);
    });
  }
  draw();
  $('#time').textContent='3';
  let previewCount=3;
  const preTimer=setInterval(()=>{
    previewCount--;
    if(!wrap.isConnected){clearInterval(preTimer);return}
    if(previewCount>0){$('#time').textContent=previewCount;return}
    clearInterval(preTimer);preview.remove();grid.classList.add('gv-ready');status.textContent='تکه‌ها رو بکش و روی تکهٔ دیگه رها کن تا جاشون عوض بشه';started=true;time=30;$('#time').textContent=time;
    timer=setInterval(()=>{time--;$('#time').textContent=time;if(time<=0)finish()},1000);
  },1000);
}
function injectPuzzleCss(){
 if(document.getElementById('gv-puzzle-css'))return;
 const style=document.createElement('style');style.id='gv-puzzle-css';style.textContent=`
 .gv-puzzle-wrap{width:100%;max-width:560px;margin:0 auto;padding:12px;box-sizing:border-box;color:#fff4dd}
 .gv-puzzle-status{text-align:center;font-size:clamp(14px,3.7vw,19px);line-height:1.5;margin:4px 0 14px;min-height:2.5em;color:#e8c17b}
 .gv-puzzle-stage{position:relative;width:100%;aspect-ratio:1/1;max-height:72vh;margin:auto}
 .gv-puzzle-preview{display:block;width:100%;height:100%;object-fit:contain;border-radius:16px;background:#17120f}
 .gv-puzzle-grid{direction:ltr;display:grid;position:absolute;inset:0;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr));gap:3px;overflow:hidden;border-radius:16px;background:#e9c47c;border:3px solid #e9c47c;box-sizing:border-box;touch-action:none;user-select:none;-webkit-user-select:none}
 .gv-puzzle-grid:not(.gv-ready){display:none}
 .gv-pizza-tile{min-width:0;min-height:0;background-repeat:no-repeat;background-color:#e9c47c;touch-action:none;user-select:none;-webkit-user-select:none;cursor:grab;position:relative;box-shadow:inset 0 0 0 1px rgba(70,38,15,.2)}
 .gv-pizza-tile:active{cursor:grabbing}
 .gv-pizza-tile.gv-dragging{opacity:.72;z-index:3;outline:3px solid #fff2c8}
 .gv-pizza-tile.gv-selected{outline:4px solid #ffe09a;z-index:2}
 .gv-pizza-tile.gv-correct{cursor:default;box-shadow:inset 0 0 0 2px rgba(255,238,180,.9)}
 @media(max-width:420px){.gv-puzzle-wrap{padding:6px}.gv-puzzle-stage{max-height:64vh}}
 `;
 document.head.append(style);
}
