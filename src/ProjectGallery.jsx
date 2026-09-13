import { useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, ZoomIn, ZoomOut } from 'lucide-react';
import { asset } from './data';
import './gallery.css';

export default function ProjectGallery({ images, projectName }) {
  const [index,setIndex]=useState(0),[full,setFull]=useState(false),[zoom,setZoom]=useState(false);
  const openButton=useRef(null),backButton=useRef(null),scroll=useRef(0);
  const item=images[index];
  const close=()=>{setFull(false);setZoom(false);requestAnimationFrame(()=>{const dialog=openButton.current?.closest('dialog');if(dialog)dialog.scrollTop=scroll.current;openButton.current?.focus({preventScroll:true})})};
  const open=()=>{scroll.current=openButton.current.closest('dialog').scrollTop;setFull(true);requestAnimationFrame(()=>backButton.current?.focus())};
  return <div className={`project-gallery ${full?'gallery-expanded':''}`} onKeyDownCapture={e=>{if(full&&e.key==='Escape'){e.preventDefault();e.stopPropagation();close()}}}>
    <div className="gallery-standard" hidden={full}>
      <div className="gallery-heading"><span className="eyebrow">PRODUCT IN ACTION</span><span>{index+1} / {images.length}</span></div>
      <figure className="gallery-figure" key={item.src}><button className="gallery-image-button" onClick={open} aria-label={`放大${item.title}`}><img src={asset(item.src)} alt={item.alt}/></button><figcaption><b>{item.title}</b><span>{item.caption}</span></figcaption></figure>
      <div className="gallery-actions"><div className="gallery-thumbnails" aria-label={`${projectName}页面选择`}>{images.map((image,i)=><button key={image.src} aria-pressed={i===index} className={i===index?'selected':''} onClick={()=>setIndex(i)}><img src={asset(image.src)} alt="" loading="lazy"/><span>{image.title}</span></button>)}</div><button ref={openButton} className="text-link" onClick={open}>查看完整长图 <ArrowUpRight size={16}/></button></div>
    </div>
    {full&&<section className="gallery-lightbox" aria-label={`${item.title}完整图片`}>
      <div className="gallery-lightbox-toolbar"><button ref={backButton} onClick={close}><ArrowLeft size={18}/> 返回项目详情</button><span>{item.title}</span><button onClick={()=>setZoom(!zoom)} aria-pressed={zoom}>{zoom?<ZoomOut size={17}/>:<ZoomIn size={17}/>}<span>{zoom?'适应宽度':'放大细节'}</span></button></div>
      <div className="gallery-lightbox-scroll"><img className={zoom?'is-zoomed':''} src={asset(item.fullSrc||item.src)} alt={item.alt}/><p>{item.caption}</p></div>
    </section>}
  </div>;
}
