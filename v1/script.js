$(function() {
      $.jmpress("apply", "#showcase-nested", {
		    x: 250
		    ,y: -30
		    ,rotate: { z: 20 }
		    ,secondary: {
			rotateZ: 90
			,y: 30
			,"": "siblings"
		    }
		    ,scale: 0.3
	        });


      //$('#fortytwoam, #team, #partners').hide();

      var circlize = function(container) {
          container.each(function() {
                             var _this = $(this);
                             var _children = $('> .sphere:not(.center)', _this);
                             var _length = _children.length;
                             var _distance = 600;
                             var _z = 1000;
                             _rand = Math.random() * 360;
                             //console.log(_this);
                             //_this.css('background', 'red');
                             //console.log('#' + _this.attr('id'));
                             children = [];
                             for (var i = 0; i < _length; i++) {
                                 var deg = (_rand + 360 * i / _length) % 360;
                                 x = _distance * Math.cos((deg / 180) * Math.PI);
                                 y = _distance * Math.sin((deg / 180) * Math.PI);
                                 //console.log('x: ' + x + ', y: ' + y + ', deg: ' + deg);
                                 children.push({
                                                   rotate: deg,
                                                   scale: 0.7,
                                                   x: x,
                                                   y: y,
                                                   z: 1
                                               });
                             }
                             $.jmpress("apply", '#' + _this.attr('id'), {
                                           children: children,
                                           scale: 3,
                                           x: 0,
                                           z: 1000
                                       });
                         });
      };

      $.jmpress("apply", "#companies", { scale: 5 });
      $.jmpress("apply", "#partners", { scale: 2.3 });
      $.jmpress("apply", "#team", { scale: 1 });

      circlize($('#team'));
      circlize($('#partners'));
      circlize($('#companies'));


      $('#nav').show();

      $('.center.sphere').hide();


      //$('#jmpress').jmpress("route", ["#companies", "#partners"]);
      //$('#jmpress').jmpress("route", ["#partners", "#team"]);
      //$('#jmpress').jmpress("route", ["#team", "#overview"]);

      var jmpressConfig = {
	  viewPort: {
	      height: 600,
	      width: 1000,
	      maxScale: 1
	  },
	  setInactive: function(slide) {
              if ($(slide).hasClass('orbit')) {
                  $('> .center', slide).stop().animate({opacity: 0}, 1000);
              }
          },
	  setActive: function(slide) {
              if ($(slide).hasClass('orbit')) {
                  $('> .center', slide).stop().animate({opacity: 1}, 2000);
              }

	      $('#nav a')
		  .removeClass('ui-state-active')
		  .parent('li')
		  .removeClass( 'active' );
	      var id = $(slide).attr('id');
	      var idArr = id.split("-");
	      id = "";
	      for(var i = 0; i < idArr.length; i ++) {
		  if(id) id += "-";
		  id += idArr[i];
		  $('#nav a[href=\"#' + id + '\"]')
		      .addClass( 'ui-state-active')
		      .parent('li')
		      .addClass('active');
	      }
	  },
	  afterStepLoaded: function( step, eventData ) {
	      $(step).find('code:not(.noconvert)').each(function() {
				                            $(this).text($(this).html()).html();
			                                });
	      $("pre").addClass('ui-state-default');
	  },
	  containerClass: "ui-widget-content",
	  areaClass: "",
	  canvasClass: "",
	  initClass: "init-css",
	  animation: { transitionDelay: "0ms" }
      };
      $('#jmpress').jmpress(jmpressConfig);

      $('.next').click(function() {
		           $('#jmpress').jmpress('next');
		           return false;
	               });

      $('.sphere').each(function() {
                            var _this = $(this);
                            _this.addClass('sphere-z');
                            _this.html('<div class="sphere-a"><div class="sphere-b"><div class="sphere-c">' + _this.html() + '</div></div></div><!--<div class="sphere-d">--></div>');
                        });

      $("#jmpress a[href]:not(:has(>img))").addClass("ui-state-default ui-corner-all");
      $("#nav a, #nav-themes a").addClass("ui-button ui-widget ui-state-default");
      $("#nav a span").addClass("ui-button-text");
      $("#jmpress a[href]:not(:has(>img)), #nav a, #nav-themes a").hover(function() {
		                                             $(this).addClass("ui-state-hover");
	                                                 }, function() {
		                                             $(this).removeClass("ui-state-hover");
	                                                 });
      // HACK TO CHANGE HINT IF IPAD
      var ua = navigator.userAgent.toLowerCase();
      if ( ua.search(/(ipad)/) != -1 ) {
	  $('.hint').text('Swipe support is coming :)');
      }

      $("a[data-theme]").click(function(event) {
		                   var theme = $(this).data("theme");

		                   $("#theme").remove();

		                   var link = $("<link>");
		                   link.attr({
				                 id: "theme",
				                 type: 'text/css',
				                 rel: 'stylesheet',
				                 href: "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.17/themes/"+theme+"/jquery-ui.css"
		                             });
		                   $("head").append(link);

		                   $("a[data-theme]").removeClass("ui-state-active");
		                   $(this).addClass("ui-state-active");

		                   event.preventDefault();
	                       });
      $("a[data-theme=start]").addClass("ui-state-active");

      $("#uninit-jmpress").click(function(event) {
		                     $("#jmpress").jmpress("deinit");
		                     $("#nav").css("opacity", 0);
		                     $("#jmpress").addClass("not-supported");
		                     $("#reinit-jmpress").show();
		                     $("#uninit-jmpress").hide();
		                     $('#home').find('.intro-top .inner').attr('class', 'notinner').unwrap();
		                     $('#home').find('.intro-bottom').hide();
		                     window.location.hash = ""
		                     event.preventDefault();
	                         });
      $("#reinit-jmpress").click(function(event) {
		                     $("#jmpress").jmpress(jmpressConfig);
		                     $("#nav").css("opacity", 1);
		                     $("#jmpress").removeClass("not-supported");
		                     $("#reinit-jmpress").hide();
		                     $("#uninit-jmpress").show();
		                     $('#home').find('.notinner').attr('class', 'inner').wrap('<div class="intro-top ui-state-default" />');
		                     $('#home').find('.intro-bottom').show();
		                     event.preventDefault();
	                         });
      $("#reinit-jmpress").hide();
      setTimeout(function() {
		     $("#jmpress").removeClass("init-css");
	         }, 500);
  });


/* Google Analytics */

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-28089933-1']);
_gaq.push(['_setDomainName', '42.am']);
_gaq.push(['_trackPageview']);
(function() {
     var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
     ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
     var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
 })();
