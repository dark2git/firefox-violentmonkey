// ==UserScript==
// @name        1080p IFrame Fix
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      -
// @description Forces 1080p through IFrame
// ==/UserScript==

(function() {
    if (window.self === window.top) {
        const originalContent = document.documentElement.innerHTML;
        document.documentElement.innerHTML = '';
        
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'width:100vw;height:100vh;overflow:hidden;margin:0;padding:0;';
        
        const frame = document.createElement('iframe');
        frame.style.cssText = 'width:1080px;height:100vh;border:none;transform-origin:left top;';
        frame.srcdoc = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta name="viewport" content="width=1080">
                </head>
                <body style="width:1080px;margin:0;">
                    ${originalContent}
                </body>
            </html>
        `;
        
        wrapper.appendChild(frame);
        document.body.appendChild(wrapper);
        
        function updateScale() {
            const scale = Math.min(window.innerWidth / 1080, 1);
            frame.style.transform = `scale(${scale})`;
        }
        
        window.addEventListener('resize', updateScale);
        updateScale();
    }
})();