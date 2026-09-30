/* =========================================================
   1. 素材配置 —— 部署时把路径填进来，例如 heroVideo:'media/hero.mp4'
      留空 = 显示上传占位；本页上传只在当前浏览器预览
   ========================================================= */
const MEDIA = {
  heroVideo:'media/haro.mp4', indexBg:'', bgMusic:'',
  tape1:'', tape2:'', tape3:'', tape4:'', tape5:'',
  project1:'', project2:'', project3:'', project4:'', project5:'',
  contactVideo:''
};

/* 2. 磁带 & 作品数据 */
const TAPES = [
  {c:'#8b6cff', t:'Profile', cn:'WHO I AM', en:'Who runs this system', note:'Role · focus · core stack', go:'profile'},
  {c:'#49e28a', t:'Journey', cn:'CAREER LOG', en:'How this system evolved', note:'2 roles · AI · Web', go:'timeline'},
  {c:'#ff5fa8', t:'Tech Stack', cn:'4 MODULES', en:'What this system runs on', note:'20+ tools loaded', go:'skills'},
  {c:'#ff8a3d', t:'Projects', cn:'ON THE REEL', en:'Selected work, frame by frame', note:'05 projects on tape', go:'projects'},
  {c:'#ffd23f', t:'Contact', cn:'OPEN CHANNEL', en:'Hiring? Say hi', note:'Staff pass · all access', go:'contact'}
];
/* 作品数据：t/cn/sub 显示在胶片带上，detail 显示在 View details 弹窗里 */
const PROJECTS = [
  {t:'Personal AI Agent', cn:'Long-term memory', sub:'Personal project · Python · LiteLLM · MCP',
   detail:{
     name:'Personal AI Agent with Long-Term Memory and Proactive Notifications',
     tag:'Project 01 · Personal project',
     stack:['Python','LiteLLM','MCP','FastAPI','SQLite','React','Docker'],
     bullets:[
       ['Agent runtime','Built a modular agent runtime with atomic hot reload and automatic rollback, enabling upgrades without downtime.'],
       ['Memory retrieval','Developed two-path hybrid retrieval combining vector search, BM25 and temporal signals, with Top-5 vector recall and dynamic memory-graph retrieval.'],
       ['Context engineering','Automated context compression at 74% of the model context window, preserving tool-call/result pairs and extracting source-grounded long-term memories.'],
       ['Proactive agent','Built proactive notifications with adaptive polling based on user activity and MCP-based data retrieval.'],
       ['Evaluation','Built end-to-end evaluation with LongMemEval and PersonaMem to detect retrieval and compression regressions.']
     ],
     kpis:[['Zero','downtime upgrades'],['Top-5','vector recall'],['74%','compression trigger'],['2','eval benchmarks']]
   }},
  {t:'RAGChef', cn:'Recipe QA with RAG', sub:'Personal project · RAG · FastAPI · Docker',
   detail:{
     name:'RAGChef: Recipe QA System Powered by Retrieval-Augmented Generation',
     tag:'Project 02 · Personal project',
     link:'https://github.com/aqq40867-lang/RAGChef',
     stack:['Python','RAG','Vector search','Reranking','Prompt engineering','FastAPI','Docker'],
     bullets:[
       ['Background','Built a RAG pipeline to deliver personalised recipe recommendations.'],
       ['Chunking','Implemented an end-to-end parent-child chunking RAG system, addressing retrieval dilution.'],
       ['Retrieval','Built a two-stage retrieval pipeline with query rewriting and vector search, followed by reranking for relevance scoring.'],
       ['Prompt engineering','Applied prompt engineering to constrain responses to retrieved content, reducing hallucinations.'],
       ['Deployment','Built the FastAPI backend with Docker, ensuring consistent development and deployment environments across Linux and Windows.']
     ],
     kpis:[['2-stage','retrieval + rerank'],['Parent-child','chunking'],['Linux + Windows','same Docker env']]
   }},
  {t:'Eco Guardian', cn:'Eco-education for kids', sub:'Personal project · React · PHP · MySQL',
   detail:{
     name:'Interactive Eco-Education Web App for Kids',
     tag:'Project 03 · Personal project',
     link:'https://github.com/aqq40867-lang/Eco-Guardian-Loughborough-Biodiversity-Adventure',
     stack:['HTML','CSS','JavaScript','React','PHP','MySQL'],
     bullets:[
       ['Background','Built an interactive biodiversity and sustainability learning platform for children aged 8–13.'],
       ['Interface design','Built a React city-decision panel with dynamic CSS progress bars to visualise budget, ecology and happiness trade-offs.'],
       ['Performance','Compressed images with Sharp and used React.lazy code splitting, reducing throttled 3G load time from 61s to 10.8s and page weight from 11.9MB to 1.9MB.'],
       ['Backend','Built RESTful APIs for message board and progress-saving features using MySQL, with request validation and parameterised queries.'],
       ['Testing','Conducted manual and automated testing, achieving 100% pass rates across 10 pages and 8 automated test cases, ensuring system reliability and access control.'],
       ['AI-assisted development','Used Claude Code with manual code review and test-based verification.']
     ],
     kpis:[['61s → 10.8s','3G load time'],['11.9MB → 1.9MB','page weight'],['100%','test pass rate'],['8–13','age group']]
   }},
  {t:'Restaurant Ordering', cn:'Pickup ordering site', sub:'Personal project · HTML · CSS · JavaScript',
   detail:{
     name:'Restaurant Online Ordering Website',
     tag:'Project 04 · Personal project',
     stack:['HTML','CSS','JavaScript'],
     bullets:[
       ['Frontend','Built a responsive restaurant ordering website in vanilla JavaScript, with 21-dish menu filtering and search, size-based pricing and a persistent cart.'],
       ['Pickup scheduling','Implemented a pickup-only scheduling flow that generates 15-minute slots from weekly opening hours, blocks closed days and enforces a 25-minute preparation lead time.'],
       ['Responsive UI/UX','Delivered a mobile-first UI with CSS Grid/Flexbox, a full-screen order drawer, live “open now” status and accessible form validation.']
     ],
     kpis:[['21','dishes'],['15-min','pickup slots'],['25-min','prep lead time']]
   }},
  {t:'Accessories Shop', cn:'Java OOP retail system', sub:'Personal project · Java · OOP',
   detail:{
     name:'Computer Accessories Shop System: OOP-Based Console Retail Management',
     tag:'Project 05 · Personal project',
     link:'https://github.com/aqq40867-lang/Computer-Accessories-Shop-System-Java-OOP-',
     stack:['Java','Object-oriented design','Strategy pattern'],
     bullets:[
       ['Background','Built a terminal-based computer accessories shop management system in Core Java, modelling a full retail transaction flow with OOP.'],
       ['Abstraction','Applied abstraction and polymorphism to support multiple product types through a common catalogue structure.'],
       ['Access control','Designed role-based access control to separate customer and administrator permissions.'],
       ['Design patterns','Applied the Strategy design pattern for interchangeable payment methods and extensible checkout logic.'],
       ['Data modelling','Used enums and value objects to standardise data representation and reduce inconsistent inputs.']
     ],
     kpis:[['2','user roles'],['Strategy','payment pattern'],['Core Java','no frameworks']]
   }}
];

