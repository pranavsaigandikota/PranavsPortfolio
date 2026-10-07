import { GOLF } from './golfPhysics';
import skillLogos from '../data/skillLogos.json';

export function createGolfRenderer(canvas) {
  const context=canvas.getContext('2d'),images=new Map();
  Object.values(skillLogos).forEach(path=>{if(!images.has(path)){const image=new Image();image.src=path;images.set(path,image);}});
  const round=(x,y,w,h,r=.15)=>{context.beginPath();context.roundRect(x,y,w,h,r);};
  const circle=(x,y,r,color)=>{context.beginPath();context.arc(x,y,r,0,Math.PI*2);context.fillStyle=color;context.fill();};
  const label=(text,x,y,color='#efe9ec',size=.23)=>{context.font=`600 ${size}px "Space Grotesk",sans-serif`;context.fillStyle=color;context.textAlign='center';context.textBaseline='middle';context.fillText(text,x,y);};
  const skillMark=(skill,x,y,r=.3)=>{
    const gradient=context.createRadialGradient(x-r*.35,y-r*.45,0,x,y,r);
    gradient.addColorStop(0,'#ffffff');gradient.addColorStop(.12,skill.color);gradient.addColorStop(1,'#1d2831');
    circle(x+.045,y+.07,r,'#0005');circle(x,y,r,gradient);
    const logo=images.get(skillLogos[skill.title]);
    if(logo?.complete&&logo.naturalWidth){circle(x,y,r*.63,'#faf8f1');context.drawImage(logo,x-r*.46,y-r*.46,r*.92,r*.92);}
  };
  const nameplate=(title,x,y)=>{
    context.font='.21px "Space Grotesk",sans-serif';const measured=context.measureText(title).width,width=Math.min(2.8,measured+.25);
    round(x-width/2,y-.17,width,.34,.1);context.fillStyle='#0d171de6';context.fill();label(title,x,y,'#fff',Math.min(.21,.21*(width-.16)/measured));
  };
  return {
    resize(width,height){canvas.width=Math.round(width*Math.min(devicePixelRatio,2));canvas.height=Math.round(height*Math.min(devicePixelRatio,2));},
    draw({course,ball,skill,pickups,pull,dragging,time,particles,trail,flash,sinkTime,camera,ghosts=[]}) {
      context.setTransform(canvas.width/GOLF.width,0,0,canvas.height/GOLF.height,0,0);
      context.clearRect(0,0,22,11);context.fillStyle='#13221f';context.fillRect(0,0,22,11);context.save();
      context.translate(11,5.5);context.scale(camera.zoom,camera.zoom);context.translate(-camera.x,-camera.y);
      if(flash>0) context.translate(Math.sin(time*85)*flash*.035,Math.cos(time*79)*flash*.035);
      round(.08,.08,21.84,10.84,.55);context.fillStyle='#713747';context.fill();context.strokeStyle='#151d2a';context.lineWidth=.15;context.stroke();
      const turf=context.createRadialGradient(11,4,1,11,5.5,13);turf.addColorStop(0,'#559d71');turf.addColorStop(1,'#276751');
      round(.95,.95,20.1,9.1,.25);context.fillStyle=turf;context.fill();context.strokeStyle='#edbb76';context.lineWidth=.12;context.stroke();
      context.save();context.clip();context.globalAlpha=.08;context.strokeStyle='#cfdfcd';context.lineWidth=.7;
      for(let x=-12;x<30;x+=1.8){context.beginPath();context.moveTo(x,0);context.lineTo(x+12,11);context.stroke();}context.restore();
      label('THE CRIMSON LINKS',3.2,.49,'#ffdda2',.19);label('PULL BACK TO PUTT',18.8,10.5,'#ffdda2',.17);
      course.sand.forEach(rect=>{round(rect.x,rect.y,rect.w,rect.h,.4);context.fillStyle='#e6bd7f';context.fill();label('SAND',rect.x+rect.w/2,rect.y+rect.h/2,'#755033',.18);});
      course.walls.filter(rect=>!rect.broken).forEach(rect=>{
        round(rect.x+.06,rect.y+.08,rect.w,rect.h,.07);context.fillStyle='#07120e77';context.fill();
        round(rect.x,rect.y,rect.w,rect.h,.07);context.fillStyle='#e48f80';context.fill();context.strokeStyle='#242234';context.lineWidth=.075;context.stroke();
      });
      course.boosts.forEach(boost=>{
        context.save();context.translate(boost.x+boost.w/2,boost.y+boost.h/2);context.rotate(boost.angle);
        round(-.65,-.43,1.3,.86,.18);context.fillStyle=boost.kind==='boost'?'#70deeb':'#ffca57';context.fill();context.strokeStyle='#382a32';context.lineWidth=.09;context.stroke();
        context.strokeStyle='#78442d';context.lineWidth=.08;for(let i=-1;i<=1;i++){const x=i*.35+Math.sin(time*5)*.055;context.beginPath();context.moveTo(x-.1,-.19);context.lineTo(x+.1,0);context.lineTo(x-.1,.19);context.stroke();}context.restore();
      });
      course.echoes?.forEach(echo=>{context.save();context.translate(echo.x,echo.y);context.rotate(Math.PI/4);round(-.43,-.43,.86,.86,.15);context.fillStyle='#b5a1f3';context.fill();context.strokeStyle='#28233e';context.lineWidth=.08;context.stroke();context.restore();circle(echo.x-.16,echo.y,.12,'#fff');circle(echo.x+.16,echo.y,.12,'#fff');nameplate('ECHO SPLIT',echo.x,echo.y+.7);});
      course.portals.forEach((portal,index)=>{
        const color=index?'#c091fa':'#7fbaef';circle(portal.x,portal.y,.57,'#151322');context.strokeStyle=color;context.lineWidth=.055;
        for(let i=0;i<3;i++){context.beginPath();context.arc(portal.x,portal.y,.27+i*.12,time*(index?1:-1)+i,time*(index?1:-1)+i+Math.PI*1.4);context.stroke();}
      });
      course.bumpers.forEach(bumper=>{
        circle(bumper.x+.05,bumper.y+.09,bumper.r,'#0005');circle(bumper.x,bumper.y,bumper.r,'#e66f91');
        context.strokeStyle='#222237';context.lineWidth=.09;context.stroke();
        context.save();context.translate(bumper.x,bumper.y);context.rotate(time*.35);context.beginPath();
        for(let i=0;i<8;i++){const radius=i%2?.12:.34,angle=i*Math.PI/4;context.lineTo(Math.cos(angle)*radius,Math.sin(angle)*radius);}context.closePath();context.fillStyle='#ffe7a3';context.fill();context.restore();
      });
      circle(course.hole.x,course.hole.y,.62,'#87b4a419');circle(course.hole.x,course.hole.y,.4,'#070e0d');
      context.strokeStyle='#a1bfb0';context.lineWidth=.03;context.stroke();
      context.beginPath();context.moveTo(course.hole.x,course.hole.y);context.lineTo(course.hole.x,course.hole.y-1.1);context.strokeStyle='#f0e5dc';context.lineWidth=.035;context.stroke();
      context.beginPath();context.moveTo(course.hole.x,course.hole.y-1.1);context.lineTo(course.hole.x+.6,course.hole.y-.91);context.lineTo(course.hole.x,course.hole.y-.72);context.fillStyle='#e95d76';context.fill();
      const remaining=course.tokens.filter(token=>!token.collected).length;
      if(remaining){circle(course.hole.x,course.hole.y,.37,'#675068');context.strokeStyle='#ffe3a0';context.lineWidth=.05;context.beginPath();context.arc(course.hole.x,course.hole.y-.07,.12,Math.PI,0);context.stroke();round(course.hole.x-.15,course.hole.y-.05,.3,.23,.04);context.fillStyle='#ffe3a0';context.fill();nameplate(`${remaining} SKILL${remaining===1?'':'S'} TO OPEN`,course.hole.x,Math.min(9.65,course.hole.y+1.1));}
      else nameplate('CUP OPEN!',course.hole.x,Math.min(9.65,course.hole.y+1.1));
      course.tokens.forEach((token,index)=>{if(!token.collected){
        const bob=Math.sin(time*2.5+index)*.055;circle(token.x,token.y,.47,'#f0e3b512');
        context.strokeStyle=pickups[index].color;context.lineWidth=.025;context.setLineDash([.08,.09]);context.beginPath();context.arc(token.x,token.y,.46,0,Math.PI*2);context.stroke();context.setLineDash([]);
        skillMark(pickups[index],token.x,token.y+bob,.25);nameplate(pickups[index].title,token.x,token.y+.62);
      }});
      const speed=Math.hypot(ball.vx,ball.vy),fast=speed>12;
      trail.forEach((point,index)=>{
        if(index===0) return;const previous=trail[index-1];context.beginPath();context.moveTo(previous.x,previous.y);context.lineTo(point.x,point.y);context.strokeStyle=fast?`rgba(255,${Math.round(100+index/trail.length*110)},100,${index/trail.length*.65})`:`rgba(219,238,222,${index/trail.length*.22})`;context.lineWidth=(fast?.25:.12)*index/trail.length;context.lineCap='round';context.stroke();
      });
      if(fast){const nx=ball.vx/speed,ny=ball.vy/speed;context.save();context.strokeStyle='#ffd19a99';context.lineWidth=.025;for(let i=-1;i<=1;i+=2){context.beginPath();context.moveTo(ball.x-ny*.42*i-nx*.5,ball.y+nx*.42*i-ny*.5);context.lineTo(ball.x-ny*.42*i-nx*1.8,ball.y+nx*.42*i-ny*1.8);context.stroke();}circle(ball.x,ball.y,.46,'#ff8e4325');context.restore();}
      if(!ball.sunk||sinkTime<.45){context.save();const scale=ball.sunk?Math.max(0,1-sinkTime/.45):1;context.translate(ball.x,ball.y);context.scale(scale,scale);skillMark(skill,0,0,ball.r);context.restore();if(!ball.sunk) nameplate(skill.title,ball.x,ball.y+.55);}
      ghosts.forEach(ghost=>{context.save();context.globalAlpha=Math.min(.65,ghost.life);circle(ghost.x,ghost.y,.43,'#c8c0ff66');skillMark(skill,ghost.x,ghost.y,.27);context.restore();});
      if(dragging&&Math.hypot(pull.x,pull.y)>.06){
        const length=Math.hypot(pull.x,pull.y),nx=-pull.x/length,ny=-pull.y/length,power=Math.min(length,3.25);
        context.save();context.setLineDash([.09,.13]);context.strokeStyle='#fff1c8aa';context.lineWidth=.045;context.beginPath();context.moveTo(ball.x,ball.y);context.lineTo(ball.x+nx*(1+power),ball.y+ny*(1+power));context.stroke();context.restore();
        context.strokeStyle='#f48b9a';context.lineWidth=.06;context.beginPath();context.moveTo(ball.x,ball.y);context.lineTo(ball.x-nx*power,ball.y-ny*power);context.stroke();circle(ball.x-nx*power,ball.y-ny*power,.09,'#ffd5de');
        context.strokeStyle='#fff3d4';context.lineWidth=.025;context.beginPath();context.arc(ball.x,ball.y,.43,0,Math.PI*2);context.stroke();
      }
      particles.forEach(p=>{context.globalAlpha=Math.max(0,p.life/p.maxLife);if(p.text){context.font='.32px Bungee,sans-serif';context.textAlign='center';context.textBaseline='middle';context.lineWidth=.09;context.strokeStyle='#202136';context.strokeText(p.text,p.x,p.y);context.fillStyle=p.color;context.fillText(p.text,p.x,p.y);}else if(p.shard){context.save();context.translate(p.x,p.y);context.rotate(time*p.vx);context.fillStyle=p.color;context.fillRect(-p.size,-p.size,p.size*2,p.size);context.restore();}else {context.save();context.translate(p.x,p.y);context.rotate(time*p.vx);context.beginPath();for(let i=0;i<8;i++){const radius=i%2?p.size*.4:p.size*1.7;context.lineTo(Math.cos(i*Math.PI/4)*radius,Math.sin(i*Math.PI/4)*radius);}context.closePath();context.fillStyle=p.color;context.fill();context.restore();}});context.globalAlpha=1;
      context.restore();
    },
  };
}
