// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://store.playstation.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function injectLodash(onLoad) {
        injectScript('https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js', onLoad);
    }

    function injectJQuery(onLoad) {
        injectScript('https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js', onLoad);
    }

    function injectScript(url, onLoad) {
        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.async = true;
        script.onload = onLoad;
        script.setAttribute('src', url);

        document.head.appendChild(script);
    }


    function getAllTiles()
    {
        return jQuery(".ems-sdk-product-tile");
    }

    function createName(tile)
    {
        if (tile.find(".title-tile").length  === 0) {
        let name = tile.find(".psw-image img:first").prop('alt');
        tile.find(".ems-sdk-product-tile__details")
            .append("<span class='title-tile' style='    font-size: 12px;    display: inline-block;    line-height: 17px;'>" + name + "</span>");
        }
    }

    injectLodash(function () {
        injectJQuery(function() {
            let interval = window.setInterval(function () {
                if (jQuery("img.psw-fade-in").length > 0) {
                jQuery("ul li.cell").prop("style", "min-height:250px");
                    _.each(getAllTiles(), function(tile) {
                    createName(jQuery(tile));
                    }
                          );
//                    clearInterval(interval);
                }
            }, 1500);
        });
    });

    // Your code here...
})();
