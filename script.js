
(function(){
  const canvas=document.getElementById('canvas');
  const ctx=canvas.getContext('2d');
  let W,H,particles=[];
  const COUNT=80,DIST=130,MOUSE={x:-999,y:-999};

  function resize(){
    W=canvas.width=window.innerWidth;
    H=canvas.height=window.innerHeight;
  }
  window.addEventListener('resize',resize);
  resize();

  document.addEventListener('mousemove',e=>{MOUSE.x=e.clientX;MOUSE.y=e.clientY});

  class P{
    constructor(){this.reset()}
    reset(){
      this.x=Math.random()*W;
      this.y=Math.random()*H;
      this.vx=(Math.random()-.5)*.35;
      this.vy=(Math.random()-.5)*.35;
      this.r=Math.random()*1.5+.5;
    }
    update(){
      this.x+=this.vx; this.y+=this.vy;
      if(this.x<0||this.x>W)this.vx*=-1;
      if(this.y<0||this.y>H)this.vy*=-1;
    }
  }

  for(let i=0;i<COUNT;i++)particles.push(new P());

  function draw(){
    ctx.clearRect(0,0,W,H);
    // draw edges
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x,
              dy=particles[i].y-particles[j].y,
              d=Math.sqrt(dx*dx+dy*dy);
        if(d<DIST){
          const a=(1-d/DIST)*0.38;
          ctx.strokeStyle=`rgba(99,102,241,${a})`;
          ctx.lineWidth=.7;
          ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke();
        }
      }
      // mouse connection
      const dx2=particles[i].x-MOUSE.x,dy2=particles[i].y-MOUSE.y;
      const dm=Math.sqrt(dx2*dx2+dy2*dy2);
      if(dm<180){
        const a2=(1-dm/180)*.6;
        ctx.strokeStyle=`rgba(34,211,238,${a2})`;
        ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(MOUSE.x,MOUSE.y);ctx.stroke();
      }
    }
    // draw nodes
    particles.forEach(p=>{
      p.update();
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle='rgba(129,140,248,0.7)';ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── NAV SCROLL ── */
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  navbar.classList.toggle('scrolled',window.scrollY>60);
});

/* ── SCROLL REVEAL ── */
const revealEls=document.querySelectorAll('.reveal');
const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}});
},{threshold:.1});
revealEls.forEach(el=>io.observe(el));
