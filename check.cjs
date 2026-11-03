const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync('dist/app.js','utf8');
const scope={Uint8Array};vm.createContext(scope);
for(const [start,end] of [['function glyphIndex','function demo'],['function gifHeader','async function exportGif']])vm.runInContext(code.slice(code.indexOf(start),code.indexOf(end)),scope);
assert.equal(scope.glyphIndex(0,10,false),0);assert.equal(scope.glyphIndex(255,10,false),9);assert.equal(scope.glyphIndex(255,10,true),0);assert.equal(scope.glyphIndex(-20,10,false),0);
const w=32,h=20,pixels=new Uint8Array(w*h*4);for(let i=0;i<pixels.length;i++)pixels[i]=i%256;
const header=scope.gifHeader(w,h);assert.equal(Buffer.from(header.slice(0,6)).toString(),'GIF89a');assert.equal(header[6],w);
const frame=scope.gifFrame(pixels,w,h,8);assert.equal(frame[4],8);assert.equal(frame[13],w);assert.equal(frame[18],8);
let packed=[],p=19;while(frame[p]){let n=frame[p++];packed.push(...frame.slice(p,p+n));p+=n}let acc=0,bits=0,values=[];for(const b of packed){acc|=b<<bits;bits+=8;while(bits>=9){values.push(acc&511);acc>>>=9;bits-=9}}
assert.equal(values[0],256);assert.equal(values.at(-1),257);const literals=values.filter(x=>x<256);assert.equal(literals.length,w*h);for(let i=0;i<literals.length;i++)assert.equal(literals[i],(pixels[i*4]>>5)<<5|(pixels[i*4+1]>>5)<<2|(pixels[i*4+2]>>6));
console.log('PASS: brightness mapping, inversion, GIF signature, dimensions, timing, block boundaries, and all 640 encoded pixels.');


// Sample playback must select one cropped atlas cell, including at the loop boundary.
const sampleMeta=code.match(/const sampleAnimation=(.*);/)[1];
scope.sampleAnimation=JSON.parse(sampleMeta);scope.mascot={complete:true,naturalWidth:1960};
const draws=[];scope.sampleCtx={fillRect(){},drawImage(...args){draws.push(args)}};
vm.runInContext(code.slice(code.indexOf('function demo(t)'),code.indexOf('function dimensions()')),scope);
for(const [time,index] of [[0,0],[.14,1],[4.7,36],[4.82,0]]){
 scope.demo(time);const args=draws.at(-1);
 assert.equal(args[1],(index%8)*245);assert.equal(args[2],Math.floor(index/8)*415);
 assert.equal(args[3],245);assert.equal(args[4],415);assert.equal(args[7],245);assert.equal(args[8],415);
}
console.log('PASS: cropped sample frame selection, sizing, and animation loop.');
