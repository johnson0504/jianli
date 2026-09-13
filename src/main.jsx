import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowDown, ArrowRight, X, Menu, Download, Copy, Check, MapPin, Mail, Phone, BrainCircuit, Workflow, ScanLine, Terminal, PenTool, Pause, Play, Github, ExternalLink, Compass, Sparkles, ChevronDown } from 'lucide-react';
import { projects, abilities, resumeFiles, asset, profile } from './data';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/space-grotesk';
import './styles.css';
import ProjectGallery from './ProjectGallery';
import BanknotePortrait from './BanknotePortrait';
import '@fontsource/bebas-neue/latin-400.css';
import '@fontsource/barlow-condensed/latin-600.css';
import './light-theme.css';
import './motion.css';
import { usePortfolioMotion } from './PortfolioMotion';

function OrbitMark({ className = '' }) {
  return <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true"><ellipse cx="24" cy="24" rx="21" ry="9" transform="rotate(-38 24 24)"/><ellipse cx="24" cy="24" rx="21" ry="9" transform="rotate(38 24 24)"/><circle cx="24" cy="24" r="3" fill="currentColor" stroke="none"/></svg>;
}

function SectionTitle({ no, en, title, subtitle }) {
  return <div className="section-heading"><div data-reveal="0"><p className="eyebrow"><span>{no} /</span> {en}</p><h2>{title}<span className="accent">.</span></h2></div>{subtitle && <p className="section-intro" data-reveal="1">{subtitle}</p>}</div>;
}

function Cover({ project }) {
  const p=project;
  return <div className={`project-cover cover-${p.id}`} aria-hidden="true">
    <div className="cover-topline"><span>{p.type}</span><span>↗</span></div>
    {p.id==='mindlink' && <><div className="mindlink-art"><div className="cover-wordmark"><img src={asset('images/mindlink-logo.webp')} alt=""/><span>MindLink<span>心链 · 让心被听见</span></span></div><div className="browser-frame"><div className="browser-bar"><i/><i/><i/><span>mindlink.chat</span></div><img loading="lazy" src={asset('images/mindlink.webp')} alt=""/></div><div className="floating-note"><span className="pulse-dot"/> AI, with a human touch.</div></div><span className="cover-caption">产品公开页面 · 实站截图</span></>}
    {p.id==='characters' && <><div className="character-art"><div className="big-character">字<span>形</span></div><div className="character-aside"><span>让文字的时间<br/>重新流动。</span><b>5,661<span>字形档案 / GLYPHS</span></b></div><div className="dynasty-line"><span>商</span><i/><span>周</span><i/><span>秦</span><i/><span>…</span></div></div><span className="cover-caption">839 个字头 · 7 个朝代分类</span></>}
    {p.id==='openclaw' && <><div className="workflow-art"><div className="workflow-orbit"/><div className="workflow-node n1"><Terminal size={18}/><span>INPUT<span>接收任务</span></span></div><div className="workflow-core"><OrbitMark/><span>OpenClaw</span><small>THINK. CONNECT. EXECUTE.</small></div><div className="workflow-node n2"><BrainCircuit size={18}/><span>MEMORY<span>LanceDB</span></span></div><div className="workflow-node n3"><Workflow size={18}/><span>SKILL<span>执行工作流</span></span></div></div><span className="cover-caption">AGENT WORKFLOW / 能力流程示意</span></>}
    {p.id==='support' && <><div className="support-art"><div className="support-label"><span className="chat-symbol">↳</span><span>有问题。<br/><b>就有解。</b></span></div><div className="support-screen"><img loading="lazy" src={asset('images/support-app.webp')} alt=""/></div></div><span className="cover-caption">智能客服 · 在线体验实站截图</span></>}
    {p.id==='robotics' && <><div className="robotics-art"><svg viewBox="0 0 700 280"><defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="currentColor" strokeWidth=".5"/></pattern></defs><path d="M60 248L266 40H455L660 248Z" fill="url(#grid)" opacity=".3"/><g stroke="currentColor" fill="none"><path d="M238 101L383 74L469 111L322 147Z M238 101V150L322 194L469 150V111 M322 147V194 M253 157L228 216L245 240 M304 187L290 235L308 251 M400 175L424 224L448 239 M453 157L477 197L500 210" strokeWidth="2"/><path d="M291 88V53L321 42L348 50V81 M291 53L319 63L348 50 M319 63V85"/><circle cx="321" cy="103" r="83" strokeDasharray="2 7" opacity=".4"/><circle cx="321" cy="103" r="112" strokeDasharray="2 7" opacity=".2"/></g><g fill="currentColor">{Array.from({length:65},(_,i)=><circle key={i} cx={180+Math.sin(i*41)*130} cy={80+Math.cos(i*7)*65} r={1.2}/>)}</g><text x="510" y="82" fill="currentColor" fontSize="10" fontFamily="monospace">POINT CLOUD</text><path d="M505 92H462L430 110" stroke="currentColor" fill="none"/></svg><span className="robot-label">LIDAR → ROBOT → PC</span></div><span className="cover-caption">机器人交付 / 概念示意</span></>}
    {p.id==='market' && <><div className="market-art"><div className="market-title"><img loading="lazy" src={asset('images/market-logo.webp')} alt=""/><span>给每份热爱，<br/>留一个摊位。</span></div><div className="market-flow"><div><small>01</small><span>选择摊位</span></div><ArrowRight/><div><small>02</small><span>提交预约</span></div><ArrowRight/><div><small>03</small><span>后台管理</span></div></div></div><span className="cover-caption">微信小程序 / 核心流程示意</span></>}
    <span className="cover-view">查看项目 <ArrowUpRight size={17}/></span>
  </div>;
}

