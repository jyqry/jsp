/**
 * jQuery Line Progressbar
 * Author: KingRayhan<rayhan095@gmail.com>
 * Author URL: http://rayhan.info
 * Version: 1.0.0
 */

(function ($) {
    'use strict';


    $.fn.LineProgressbar = function (options) {

         options = $.extend({
            percentage: null,
            ShowProgressCount: true,
            duration: 1000,
			pst:100,
			max:100.0,
			

            // Styling Options
            fillBackgroundColor: '#3498db',
            backgroundColor: '#6c6c6c',
            radius: '0px',
            height: '10px',
            width: '100%'
        }, options);

        $.options = options;
        return this.each(function (index, el) {
            // Markup
            $(el).html('<div class="progressbar"><div class="proggress"></div></div>');



            var progressFill = $(el).find('.proggress');
            var progressBar = $(el).find('.progressbar');


            progressFill.css({
                backgroundColor: options.fillBackgroundColor,
                height: options.height,
                borderRadius: options.radius
            });
            progressBar.css({
                width: options.width,
                backgroundColor: options.backgroundColor,
                borderRadius: options.radius
            });
			options.percentage=parseFloat(options.pst/options.max)*100;
			progressFill.width(options.percentage + "%");
			progressFill.text(options.pst+"/"+options.max);
            ////////////////////////////////////////////////////////////////////
        });
    }
})(jQuery);