const $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad = n => String(n).padStart(2,'0');

/* ---------- 磁带 DOM ---------- */
const deck = $('#deck');
TAPES.forEach((tp,i)=>{
  const el = document.createElement('div');
  el.className='tape'; el.style.setProperty('--c',tp.c);
  el.innerHTML = `
    <div class="tape__screws"><i></i><i></i><i></i><i></i></div>
    <div class="tape__top"><span class="tape__code">CO-${pad(i+1)}</span><span>CREATIVE-OS / CH.${pad(i+1)}</span><span class="tape__bar"></span></div>
    <div class="tape__label">
      <div class="tape__num">${pad(i+1)}<small>CHAPTER</small></div>
      <div><div class="tape__t">${tp.t}</div><div class="tape__cn">${tp.cn}_</div><div class="tape__note">${tp.note}<br>SIDE A · 60 MIN · TYPE II</div></div>
      <div class="slot slot--mini tape__photo" data-slot="tape${i+1}" data-kind="image" data-label="PHOTO" data-spec="4:5"></div>
    </div>
    <div class="tape__win"><span class="reel"></span><span class="reel"></span></div>
    <div class="tape__foot"><i></i><i></i><span>SIDE A</span><i></i><i></i></div>`;
  deck.appendChild(el);
});
$('#deckDots').innerHTML = TAPES.map(()=>'<i></i>').join('');

