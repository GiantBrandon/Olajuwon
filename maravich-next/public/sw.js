if(!self.define){let e,s={};const n=(n,c)=>(n=new URL(n+".js",c).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const o=e=>n(e,t),u={module:{uri:t},exports:i,require:o};s[t]=Promise.all(c.map((e=>u[e]||o(e)))).then((e=>(a(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("worker-5Lsf6InfPg2cTuo9PTme0.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5Lsf6InfPg2cTuo9PTme0/_buildManifest.js",revision:"dfd6036ba2bea0037e723f47feb81d9b"},{url:"/_next/static/5Lsf6InfPg2cTuo9PTme0/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/127-8320c8b2bb723996.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/139-677355503e7b1ad0.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/190-c90ef2264c3d8bb6.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/2443530c-85474c2c74e555fa.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/40-a4f14fe4d60adab4.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/445-4d55f54593422c4a.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/548-4997cca6df1c5133.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/596-351badadad0782ee.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/66-21085a105867b42f.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/664-ea2b7ecc71b13306.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/684-0372a82266013ae0.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/686-dcd736fc00bcb71d.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/701-212aedf412df7ae7.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/722-eab5f57bcc5af33b.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/826-93adb6d29a65e9e5.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/881-83d27022ef0a9502.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/GameHub/Battleship/page-a8a2cc36196ad69e.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/GameHub/Match/page-5edb82ba2e55e96d.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/GameHub/TowerDefense/page-c90e8ad52ae86bc4.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/GameHub/Yahtzee/page-a5e95cd53a280b37.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/GameHub/page-fa9a153cf78d96b7.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/Json/page-f361ce77906817e8.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/Wedding/layout-9f1de334457585c9.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/Wedding/page-0c9dba06e2dfbf45.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/layout-67ba5bac6d9a1e8d.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/app/page-f7ec55b2f9c0c980.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/main-ad51153955d69622.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/main-app-f7376676627f6e71.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/pages/_app-55f84010926ca5a8.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/pages/_error-486d2d7145096184.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-cecb4b3236739d43.js",revision:"5Lsf6InfPg2cTuo9PTme0"},{url:"/_next/static/css/2773e268abb82886.css",revision:"2773e268abb82886"},{url:"/_next/static/media/background.31d83eb5.webp",revision:"3ba89a399692ef1a9551fc7a69a94d43"},{url:"/background.webp",revision:"3ba89a399692ef1a9551fc7a69a94d43"},{url:"/distant-ship-horn.wav",revision:"6893b91d2516b3cfaa249cdd0e21bbfe"},{url:"/drawing.png",revision:"ffdfc370bbec076cbe31686fa1b27e62"},{url:"/drawing.svg",revision:"02c4744a9d5abf1541bded9eb6693722"},{url:"/drawing.webp",revision:"75cf5f7dff9f6447ad5d1c5f477ca8cb"},{url:"/gun-cock.wav",revision:"3ac950c7e1cb6e42dced9442d50423ca"},{url:"/manifest.json",revision:"fe5560c820fddb1a8b894e5a5517154e"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
