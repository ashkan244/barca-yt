import importlib.util,tempfile,unittest,subprocess,sys
from pathlib import Path
SCRIPT=Path(__file__).parents[1]/'sync-render-repo.py'
spec=importlib.util.spec_from_file_location('sync',SCRIPT);sync=importlib.util.module_from_spec(spec);spec.loader.exec_module(sync)
class SafeSyncTests(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.addCleanup(self.tmp.cleanup);self.src=Path(self.tmp.name)/'source';self.dst=Path(self.tmp.name)/'render';self.src.mkdir();self.dst.mkdir()
 def file(self,root,name,content):p=root/name;p.parent.mkdir(parents=True,exist_ok=True);p.write_text(content);return p
 def test_dry_run_does_not_copy(self):
  name='studio/src/new.ts';self.file(self.src,name,'new');subprocess.run([sys.executable,str(SCRIPT),'--source',str(self.src),'--destination',str(self.dst),'--select',name],check=True,capture_output=True);self.assertFalse((self.dst/name).exists())
 def test_apply_adds_and_preserves_existing(self):
  name='studio/src/new.ts';self.file(self.src,name,'new');keep=self.file(self.dst,'studio/src/production/keep.ts','keep');subprocess.run([sys.executable,str(SCRIPT),'--source',str(self.src),'--destination',str(self.dst),'--select',name,'--apply'],check=True,capture_output=True);self.assertEqual((self.dst/name).read_text(),'new');self.assertEqual(keep.read_text(),'keep')
 def test_conflict_prevents_all_writes(self):
  self.file(self.src,'studio/src/new.ts','new');self.file(self.src,'studio/src/old.ts','old');self.file(self.dst,'studio/src/old.ts','advanced');r=subprocess.run([sys.executable,str(SCRIPT),'--source',str(self.src),'--destination',str(self.dst),'--select','studio/src/new.ts','--select','studio/src/old.ts','--apply'],capture_output=True);self.assertNotEqual(r.returncode,0);self.assertFalse((self.dst/'studio/src/new.ts').exists());self.assertEqual((self.dst/'studio/src/old.ts').read_text(),'advanced')
 def test_private_media_and_symlink_escape_rejected(self):
  for name in ['studio/public/host/raw.mp4','../secret','/tmp/file','.gitignore']:
   with self.assertRaises(ValueError):sync.plan(self.src,self.dst,[name])
  outside=self.file(Path(self.tmp.name),'outside.ts','private');(self.src/'studio/src').mkdir(parents=True);(self.src/'studio/src/link.ts').symlink_to(outside)
  with self.assertRaises(ValueError):sync.plan(self.src,self.dst,['studio/src/link.ts'])
if __name__=='__main__':unittest.main()