/* =========================================================
   3. 上传槽位
   ========================================================= */
const runtime = {}; // key -> {url,type}
let pickingKey = null, soundOn = false;
const guessType = (src, kind) => kind==='image' ? 'image' : kind==='video' ? 'video' : (/\.(mp4|webm|mov|m4v)(\?|$)/i.test(src)?'video':'image');

function renderSlot(el){
  const key = el.dataset.slot, kind = el.dataset.kind, scrub = el.dataset.mode==='scrub';
  const rt = runtime[key], src = rt ? rt.url : MEDIA[key];
  el.classList.toggle('is-filled', !!src);
  if(kind==='audio'){                       // 背景音乐：不显示在页面上，只换 <audio> 的源
    const bgm = $('#bgm');
    if(src){ if(bgm.src !== src){ bgm.src = src; if(soundOn) bgm.play().catch(()=>{}); } }
    else { bgm.removeAttribute('src'); bgm.load(); }
    return;
  }
  el.querySelectorAll(':scope > video, :scope > img, :scope > .slot__ph').forEach(n=>n.remove());
  if(src){
    const type = rt ? rt.type : guessType(src, kind);
    let m;
    if(type==='video'){
      m = document.createElement('video');
      m.src = src; m.muted = scrub || !videoSound(); m.playsInline = true; m.preload='auto';
      if(!scrub){ m.loop = true; m.autoplay = true; m.play().catch(()=>{}); }
      m.dataset.scrub = scrub ? '1' : '';
    } else { m = document.createElement('img'); m.src = src; m.alt = el.dataset.label; }
    el.prepend(m);
  } else if(!el.classList.contains('slot--bg')){   // 背景视频没上传时只显示网格底，不放占位框
    const b = document.createElement('button'); b.type='button'; b.className='slot__ph';
    const kt = kind==='video'?'video':kind==='image'?'image':'image / video';
    b.innerHTML = `<span class="slot__tag">${el.dataset.label}</span><span class="slot__spec">${el.dataset.spec||''}</span><span class="slot__cta">+ Upload ${kt}</span><span class="slot__key">MEDIA.${key}</span>`;
    b.addEventListener('click', ()=>pick(key, kind));
    el.appendChild(b);
  }
}
const hasMusic = () => !!(runtime.bgMusic || MEDIA.bgMusic);
const videoSound = () => soundOn && !hasMusic();   // 有背景音乐时，视频保持静音
function pick(key, kind){
  pickingKey = key;
  const f = $('#filePick');
  f.accept = kind==='video' ? 'video/*' : kind==='image' ? 'image/*' : kind==='audio' ? 'audio/*' : 'image/*,video/*';
  f.value=''; f.click();
}
$('#filePick').addEventListener('change', e=>{
  const file = e.target.files[0]; if(!file || !pickingKey) return;
  if(runtime[pickingKey]) URL.revokeObjectURL(runtime[pickingKey].url);
  runtime[pickingKey] = {url:URL.createObjectURL(file), type:file.type.startsWith('video')?'video':file.type.startsWith('audio')?'audio':'image'};
  if(pickingKey==='bgMusic') applySound();
  $$(`[data-slot="${pickingKey}"]`).forEach(renderSlot);
  renderDrawer();
  if(pickingKey==='contactVideo') bindScrubVideo();
  ScrollTrigger.refresh();
});
function renderDrawer(){
  const slots = $$('[data-slot]');
  let filled = 0;
  $('#drawerList').innerHTML = slots.map(el=>{
    const k = el.dataset.slot, ok = !!(runtime[k] || MEDIA[k]); if(ok) filled++;
    const where = el.closest('section.sec')?.dataset.name || '';
    return `<div class="drow ${ok?'is-filled':''}"><span class="drow__name">${where||'GLOBAL'} · ${el.dataset.label}</span><span class="drow__meta">MEDIA.${k} · ${el.dataset.spec||''}</span><button class="drow__btn" type="button" data-pick="${k}" data-kind="${el.dataset.kind}">${ok?'✓ Replace':'Upload'}</button></div>`;
  }).join('');
  $('#assetCount').textContent = `${filled}/${slots.length}`;
}
$('#drawerList').addEventListener('click', e=>{const b=e.target.closest('[data-pick]'); if(b) pick(b.dataset.pick, b.dataset.kind);});
const toggleDrawer = () => { $('#drawer').hidden = !$('#drawer').hidden; };
$('#assetsBtn').addEventListener('click', toggleDrawer);
$('#replaceBtn').addEventListener('click', toggleDrawer);
$$('[data-slot]').forEach(renderSlot); renderDrawer();

