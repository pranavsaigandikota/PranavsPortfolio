from pathlib import Path
import subprocess, json, concurrent.futures
root=Path('public'); out=root/'video-previews';out.mkdir(exist_ok=True)
files=list((root/'videos').glob('*.mp4'))+list((root/'projects').glob('*.mp4'))+[root/'coding pranav animation.mp4']
def encode(p):
    target=out/(p.stem+'.mp4')
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(p),'-vf',"scale=-2:'min(480,ih)'",'-r','24','-c:v','libx264','-preset','veryfast','-crf','26','-threads','2','-an','-movflags','+faststart',str(target)],check=True)
    print(p.name, p.stat().st_size, '->',target.stat().st_size,flush=True)
    return ('/'+p.relative_to(root).as_posix(),'/'+target.relative_to(root).as_posix())
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    mapping=dict(pool.map(encode,files))
Path('src/data/videoPreviews.json').write_text(json.dumps(mapping,indent=2)+'\n')
