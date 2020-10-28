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
        let name = tile.find(".psw-image img:first").prop('alt');
        tile.find(".ems-sdk-product-tile__details").append("<span style='    font-size: 12px;    display: inline-block;    line-height: 17px;'>" + name + "</span>");
    }

    injectLodash(function () {
        injectJQuery(function() {
            jQuery("body").prepend("<button class='get-names' style='position: fixed;z-index: 100000;top: 20px;right: 250px;border: solid 1px;padding: 10px;'>GET NAMES</button>");
            jQuery('button.get-names').on("click",function () {
                jQuery("ul li.cell").prop("style", "min-height:250px");
                _.each(getAllTiles(), function(tile) {
                    createName(jQuery(tile));
                })}
               );
        });
    });

    // Your code here...
})();
