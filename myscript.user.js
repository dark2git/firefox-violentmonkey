// ==UserScript==
// @name         Auto Scale for Tablets
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Масштабує сайт так, щоб він поміщався на екрані планшета без білих полів
// @author       Ти
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function adjustViewport() {
        let viewport = document.querySelector("meta[name=viewport]");
        if (!viewport) {
            viewport = document.createElement("meta");
            viewport.name = "viewport";
            document.head.appendChild(viewport);
        }

        let screenWidth = window.innerWidth;
        let siteWidth = 1920; // Розмір сайту, який треба вмістити в екран

        let scaleFactor = screenWidth / siteWidth;

        viewport.content = `width=${siteWidth}, initial-scale=${scaleFactor}, minimum-scale=${scaleFactor}, maximum-scale=${scaleFactor}, user-scalable=no`;

        document.body.style.transform = `scale(${scaleFactor})`;
        document.body.style.transformOrigin = "0 0"; // Фіксує початкову точку масштабування
        document.body.style.width = `${siteWidth}px`;
    }

    // Запускаємо скрипт після завантаження сторінки
    window.addEventListener("load", adjustViewport);
})();