function App() {
  const [menu,setMenu]=useState(false), [active,setActive]=useState('home'), [filter,setFilter]=useState('全部作品'), [ability,setAbility]=useState(0), [modal,setModal]=useState(null), [toast,setToast]=useState(''), [motion,setMotion]=useState(()=>!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const video=useRef(null), dialog=useRef(null), toastTimer=useRef(null);
  const [onHero,setOnHero]=useState(true), [videoFailed,setVideoFailed]=useState(false);
  const beforeFilter = usePortfolioMotion(filter, ability, modal);
  const [compactTabs,setCompactTabs]=useState(()=>window.matchMedia('(max-width:600px)').matches);
  useEffect(()=>{const media=window.matchMedia('(max-width:600px)');const change=()=>setCompactTabs(media.matches);media.addEventListener('change',change);return()=>media.removeEventListener('change',change)},[]);

  useEffect(()=>{
    const header=document.querySelector('.header-inner');
    const sections=[...document.querySelectorAll('main > section[id]')];
    const anchor=section=>section.querySelector('.section-heading,.contact-top')||section;
    let frame=0,disposed=false;
    const update=()=>{
      const height=header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-height',`${height}px`);
      const current=sections.filter(section=>anchor(section).getBoundingClientRect().top<=height+48).at(-1);
      setActive(current?.id||'home');
      setOnHero(document.getElementById('home').getBoundingClientRect().bottom>height);
    };
    const schedule=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(update)};
    const jump=(hash,behavior='instant')=>{
      const section=sections.find(section=>`#${section.id}`===hash);
      if(!section)return;
      window.dispatchEvent(new CustomEvent('portfolio:navigate',{detail:{id:section.id}}));
      const target=anchor(section);
      const top=section.id==='home'?0:window.scrollY+target.getBoundingClientRect().top-header.getBoundingClientRect().height-24;
      window.scrollTo({top:Math.max(0,top),behavior});
      setActive(section.id);
    };
    const click=event=>{
      const link=event.target.closest('a[href^="#"]');
      if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      const hash=link.getAttribute('href');
      if(!sections.some(section=>`#${section.id}`===hash))return;
      event.preventDefault();setMenu(false);
      if(window.location.hash!==hash)window.history.pushState(null,'',hash);
      jump(hash,window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth');
    };
    const restore=()=>jump(window.location.hash||'#home');
    const resize=new ResizeObserver(schedule);resize.observe(header);resize.observe(document.querySelector('main'));
    update();document.fonts.ready.then(()=>{if(!disposed){if(window.location.hash)restore();update()}});
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);window.addEventListener('popstate',restore);window.addEventListener('hashchange',restore);
    document.addEventListener('click',click);
    return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.removeEventListener('popstate',restore);window.removeEventListener('hashchange',restore);document.removeEventListener('click',click)};
  },[]);
  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const change=()=>setMotion(!media.matches);media.addEventListener('change',change);
    return ()=>media.removeEventListener('change',change);
  },[]);
  useEffect(()=>{
    const el=video.current;
    const observer=new IntersectionObserver(([entry])=>{
      if(motion&&!videoFailed&&entry.isIntersecting)el?.play().catch(()=>setMotion(false));else el?.pause();
    },{threshold:0.05});
    observer.observe(document.getElementById('home'));
    if(!motion)el?.pause();
    return ()=>observer.disconnect();
  },[motion,videoFailed]);
  useEffect(()=>{
    const el=dialog.current;
    if(modal){el.showModal();document.body.style.overflow='hidden';}
    else {el.close();document.body.style.overflow='';}
    return ()=>{document.body.style.overflow=''};
  },[modal]);
  useEffect(()=>()=>clearTimeout(toastTimer.current),[]);

  const copy=async(text,label)=>{
    try {await navigator.clipboard.writeText(text);setToast(`${label}已复制`);}
    catch {setToast(`请手动复制：${text}`);}
    clearTimeout(toastTimer.current);toastTimer.current=setTimeout(()=>setToast(''),4000);
  };
  const go=()=>setMenu(false);
  const nav=[['about','关于我'],['projects','精选作品'],['abilities','能力'],['experience','经历']];
  const visible=filter==='全部作品'?projects:projects.filter(p=>p.category===filter);

  return <>
    <a className="skip-link" href="#projects">跳转到精选作品</a>
    <header className={`header ${onHero?'header-on-hero':'header-on-paper'} ${menu?'header-menu-open':''}`}><div className="header-inner shell">
      <a className="brand" href="#home" aria-label="Johnson 首页" onClick={go}><OrbitMark/><span>JOHNSON<span className="brand-dot">.</span></span></a>
      <nav id="primary-menu" className={menu?'nav is-open':'nav'} aria-label="主导航">{nav.map(([id,label],i)=><a key={id} href={`#${id}`} className={active===id?'active':''} aria-current={active===id?'location':undefined} onClick={go}><span>0{i+1}</span>{label}</a>)}<button className="mobile-resume" onClick={()=>{setModal({type:'resumes'});setMenu(false)}}>查看简历 <Download size={14}/></button></nav>
      <div className="header-actions"><span className="availability"><i/>开放工作机会</span><a href="#contact" className="nav-contact" data-magnet onClick={go}><span className="magnet-inner">聊一聊 <ArrowUpRight size={16}/></span></a><button className="menu-toggle icon-button" aria-controls="primary-menu" aria-expanded={menu} aria-label={menu?'收起导航':'展开导航'} onClick={()=>setMenu(!menu)}><span>{menu?'关闭':'MENU'}</span>{menu?<X/>:<Menu/>}</button></div>
    </div></header>

    <main>
      <section id="home" className="hero">
        <div className={`hero-media ${videoFailed?'video-failed':''}`}>
          <img className="hero-poster" src={asset('media/minecraft-garden-poster.webp')} alt="" fetchPriority="high"/>
          <video ref={video} autoPlay={motion} muted loop playsInline preload="metadata" poster={asset('media/minecraft-garden-poster.webp')} onError={()=>{setVideoFailed(true);setMotion(false)}} aria-hidden="true"><source src={asset('media/minecraft-garden.mp4')} type="video/mp4" onError={()=>{setVideoFailed(true);setMotion(false)}}/></video>
        </div>
        <div className="hero-inner shell"><div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="hero-status-dot"/> A CURIOUS MIND, AN OPEN WORLD.</p>
          <h1><span className="hero-title-mask"><span className="hero-johnson">JOHNSON<span>.</span></span></span><span className="hero-creative">CREATIVE DEVELOPER</span></h1>
          <div className="hero-introduction"><p className="hero-name">你好，我是{profile.name} <span>独立 AI 应用开发者 / 产品交互设计师</span></p>
          <p className="hero-description">把想象，写成现实。<br/>在代码、设计与开放世界之间，创造有意思的东西。</p></div>
          <div className="hero-buttons"><a className="button button-lime" data-magnet data-shimmer href="#projects"><span className="magnet-inner">探索我的作品 <ArrowUpRight size={19}/></span></a><button className="button button-quiet" data-magnet onClick={()=>setModal({type:'resumes'})}><span className="magnet-inner">查看 / 下载简历 <Download size={17}/></span></button></div>
        </div>
        <div className="hero-field-note"><span>01 / THE OPEN WORLD</span><p>保持好奇。<br/>世界，等着被创造。</p><span>{profile.coordinates}</span></div>
        <div className="hero-bottom"><a href="#about" className="scroll-note"><span className="scroll-circle"><ArrowDown size={16}/></span> 向下探索 <span className="mono">SCROLL TO EXPLORE</span></a><span className="hero-location"><MapPin size={13}/> 中国 · {profile.city} <span className="mono">BASED ON EARTH</span></span><button className="motion-toggle" disabled={videoFailed} onClick={()=>setMotion(!motion)} aria-label={motion?'暂停背景动画':'播放背景动画'}>{motion?<Pause size={13}/>:<Play size={13}/>}<span>{videoFailed?'静态背景':motion?'MOTION ON':'MOTION OFF'}</span></button></div>
        </div>
      </section>

      <div className="craft-strip"><div className="shell"><span>CURIOUS BY NATURE.</span><span><Sparkles size={14}/> AI APPLICATIONS</span><span><PenTool size={14}/> PRODUCT DESIGN</span><span><Workflow size={14}/> AUTOMATION</span><span><ScanLine size={14}/> ENGINEERING</span><span className="strip-star">✳</span></div></div>

      <section id="about" className="about section shell">
        <SectionTitle no="01" en="THE PERSON BEHIND THE PIXELS" title="保持好奇，动手创造"/>
        <div className="about-grid"><div className="portrait-motion" data-reveal="0"><BanknotePortrait/></div>
        <div className="about-copy" data-reveal="1"><p className="about-kicker"><span className="pulse-dot"/> ABOUT ME</p><h3>想清楚产品，<br/>也把它<span>做出来。</span></h3><p>我是张宸与，一名在{profile.city}的独立 AI 应用开发者与产品交互设计师。我喜欢把模糊的需求拆成清晰的流程，再一步步做成可以使用的产品。</p><p>从心理健康 AI 平台、古文字数据库，到 Agent 自动化与机器人调试，我的实践横跨设计、开发和交付。技术售后的经历，也让我更关心真实用户遇到的每一个问题。</p><div className="about-facts"><span><MapPin size={15}/>现居{profile.city}</span><span>AI 应用 / 全栈开发 / 产品交互</span></div><button className="text-link" onClick={()=>setModal({type:'resumes'})}>了解完整经历 <ArrowUpRight size={17}/></button></div></div>
        <div className="stats-row" data-reveal="0"><div><span className="stat-value">06<span> / projects</span></span><p>从 AI 产品到真实世界的项目实践</p></div><div><span className="stat-value">5,661<span> / glyphs</span></span><p>古文字字形元数据 · 839 个字头</p></div><div><span className="stat-value">≈150<span> / daily</span></span><p>实习日均技术支持人次 · 高峰接近 300</p></div><div className="stat-philosophy"><OrbitMark/><span>DESIGN IT.<br/>BUILD IT.<br/><b>MAKE IT WORK.</b></span></div></div>
      </section>

      <section id="projects" className="projects-section section shell">
        <SectionTitle no="02" en="SELECTED WORK / 2024—2026" title="想法落地的样子" subtitle={<>一些已经发生的探索。<br/>每一个项目，都是一次从问题到答案的实践。</>}/>
        <div className="project-toolbar"><div className="filters" aria-label="作品分类">{['全部作品','AI 应用','自动化','工程交付'].map(f=><button className={filter===f?'selected':''} key={f} aria-pressed={filter===f} onClick={()=>{if(f!==filter){beforeFilter();setFilter(f)}}}>{f}{f==='全部作品'&&<span>06</span>}</button>)}</div><span className="mono filter-count" role="status">{String(visible.length).padStart(2,'0')} PROJECTS</span></div>
        <div className="project-grid">{projects.map((p,i)=><article className="project-card" key={p.id} data-flip-id={p.id} inert={!visible.includes(p)} aria-hidden={!visible.includes(p)} style={{display:visible.includes(p)?undefined:'none'}}><div className="project-card-inner" data-reveal={i%2}><button className="project-visual" aria-label={`查看${p.name}项目详情`} onClick={()=>setModal({type:'project',project:p})}><Cover project={p}/><span className="project-cursor" aria-hidden="true">查看项目 <ArrowUpRight size={16}/></span></button><div className="project-info"><div className="project-title"><div><span className="project-number">/{p.no}</span><h3><button onClick={()=>setModal({type:'project',project:p})}>{p.name}</button></h3></div><button className="round-arrow" data-magnet aria-label={`打开${p.name}详情`} onClick={()=>setModal({type:'project',project:p})}><span className="magnet-inner"><ArrowUpRight size={21}/></span></button></div><p>{p.description}</p><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div><div className="project-meta"><span>{p.role}</span><div className="project-meta-end"><span>{p.date}</span>{p.url&&<a href={p.url} target="_blank" rel="noreferrer">访问作品 <ArrowUpRight size={14}/></a>}</div></div></div></div></article>)}</div>
        <div className="project-outro"><span>探索没有终点，作品持续生长。</span><span className="mono">ALWAYS A WORK IN PROGRESS <span className="accent">↗</span></span></div>
      </section>

      <section id="abilities" className="abilities-section section chapter-section">
        <div className="chapter-background" aria-hidden="true"/>
        <div className="shell"><SectionTitle no="03" en="A CONNECTED SKILLSET" title="能力之间，没有围墙" subtitle={<>用项目连接能力，<br/>用真实交付检验想法。</>}/>
          <div className="ability-layout">
            <div className="ability-tabs" data-reveal="0" role="tablist" aria-label="能力方向" aria-orientation={compactTabs?'horizontal':'vertical'}>
              {abilities.map((a,i)=><button role="tab" tabIndex={ability===i?0:-1} aria-selected={ability===i} aria-controls="ability-panel" id={`ability-${i}`} key={a.label} className={ability===i?'selected':''} onClick={()=>setAbility(i)} onKeyDown={e=>{
                if(['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End'].includes(e.key)){
                  e.preventDefault();
                  const step=compactTabs&&['ArrowDown','ArrowUp'].includes(e.key)?2:1;
                  const next=e.key==='Home'?0:e.key==='End'?abilities.length-1:(i+(['ArrowDown','ArrowRight'].includes(e.key)?step:-step)+abilities.length)%abilities.length;
                  setAbility(next);document.getElementById(`ability-${next}`).focus();
                }
              }}><span className="mono">0{i+1}</span>{a.label}<ArrowUpRight size={20}/></button>)}
            </div>
            <div className="ability-panel" data-reveal="1" id="ability-panel" role="tabpanel" aria-labelledby={`ability-${ability}`} tabIndex={0}>
              {abilities.map((a,i)=>{const Icon={brain:BrainCircuit,design:PenTool,workflow:Workflow,terminal:Terminal}[a.icon];return <div key={a.label} className={`ability-content ${i===ability?'is-current':''}`} aria-hidden={i!==ability} inert={i!==ability}>
                <div className="ability-icon"><Icon size={34}/></div><p className="eyebrow">{a.en}</p><h3>{a.title}</h3><p className="ability-description">{a.description}</p><div className="tags">{a.skills.map(s=><span key={s}>{s}</span>)}</div><p className="ability-proof"><span>IN PRACTICE</span>{a.proof}</p>
              </div>})}
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section section shell"><SectionTitle no="04" en="EXPERIENCE & MILESTONES" title="在真实问题中成长"/>
        <div className="experience-layout"><aside className="experience-aside"><div className="field-note" data-reveal="0"><div className="field-note-heading"><span>工作手记</span><Compass size={22}/></div><p>每一次现场，<br/>都是下一次创造的起点。</p><ol className="practice-steps"><li><span>01</span><div><b>理解问题</b><small>倾听描述，复现使用场景</small></div></li><li><span>02</span><div><b>找到原因</b><small>排查环境，验证解决方法</small></div></li><li><span>03</span><div><b>沉淀经验</b><small>整理知识，把重复操作变成工具</small></div></li></ol><span className="field-note-signature">保持好奇，直到问题被解决。</span></div><div className="experience-evidence" data-reveal="1"><span className="eyebrow">现场实践 · 技术支持实习</span><div><b>≈150</b><span>日均支持人次</span></div><p>从安装配置、故障排查<br/>到知识库与内部工具。</p></div></aside><div className="timeline">
        <details className="timeline-item" data-reveal="0" open><summary><span className="timeline-date">2026.06.01 — 2026.07.09</span><span className="timeline-title"><b>时空智联科技有限公司</b><span>技术售后客服 · 实习</span></span><ChevronDown size={20}/></summary><div className="timeline-body"><p>支持 Claude Code、Codex 的安装、API 配置和使用排错，日均约 150 人次，高峰接近 300 人次。</p><ul><li>核对模型 / 站点权限、域名和 API Key，定位 npm 多版本、PATH 与 Git Bash 环境问题。</li><li>处理 400 / 401 / 403、thinking 参数和输出超限；区分 502 / 504 服务异常与 Cloudflare 524 上游响应超时。</li><li>借助 AI 开发模型可用性查询、Key 额度调整、兑换码批量生成等内部工具。</li><li>整理《Claude 报错解决办法》知识库，沉淀 11 类常见问题，提供远程协助、续费指引与开票支持。</li></ul><div className="experience-highlight"><Terminal size={18}/><p>把高频问题整理成知识，把重复操作变成工具。<small>开票信息快捷填写耗时减少约 70%，为个人估算。</small></p></div></div></details>
        <details className="timeline-item" data-reveal="0"><summary><span className="timeline-date">2024.10 — 2025.02</span><span className="timeline-title"><b>消防栓智能监测系统</b><span>后台数据平台开发 · 实习</span></span><ChevronDown size={20}/></summary><div className="timeline-body"><p>参与传感器数据接入与处理、数据库设计和 API 开发，保障监测数据存储与实时传输。</p><p>优化状态可视化界面，帮助运维人员识别设备运行状态、定位故障设备。</p><div className="tags"><span>数据接入</span><span>API 开发</span><span>数据可视化</span></div></div></details>
        <details className="timeline-item" data-reveal="0"><summary><span className="timeline-date">2023.09 — 2026.06</span><span className="timeline-title"><b>深圳信息职业技术大学</b><span>计算机与软件 · 教育经历</span></span><ChevronDown size={20}/></summary><div className="timeline-body"><p>主修 Python 程序设计、数据爬取与可视化、机器视觉、云计算、计算机网络、数据库设计、Web 前端、Vue.js 与移动应用交互设计。</p><p className="small-note">教育时间依据前端、后端与 AI 方向三份原始简历。</p></div></details>
        <div className="credentials" data-reveal="0"><p className="eyebrow">LEARNING NEVER STOPS</p><div><span>AWS Certified AI Practitioner</span><span>HCIA-AI Solution</span><span>HarmonyOS 应用开发者高级认证</span><span>CET-4</span></div><p>广东省大学生数学建模竞赛 · 三等奖<span>第八届“深信杯”数学建模竞赛 · 二等奖*</span></p><small>* 依据前三份原稿；4.15 版记载为一等奖，各版本随完整简历保留。</small></div>
        </div></div>
      </section>

      <section id="contact" className="contact-section chapter-section"><div className="chapter-background" aria-hidden="true"><div className="contact-orbit"><OrbitMark/></div></div><div className="shell contact-inner"><div className="contact-top"><p className="eyebrow"><span>05 /</span> NEXT CHAPTER</p><span className="availability"><i/>期待新的机会与合作</span></div><div className="contact-main" data-reveal="0"><p className="contact-preface">一个好想法，值得一次对话。</p><h2>下一段故事，<br/>一起<span>创造。</span><ArrowUpRight/></h2><p className="contact-desc">正在寻找 AI 应用开发、全栈开发与产品交互相关机会。<br/>如果你也相信动手创造的力量，我们聊聊。</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight/></a><div className="contact-links"><a href={`tel:${profile.phone}`}><Phone size={17}/>{profile.phoneDisplay}<ArrowUpRight size={15}/></a><button onClick={()=>copy(profile.wechat,'微信号')}><Copy size={16}/>微信 {profile.wechat}<span>复制</span></button><button onClick={()=>setModal({type:'resumes'})}><Download size={17}/>下载简历<ArrowUpRight size={15}/></button></div></div><footer><a className="brand" href="#home"><OrbitMark/><span>JOHNSON.</span></a><p>© {new Date().getFullYear()} 张宸与<span>GUANGZHOU · BUILT WITH CURIOSITY & CODE.</span></p><a className="back-to-top" href="#home">回到顶部 <ArrowUpRight size={16}/></a></footer></div></section>
    </main>

    <dialog ref={dialog} className="detail-dialog" aria-labelledby="dialog-title" onCancel={()=>setModal(null)} onClick={e=>{if(e.target===dialog.current)setModal(null)}}><div className="dialog-inner"><button className="dialog-close icon-button" aria-label="关闭弹窗" autoFocus onClick={()=>setModal(null)}><X size={21}/></button>{modal?.type==='project'&&<ProjectDetail key={modal.project.id} project={modal.project}/>} {modal?.type==='resumes'&&<div className="resume-dialog"><p className="eyebrow">A CLOSER LOOK</p><h2 id="dialog-title">选择一份简历<span className="accent">.</span></h2><p>按岗位方向，了解更完整的项目与经历。</p><div className="resume-options">{resumeFiles.map(r=><a href={asset(`resumes/${r.file}.pdf`)} key={r.file} download={`张宸与-${r.name}.pdf`}><span><b>{r.name}</b><small>{r.desc}</small></span><Download size={22}/></a>)}</div><p className="small-note">四份简历均保留原版照片、二维码与项目图片，并包含技术售后实习经历。</p></div>}</div></dialog>
    <div className={`toast ${toast?'visible':''}`} role="status" aria-live="polite"><Check size={16}/>{toast}</div>
  </>;
}

