// ==UserScript==
// @name         Twitter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const process = (node) => {
    const tweet = node.querySelector('[data-testid=tweet]');
    if (!tweet) return
    const group = tweet.querySelector('[role=group]');
    const content = group.parentNode.previousSibling;
    const button = document.createElement('div');
    const tweetText = tweet.querySelector('[data-testid=tweetText]');
    button.textContent = "download";
    button.addEventListener('click', e => {
      e.preventDefault();
      const imgs = Array.from(content.querySelectorAll('img'));
      console.log(imgs.map(img => img.src), tweetText && tweetText.innerText);
    });
    group.appendChild(button);
  };
  const cellInnerDiv = x => x.getAttribute("data-testid") === 'cellInnerDiv';
  const observer = new MutationObserver(mutationList => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        const nodes = Array.from(mutation.addedNodes).filter(cellInnerDiv);
        if (nodes) nodes.forEach(process);
      }
    }
  });
  const config = { attributes: true, childList: true, subtree: true };
  const targetNode = document.body;
  observer.observe(targetNode, config);
})();