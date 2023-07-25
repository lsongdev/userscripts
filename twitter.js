// ==UserScript==
// @name         Twitter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Lsong
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

const ICONS = {
  download: `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#536471" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs">
      <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"></path>
    </svg>`,
  logo: `
     <svg data-replaced="true" viewBox="0 0 24 24" aria-hidden="true" class="r-k200y r-1cvl2hr r-4qtqp9 r-yyyyoo r-eu3ka r-dnmrzs r-bnwqim r-1plcrui r-lrvibr old-twitter-icon">
       <g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g>
     </svg>`
};

(function () {
  'use strict';

  const icon = document.querySelector(`link[rel="shortcut icon"]`);
  icon.href = `https://abs.twimg.com/favicons/twitter.2.ico`;

  const replaceLogo = node => {
    const logo = node.querySelector(`h1[role=heading] > a > div`);
    if (!logo) return;
    logo.innerHTML = ICONS.logo;
  };

  const replaceStartup = () => {
    const startup = document.querySelector(`#placeholder > svg`);
    if (!startup) return;
    startup.outerHTML = ICONS.logo;
  };

  replaceStartup();

  const addDownloadButton = node => {
    const tweet = node.querySelector('[data-testid=tweet]');
    if (!tweet || tweet.lock) return
    tweet.lock = true;
    const group = tweet.querySelector('[role=group]');
    const content = group.parentNode.previousSibling;
    const button = document.createElement('div');
    const tweetText = tweet.querySelector('[data-testid=tweetText]');
    button.style.display = `inline-grid`;
    button.innerHTML = ICONS.download;
    button.addEventListener('click', e => {
      e.preventDefault();
      const imgs = Array.from(content.querySelectorAll('img'));
      console.log(imgs.map(img => img.src), tweetText && tweetText.innerText);
    });
    group.appendChild(button);
  };

  const process = (node) => {
    if (!node.querySelector) return
    replaceLogo(node);
    addDownloadButton(node);
  };
  const observer = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        const nodes = Array.from(mutation.addedNodes);
        if (nodes) nodes.forEach(process);
      }
    }
  });
  const config = { attributes: true, childList: true, subtree: true };
  const targetNode = document.body;
  observer.observe(targetNode, config);
})();