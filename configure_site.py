from pathlib import Path
import sys
OLD='https://YOUR-USERNAME.github.io/home-project-calculators'
if len(sys.argv)!=2 or not sys.argv[1].startswith('https://'):
    raise SystemExit('Usage: python configure_site.py https://USERNAME.github.io/REPO')
new=sys.argv[1].rstrip('/')
root=Path(__file__).resolve().parent
for p in root.rglob('*'):
    if p.is_file() and p.suffix.lower() in {'.html','.xml','.txt'}:
        text=p.read_text(encoding='utf-8')
        if OLD in text:
            p.write_text(text.replace(OLD,new),encoding='utf-8')
print('Configured site URL:',new)