function applySound(){
  const btn = $('#soundBtn');
  btn.setAttribute('aria-pressed', soundOn);
  btn.querySelector('span').textContent = soundOn ? 'Sound on' : 'Sound off';
  const bgm = $('#bgm');
  if(soundOn && hasMusic()) bgm.play().catch(()=>{}); else bgm.pause();
  $$('video').forEach(v=>{ if(!v.dataset.scrub){ v.muted = !videoSound(); if(!v.muted) v.play().catch(()=>{}); } });
}
$('#soundBtn').addEventListener('click', ()=>{ soundOn = !soundOn; applySound(); });

/* =========================================================
   4. 平滑滚动 + ScrollTrigger
   ========================================================= */
gsap.registerPlugin(ScrollTrigger);
let lenis = null;
if(!reduce){
  lenis = new Lenis({lerp:.085, wheelMultiplier:.9});
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t=>lenis.raf(t*1000));
  gsap.ticker.lagSmoothing(0);
}
const scrollToY = y => lenis ? lenis.scrollTo(y,{duration:1.2}) : window.scrollTo({top:y, behavior: reduce?'auto':'smooth'});
const sectionTop = id => { const st = ScrollTrigger.getById('pin-'+id); return st ? st.start : $('#'+id).getBoundingClientRect().top + window.scrollY; };
document.addEventListener('click', e=>{
  const a = e.target.closest('[data-go]'); if(!a) return;
  e.preventDefault(); scrollToY(sectionTop(a.dataset.go));
});

/* 进度条 */
ScrollTrigger.create({start:0, end:'max', onUpdate:s=>gsap.set('#progFill',{scaleY:s.progress})});

/* 导航高亮 + 状态栏：按滚动位置找到当前章节（兼容固定段） */
const SECS = $$('main > .sec');
let secTops = [], curSec = -1;
ScrollTrigger.addEventListener('refresh', ()=>{ secTops = SECS.map(sec=>sectionTop(sec.id)); });
function markSection(){
  const y = window.scrollY + window.innerHeight*.5;
  let i = 0; secTops.forEach((t,k)=>{ if(y >= t) i = k; });
  if(i === curSec) return; curSec = i;
  $$('.tab').forEach(t=>t.classList.toggle('is-active', t.dataset.go===SECS[i].id));
  $('#secNo').textContent = pad(i); $('#secName').textContent = SECS[i].dataset.name;
}
window.addEventListener('scroll', markSection, {passive:true});
ScrollTrigger.addEventListener('refresh', markSection);

/* ---------- HERO 入场（你的开屏动画可替换这段） ---------- */
if(!reduce){
  gsap.timeline({delay:.2})
    .from('.hero__who, .hero__path', {y:14, opacity:0, duration:.6, stagger:.1, ease:'power2.out'})
    .from('.hero__title .line > span', {yPercent:110, duration:.9, stagger:.12, ease:'power4.out'}, '-=.3')
    .from('.hero__sub, .hero__en, .hero__scroll', {y:16, opacity:0, duration:.6, stagger:.1, ease:'power2.out'}, '-=.4');
  gsap.to('.hero', {yPercent:-12, opacity:.2, ease:'none', scrollTrigger:{trigger:'#home', start:'top top', end:'bottom top', scrub:true}});
}

