#!/usr/bin/env python3
"""Explicit additive imports into the canonical render repo; never mirror/delete/overwrite."""
import argparse,hashlib,shutil
from pathlib import Path
ALLOWED=('studio/src/','studio/scripts/','studio/public/photos/','tools/tts/')

def plan(source,destination,selected):
 source=source.resolve();destination=destination.resolve();items=[]
 if source==destination:raise ValueError('Source and destination must differ.')
 for name in dict.fromkeys(selected):
  rel=Path(name)
  if rel.is_absolute() or '..' in rel.parts or not name.startswith(ALLOWED) or any(p in {'.git','node_modules'} for p in rel.parts):raise ValueError(f'Path is not an allowed explicit import: {name}')
  src=(source/rel).resolve();dst=(destination/rel).resolve()
  if not src.is_relative_to(source) or not dst.is_relative_to(destination):raise ValueError('Symlink/path escapes checkout.')
  if not src.is_file():raise ValueError(f'Select a file, not a directory: {name}')
  if dst.exists():
   if not dst.is_file() or src.read_bytes()!=dst.read_bytes():raise ValueError(f'Conflict: {name}; canonical render file retained. Resolve in a coding task.')
   state='identical'
  else:state='add'
  items.append((src,dst,state))
 return items

def main():
 parser=argparse.ArgumentParser(description=__doc__);root=Path(__file__).resolve().parents[1]
 parser.add_argument('--source',type=Path,default=root);parser.add_argument('--destination',type=Path,default=root.parent/'barca-yt-render');parser.add_argument('--select',action='append',default=[]);parser.add_argument('--apply',action='store_true');a=parser.parse_args()
 if not a.select:
  print('Render code is maintained in barca-yt-render. Full mirroring is disabled.\nSelect individual new files: --select studio/src/... [--apply]. Default: dry-run.');return
 try:
  items=plan(a.source,a.destination,a.select)
  for src,dst,state in items:print(f'{state}: {dst.relative_to(a.destination.resolve())}')
  if a.apply:
   for src,dst,state in items:
    if state=='add':
     dst.parent.mkdir(parents=True,exist_ok=True)
     # Exclusive create also protects an existing file created after planning.
     with src.open('rb') as inp,dst.open('xb') as out:shutil.copyfileobj(inp,out)
  print('Applied additive import.' if a.apply else 'Dry-run only; no files changed.')
 except (ValueError,OSError) as e:parser.exit(2,str(e)+'\n')
if __name__=='__main__':main()
