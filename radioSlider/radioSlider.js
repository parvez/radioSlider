/*
 * jQuery Radio Slider 1.0
 * http://www.parvez.me/
 *
 * Copyright 2012, Parvez Husain
 * Licensed under the MIT License (http://opensource.org/licenses/MIT)
 *
 * Date: Feb 13 2013
 * 
 * Requires jQuery & jQuery-UI (for draggable)
 * 
 * Usage:
 * 
 * $("#mydiv").radioSlider();
 * 
 *  <div id="mydiv">
 *    <ul>
 *      <li>Option 1</li>
 *      <li>Option 2</li>
 *      <li>Option 3</li>
 *    </ul>
 *  </div>
 * 
 */

(function( $ ){

  var methods = {
    init: function( options ) {
      var args = $.extend({}, options);
      return this.each(function() {
        var obj = $(this);
        obj.addClass("radioSlider clearfix");
        $("ul", obj).addClass("vs2");
        obj.prepend('<div class="vs1"><div class="vs11"></div><div class="vs12"></div><span class="vs13"></span></div>');
        var c_full_height = $(obj).height();
        var c_single_height = c_full_height / $("ul > li", obj).length;
        $(".vs1", obj).css("height", c_full_height);
        function dragTo(c_actual_pos) {
            var c_round_pos = parseInt(c_actual_pos / c_single_height) * c_single_height;
            var c_element_num = c_round_pos / c_single_height;
            $("ul.vs2 > li", obj).removeClass("vs_selected");
            $("ul.vs2 > li", obj).eq(c_element_num).addClass("vs_selected");
            return c_round_pos + (c_single_height/4);
        }
        $("ul.vs2 > li", obj).bind("click", function(e) {
          $(".vs13", obj).css( "top", dragTo( $(this).index() * c_single_height ) );
        });
        $(".vs13", obj).draggable({
          axis: "y",
          cursor: "pointer", 
          containment: obj,
          create: function( event, ui ) {
            $(".vs13", obj).css("top", dragTo(0));
          },
          drag: function( event, ui ) {
            ui.position.top = dragTo(ui.position.top);
          }
        });
      });
    }
  };

  $.fn.radioSlider = function( method ) {
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery radioSlider.' );
    }    
  }

})( jQuery );
