if(!self.define){let e,s={};const a=(a,t)=>(a=new URL(a+".js",t).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(t,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let r={};const c=e=>a(e,n),o={module:{uri:n},exports:r,require:c};s[n]=Promise.all(t.map((e=>o[e]||c(e)))).then((e=>(i(...e),r)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("worker-4-oFtBgWwW_CkirXxr6jy.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/QR.jpg",revision:"65dcf78c3aa8bf617bbeaddaba3303f8"},{url:"/_next/app-build-manifest.json",revision:"bd6e8de70c8509a3a965c1cda1f3ae62"},{url:"/_next/static/4-oFtBgWwW_CkirXxr6jy/_buildManifest.js",revision:"058abb30d1ea32913dad262233b97b8a"},{url:"/_next/static/4-oFtBgWwW_CkirXxr6jy/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/102-46f7bbbbc4382163.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/120-240f65c0b68528bd.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/173-41c33dcec673500c.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/194-574d3ef168111a65.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/451-e73bc7c7a3596ebf.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/462-80adf82ee746f54d.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/492-5412157a2997e231.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/596-2f2fdc97a3e38dd7.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/64-4f511136e132c054.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/738-b361c770a5d75c42.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/740-546aa981fe8a4bfa.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/806-772580dd1541dc09.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/902-e9eab63ece80d319.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/951-694b3e4f67d08cfb.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/978-8741ebf0e3087ff1.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/Fantasy/page-5cd70548e93c05d7.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/GameHub/Battleship/page-a647310e6e75aeb7.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/GameHub/Match/page-0ffb516703cc036d.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/GameHub/TowerDefense/page-bcc1646540662189.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/GameHub/Yahtzee/page-9061ac630e72dcee.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/GameHub/page-110c24b5b6c8ca21.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/Json/page-126ed0a599ca87a1.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/_not-found-0a0c6d0839c6b885.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/layout-3c9e249adbe01090.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/app/page-0813b0e6456e107f.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/fd9d1056-33c2b04b88dd02de.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/framework-299b18fa4a36aac4.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/main-1fa0d47336d5b5d0.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/main-app-ed49e161471d01aa.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/pages/_app-9fe42125516a0dc0.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/pages/_error-d186ef4d3f229d49.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-a8ba63f2417b26c7.js",revision:"4-oFtBgWwW_CkirXxr6jy"},{url:"/_next/static/media/background.31d83eb5.webp",revision:"3ba89a399692ef1a9551fc7a69a94d43"},{url:"/background.webp",revision:"3ba89a399692ef1a9551fc7a69a94d43"},{url:"/distant-ship-horn.wav",revision:"6893b91d2516b3cfaa249cdd0e21bbfe"},{url:"/drawing.png",revision:"ffdfc370bbec076cbe31686fa1b27e62"},{url:"/drawing.svg",revision:"02c4744a9d5abf1541bded9eb6693722"},{url:"/drawing.webp",revision:"75cf5f7dff9f6447ad5d1c5f477ca8cb"},{url:"/gun-cock.wav",revision:"3ac950c7e1cb6e42dced9442d50423ca"},{url:"/manifest.json",revision:"fe5560c820fddb1a8b894e5a5517154e"},{url:"/wasm/game.html",revision:"052ac5dcaa85532f7fec1cb21929830b"},{url:"/wasm/game.js",revision:"2bc55ff95ea3aa0ff2e283113f922aaa"},{url:"/wasm/game.wasm",revision:"f34c659d502d3fb7536074fa4db414be"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:t})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>self.origin===e.origin&&!(!e.pathname.startsWith("/_next/data/")||-1===e.pathname.indexOf(".json"))),new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{cacheWillUpdate:async({request:e,response:s})=>e.headers.get("x-middleware-prefetch")||s.headers.get("x-middleware-skip")?null:200===s.status?s:null},{cachedResponseWillBeUsed:async({cacheName:e,request:s,matchOptions:a,cachedResponse:t,event:i})=>t&&t.headers.get("x-middleware-skip")?null:t}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/callback/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
