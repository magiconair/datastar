var ge="computed",j={type:1,name:ge,keyReq:1,valReq:1,onLoad:({key:t,signals:e,genRX:n})=>{let s=n();e.setComputed(t,s)}};var W=t=>t.replace(/(?:^\w|[A-Z]|\b\w)/g,function(e,n){return n==0?e.toLowerCase():e.toUpperCase()}).replace(/\s+/g,""),J=t=>new Function(`return Object.assign({}, ${t})`)();var K={type:1,name:"signals",valReq:1,removeOnLoad:!0,onLoad:t=>{let{key:e,genRX:n,signals:s}=t;if(e!="")s.setValue(e,n()());else{let r=J(t.value);t.value=JSON.stringify(r),s.merge(n()())}}};var z={type:1,name:"star",keyReq:2,valReq:2,onLoad:()=>{alert("YOU ARE PROBABLY OVERCOMPLICATING IT")}};var H={name:"signalValue",type:0,fn:t=>{let e=/(?<path>[\w0-9.]*)((\.value))/gm;return t.replaceAll(e,"ctx.signals.signal('$1').value")}};var Y="datastar";var X="0.21.2";var he={Morph:"morph",Inner:"inner",Outer:"outer",Prepend:"prepend",Append:"append",Before:"before",After:"after",UpsertAttributes:"upsertAttributes"},Fe=he.Morph;function Z(t){if(t.id)return t.id;let e=0,n=r=>(e=(e<<5)-e+r,e&e),s=r=>r.split("").forEach(o=>n(o.charCodeAt(0)));for(;t.parentNode;){if(t.id){s(`${t.id}`);break}else if(t===t.ownerDocument.documentElement)s(t.tagName);else{for(let r=1,o=t;o.previousElementSibling;o=o.previousElementSibling,r++)n(r);t=t.parentNode}t=t.parentNode}return Y+e}var _e="https://data-star.dev/errors";var u=(t,e)=>{let n=new Error;t=t.charAt(0).toUpperCase()+t.slice(1),n.name=`error ${t}`;let s=`${_e}/${t}?${new URLSearchParams(e)}`;return n.message=`for more info see ${s}`,n};var me=Symbol.for("preact-signals"),g=1,x=2,w=4,E=8,C=16,b=32;function G(){O++}function $(){if(O>1){O--;return}let t,e=!1;for(;N!==void 0;){let n=N;for(N=void 0,B++;n!==void 0;){let s=n._nextBatchedEffect;if(n._nextBatchedEffect=void 0,n._flags&=~x,!(n._flags&E)&&ee(n))try{n._callback()}catch(r){e||(t=r,e=!0)}n=s}}if(B=0,O--,e)throw u("BatchError, error",{error:t})}var a;var N,O=0,B=0,P=0;function Q(t){if(a===void 0)return;let e=t._node;if(e===void 0||e._target!==a)return e={_version:0,_source:t,_prevSource:a._sources,_nextSource:void 0,_target:a,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},a._sources!==void 0&&(a._sources._nextSource=e),a._sources=e,t._node=e,a._flags&b&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=a._sources,e._nextSource=void 0,a._sources._nextSource=e,a._sources=e),e}function f(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}f.prototype.brand=me;f.prototype._refresh=function(){return!0};f.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)};f.prototype._unsubscribe=function(t){if(this._targets!==void 0){let e=t._prevTarget,n=t._nextTarget;e!==void 0&&(e._nextTarget=n,t._prevTarget=void 0),n!==void 0&&(n._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=n)}};f.prototype.subscribe=function(t){return V(()=>{let e=this.value,n=a;a=void 0;try{t(e)}finally{a=n}})};f.prototype.valueOf=function(){return this.value};f.prototype.toString=function(){return this.value+""};f.prototype.toJSON=function(){return this.value};f.prototype.peek=function(){let t=a;a=void 0;try{return this.value}finally{a=t}};Object.defineProperty(f.prototype,"value",{get(){let t=Q(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(t!==this._value){if(B>100)throw u("SignalCycleDetected");this._value=t,this._version++,P++,G();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{$()}}}});function ee(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function te(t){for(let e=t._sources;e!==void 0;e=e._nextSource){let n=e._source._node;if(n!==void 0&&(e._rollbackNode=n),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function ne(t){let e=t._sources,n;for(;e!==void 0;){let s=e._prevSource;e._version===-1?(e._source._unsubscribe(e),s!==void 0&&(s._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=s)):n=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=s}t._sources=n}function y(t){f.call(this,void 0),this._fn=t,this._sources=void 0,this._globalVersion=P-1,this._flags=w}y.prototype=new f;y.prototype._refresh=function(){if(this._flags&=~x,this._flags&g)return!1;if((this._flags&(w|b))===b||(this._flags&=~w,this._globalVersion===P))return!0;if(this._globalVersion=P,this._flags|=g,this._version>0&&!ee(this))return this._flags&=~g,!0;let t=a;try{te(this),a=this;let e=this._fn();(this._flags&C||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~C,this._version++)}catch(e){this._value=e,this._flags|=C,this._version++}return a=t,ne(this),this._flags&=~g,!0};y.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=w|b;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}f.prototype._subscribe.call(this,t)};y.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(f.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~b;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}};y.prototype._notify=function(){if(!(this._flags&x)){this._flags|=w|x;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}};Object.defineProperty(y.prototype,"value",{get(){if(this._flags&g)throw u("SignalCycleDetected");let t=Q(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&C)throw u("GetComputedError",{value:this._value});return this._value}});function se(t){return new y(t)}function re(t){let e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){G();let n=a;a=void 0;try{e()}catch(s){throw t._flags&=~g,t._flags|=E,q(t),u("CleanupEffectError",{error:s})}finally{a=n,$()}}}function q(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._fn=void 0,t._sources=void 0,re(t)}function ve(t){if(a!==this)throw u("EndEffectError");ne(this),a=t,this._flags&=~g,this._flags&E&&q(this),$()}function R(t){this._fn=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=b}R.prototype._callback=function(){let t=this._start();try{if(this._flags&E||this._fn===void 0)return;let e=this._fn();typeof e=="function"&&(this._cleanup=e)}finally{t()}};R.prototype._start=function(){if(this._flags&g)throw u("SignalCycleDetected");this._flags|=g,this._flags&=~E,re(this),te(this),G();let t=a;return a=this,ve.bind(this,t)};R.prototype._notify=function(){this._flags&x||(this._flags|=x,this._nextBatchedEffect=N,N=this)};R.prototype._dispose=function(){this._flags|=E,this._flags&g||q(this)};function V(t){let e=new R(t);try{e._callback()}catch(n){throw e._dispose(),u("EffectError",{error:n})}return e._dispose.bind(e)}function oe(t,e=!1){let n={};for(let s in t)if(t.hasOwnProperty(s)){let r=t[s];if(r instanceof f){if(e&&s.startsWith("_"))continue;n[s]=r.value}else n[s]=oe(r)}return n}function ie(t,e,n=!1){for(let s in e)if(e.hasOwnProperty(s)){if(s.match(/\_\_+/))throw u("InvalidSignalKey",{key:s});let r=e[s];if(r instanceof Object&&!Array.isArray(r))t[s]||(t[s]={}),ie(t[s],r,n);else{if(n&&t[s])continue;t[s]=new f(r)}}}function ae(t,e){for(let n in t)if(t.hasOwnProperty(n)){let s=t[n];s instanceof f?e(n,s):ae(s,(r,o)=>{e(`${n}.${r}`,o)})}}function ye(t,...e){let n={};for(let s of e){let r=s.split("."),o=t,i=n;for(let d=0;d<r.length-1;d++){let p=r[d];if(!o[p])return{};i[p]||(i[p]={}),o=o[p],i=i[p]}let c=r[r.length-1];i[c]=o[c]}return n}var k=class{#e={};constructor(){}exists(e){return!!this.signal(e)}signal(e){let n=e.split("."),s=this.#e;for(let i=0;i<n.length-1;i++){let c=n[i];if(!s[c])return null;s=s[c]}let r=n[n.length-1],o=s[r];if(!o)throw u("SignalNotFound",{path:e});return o}setSignal(e,n){let s=e.split("."),r=this.#e;for(let i=0;i<s.length-1;i++){let c=s[i];r[c]||(r[c]={}),r=r[c]}let o=s[s.length-1];r[o]=n}setComputed(e,n){let s=se(()=>n());this.setSignal(e,s)}value(e){return this.signal(e)?.value}setValue(e,n){let s=this.upsert(e,n);s.value=n}upsert(e,n){let s=e.split("."),r=this.#e;for(let d=0;d<s.length-1;d++){let p=s[d];r[p]||(r[p]={}),r=r[p]}let o=s[s.length-1],i=r[o];if(i)return(i.value===null||i.value===void 0)&&(i.value=n),i;let c=new f(n);return r[o]=c,c}remove(...e){for(let n of e){let s=n.split("."),r=this.#e;for(let i=0;i<s.length-1;i++){let c=s[i];if(!r[c])return;r=r[c]}let o=s[s.length-1];delete r[o]}}merge(e,n=!1){ie(this.#e,e,n)}subset(...e){return ye(this.values(),...e)}walk(e){ae(this.#e,e)}values(e=!1){return oe(this.#e,e)}JSON(e=!0,n=!1){let s=this.values(n);return e?JSON.stringify(s,null,2):JSON.stringify(s)}toString(){return this.JSON()}};var D=class{#e=new k;#r=[];#o=[];#n={};#a=[];#t=new Map;get version(){return X}load(...e){e.forEach(n=>{let s;switch(n.type){case 0:this.#o.push(n);break;case 2:let r=n;this.#a.push(r),s=r.onGlobalInit;break;case 3:this.#n[n.name]=n;break;case 1:let o=n;this.#r.push(o),s=o.onGlobalInit;break;default:throw u("InvalidPluginType",{name:n.name,type:n.type})}if(s){let r=this;s({get signals(){return r.#e},effect:o=>V(o),actions:this.#n,apply:this.apply.bind(this),cleanup:this.#s.bind(this)})}}),this.apply(document.body)}apply(e){let n=new Set;this.#r.forEach((s,r)=>{this.#i(e,o=>{r||this.#s(o);for(let i in o.dataset){if(!i.startsWith(s.name))continue;let c=i.slice(s.name.length),[d,...p]=c.split(/\_\_+/),_=d.length>0;_&&(d=d[0].toLowerCase()+d.slice(1));let F=`${o.dataset[i]}`||"",h=F,m=h.length>0,l=s.keyReq||0;if(_){if(l===2)throw u(s.name+"KeyNotAllowed",{key:d})}else if(l===1)throw u(s.name+"KeyRequired");let T=s.valReq||0;if(m){if(T===2)throw u(s.name+"ValueNotAllowed",{value:h})}else if(T===1)throw u(s.name+"ValueRequired");if(l===3||T===3){if(_&&m)throw u(s.name+"KeyAndValueProvided");if(!_&&!m)throw u(s.name+"KeyOrValueRequired")}o.id.length||(o.id=Z(o)),n.clear();let A=new Map;p.forEach(v=>{let[fe,...de]=v.split(".");A.set(W(fe),new Set(de.map(pe=>pe.toLowerCase())))});let ce=[...s.macros?.pre||[],...this.#o,...s.macros?.post||[]];for(let v of ce)n.has(v)||(n.add(v),h=v.fn(h));let S=this,I;I={get signals(){return S.#e},effect:v=>V(v),apply:S.apply.bind(S),cleanup:S.#s.bind(S),actions:S.#n,genRX:()=>this.#l(I,...s.argNames||[]),el:o,rawKey:i,rawValue:F,key:d,value:h,mods:A};let U=s.onLoad(I);U&&(this.#t.has(o)||this.#t.set(o,{id:o.id,set:new Set}),this.#t.get(o).set.add(U)),s?.removeOnLoad&&delete o.dataset[i]}})})}get signals(){return this.#e}#l(e,...n){let s=e.value.split(/;|\n/).map(l=>l.trim()).filter(l=>l!=""),r=s.length-1;s[r].startsWith("return")||(s[r]=`return (${s[r]});`);let i=s.join(`
`),c=/(\w*)\(/gm,d=i.matchAll(c),p=new Set;for(let l of d)p.add(l[1]);let _=Object.keys(this.#n).filter(l=>p.has(l)),h=`${_.map(l=>`const ${l} = ctx.actions.${l}.fn;`).join(`
`)}return (()=> {${i}})()`,m=h.trim();_.forEach(l=>{m=m.replaceAll(l+"(",l+"(ctx,")});try{let l=n||[],T=new Function("ctx",...l,m);return(...A)=>T(e,...A)}catch(l){throw u("GeneratingExpressionFailed",{error:l,fnContent:h})}}#i(e,n){if(!e||!(e instanceof HTMLElement||e instanceof SVGElement))return null;for(n(e),e=e.firstElementChild;e;)this.#i(e,n),e=e.nextElementSibling}#s(e){let n=this.#t.get(e);if(n){for(let s of n.set)s();this.#t.delete(e)}}};var le=new D;le.load(z,H,K,j);var ue=le;var xt=ue;export{xt as Datastar};
//# sourceMappingURL=datastar-core.js.map
