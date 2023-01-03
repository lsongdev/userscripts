// ==UserScript==
// @name         Zhihu
// @namespace    https://github.com/song940/userscripts/zhihu.com.js
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://www.zhihu.com/*
// @match        *://zhuanlan.zhihu.com/*
// @exclude      https://www.zhihu.com/signin*
// @icon         https://static.zhihu.com/heifetz/favicon.ico
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_info
// @grant        window.onurlchange
// @license      GPL-3.0 License
// @run-at       document-end
// @supportURL   https://github.com/song940/userscripts
// @homepageURL  https://github.com/song940/userscripts
// ==/UserScript==

(function () {
  const process = (nodes) => {
    for (const node of Array.from(nodes)) {
      if (/Qrcode-qrcode/.test(node.className)) {
        const dialog = node.closest('.Modal-enter-done');
        const parent = dialog.parentNode;
        console.log(dialog);
        parent.removeChild(dialog);
      }
    }

  };
  const observer = new MutationObserver(function (mutationList, observer) {
    for (const mutation of mutationList) {
      // console.log(mutation);
      switch (mutation.type) {
        case 'childList':
          process(mutation.addedNodes);
          break;
        case 'attributes':
          // console.log(`The ${mutation.attributeName} attribute was modified.`);
          break;
      }
    }
  });
  const config = { attributes: true, childList: true, subtree: true };
  const targetNode = document.body;
  observer.observe(targetNode, config);
})();