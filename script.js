'use strict';

const CONFIG={musicVolume:.34,typingSpeed:25,rosePositions:[
{x:12,y:35},{x:31,y:22},{x:51,y:34},{x:72,y:21},{x:89,y:38},
{x:18,y:72},{x:37,y:65},{x:57,y:73},{x:76,y:62},{x:91,y:75}
]};
const MESSAGES=[
'Bienvenida al Jardín Encantado.\n\nHoy todas las rosas florecieron para celebrar tu cumpleaños.',
'Eres la luz que ilumina mi mundo.\n\nCada momento contigo es un regalo que guardo en el corazón.',
'Tu sonrisa es una de las cosas más hermosas del universo.\n\nTiene el poder de convertir cualquier día común en algo especial.',
'Cada día contigo, incluso desde lejos, es una nueva razón para agradecer y sonreír.',
'Gracias por ser exactamente como eres: fuerte, dulce, divertida y absolutamente única.',
'Tu cariño transforma mi vida.\n\nMe inspira a ser mejor y a creer que la distancia nunca será más grande que lo que sentimos.',
'Eres mi razón favorita para sonreír.\n\nMi coincidencia más bonita y uno de mis sueños hechos realidad.',
'Las rosas tienen un secreto para ti...\n\nEscúchalas con el corazón.',
'alert','letter'];
const LETTER=`Hoy celebramos a la persona más especial del universo.\n\nA ti, Luna.\n\nDeseo que nunca se apague la magia que llevas dentro. Que cada nuevo día te traiga razones para sonreír y que cada sueño encuentre su camino hasta ti.\n\nPreparé este pequeño jardín porque quería regalarte algo diferente: algo hecho con tiempo, dedicación y mucho cariño.\n\nAunque Brasil y Colombia estén separados por kilómetros, tú consigues estar presente en mis pensamientos todos los días.\n\nEspero que este pequeño detalle consiga tocar tu corazón, así como tú tocaste el mío.\n\n¡Feliz cumpleaños, mi amor! ❤️`;

const state={screen:'intro',nextRose:0,music:false,reduced:matchMedia('(prefers-reduced-motion: reduce)').matches,letterOpened:false,animationId:null};
const $=s=>document.querySelector(s);const $$=s=>[...document.querySelectorAll(s)];
const audio=$('#backgroundMusic');

