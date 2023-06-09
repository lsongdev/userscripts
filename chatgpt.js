// ==UserScript==
// @name         GPT4-Mobile
// @namespace    https://chat.openai.com/
// @description  Enable GPT4-Mobile for ChatGPT
// @version      0.0.1
// @match        https://chat.openai.com/*
// @run-at       document-start
// @author       Lsong
// @grant        unsafeWindow
// @license      MIT
// ==/UserScript==

const GPT4_MOBILE = {
  browsing_model: null,
  category: "gpt_4",
  code_interpreter_model: null,
  default_model: "gpt-4-mobile",
  human_category_name: "GPT-4-Mobile",
  plugins_model: null,
  subscription_level: "plus",
};

(function () {
  const originFetch = fetch;
  window.unsafeWindow.fetch = async (url, options) => {
    const response = await originFetch(url, options);
    if (url.indexOf('/backend-api/models') === -1) {
      return response;
    }
    const res = response.clone();
    let data = await res.json();
    data.models = data.models.map(m => {
      // m.tags = m.tags.filter(t => t !== 'mobile');
      if (m.slug === 'gpt-4-mobile') {
        data.categories.push(GPT4_MOBILE);
      }
      return m;
    });
    return new Response(JSON.stringify(data), response);
  };
})();