/* ---------- A. 通用入场：data-reveal-group 里的 data-reveal 依次弹出 ---------- */
if(!reduce){
  $$('[data-reveal-group]').forEach(g=>{
    gsap.from($$('[data-reveal]', g), {y:48, opacity:0, filter:'blur(8px)', duration:.9, stagger:.09, ease:'power3.out',
      scrollTrigger:{trigger:g, start:'top 78%', toggleActions:'play none none reverse'}});
  });
  $$('.row').forEach(r=>{
    gsap.fromTo(r, {opacity:.18, x:-28}, {opacity:1, x:0, ease:'none',
      scrollTrigger:{trigger:r, start:'top 90%', end:'top 60%', scrub:true}});
  });
}
/* 数字计数 */
$$('[data-count]').forEach(el=>{
  const end = +el.dataset.count, o = {v:0};
  const fmt = v => Math.round(v).toLocaleString('en-US');
  if(reduce){ el.textContent = fmt(end); return; }
  gsap.to(o, {v:end, duration:1.8, ease:'power2.out', onUpdate:()=>el.textContent = fmt(o.v),
    scrollTrigger:{trigger:el, start:'top 88%', toggleActions:'play none none reset'}});
});

/* 固定段按页面顺序先计算（refreshPriority 越大越先），其余触发器之后再算 */
/* ---------- B. INDEX：固定住，滚动换磁带 ---------- */
const tapes = $$('.tape'), N = tapes.length, dots = $$('#deckDots i');
let deckIdx = -1;
function layoutDeck(p){
  const w = tapes[0].offsetWidth;
  tapes.forEach((t,i)=>{
    const d = i - p, ad = Math.abs(d);
    gsap.set(t, {
      x: d * w * .64, z: -ad * 260, rotateY: gsap.utils.clamp(-40,40,-d*22),
      scale: 1 - Math.min(ad,2)*.1, opacity: ad > 2.4 ? 0 : 1 - Math.min(ad,2)*.32,
      filter: `brightness(${1 - Math.min(ad,2)*.28})`, zIndex: 100 - Math.round(ad*10),
      xPercent:-50, yPercent:-50
    });
    t.classList.toggle('is-active', ad < .5);
  });
  const idx = Math.round(p);
  if(idx !== deckIdx){
    deckIdx = idx; const tp = TAPES[idx];
    $('#index').style.setProperty('--tc', tp.c);
    dots.forEach((d,i)=>d.classList.toggle('on', i===idx));
    const info = ['#deckTitle','#deckCn','#deckEn'];
    gsap.fromTo(info, {y:12, opacity:0}, {y:0, opacity:1, duration:.35, stagger:.04, ease:'power2.out'});
    $('#deckTitle').textContent = tp.t; $('#deckCn').textContent = tp.cn; $('#deckEn').textContent = tp.en;
    const en = $('#deckEnter'); en.dataset.go = tp.go; en.href = '#'+tp.go;
  }
}
layoutDeck(0);
const deckST = ScrollTrigger.create({
  id:'pin-index', refreshPriority:3, trigger:'#index', start:'top top', end:()=>'+='+ (N-1)*window.innerHeight*.75,
  pin:true, scrub:true, anticipatePin:1,
  snap: reduce ? false : {snapTo:1/(N-1), duration:{min:.2, max:.6}, delay:.08, ease:'power2.inOut'},
  onUpdate:s=>layoutDeck(s.progress*(N-1))
});
// 磁带入场：第一盒从下方升起 + 白闪
if(!reduce){
  gsap.from('#deck', {yPercent:30, opacity:0, scale:.9, ease:'power3.out',
    scrollTrigger:{trigger:'#index', start:'top 85%', end:'top 15%', scrub:true}});
}
const deckGo = step => { const i = gsap.utils.clamp(0,N-1,deckIdx+step); scrollToY(deckST.start + (deckST.end-deckST.start)*i/(N-1)); };
$('#deckPrev').addEventListener('click', ()=>deckGo(-1));
$('#deckNext').addEventListener('click', ()=>deckGo(1));