function createRealisticRose({id,size=100,color='#b5122d',accentColor='#f04444',rotation=0,animationDelay=0}){
 const seed=Number(String(id).replace(/\D/g,''))||1;
 const rand=n=>{const x=Math.sin((seed+1)*(n+17)*91.73)*43758.5453;return x-Math.floor(x)};
 const petal=(layer,index,count,radius,width,height,gradient)=>{
  const angle=(360/count)*index+(rand(index+count)*10-5),a=angle*Math.PI/180;
  const x=120+Math.cos(a)*radius*(.78+rand(index+3)*.3),y=105+Math.sin(a)*radius*.46+(rand(index+9)-.5)*5;
  const w=width*(.88+rand(index+13)*.24),h=height*(.9+rand(index+21)*.2),lean=(rand(index+29)-.5)*w*.28;
  const d=`M 0 ${h*.47} C ${-w*.62} ${h*.15},${-w*.55+lean} ${-h*.34},0 ${-h*.53} C ${w*.55+lean} ${-h*.34},${w*.62} ${h*.15},0 ${h*.47} Z`;
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(angle+90+(rand(index+31)-.5)*12).toFixed(1)})"><path class="rose-petal petal-${layer}" style="--petal-delay:${(animationDelay+index*.035).toFixed(2)}s;--petal-turn:${((rand(index+37)-.5)*9).toFixed(1)}deg" d="${d}" fill="url(#${id}-${gradient})"/></g>`;
 };
 const layer=(name,count,radius,width,height,gradient,offset)=>Array.from({length:count},(_,i)=>petal(name,i+offset,count,radius,width,height,gradient)).join('');
 return `<svg class="realistic-rose rose-svg" viewBox="0 0 240 360" role="img" aria-label="Rosa vermelha realista" style="--rose-size:${size};--rose-rotation:${rotation}deg;--rose-delay:${animationDelay}s">
 <defs>
  <linearGradient id="${id}-stem" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#10351e"/><stop offset=".48" stop-color="#3b8a4d"/><stop offset="1" stop-color="#0a2817"/></linearGradient>
  <linearGradient id="${id}-leaf" x1="0" y1="1" x2="1" y2="0"><stop stop-color="#0b301b"/><stop offset=".55" stop-color="#2f7540"/><stop offset="1" stop-color="#70a765"/></linearGradient>
  <radialGradient id="${id}-outer" cx="34%" cy="22%" r="78%"><stop stop-color="${accentColor}"/><stop offset=".3" stop-color="${color}"/><stop offset=".78" stop-color="#8a102d"/><stop offset="1" stop-color="#4b071b"/></radialGradient>
  <radialGradient id="${id}-middle" cx="38%" cy="20%" r="82%"><stop stop-color="${accentColor}"/><stop offset=".24" stop-color="${color}"/><stop offset=".72" stop-color="#761027"/><stop offset="1" stop-color="#350611"/></radialGradient>
  <radialGradient id="${id}-inner" cx="42%" cy="18%" r="86%"><stop stop-color="${color}"/><stop offset=".5" stop-color="#86112c"/><stop offset="1" stop-color="#28030d"/></radialGradient>
  <linearGradient id="${id}-edge" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${accentColor}" stop-opacity=".85"/><stop offset=".35" stop-color="${color}" stop-opacity=".12"/><stop offset="1" stop-color="#3d0614" stop-opacity=".65"/></linearGradient>
  <filter id="${id}-shadow" x="-45%" y="-45%" width="190%" height="190%"><feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="blur"/><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#170108" flood-opacity=".72"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  <filter id="${id}-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.2" result="soft"/><feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="${accentColor}" flood-opacity=".5"/><feMerge><feMergeNode in="soft"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 </defs>
 <g class="rose-sway" transform="rotate(${rotation} 120 340)">
  <g class="rose-stem"><path class="stem-shadow" d="M121 342 C118 285 129 220 119 132"/><path class="stem-highlight" style="stroke:url(#${id}-stem)" d="M118 342 C115 286 126 220 118 132"/><g class="rose-leaves"><g class="rose-leaf leaf-left" style="fill:url(#${id}-leaf)"><path d="M118 272 C78 240 47 251 38 279 C70 296 98 288 118 272Z"/><path class="leaf-vein" d="M45 277 Q78 270 113 273"/></g><g class="rose-leaf leaf-right" style="fill:url(#${id}-leaf)"><path d="M122 232 C153 196 190 205 201 233 C174 253 145 249 122 232Z"/><path class="leaf-vein" d="M194 230 Q159 226 126 233"/></g></g></g>
  <g class="rose-sepals" filter="url(#${id}-shadow)"><path d="M120 139 L91 166 Q111 157 120 178 Q129 157 149 166Z"/><path d="M118 143 L77 151 Q101 154 111 174Z"/><path d="M122 143 L163 151 Q139 154 129 174Z"/></g>
  <g class="rose-bloom" filter="url(#${id}-shadow)"><ellipse class="bloom-shadow" cx="120" cy="116" rx="66" ry="28"/>
   <g class="petals petals-outer">${layer('outer',8,43,55,67,'outer',0)}</g>
   <g class="petals petals-middle">${layer('middle',8,27,43,57,'middle',10)}</g>
   <g class="petals petals-inner">${layer('inner',8,13,28,43,'inner',20)}<ellipse class="rose-heart" cx="120" cy="103" rx="12" ry="16" fill="url(#${id}-inner)"/></g>
  </g>
 </g></svg>`;
}