function ProjectDetail({project:p}) {
  return <div className="project-detail"><p className="eyebrow">PROJECT / {p.no} — {p.type}</p><h2 id="dialog-title">{p.name}</h2><p className="detail-subtitle">{p.subtitle}</p><div className="detail-meta"><span>{p.role}</span><span>{p.date}</span></div><p className="detail-intro">{p.intro}</p>{p.gallery?.length>0&&<ProjectGallery images={p.gallery} projectName={p.name}/>}<h3>我的工作与实现</h3><ul>{p.contributions.map(c=><li key={c}>{c}</li>)}</ul><div className="detail-outcome"><span className="eyebrow">OUTCOME</span><p>{p.outcome}</p></div><div className="tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div>{p.url&&<div className="detail-links"><a className="button button-lime" href={p.url} target="_blank" rel="noreferrer">访问作品 <ExternalLink size={16}/></a>{p.repo&&<a className="button button-quiet" href={p.repo} target="_blank" rel="noreferrer"><Github size={16}/>查看源码</a>}{p.qr&&<figure className="project-qr"><img src={asset(`images/${p.qr}.webp`)} alt={`${p.name}原始简历中的作品二维码`}/><figcaption>原简历作品二维码</figcaption></figure>}</div>}<p className="detail-note">{p.note}</p></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