/* ---------- C. PROJECTS：竖向滚动 → 胶片横移 ---------- */
const frames = $$('.frame'), M = frames.length;
let reelIdx = -1;
function stepW(){ const f = frames[0]; return f.offsetWidth + parseFloat(getComputedStyle($('.film')).getPropertyValue('--gap')); }
function layoutReel(p){
  gsap.set('#filmTrack', {x: -p * stepW()});
  const idx = Math.round(p);
  if(idx !== reelIdx){
    reelIdx = idx; const pj = PROJECTS[idx];
    frames.forEach((f,i)=>f.classList.toggle('is-active', i===idx));
    $('#reelNo').textContent = pad(idx+1);
    $('#reelTitle').innerHTML = `${pj.t}<span class="cn">${pj.cn}</span>`;
    $('#reelSub').textContent = pj.sub;
    $('#reelMore').hidden = !pj.detail;
    gsap.fromTo('#reelTitle, #reelSub', {y:14, opacity:0}, {y:0, opacity:1, duration:.35, stagger:.05, ease:'power2.out'});
  }
}
layoutReel(0);
const reelST = ScrollTrigger.create({
  id:'pin-projects', refreshPriority:2, trigger:'#projects', start:'top top', end:()=>'+='+(M-1)*window.innerHeight*.7,
  pin:true, scrub:true, anticipatePin:1, invalidateOnRefresh:true,
  snap: reduce ? false : {snapTo:1/(M-1), duration:{min:.2,max:.5}, delay:.08, ease:'power2.inOut'},
  onUpdate:s=>layoutReel(s.progress*(M-1))
});
const reelGo = step => { const i = gsap.utils.clamp(0,M-1,reelIdx+step); scrollToY(reelST.start + (reelST.end-reelST.start)*i/(M-1)); };
$('#reelPrev').addEventListener('click', ()=>reelGo(-1));
$('#reelNext').addEventListener('click', ()=>reelGo(1));


/* 项目详情弹窗 */
const pm = $('#pmodal');
function openProject(i){
  const d = PROJECTS[i] && PROJECTS[i].detail; if(!d) return;
  $('#pmEyebrow').textContent = d.tag; $('#pmTitle').textContent = d.name;
  $('#pmStack').innerHTML = d.stack.map(t=>`<li>${t}</li>`).join('');
  $('#pmList').innerHTML = d.bullets.map(([b,t])=>`<li><b>${b}</b>${t}</li>`).join('');
  $('#pmKpis').innerHTML = d.kpis.map(([n,l])=>`<span><em>${n}</em>${l}</span>`).join('');
  const lk = $('#pmLink'); lk.hidden = !d.link; if(d.link) lk.href = d.link;
  pm.hidden = false; lenis && lenis.stop(); pm.querySelector('.pmodal__x').focus();
  if(!reduce) gsap.fromTo('.pmodal__card', {y:40, opacity:0, scale:.97}, {y:0, opacity:1, scale:1, duration:.45, ease:'power3.out'});
}
function closeProject(){ pm.hidden = true; lenis && lenis.start(); $('#reelMore').focus({preventScroll:true}); }
$('#reelMore').addEventListener('click', ()=>openProject(reelIdx));
pm.addEventListener('click', e=>{ if(e.target.closest('[data-close-p]')) closeProject(); });
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && !pm.hidden) closeProject(); });

/* ---------- D. CONTACT：揭幕 + 滚动控制视频 + 字幕 + 表单 ---------- */
let scrubVideo = null, scrubTarget = 0, scrubRaf = 0;
function bindScrubVideo(){ scrubVideo = $('#contact video'); if(scrubVideo) scrubVideo.pause(); }
bindScrubVideo();
function seek(){
  scrubRaf = 0;
  if(scrubVideo && scrubVideo.readyState >= 1 && scrubVideo.duration){
    const t = scrubTarget * (scrubVideo.duration - .05);
    if(Math.abs(scrubVideo.currentTime - t) > .02) scrubVideo.currentTime = t;
  }
}
const film = gsap.timeline({
  defaults:{ease:'none'},
  scrollTrigger:{id:'pin-contact', refreshPriority:1, trigger:'#contact', start:'top top', end:'+=400%', pin:true, scrub: reduce ? true : .8, anticipatePin:1}
});
// 进场：画面像一扇窗从下方展开
if(!reduce){
  gsap.fromTo('#stage', {clipPath:'inset(18% 10% 0% 10% round 28px)'}, {clipPath:'inset(0% 0% 0% 0% round 0px)', ease:'none',
    scrollTrigger:{trigger:'#contact', start:'top bottom', end:'top top', scrub:true}});
}
const proxy = {t:0};
film
  .to(proxy, {t:1, duration:10, onUpdate:()=>{ scrubTarget = proxy.t; if(!scrubRaf) scrubRaf = requestAnimationFrame(seek); }}, 0)
  .fromTo('.film-hint', {opacity:1}, {opacity:0, duration:.6}, 1.4)
  .fromTo('#slogan', {opacity:0, y:40, filter:'blur(10px)'}, {opacity:1, y:0, filter:'blur(0px)', duration:.8, ease:'power2.out'}, 2.2)
  .to('#slogan', {opacity:0, y:-30, duration:.6}, 4.2)
  .fromTo('#ccard', {autoAlpha:0, y:80, scale:.96, filter:'blur(12px)'}, {autoAlpha:1, y:0, scale:1, filter:'blur(0px)', duration:1, ease:'power3.out'}, 5.2)
  .to({}, {duration:3.8});   // 表单停留

