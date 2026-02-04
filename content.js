(function() {
  'use strict';

  const hostname = location.hostname.toLowerCase();
  if (!hostname.includes('rophim') && 
      !hostname.includes('robong') && 
      !hostname.includes('embedrb') && 
      !hostname.includes('goatembed')) {
    return;
  }

  const css = `
    .is-catfish,
    .modal-backdrop,
    .sspp-modal,
    .sspp-area,
    .swiper-slide:has(> .sspp-area) {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    body, html {
      overflow: auto !important;
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);

  const hideSelectors = ['.is-catfish', '.modal-backdrop', '.sspp-modal', '.sspp-area'];
  
  function hideAds() {
    hideSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.display = 'none';
      });
    });
  }

  const observer = new MutationObserver(hideAds);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  hideAds();

  const scriptContent = `
    (function() {
      const originalOpen = window.open;
      window.open = function(url, target, features) {
        try {
          if (url) {
            const current = new URL(location.href);
            const targetUrl = new URL(url, location.href);
            if (targetUrl.origin === current.origin) {
              return null;
            }
          }
        } catch(e) {
          if (url && !url.includes('://') && !url.startsWith('//')) {
            return null;
          }
        }
        return originalOpen.call(this, url, target, features);
      };
      
      const originalReplace = location.replace;
      location.replace = function(url) {
        if (url && (url.includes('finallygotthexds.site') || 
                    url.includes('promolink') ||
                    url.includes('redirect'))) {
          return;
        }
        return originalReplace.call(this, url);
      };
      
      const origAddEvent = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (type === 'click') {
          const listenerStr = listener ? listener.toString() : '';
          if (listenerStr.indexOf('isSwapping') > -1 || 
              listenerStr.indexOf('popup') > -1 ||
              listenerStr.indexOf('window.open') > -1 ||
              listenerStr.indexOf('popu') > -1) {
            return;
          }
        }
        return origAddEvent.call(this, type, listener, options);
      };
    })();
  `;

  const script = document.createElement('script');
  script.textContent = scriptContent;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
})();