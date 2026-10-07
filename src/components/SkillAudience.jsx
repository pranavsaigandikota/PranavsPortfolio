import { memo } from 'react';
import PropTypes from 'prop-types';
import skillLogos from '../data/skillLogos.json';

function SkillAudience({groups,event,complete}) {
  const toolkit=groups.flatMap(group=>group.items.map(item=>({...item,color:group.themeColor})));
  // A stable shuffle mixes disciplines without rearranging the crowd on every score.
  const skills=toolkit.map((_,index)=>toolkit[(index*17)%toolkit.length]);
  const positions=Math.ceil(skills.length/2);
  return <div className="sp-skill-audience" aria-label="Skill supporters grandstand">
    <div className="sp-crowd-caption"><span>THE SKILL SQUAD</span><b key={event.id}>{event.points?complete?'WHAT A SHOT!':'LET’S GO!':'MAKE SOME NOISE'}</b></div>
    <div key={event.id} className={`sp-crowd-fans ${event.points?'is-cheering':''}`}>
      {skills.map((skill,index)=>{
        const front=index>=positions,slot=index%positions;
        const jitter=((index*13)%11-5)*.22;
        const depth=(front?65:13)+(index*19)%31;
        return <div className="sp-fan-slot" key={skill.title} style={{left:`${3+slot*94/(positions-1)+jitter}%`,top:`${depth}px`,zIndex:Math.round(depth),'--fan-scale':(front?1.08:.86)+(index%4)*.055}}>
        <div className="sp-skill-fan" tabIndex={0} aria-label={`${skill.title} supporter`} style={{'--fan-color':skill.color,'--fan-delay':`${(index%7)*-.13}s`,'--cheer-delay':`${(index%5)*.035}s`}}>
          <span className="sp-fan-arm is-left"><i/></span><span className="sp-fan-arm is-right"><i/></span>
          <span className="sp-fan-body"/><span className="sp-fan-head">{skillLogos[skill.title]?<img src={skillLogos[skill.title]} alt=""/>:<span>{skill.title}</span>}</span>
          <span className="sp-fan-name">{skill.title}</span>
        </div></div>;
      })}
    </div>
  </div>;
}
SkillAudience.propTypes={groups:PropTypes.array.isRequired,event:PropTypes.object.isRequired,complete:PropTypes.bool};

export default memo(SkillAudience);