class AudioController{
 static async start(){if(state.music)return;try{audio.volume=0;await audio.play();state.music=true;this.fadeTo(CONFIG.musicVolume,2400);this.update()}catch(e){console.info('Audio aguardando interação do usuário.',e)}}
 static toggle(){if(audio.paused){audio.play().then(()=>{state.music=true;this.fadeTo(CONFIG.musicVolume,500);this.update()}).catch(()=>{})}else{audio.pause();state.music=false;this.update()}}
 static fadeTo(target,duration){const from=audio.volume,start=performance.now();const step=t=>{const p=Math.min(1,(t-start)/duration);audio.volume=Math.max(0,Math.min(1,from+(target-from)*p));if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}
 static update(){$('#musicToggle').textContent=audio.paused?'🔇':'🔊';$('#musicToggle').setAttribute('aria-label',audio.paused?'Reproducir música':'Pausar música')}
}

class ScreenController{
 static show(name){$$('.screen').forEach(s=>s.classList.remove('active'));$(`#${name}Screen`).classList.add('active');state.screen=name;if(name==='garden')Particles.mode='garden';if(name==='letter')Particles.mode='letter';if(name==='final'){Particles.mode='final';Particles.burst(innerWidth/2,innerHeight/2,100)}}
}

class RoseGarden{
 static init(){const container=$('#rosesContainer');container.innerHTML='';CONFIG.rosePositions.forEach((pos,i)=>{const btn=document.createElement('button');btn.type='button';btn.className=`rose-button ${i===0?'current':'locked'}`;btn.style.setProperty('--x',`${pos.x}%`);btn.style.setProperty('--y',`${pos.y}%`);btn.style.setProperty('--delay',`${(i%5)*-.73}s`);btn.style.setProperty('--grow-delay',`${i*.09}s`);btn.style.setProperty('--wind-duration',`${4.1+(i%4)*.37}s`);btn.setAttribute('aria-label',`Rosa ${i+1}${i>0?' bloqueada':''}`);btn.dataset.index=i;btn.innerHTML=createRealisticRose({id:`rose-${i}`,size:92+(i%3)*4,color:['#b5122d','#c5162e','#a90f26'][i%3],accentColor:['#ef3b3b','#ff4b3e','#dc2f34'][i%3],rotation:(i%2?-1:1)*(1+i%3),animationDelay:.55+i*.06});btn.addEventListener('click',()=>this.open(i));btn.addEventListener('pointermove',e=>this.tilt(btn,e));btn.addEventListener('pointerleave',()=>this.resetTilt(btn));container.appendChild(btn)});this.updateProgress()}
 static tilt(btn,event){if(btn.classList.contains('locked')||matchMedia('(pointer: coarse)').matches)return;const r=btn.getBoundingClientRect();btn.style.setProperty('--tilt-x',`${((event.clientX-r.left)/r.width-.5)*7}deg`);btn.style.setProperty('--tilt-y',`${((event.clientY-r.top)/r.height-.5)*-3}px`)}
 static resetTilt(btn){btn.style.setProperty('--tilt-x','0deg');btn.style.setProperty('--tilt-y','0px')}
 static open(index){if(index!==state.nextRose)return;const btn=$(`.rose-button[data-index="${index}"]`);btn.classList.remove('current');btn.classList.add('opened');const rect=btn.getBoundingClientRect(),x=rect.left+rect.width/2,y=rect.top+rect.height*.28;Particles.burst(x,y,35);Particles.releaseRosePetals(x,y,9);const value=MESSAGES[index];if(value==='alert')this.alert();else if(value==='letter'){state.nextRose++;this.updateProgress();setTimeout(()=>ScreenController.show('letter'),850)}else this.message(index,value)}
 static message(index,text){$('#messageNumber').textContent=String(index+1).padStart(2,'0');$('#messageBody').textContent=text;$('#messageModal').hidden=false}
 static closeMessage(){const modal=$('#messageModal');modal.hidden=true;this.advance()}
 static alert(){$('#magicAlert').hidden=false}
 static closeAlert(){$('#magicAlert').hidden=true;this.advance()}
 static advance(){state.nextRose++;this.updateProgress();const next=$(`.rose-button[data-index="${state.nextRose}"]`);if(next){next.classList.remove('locked');next.classList.add('current');next.setAttribute('aria-label',`Rosa ${state.nextRose+1}`)}}
 static updateProgress(){$('#progressBar').style.width=`${state.nextRose/10*100}%`;$('#progressText').textContent=`${state.nextRose} / 10`}
}

class LetterController{
 static open(){if(state.letterOpened)return;state.letterOpened=true;$('#envelope').classList.add('open');$('#letterHint').textContent='Una carta escrita desde el corazón';AudioController.fadeTo(.18,900);setTimeout(()=>this.type(),900)}
 static async type(){const out=$('#letterText');out.textContent='';for(let i=0;i<LETTER.length;i++){out.textContent+=LETTER[i];if(i%4===0)out.parentElement.scrollTop=out.parentElement.scrollHeight;if(!state.reduced)await new Promise(r=>setTimeout(r,CONFIG.typingSpeed))}$('.signature').classList.add('visible');$('#finishLetterBtn').classList.remove('hidden');AudioController.fadeTo(CONFIG.musicVolume,1200)}
}

class ParticleEngine{
 constructor(canvas){this.canvas=canvas;this.ctx=canvas.getContext('2d');this.items=[];this.mode='intro';this.resize();addEventListener('resize',()=>this.resize());for(let i=0;i<80;i++)this.items.push(this.star());for(let i=0;i<18;i++)this.items.push(this.firefly());this.loop()}
 resize(){const dpr=Math.min(devicePixelRatio||1,2);this.canvas.width=innerWidth*dpr;this.canvas.height=innerHeight*dpr;this.canvas.style.width=innerWidth+'px';this.canvas.style.height=innerHeight+'px';this.ctx.setTransform(dpr,0,0,dpr,0,0)}
 star(){return{kind:'star',x:Math.random()*innerWidth,y:Math.random()*innerHeight*.7,r:Math.random()*1.6+.3,a:Math.random(),v:Math.random()*.02+.006}}
 firefly(){return{kind:'firefly',x:Math.random()*innerWidth,y:innerHeight*(.3+Math.random()*.65),r:Math.random()*2+1,vx:(Math.random()-.5)*.45,vy:(Math.random()-.5)*.35,a:Math.random()}}
 petal(x=Math.random()*innerWidth,y=-20){return{kind:'petal',x,y,r:Math.random()*5+3,vx:(Math.random()-.5)*1.1,vy:Math.random()*1.1+.45,rot:Math.random()*6.2,vr:(Math.random()-.5)*.05,a:.8}}
 releaseRosePetals(x,y,count=8){for(let i=0;i<count;i++){const p=this.petal(x+(Math.random()-.5)*34,y+(Math.random()-.5)*20);p.vx=(Math.random()-.5)*3.2;p.vy=-Math.random()*2.4-.35;p.r=Math.random()*4+3;p.a=.9;this.items.push(p)}}
 burst(x,y,count=30){for(let i=0;i<count;i++)this.items.push({kind:'spark',x,y,r:Math.random()*3+1,vx:(Math.random()-.5)*5,vy:(Math.random()-.5)*5-1,a:1,life:Math.random()*45+40,color:Math.random()>.45?'#ffd873':'#ff5f99'})}
 loop(){const c=this.ctx;c.clearRect(0,0,innerWidth,innerHeight);if((this.mode==='garden'||this.mode==='final')&&Math.random()<.055&&!state.reduced)this.items.push(this.petal());for(let i=this.items.length-1;i>=0;i--){const p=this.items[i];if(p.kind==='star'){p.a+=p.v;if(p.a>1||p.a<.15)p.v*=-1;c.globalAlpha=p.a;c.fillStyle='#fff';c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill()}else if(p.kind==='firefly'){p.x+=p.vx;p.y+=p.vy;p.a=.35+Math.sin(performance.now()/700+p.x)*.3;if(p.x<0)p.x=innerWidth;if(p.x>innerWidth)p.x=0;if(p.y<0)p.y=innerHeight;if(p.y>innerHeight)p.y=0;const g=c.createRadialGradient(p.x,p.y,0,p.x,p.y,18);g.addColorStop(0,`rgba(255,220,98,${p.a})`);g.addColorStop(1,'rgba(255,220,98,0)');c.fillStyle=g;c.fillRect(p.x-18,p.y-18,36,36)}else if(p.kind==='petal'){p.x+=p.vx+Math.sin(p.y/35)*.25;p.y+=p.vy;p.rot+=p.vr;c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.globalAlpha=p.a;c.fillStyle='#e94274';c.beginPath();c.ellipse(0,0,p.r,p.r*.55,0,0,7);c.fill();c.restore();if(p.y>innerHeight+30)this.items.splice(i,1)}else{p.x+=p.vx;p.y+=p.vy;p.vy+=.045;p.life--;p.a=p.life/80;c.globalAlpha=Math.max(0,p.a);c.fillStyle=p.color;c.beginPath();c.arc(p.x,p.y,p.r,0,7);c.fill();if(p.life<=0)this.items.splice(i,1)}}c.globalAlpha=1;state.animationId=requestAnimationFrame(()=>this.loop())}
}
const Particles=new ParticleEngine($('#fxCanvas'));

function restart(){state.nextRose=0;state.letterOpened=false;$('#envelope').classList.remove('open');$('#letterText').textContent='';$('.signature').classList.remove('visible');$('#finishLetterBtn').classList.add('hidden');$('#letterHint').textContent='Toca el sello para abrir la carta';RoseGarden.init();ScreenController.show('garden');AudioController.fadeTo(CONFIG.musicVolume,700)}

document.addEventListener('DOMContentLoaded',()=>{
 if(state.reduced)document.body.classList.add('reduced-motion');RoseGarden.init();
 $('#startBtn').addEventListener('click',()=>{AudioController.start();ScreenController.show('garden')});
 $('#closeMessageBtn').addEventListener('click',()=>RoseGarden.closeMessage());
 $('#continueAlertBtn').addEventListener('click',()=>RoseGarden.closeAlert());
 $('#envelope').addEventListener('click',()=>LetterController.open());
 $('#finishLetterBtn').addEventListener('click',()=>ScreenController.show('final'));
 $('#restartBtn').addEventListener('click',restart);
 $('#musicToggle').addEventListener('click',()=>AudioController.toggle());
 $('#motionToggle').addEventListener('click',()=>{state.reduced=!state.reduced;document.body.classList.toggle('reduced-motion',state.reduced);$('#motionToggle').textContent=state.reduced?'🌙':'✨'});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!$('#messageModal').hidden)RoseGarden.closeMessage()});
});
