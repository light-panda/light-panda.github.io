(this["webpackJsonplight-panda.github.io"]=this["webpackJsonplight-panda.github.io"]||[]).push([[0],{103:function(e,t,n){},104:function(e,t,n){},105:function(e,t,n){},106:function(e,t,n){},196:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(4),i=n.n(a),c=(n(103),n(104),n(39)),l=n(45),s=n(7),u=(n(105),function(){return Math.random().toString(36).substring(7)}),f=n(94),p=n(96),d=n(198);n(106);function m(e){var t=e.onClick,n=e.className;return o.a.createElement("svg",{onClick:t,className:"icon ".concat(n),xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},o.a.createElement("title",null,"Delete"),o.a.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"}))}function b(e){var t=e.className;return o.a.createElement("svg",{className:"icon ".concat(t),xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},o.a.createElement("title",null,"Edit"),o.a.createElement("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}))}var g=function(e){var t=e.className,n=e.innerProps,r=e.onDelete;return o.a.createElement("div",Object.assign({className:t},n),o.a.createElement(b,{className:"list__item__toolbox__edit"}),o.a.createElement(m,{onClick:r,className:"list__item__toolbox__delete"}))};function v(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?v(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):v(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O={transition:"top ".concat(400,"ms ease-in-out, left ").concat(400,"ms ease-in-out, opacity ").concat(400,"ms ease-in-out"),opacity:1,position:"relative",top:"0px",left:"0px"},w={entering:{opacity:0,top:"-20px",left:"0px"}};function j(){var e=Object(r.useState)(!1),t=Object(s.a)(e,2),n=t[0],o=t[1];return[{onMouseEnter:function(){return o(!0)},onMouseLeave:function(){return o(!1)}},n]}var y=o.a.forwardRef((function(e,t){var n=e.todo,a=e.itemsBeingDeleted,i=e.deleteItem,c=e.innerRef,l=e.innerProps,u=j(),f=Object(s.a)(u,2),m=f[0],b=f[1],v=j(),y=Object(s.a)(v,2),E=y[0],P=y[1],_=Object(r.useState)(!1),x=Object(s.a)(_,2),N=x[0],k=x[1];return o.a.createElement(p.a,{in:!!a.find((function(e){return e.id===n.id})),timeout:400,onEntered:function(){return i({id:n.id})}},(function(e){return o.a.createElement("div",Object.assign({className:"list__item",ref:t||c},l),o.a.createElement(d.a,{in:b||P&&N,timeout:{enter:0,exit:500},classNames:"list__item__toolbox",onEntered:function(){return k(!0)},onExited:function(){return k(!1)}},(function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(g,{className:"list__item__toolbox",innerProps:E,onDelete:i}),o.a.createElement("li",Object.assign({},m,{className:"list__item__content",style:h({},O,{},w[e])}),n.text))})))}))})),E=n(95),P=n(44);function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var N=function(e,t,n){var r=Array.from(e),o=r.splice(t,1),a=Object(s.a)(o,1)[0];return r.splice(n,0,a),r};var k=function(){var e=Object(f.a)("todos",[]),t=Object(s.a)(e,2),n=t[0],a=t[1],i=Object(r.useState)([]),c=Object(s.a)(i,2),p=c[0],d=(c[1],Object(r.useState)("")),m=Object(s.a)(d,2),b=m[0],g=m[1];return Object(r.useEffect)((function(){return a(n.filter((function(e){return!0!==e.deleting})))}),[]),o.a.createElement("div",{className:"container"},o.a.createElement("input",{type:"text",id:"input",className:"input-text",placeholder:"Write an idea ...",value:b,onChange:function(e){return g(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&b.length>0&&(a([{id:u(),text:b,done:!1,deleting:!1}].concat(Object(l.a)(n))),g(""))}}),o.a.createElement(P.a,{onDragEnd:function(e){e.destination&&a(N(n,e.source.index,e.destination.index))}},o.a.createElement(P.c,{droppableId:"droppable"},(function(e){return o.a.createElement("div",Object.assign({},e.droppableProps,{ref:e.innerRef,className:"list-droppable"}),o.a.createElement(E.a,{component:"ul",className:"list",type:["top","top"],appear:!1},n.map((function(e,t){return o.a.createElement(P.b,{key:e.id,draggableId:e.id,index:t},(function(t){return o.a.createElement(y,{todo:e,itemsBeingDeleted:p,deleteItem:function(){return function(e){var t=e.id;a(Object(l.a)(n.filter((function(e){return e.id!==t}))))}({id:e.id})},innerRef:t.innerRef,innerProps:x({},t.draggableProps,{},t.dragHandleProps),style:t.draggableProps.style})}))})),e.placeholder))}))))};var D=function(){return o.a.createElement("div",{className:"App"},o.a.createElement(k,null))},S=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function R(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(o.a.createElement(D,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");S?(!function(e,t){fetch(e).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):R(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):R(t,e)}))}}()},98:function(e,t,n){e.exports=n(196)}},[[98,1,2]]]);
//# sourceMappingURL=main.aaae4480.chunk.js.map