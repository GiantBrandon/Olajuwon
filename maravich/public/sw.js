if(!self.define){let e,t={};const s=(s,a)=>(s=new URL(s+".js",a).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(a,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(t[n])return;let i={};const r=e=>s(e,n),f={module:{uri:n},exports:i,require:r};t[n]=Promise.all(a.map((e=>f[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("worker-OjTuU5fq5_t7PAftcAqLF.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"5b1c8827d7a13736f9e097e311de81ad"},{url:"/_next/static/OjTuU5fq5_t7PAftcAqLF/_buildManifest.js",revision:"dfd6036ba2bea0037e723f47feb81d9b"},{url:"/_next/static/OjTuU5fq5_t7PAftcAqLF/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/127-8320c8b2bb723996.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/190-c90ef2264c3d8bb6.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/196-547f1d3e2171168f.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/2443530c-85474c2c74e555fa.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/294-f2d38636ca0b049f.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/342-3af326359c1cd2ed.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/379-7751bea67de3a0e7.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/394-1ad686931d299800.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/40-a4f14fe4d60adab4.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/425-1797acba9935f654.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/548-4997cca6df1c5133.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/596-351badadad0782ee.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/66-21085a105867b42f.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/666-2f60c5258092c798.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/702-c72aeaf7cf90c910.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/722-eab5f57bcc5af33b.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/928-0ac3e55aafd1a71a.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/GameHub/Battleship/page-4cd23ceffe3345bd.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/GameHub/Match/page-09769581fc9e4f83.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/GameHub/TowerDefense/page-5396505648ee31f5.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/GameHub/Yahtzee/page-444c807decf31d65.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/GameHub/page-fb42103465964e05.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/Json/page-444e7cfd2aa1c605.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/Wedding/layout-f32b4df3d53af17a.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/Wedding/page-fd5f4b3e2a1fc6a7.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/layout-393daa4c2d870a88.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/app/page-411388914ee50bf1.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/main-5d93c8444ce09377.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/main-app-c7e0ca785647cc4b.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/pages/_app-55f84010926ca5a8.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/pages/_error-486d2d7145096184.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-9e541e42ce3d9c0c.js",revision:"OjTuU5fq5_t7PAftcAqLF"},{url:"/_next/static/media/Alexis.000a7328.jpeg",revision:"58c158c9c7678623bad58b65fe986712"},{url:"/_next/static/media/Cuddles.a2029fb9.jpg",revision:"b11a665721e78618df4816b4f88d6474"},{url:"/_next/static/media/Forrest.a163a30b.jpeg",revision:"95f42f6d409f06f0c6de4e18a982acf5"},{url:"/_next/static/media/Jason.e39ce329.jpeg",revision:"ce35224896624e945f6a61de8cae91b4"},{url:"/_next/static/media/Jen.35bbafc2.jpeg",revision:"31aaee6a5268ae38562628a8f27eb788"},{url:"/_next/static/media/StaringIntoEyes.75cb8322.jpg",revision:"d4eb10b6dd9f26bb593c7091bc7ec4d4"},{url:"/_next/static/media/Stephanie.5ea7f939.jpeg",revision:"2762b44e82d257aa8c0864650d038884"},{url:"/_next/static/media/Sunset.df1f2531.jpg",revision:"482c742acbfd83102831f236be849b3c"},{url:"/_next/static/media/Swimming.6ad9b929.jpg",revision:"7b8d7ec8758b00ecf53578b8ead91739"},{url:"/_next/static/media/Xavier.c9df938c.jpeg",revision:"951279c3337180c25baddd788598a034"},{url:"/_next/static/media/background.31d83eb5.webp",revision:"3ba89a399692ef1a9551fc7a69a94d43"},{url:"/background.webp",revision:"3ba89a399692ef1a9551fc7a69a94d43"},{url:"/distant-ship-horn.wav",revision:"6893b91d2516b3cfaa249cdd0e21bbfe"},{url:"/drawing.png",revision:"ffdfc370bbec076cbe31686fa1b27e62"},{url:"/drawing.svg",revision:"02c4744a9d5abf1541bded9eb6693722"},{url:"/drawing.webp",revision:"75cf5f7dff9f6447ad5d1c5f477ca8cb"},{url:"/gun-cock.wav",revision:"3ac950c7e1cb6e42dced9442d50423ca"},{url:"/manifest.json",revision:"fe5560c820fddb1a8b894e5a5517154e"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:t,event:s,state:a})=>t&&"opaqueredirect"===t.type?new Response(t.body,{status:200,statusText:"OK",headers:t.headers}):t}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>self.origin===e.origin&&!(!e.pathname.startsWith("/_next/data/")||-1===e.pathname.indexOf(".json"))),new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400}),{cacheWillUpdate:async({request:e,response:t})=>e.headers.get("x-middleware-prefetch")||t.headers.get("x-middleware-skip")?null:200===t.status?t:null},{cachedResponseWillBeUsed:async({cacheName:e,request:t,matchOptions:s,cachedResponse:a,event:c})=>a&&a.headers.get("x-middleware-skip")?null:a}]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const t=e.pathname;return!t.startsWith("/api/auth/callback/")&&!!t.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
