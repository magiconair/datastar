(function(E,L){typeof exports=="object"&&typeof module<"u"?L(exports):typeof define=="function"&&define.amd?define(["exports"],L):(E=typeof globalThis<"u"?globalThis:E||self,L(E.Datastar={}))})(this,function(E){"use strict";function L(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}function F(){throw new Error("Cycle detected")}function Ue(){throw new Error("Computed cannot have side-effects")}const Be=Symbol.for("preact-signals"),b=1,M=2,k=4,N=8,R=16,T=32;function j(){O++}function V(){if(O>1){O--;return}let t,e=!1;for(;H!==void 0;){let n=H;for(H=void 0,ee++;n!==void 0;){const r=n._nextBatchedEffect;if(n._nextBatchedEffect=void 0,n._flags&=~M,!(n._flags&N)&&fe(n))try{n._callback()}catch(s){e||(t=s,e=!0)}n=r}}if(ee=0,O--,e)throw t}function qe(t){if(O>0)return t();j();try{return t()}finally{V()}}let d,H,O=0,ee=0,U=0;function ce(t){if(d===void 0)return;let e=t._node;if(e===void 0||e._target!==d)return e={_version:0,_source:t,_prevSource:d._sources,_nextSource:void 0,_target:d,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},d._sources!==void 0&&(d._sources._nextSource=e),d._sources=e,t._node=e,d._flags&T&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=d._sources,e._nextSource=void 0,d._sources._nextSource=e,d._sources=e),e}function p(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}p.prototype.brand=Be,p.prototype._refresh=function(){return!0},p.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)},p.prototype._unsubscribe=function(t){if(this._targets!==void 0){const e=t._prevTarget,n=t._nextTarget;e!==void 0&&(e._nextTarget=n,t._prevTarget=void 0),n!==void 0&&(n._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=n)}},p.prototype.subscribe=function(t){const e=this;return ne(function(){const n=e.value,r=this._flags&T;this._flags&=~T;try{t(n)}finally{this._flags|=r}})},p.prototype.valueOf=function(){return this.value},p.prototype.toString=function(){return this.value+""},p.prototype.toJSON=function(){return this.value},p.prototype.peek=function(){return this._value},Object.defineProperty(p.prototype,"value",{get(){const t=ce(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(d instanceof w&&Ue(),t!==this._value){ee>100&&F(),this._value=t,this._version++,U++,j();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{V()}}}});function ue(t){return new p(t)}function fe(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function de(t){for(let e=t._sources;e!==void 0;e=e._nextSource){const n=e._source._node;if(n!==void 0&&(e._rollbackNode=n),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function pe(t){let e=t._sources,n;for(;e!==void 0;){const r=e._prevSource;e._version===-1?(e._source._unsubscribe(e),r!==void 0&&(r._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=r)):n=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=r}t._sources=n}function w(t){p.call(this,void 0),this._compute=t,this._sources=void 0,this._globalVersion=U-1,this._flags=k}w.prototype=new p,w.prototype._refresh=function(){if(this._flags&=~M,this._flags&b)return!1;if((this._flags&(k|T))===T||(this._flags&=~k,this._globalVersion===U))return!0;if(this._globalVersion=U,this._flags|=b,this._version>0&&!fe(this))return this._flags&=~b,!0;const t=d;try{de(this),d=this;const e=this._compute();(this._flags&R||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~R,this._version++)}catch(e){this._value=e,this._flags|=R,this._version++}return d=t,pe(this),this._flags&=~b,!0},w.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=k|T;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}p.prototype._subscribe.call(this,t)},w.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(p.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~T;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}},w.prototype._notify=function(){if(!(this._flags&M)){this._flags|=k|M;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}},w.prototype.peek=function(){if(this._refresh()||F(),this._flags&R)throw this._value;return this._value},Object.defineProperty(w.prototype,"value",{get(){this._flags&b&&F();const t=ce(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&R)throw this._value;return this._value}});function Ge(t){return new w(t)}function he(t){const e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){j();const n=d;d=void 0;try{e()}catch(r){throw t._flags&=~b,t._flags|=N,te(t),r}finally{d=n,V()}}}function te(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._compute=void 0,t._sources=void 0,he(t)}function We(t){if(d!==this)throw new Error("Out-of-order effect");pe(this),d=t,this._flags&=~b,this._flags&N&&te(this),V()}function C(t){this._compute=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=T}C.prototype._callback=function(){const t=this._start();try{if(this._flags&N||this._compute===void 0)return;const e=this._compute();typeof e=="function"&&(this._cleanup=e)}finally{t()}},C.prototype._start=function(){this._flags&b&&F(),this._flags|=b,this._flags&=~N,he(this),de(this),j();const t=d;return d=this,We.bind(this,t)},C.prototype._notify=function(){this._flags&M||(this._flags|=M,this._nextBatchedEffect=H,H=this)},C.prototype._dispose=function(){this._flags|=N,this._flags&b||te(this)};function ne(t){const e=new C(t);try{e._callback()}catch(n){throw e._dispose(),n}return e._dispose.bind(e)}class me{get value(){return se(this)}set value(e){qe(()=>Ke(this,e))}peek(){return se(this,{peek:!0})}}const re=t=>Object.assign(new me,Object.entries(t).reduce((e,[n,r])=>{if(["value","peek"].some(s=>s===n))throw new Error(`${n} is a reserved property name`);return typeof r!="object"||r===null||Array.isArray(r)?e[n]=ue(r):e[n]=re(r),e},{})),Ke=(t,e)=>Object.keys(e).forEach(n=>t[n].value=e[n]),se=(t,{peek:e=!1}={})=>Object.entries(t).reduce((n,[r,s])=>(s instanceof p?n[r]=e?s.peek():s.value:s instanceof me&&(n[r]=se(s,{peek:e})),n),{});function ge(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return JSON.parse(JSON.stringify(e));if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let n=t;return typeof t!="object"&&(n={...e}),Object.keys(e).forEach(r=>{n.hasOwnProperty(r)||(n[r]=e[r]),e[r]===null?delete n[r]:n[r]=ge(n[r],e[r])}),n}const Je="[a-zA-Z_$][0-9a-zA-Z_$]*";function oe(t,e,n){return new RegExp(`(?<whole>\\${t}(?<${e}>${Je})${n})`,"g")}const ze={name:"SignalProcessor",description:"Replacing $signal with ctx.store.signal.value",regexp:oe("$","signal",""),replacer:t=>{const{signal:e}=t;return`ctx.store.${e}.value`}},Ze={name:"ActionProcessor",description:"Replacing $$action(args) with ctx.actions.action(ctx, args)",regexp:oe("$\\$","action","(?<call>\\((?<args>.*)\\))?"),replacer:({action:t,args:e})=>{const n=["ctx"];e&&n.push(...e.split(",").map(s=>s.trim()));const r=n.join(",");return`ctx.actions.${t}(${r})`}},Xe={name:"RefProcessor",description:"Replacing #foo with ctx.refs.foo",regexp:oe("~","ref",""),replacer({ref:t}){return`data.refs.${t}`}},Ye=[Ze,ze,Xe],Qe=[{prefix:"mergeStore",description:"Setup the global store",onLoad:t=>{const e=t.expressionFn(t);t.mergeStore(e)}},{prefix:"ref",description:"Sets the value of the element",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,bypassExpressionFunctionCreation:!0,preprocessors:new Set([]),onLoad:t=>{const{el:e,expression:n}=t;return t.refs[n]=e,()=>delete t.refs[n]}}];class ve{plugins=[];store=re({});actions={};refs={};reactivity={signal:ue,computed:Ge,effect:ne};missingIDNext=0;removals=new Map;constructor(e={},...n){if(this.actions=Object.assign(this.actions,e),n=[...Qe,...n],!n.length)throw new Error("No plugins provided");const r=new Set;for(const s of n){if(s.requiredPluginPrefixes){for(const o of s.requiredPluginPrefixes)if(!r.has(o))throw new Error(`Plugin ${s.prefix} requires plugin ${o}`)}this.plugins.push(s),r.add(s.prefix)}}run(){this.plugins.forEach(e=>{e.onGlobalInit&&e.onGlobalInit({actions:this.actions,refs:this.refs,reactivity:this.reactivity,mergeStore:this.mergeStore.bind(this),store:this.store})}),this.applyPlugins(document.body)}cleanupElementRemovals(e){const n=this.removals.get(e);if(n){for(const r of n)r();this.removals.delete(e)}}mergeStore(e){const n=ge(this.store.value,e);this.store=re(n)}signalByName(e){return this.store[e]}applyPlugins(e){const n=new Set;this.plugins.forEach((r,s)=>{_e(e,o=>{s===0&&this.cleanupElementRemovals(o);const i=L(o);if(i){if(i.id){const a=i.style;a.viewTransitionName=i.id}if(!i.id&&i.tagName!=="BODY"){const a=(this.missingIDNext++).toString(16).padStart(8,"0");i.id=`ds${a}`}for(const a in i.dataset){let l=i.dataset[a]||"";if(!a.startsWith(r.prefix))continue;if(n.clear(),r.allowedTags&&!r.allowedTags.has(i.tagName.toLowerCase()))throw new Error(`Tag '${i.tagName}' is not allowed for plugin '${a}', allowed tags are: ${[[...r.allowedTags].map(f=>`'${f}'`)].join(", ")}`);let m=a.slice(r.prefix.length),[c,...u]=m.split(".");if(r.mustHaveEmptyKey&&c.length>0)throw new Error(`Attribute '${a}' must have empty key`);if(r.mustNotEmptyKey&&c.length===0)throw new Error(`Attribute '${a}' must have non-empty key`);c.length&&(c=c[0].toLowerCase()+c.slice(1));const _=u.map(f=>{const[S,...v]=f.split("_");return{label:S,args:v}});if(r.allowedModifiers){for(const f of _)if(!r.allowedModifiers.has(f.label))throw new Error(`Modifier '${f.label}' is not allowed`)}const h=new Map;for(const f of _)h.set(f.label,f.args);if(r.mustHaveEmptyExpression&&l.length)throw new Error(`Attribute '${a}' must have empty expression`);if(r.mustNotEmptyExpression&&!l.length)throw new Error(`Attribute '${a}' must have non-empty expression`);const g=[...Ye,...r.preprocessors||[]];for(const f of g){if(n.has(f))continue;n.add(f);const S=[...l.matchAll(f.regexp)];if(S.length)for(const v of S){if(!v.groups)continue;const{groups:I}=v,{whole:Ve}=I;l=l.replace(Ve,f.replacer(I))}}const{store:Z,reactivity:X,actions:Y,refs:Q}=this,x={store:Z,mergeStore:this.mergeStore.bind(this),applyPlugins:this.applyPlugins.bind(this),actions:Y,refs:Q,reactivity:X,el:i,key:c,expression:l,expressionFn:()=>{throw new Error("Expression function not created")},modifiers:h};if(!r.bypassExpressionFunctionCreation&&!r.mustHaveEmptyExpression&&l.length){const f=l.split(";");f[f.length-1]=`return ${f[f.length-1]}`;const S=f.join(";");try{const v=new Function("ctx",S);x.expressionFn=v}catch{console.error(`Error evaluating expression '${S}' on ${i.id?`#${i.id}`:i.tagName}`);return}}const D=r.onLoad(x);D&&(this.removals.has(i)||this.removals.set(i,new Set),this.removals.get(i).add(D))}}})})}}function _e(t,e){if(t)for(e(t),t=t.firstElementChild;t;)_e(t,e),t=t.nextElementSibling}const et=t=>t.replace(/[A-Z]+(?![a-z])|[A-Z]/g,(e,n)=>(n?"-":"")+e.toLowerCase()),tt={prefix:"bind",description:"Sets the value of the element",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>t.reactivity.effect(()=>{const e=et(t.key),n=t.expressionFn(t);t.el.setAttribute(e,`${n}`)})},be=["change","input","keydown"],nt={prefix:"model",description:"Sets the value of the element",mustHaveEmptyKey:!0,allowedTags:new Set(["input","textarea","select","checkbox"]),bypassExpressionFunctionCreation:!0,onLoad:t=>{const{store:e,el:n,expression:r}=t,s=e[r];return t.reactivity.effect(()=>{if(!(n instanceof HTMLInputElement))throw new Error("Element does not have value or checked");const o=n.type==="checkbox";o?n.checked=s.value:n.value=`${s.value}`;const i=()=>{const a=s.value;if(typeof a=="number")s.value=Number(n.value);else if(typeof a=="string")s.value=n.value;else if(typeof a=="boolean")o?s.value=n.checked:s.value=!!n.value;else throw new Error("Unsupported type")};return i(),be.forEach(a=>{n.addEventListener(a,i)}),()=>{be.forEach(a=>{n.removeEventListener(a,i)})}})}},rt={prefix:"text",description:"Sets the textContent of the element",mustHaveEmptyKey:!0,onLoad:t=>{const{el:e,expressionFn:n}=t;if(!(e instanceof HTMLElement))throw new Error("Element is not HTMLElement");return t.reactivity.effect(()=>{e.textContent=`${n(t)}`})}},ye="DOMContentLoaded",st=[tt,nt,rt,{prefix:"focus",description:"Sets the focus of the element",mustHaveEmptyKey:!0,mustHaveEmptyExpression:!0,onLoad:t=>(t.el.tabIndex||t.el.setAttribute("tabindex","0"),t.el.focus(),t.el.scrollIntoView({block:"center",inline:"center"}),()=>t.el.blur())},{prefix:"on",description:"Sets the event listener of the element",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,allowedModifiers:new Set(["once","passive","capture","debounce","throttle"]),onLoad:t=>{const{el:e,key:n,expressionFn:r}=t;let s=()=>{r(t)};const o=t.modifiers.get("debounce");if(o){const m=Ee(o),c=B(o,"leading",!1),u=B(o,"noTrail",!0);s=ot(s,m,c,u)}const i=t.modifiers.get("throttle");if(i){const m=Ee(i),c=B(i,"noLead",!0),u=B(i,"noTrail",!0);s=it(s,m,c,u)}const a={capture:!0,passive:!1,once:!1};if(t.modifiers.has("capture")||(a.capture=!1),t.modifiers.has("passive")&&(a.passive=!0),t.modifiers.has("once")&&(a.once=!0),n==="load")return document.addEventListener(ye,s,a),()=>{document.removeEventListener(ye,s)};const l=n.toLowerCase();return e.addEventListener(l,s,a),()=>{e.removeEventListener(l,s)}}}];function Ee(t){if(!t||t?.length===0)return 0;for(const e of t){if(e.endsWith("ms"))return Number(e.replace("ms",""));if(e.endsWith("s"))return Number(e.replace("s",""))*1e3;try{return parseFloat(e)}catch{}}return 0}function B(t,e,n=!1){return t?t.includes(e)||n:!1}function ot(t,e,n=!1,r=!0){let s;const o=()=>s&&clearTimeout(s);return function(...a){o(),n&&!s&&t(...a),s=setTimeout(()=>{r&&t(...a),o()},e)}}function it(t,e,n=!0,r=!1){let s=!1,o=null;return function(...a){s?o=a:(s=!0,n?t(...a):o=a,setTimeout(()=>{r&&o&&(t(...o),o=null),s=!1},e))}}const q=new WeakSet;function at(t,e,n={}){t instanceof Document&&(t=t.documentElement);let r;typeof e=="string"?r=dt(e):r=e;const s=pt(r),o=ct(t,s,n);return we(t,s,o)}function we(t,e,n){if(n.head.block){const r=t.querySelector("head"),s=e.querySelector("head");if(r&&s){const o=Te(s,r,n);Promise.all(o).then(()=>{we(t,e,Object.assign(n,{head:{block:!1,ignore:!0}}))});return}}if(n.morphStyle==="innerHTML")return Se(e,t,n),t.children;if(n.morphStyle==="outerHTML"||n.morphStyle==null){const r=mt(e,t,n);if(!r)throw new Error("Could not find best match");const s=r?.previousSibling,o=r?.nextSibling,i=G(t,r,n);return r?ht(s,i,o):[]}else throw"Do not understand how to morph style "+n.morphStyle}function G(t,e,n){if(!(n.ignoreActive&&t===document.activeElement))if(e==null){if(n.callbacks.beforeNodeRemoved(t)===!1)return;t.remove(),n.callbacks.afterNodeRemoved(t);return}else{if(K(t,e))return n.callbacks.beforeNodeMorphed(t,e)===!1?void 0:(t instanceof HTMLHeadElement&&n.head.ignore||(e instanceof HTMLHeadElement&&t instanceof HTMLHeadElement&&n.head.style!=="morph"?Te(e,t,n):(lt(e,t),Se(e,t,n))),n.callbacks.afterNodeMorphed(t,e),t);if(n.callbacks.beforeNodeRemoved(t)===!1||n.callbacks.beforeNodeAdded(e)===!1)return;if(!t.parentElement)throw new Error("oldNode has no parentElement");return t.parentElement.replaceChild(e,t),n.callbacks.afterNodeAdded(e),n.callbacks.afterNodeRemoved(t),e}}function Se(t,e,n){let r=t.firstChild,s=e.firstChild,o;for(;r;){if(o=r,r=o.nextSibling,s==null){if(n.callbacks.beforeNodeAdded(o)===!1)return;e.appendChild(o),n.callbacks.afterNodeAdded(o),P(n,o);continue}if(Ae(o,s,n)){G(s,o,n),s=s.nextSibling,P(n,o);continue}let i=ut(t,e,o,s,n);if(i){s=Le(s,i,n),G(i,o,n),P(n,o);continue}let a=ft(t,o,s,n);if(a){s=Le(s,a,n),G(a,o,n),P(n,o);continue}if(n.callbacks.beforeNodeAdded(o)===!1)return;e.insertBefore(o,s),n.callbacks.afterNodeAdded(o),P(n,o)}for(;s!==null;){let i=s;s=s.nextSibling,Me(i,n)}}function lt(t,e){let n=t.nodeType;if(n===1){for(const r of t.attributes)e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);for(const r of e.attributes)t.hasAttribute(r.name)||e.removeAttribute(r.name)}if((n===Node.COMMENT_NODE||n===Node.TEXT_NODE)&&e.nodeValue!==t.nodeValue&&(e.nodeValue=t.nodeValue),t instanceof HTMLInputElement&&e instanceof HTMLInputElement&&t.type!=="file")e.value=t.value||"",W(t,e,"value"),W(t,e,"checked"),W(t,e,"disabled");else if(t instanceof HTMLOptionElement)W(t,e,"selected");else if(t instanceof HTMLTextAreaElement&&e instanceof HTMLTextAreaElement){const r=t.value,s=e.value;r!==s&&(e.value=r),e.firstChild&&e.firstChild.nodeValue!==r&&(e.firstChild.nodeValue=r)}}function W(t,e,n){const r=t.getAttribute(n),s=e.getAttribute(n);r!==s&&(r?e.setAttribute(n,r):e.removeAttribute(n))}function Te(t,e,n){const r=[],s=[],o=[],i=[],a=n.head.style,l=new Map;for(const c of t.children)l.set(c.outerHTML,c);for(const c of e.children){let u=l.has(c.outerHTML),_=n.head.shouldReAppend(c),h=n.head.shouldPreserve(c);u||h?_?s.push(c):(l.delete(c.outerHTML),o.push(c)):a==="append"?_&&(s.push(c),i.push(c)):n.head.shouldRemove(c)!==!1&&s.push(c)}i.push(...l.values()),console.log("to append: ",i);const m=[];for(const c of i){console.log("adding: ",c);const u=document.createRange().createContextualFragment(c.outerHTML).firstChild;if(!u)throw new Error("could not create new element from: "+c.outerHTML);if(console.log(u),n.callbacks.beforeNodeAdded(u)){if(u.hasAttribute("href")||u.hasAttribute("src")){let _;const h=new Promise(g=>{_=g});u.addEventListener("load",function(){_(void 0)}),m.push(h)}e.appendChild(u),n.callbacks.afterNodeAdded(u),r.push(u)}}for(const c of s)n.callbacks.beforeNodeRemoved(c)!==!1&&(e.removeChild(c),n.callbacks.afterNodeRemoved(c));return n.head.afterHeadMorphed(e,{added:r,kept:o,removed:s}),m}function A(){}function ct(t,e,n){return{target:t,newContent:e,config:n,morphStyle:n.morphStyle,ignoreActive:n.ignoreActive,idMap:bt(t,e),deadIds:new Set,callbacks:Object.assign({beforeNodeAdded:A,afterNodeAdded:A,beforeNodeMorphed:A,afterNodeMorphed:A,beforeNodeRemoved:A,afterNodeRemoved:A},n.callbacks),head:Object.assign({style:"merge",shouldPreserve:r=>r.getAttribute("im-preserve")==="true",shouldReAppend:r=>r.getAttribute("im-re-append")==="true",shouldRemove:A,afterHeadMorphed:A},n.head)}}function Ae(t,e,n){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName?t?.id?.length&&t.id===e.id?!0:$(n,t,e)>0:!1}function K(t,e){return!t||!e?!1:t.nodeType===e.nodeType&&t.tagName===e.tagName}function Le(t,e,n){for(;t!==e;){const r=t;if(t=t?.nextSibling,!r)throw new Error("tempNode is null");Me(r,n)}return P(n,e),e.nextSibling}function ut(t,e,n,r,s){const o=$(s,n,e);let i=null;if(o>0){i=r;let a=0;for(;i!=null;){if(Ae(n,i,s))return i;if(a+=$(s,i,t),a>o)return null;i=i.nextSibling}}return i}function ft(t,e,n,r){let s=n,o=e.nextSibling,i=0;for(;s&&o;){if($(r,s,t)>0)return null;if(K(e,s))return s;if(K(o,s)&&(i++,o=o.nextSibling,i>=2))return null;s=s.nextSibling}return s}const Pe=new DOMParser;function dt(t){const e=t.replace(/<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,"");if(e.match(/<\/html>/)||e.match(/<\/head>/)||e.match(/<\/body>/)){const n=Pe.parseFromString(t,"text/html");if(e.match(/<\/html>/))return q.add(n),n;{let r=n.firstChild;return r?(q.add(r),r):null}}else{const r=Pe.parseFromString(`<body><template>${t}</template></body>`,"text/html").body.querySelector("template")?.content;if(!r)throw new Error("content is null");return q.add(r),r}}function pt(t){if(t==null)return document.createElement("div");if(q.has(t))return t;if(t instanceof Node){const e=document.createElement("div");return e.append(t),e}else{const e=document.createElement("div");for(const n of[...t])e.append(n);return e}}function ht(t,e,n){const r=[],s=[];for(;t;)r.push(t),t=t.previousSibling;for(;r.length>0;){const o=r.pop();s.push(o),e?.parentElement?.insertBefore(o,e)}for(s.push(e);n;)r.push(n),s.push(n),n=n.nextSibling;for(;r.length;)e?.parentElement?.insertBefore(r.pop(),e.nextSibling);return s}function mt(t,e,n){let r=t.firstChild,s=r,o=0;for(;r;){let i=gt(r,e,n);i>o&&(s=r,o=i),r=r.nextSibling}return s}function gt(t,e,n){return K(t,e)?.5+$(n,t,e):0}function Me(t,e){P(e,t),e.callbacks.beforeNodeRemoved(t)!==!1&&(t.remove(),e.callbacks.afterNodeRemoved(t))}function vt(t,e){return!t.deadIds.has(e)}function _t(t,e,n){return t.idMap.get(n)?.has(e)||!1}function P(t,e){const n=t.idMap.get(e);if(n)for(const r of n)t.deadIds.add(r)}function $(t,e,n){const r=t.idMap.get(e);if(!r)return 0;let s=0;for(const o of r)vt(t,o)&&_t(t,o,n)&&++s;return s}function Ne(t,e){const n=t.parentElement,r=t.querySelectorAll("[id]");for(const s of r){let o=s;for(;o!==n&&o;){let i=e.get(o);i==null&&(i=new Set,e.set(o,i)),i.add(s.id),o=o.parentElement}}}function bt(t,e){const n=new Map;return Ne(t,n),Ne(e,n),n}const yt=["get","post","put","patch","delete"].reduce((t,e)=>(t[e]=async n=>kt(e,n),t),{}),Et="Accept",wt="Content-Type",St="datastar-request",Tt="application/json",At="text/event-stream",Lt="true",J="datastar",ie=`${J}-indicator`,z=`${J}-request`,ke=`${J}-settling`,Re=`${J}-swapping`,Pt="self",y={MorphElement:"morph_element",InnerElement:"inner_element",OuterElement:"outer_element",PrependElement:"prepend_element",AppendElement:"append_element",BeforeElement:"before_element",AfterElement:"after_element",DeleteElement:"delete_element",UpsertAttributes:"upsert_attributes"},Mt=[{prefix:"header",description:"Sets the header of the fetch request",mustNotEmptyKey:!0,mustNotEmptyExpression:!0,onLoad:t=>{const e=t.store.fetch.headers,n=t.key[0].toUpperCase()+t.key.slice(1);return e[n]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{delete e[n]}}},{prefix:"fetchUrl",description:"Sets the fetch url",mustHaveEmptyKey:!0,mustNotEmptyExpression:!0,onGlobalInit:({mergeStore:t})=>{const e=document.createElement("style");e.innerHTML=`
.${ie}{
 opacity:0;
}
.${z} .${ie}{
 opacity:1;
 transition: opacity 300ms ease-in;
}
.${z}.${ie}{
 opacity:1;
 transition: opacity 300s ease-in;
}
`,document.head.appendChild(e),t({fetch:{headers:{},elementURLs:{}}})},onLoad:t=>t.reactivity.effect(()=>{const e=t.reactivity.computed(()=>`${t.expressionFn(t)}`);return t.store.fetch.elementURLs[t.el.id]=e,()=>{delete t.store.fetch.elementURLs[t.el.id]}})},{prefix:"sse",description:"Sets the value of the element",mustHaveEmptyKey:!0,onLoad:t=>{if(typeof t.expressionFn(t)!="string")throw new Error("SSE url must be a string");return()=>{}}}],Nt=/(?<key>\w*): (?<value>.*)/gm;async function kt(t,e){const{el:n,store:r}=e,s=r.fetch.elementURLs[n.id];if(!s)throw new Error(`No signal for ${t}`);n.classList.add(z);const o=new URL(s.value,window.location.origin),i=new Headers;i.append(Et,At),i.append(wt,Tt),i.append(St,Lt);const a=r.fetch.headers.value;if(a)for(const h in a){const g=a[h];i.append(h,g)}const l={...r};delete l.fetch;const m=JSON.stringify(l);t=t.toUpperCase();const c={method:t,headers:i};if(t==="GET"){const h=new URLSearchParams(o.search);h.append("datastar",m),o.search=h.toString()}else c.body=m;const u=await fetch(o,c);if(!u.ok){if(!(u.status>=300&&u.status<400))throw new Error("Response was not ok and wasn't a redirect, can't merge.");let g=await u.text();g.startsWith("/")&&(g=window.location.origin+g),console.log(`Redirecting to ${g}`),window.location.replace(g);return}if(!u.body)throw new Error("No response body");const _=u.body.pipeThrough(new TextDecoderStream).getReader();for(;;){const{done:h,value:g}=await _.read();if(h)break;g.split(`

`).forEach(Z=>{console.log(Z);const X=[...Z.matchAll(Nt)];if(X.length){let Y="",Q="morph_element",x="",D=0;for(const f of X){if(!f.groups)continue;const{key:S,value:v}=f.groups;switch(S){case"event":if(v!=="datastar-fragment")throw new Error("datastar-fragment event not supported");break;case"data":switch(D){case 0:x=v;break;case 1:const I=v;if(!Object.values(y).includes(I))throw new Error(`Unknown merge option: ${v}`);Q=I;break;case 2:Y=v;break}D++}}Rt(e,x,Q,Y)}})}n.classList.remove(z)}const He=document.createElement("template");function Rt(t,e,n,r){const{el:s}=t;He.innerHTML=r;const o=He.content.firstChild;if(!(o instanceof Element))throw new Error(`Fragment is not an element, source '${r}'`);const i=e===Pt;let a;if(i)a=[s];else{const l=e||`#${o.getAttribute("id")}`;if(a=document.querySelectorAll(l)||[],!a)throw new Error(`No target elements, selector: ${e}`)}for(const l of a){l.classList.add(Re);const m=l.outerHTML;switch(n){case y.MorphElement:at(l,o);break;case y.InnerElement:l.innerHTML=o.innerHTML;break;case y.OuterElement:l.outerHTML=o.outerHTML;break;case y.PrependElement:l.prepend(o);break;case y.AppendElement:l.append(o);break;case y.BeforeElement:l.before(o);break;case y.AfterElement:l.after(o);break;case y.DeleteElement:l.remove();break;case y.UpsertAttributes:o.getAttributeNames().forEach(u=>{const _=o.getAttribute(u);l.setAttribute(u,_)});break;default:throw new Error(`Unknown merge type: ${n}`)}t.applyPlugins(l),l.classList.remove(Re);const c=l.outerHTML;m!==c&&(l.classList.add(ke),setTimeout(()=>{l.classList.remove(ke)},300))}}const Ht={setAll:async(t,e,n)=>{const r=new RegExp(e);Object.keys(t.store).filter(s=>r.test(s)).forEach(s=>{t.store[s].value=n})}},ae="display",Oe="none",le="important",Ot={prefix:"show",description:"Sets the display of the element",allowedModifiers:new Set([le]),onLoad:t=>{const{el:e,modifiers:n,expressionFn:r}=t;return ne(()=>{const o=!!r(t),a=n.has(le)?le:void 0;o?e.style.length===1&&e.style.display===Oe?e.style.removeProperty(ae):e.style.setProperty(ae,"",a):e.style.setProperty(ae,Oe,a)})}},Ct="intersects",Ce="once",$e="half",xe="full",$t={prefix:Ct,description:"Run expression when element intersects with viewport",allowedModifiers:new Set([Ce,$e,xe]),mustHaveEmptyKey:!0,onLoad:t=>{const{modifiers:e}=t,n={threshold:0};e.has(xe)?n.threshold=1:e.has($e)&&(n.threshold=.5);const r=new IntersectionObserver(s=>{s.forEach(o=>{o.isIntersecting&&(t.expressionFn(t),e.has(Ce)&&r.disconnect())})},n);return r.observe(t.el),()=>r.disconnect()}},De="prepend",Ie="append",Fe=new Error("Target element must have a parent if using prepend or append"),xt=[Ot,$t,{prefix:"teleport",description:"Teleports the element to another element",allowedModifiers:new Set([De,Ie]),allowedTags:new Set(["template"]),bypassExpressionFunctionCreation:!0,onLoad:t=>{const{el:e,modifiers:n,expression:r}=t;if(!(e instanceof HTMLTemplateElement))throw new Error;const s=document.querySelector(r);if(!s)throw new Error(`Target element not found: ${r}`);if(!e.content)throw new Error("Template element must have content");const o=e.content.cloneNode(!0);if(L(o)?.firstElementChild)throw new Error("Empty template");if(n.has(De)){if(!s.parentNode)throw Fe;s.parentNode.insertBefore(o,s)}else if(n.has(Ie)){if(!s.parentNode)throw Fe;s.parentNode.insertBefore(o,s.nextSibling)}else s.appendChild(o)}},{prefix:"scrollIntoView",description:"Scrolls the element into view",onLoad:t=>{const{el:e}=t;e.scrollIntoView({behavior:"smooth",block:"center",inline:"center"})}}];function je(t={},...e){const n=performance.now(),r=new ve(t,...e);r.run();const s=performance.now();return console.log(`Datastar loaded and attached to all DOM elements in ${s-n}ms`),r}function Dt(t={},...e){const n=Object.assign({},Ht,yt,t),r=[...Mt,...xt,...st,...e];return je(n,...r)}E.Datastar=ve,E.runDatastarWith=je,E.runDatastarWithAllPlugins=Dt,E.toHTMLorSVGElement=L,Object.defineProperty(E,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=datastar.umd.cjs.map
