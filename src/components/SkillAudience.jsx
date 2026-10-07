import PropTypes from 'prop-types';
import skillLogos from '../data/skillLogos.json';

export default function SkillAudience({groups,event,complete}) {
  const skills=groups.flatMap(group=>group.items.map(item=>({...item,color:group.themeColor})));
  const split=Math.ceil(skills.length/2);
  return <div className="sp-skill-audience" aria-label="Skill supporters grandstand">
    <div className="sp-crowd-caption"><span>THE SKILL SQUAD</span><b key={event.id}>{event.points?complete?'WHAT A SHOT!':'LET’S GO!':'MAKE SOME NOISE'}</b></div>
    <div key={event.id} className={`sp-crowd-fans ${event.points?'is-cheering':''}`}>
      {[skills.slice(0,split),skills.slice(split)].map((row,rowIndex)=><div className="sp-crowd-row" key={rowIndex}>
        {row.map((skill,index)=><div className="sp-skill-fan" key={skill.title} tabIndex={0} aria-label={`${skill.title} supporter`} style={{'--fan-color':skill.color,'--fan-delay':`${(index%7)*-.13}s`,'--cheer-delay':`${(index%5)*.035}s`}}>
          <span className="sp-fan-arm is-left"><i/></span><span className="sp-fan-arm is-right"><i/></span>
          <span className="sp-fan-body"/><span className="sp-fan-head">{skillLogos[skill.title]?<img src={skillLogos[skill.title]} alt=""/>:<span>{skill.title}</span>}</span>
          <span className="sp-fan-name">{skill.title}</span>
        </div>)}
      </div>)}
    </div>
  </div>;
}
SkillAudience.propTypes={groups:PropTypes.array.isRequired,event:PropTypes.object.isRequired,complete:PropTypes.bool};
