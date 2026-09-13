import { asset, profile } from './data';

export default function BanknotePortrait() {
  return <figure className="banknote" data-shimmer aria-label="张宸与的纸币风格个人名片">
    <div className="banknote-art">
    <svg className="banknote-engraving" viewBox="0 0 720 420" fill="none" aria-hidden="true">
      <defs><pattern id="note-wave" width="18" height="12" patternUnits="userSpaceOnUse"><path d="M-9 6Q0-6 9 6T27 6M-9 12Q0 0 9 12T27 12" stroke="currentColor" strokeWidth=".45"/></pattern></defs>
      <rect x="12" y="12" width="696" height="396" rx="3" stroke="currentColor" strokeWidth="2"/>
      <rect x="19" y="19" width="682" height="382" rx="2" stroke="currentColor" strokeWidth=".6"/>
      <rect x="28" y="28" width="664" height="364" fill="url(#note-wave)" opacity=".38"/>
      {[0,1,2,3,4,5].map(i=><ellipse key={i} cx="360" cy="213" rx={127+i*3} ry={151+i*3} stroke="currentColor" strokeWidth={i===5?1.2:.6}/>)}
      <path d="M40 70H194M526 70H680M40 352H190M530 352H680" stroke="currentColor"/>
    </svg>
    <div className="banknote-top"><span>独立创造 · 人物小记</span><span>{profile.city}</span></div>
    <div className="banknote-photo"><img src={asset('images/portrait-engraved.webp')} alt="张宸与原照片的黑白网点肖像" loading="lazy"/></div>
    </div>
    <p className="banknote-signature">保持好奇<span aria-hidden="true"> · </span>动手创造</p>
    <figcaption><span className="banknote-name">{profile.name}<small>JOHNSON</small></span><p>独立 AI 应用开发者<br/>产品交互设计师</p></figcaption>
  </figure>;
}