$('#contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  const email = $('#cEmail').value.trim(), note = $('#cNote');
  if(!$('#cName').value.trim()){ note.style.color='var(--hot)'; note.textContent = 'Enter your name.'; $('#cName').focus(); return; }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ note.style.color='var(--hot)'; note.textContent = 'Enter a valid email address.'; $('#cEmail').focus(); return; }
  note.style.color='var(--ok)';
  note.textContent = 'Demo form: nothing was sent. Connect it to your email or a form service before launch.';
});

/* =========================================================
   5. AI 助手（预设回复）
   ========================================================= */
const REPLIES = {
  projects:{a:'Five projects on the reel: a personal AI agent with long-term memory, RAGChef (recipe QA with RAG), Eco Guardian (a React + PHP learning app for kids), a restaurant pickup-ordering site, and a Java OOP shop system. Tap View details on any frame.', go:'projects'},
  timeline:{a:'Currently Volunteer Software Engineer at Girls in Data (Power Platform, JavaScript). Before that, AI Engineering Intern at Beijing Guhai Tingchao Technology, building Django REST + Celery + LLM features for a clinical documentation tool.', go:'timeline'},
  skills:{a:'Four modules: Engineering, AI Engineering, Generative AI, and Design & Media.', go:'skills'},
  contact:{a:'The contact form is in the last chapter. An email and one line is enough.', go:'contact'}
};
const KEYS = [['projects',/project|work|portfolio|built/i],['timeline',/journey|timeline|experience|career|cv|resume/i],['skills',/skill|stack|tech|python|ai|rag|agent|react/i],['contact',/contact|hire|email|role|job|reach/i]];
const aiLog = $('#aiLog');
function say(who, txt, me){
  const d = document.createElement('div'); d.className = 'msg' + (me?' msg--me':'');
  d.innerHTML = `<span class="msg__who">${who}</span><div class="msg__txt"></div>`;
  d.querySelector('.msg__txt').textContent = txt;
  aiLog.appendChild(d); aiLog.scrollTop = aiLog.scrollHeight;
}
function answer(key, q){
  if(q) say('YOU', q, true);
  setTimeout(()=>{
    const r = REPLIES[key];
    if(r){ say('YAN.AI', r.a); setTimeout(()=>scrollToY(sectionTop(r.go)), 500); }
    else say('YAN.AI', 'I\'m running scripted replies for now, so I only know projects, timeline, stack and contact. Connect an LLM API and I can chat freely.');
  }, 380);
}
const openAI = () => { $('#aiPanel').hidden = false; $('#aiInput').focus({preventScroll:true}); };
$$('[data-open-ai]').forEach(b=>b.addEventListener('click', openAI));
$('#aiClose').addEventListener('click', ()=>$('#aiPanel').hidden = true);
$$('.ai__quick button').forEach(b=>b.addEventListener('click', ()=>answer(b.dataset.ask, b.textContent)));
$('#aiForm').addEventListener('submit', e=>{
  e.preventDefault(); const q = $('#aiInput').value.trim(); if(!q) return;
  $('#aiInput').value = '';
  const hit = KEYS.find(([,re])=>re.test(q)); answer(hit ? hit[0] : null, q);
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape'){ $('#aiPanel').hidden = true; $('#drawer').hidden = true; } });

/* 时钟 */
const tick = () => { $('#clock').textContent = new Date().toLocaleTimeString('en-GB',{hour12:false}); };
tick(); setInterval(tick, 1000);

ScrollTrigger.refresh();
window.addEventListener('load', ()=>ScrollTrigger.refresh());
