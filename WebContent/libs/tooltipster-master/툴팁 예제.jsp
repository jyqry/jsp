<%@page import="dal.CServerInfo"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
  <%@ page import="dal.CInclude" %>
<%
CInclude.getIns().Init(request, response);
out.println(CInclude.getIns().Jquery());
out.println(CInclude.getIns().JqueryMobile(true));
//out.println(CInclude.getIns().JQueryTooltip());
%>
<%@include file="/Code/Common/JqueryTooltipSter.jsp"%>

<script type="text/javascript">
$(function() {
	
	
	$('#demo-default').tooltipster({
		offsetY: 2
	});
	$('#demo-html').tooltipster({
		content: $('<img src="doc/images/spiderman.png" width="50" height="50" /><p style="text-align:left;"><strong>SoufflÃ© chocolate cake powder.</strong> Applicake lollipop oat cake gingerbread.</p>'),
		// setting a same value to minWidth and maxWidth will result in a fixed width
		minWidth: 300,
		maxWidth: 300,
		position: 'right'
	});
	$('#demo-theme').tooltipster({
		animation: 'grow',
		theme: 'tooltipster-pink'
	});
	$('#demo-callback').tooltipster({
		content: 'Loading...',
		updateAnimation: false,
		functionBefore: function(origin, continueTooltip) {
			continueTooltip();
			
			if (origin.data('ajax') !== 'cached') {
				
				$.jGFeed('http://ws.audioscrobbler.com/2.0/user/ce3ge/recenttracks.rss?',
					function(feeds){
						var content = '';
						if(!feeds){
							content = 'Woops - there was an error retrieving my last.fm RSS feed';
							origin.tooltipster('content', content);
						}
						else {
							content = $('<span>I last listened to: <strong>' + feeds.entries[0].title + '</strong></span>');
							origin
								.tooltipster('content', content)
								.data('ajax', 'cached');
						}
				}, 10);
				
				origin.data('ajax', 'cached');
			}
		},
		functionAfter: function(origin) {
			alert('The tooltip has closed!');
		}
	});
	$('#demo-events').tooltipster({
		trigger: 'click'
	});
	$(window).keypress(function() {
		$('#demo-events').tooltipster('hide');
	});
	$('#demo-interact').tooltipster({
		contentAsHTML: true,
		interactive: true
	});
	$('#demo-touch').tooltipster({
		touchDevices: false
	});
	$('#demo-icon').tooltipster({
		iconDesktop: true,
		iconTouch: true
	});
	$('#demo-multiple').tooltipster({
		animation: 'swing',
		content: 'North',
		multiple: true,
		position: 'top'
	});
	$('#demo-multiple').tooltipster({
		content: 'East',
		multiple: true,
		position: 'right',
		theme: 'tooltipster-punk'
	});	
	$('#demo-multiple').tooltipster({
		animation: 'grow',
		content: 'South',
		delay: 200,
		multiple: true,
		position: 'bottom',
		theme: 'tooltipster-light'
	});	
	$('#demo-multiple').tooltipster({
		animation: 'fall',
		content: 'West',
		multiple: true,
		position: 'left',
		theme: 'tooltipster-shadow'
	});	
	
	
	$('header select').change(function() {
		var goTo = $(this).val();
		var section = $('#'+goTo);
		var offset = section.offset().top;
		$('html, body').scrollTop(offset);
	});
	
	prettyPrint();
	
	
});

</script>

	

	<div id="background">
		<img src="doc/images/large-background.jpg" />
	</div>
	<div id="wrapper">
		<header>
			
		<section id="demos">
			<h2>Demos</h2>
			<ul>
				<li>
					<span id="demo-default" title="Hi! This is a tooltip.">Hover</span> Default settings
				</li>
				<li>
					<span id="demo-html">Hover</span> Fixed width, position, &amp; HTML
				</li>
				<li>
					<span id="demo-events" title="Press any key on your keyboard or click anywhere in the page to close this">Click</span> Custom show / hide triggers
				</li>
				<li>
					<span id="demo-touch" title="I would have never been born on a touch device :'(">Hover</span> Disable touch devices
				</li>
				<li>
					<span id="demo-theme" title="Build custom themes and CSS powered animations!">Hover</span> Custom themes &amp; animations
				</li>
				<li>
					<span id="demo-callback" title="This will be populated by AJAX.">Hover</span> Custom callbacks (AJAX <3)
				</li>
				<li>
					<span id="demo-interact" title="Try clicking &lt;a href='http://google.com/' target='_blank'&gt;this link&lt;/a&gt;">Hover</span> Interaction with tooltips
				</li>
				<li>
					<span id="demo-icon" title="Use separate icons to launch your tooltips on either desktops or touch devices - or both!"></span> Attach tooltips to icons
				</li>
				<li>
					<span id="demo-multiple">Hover</span> Multiple tooltips on a single element
				</li>
			</ul>
		</section>
	</div>
	
	<div id="fb-root"></div>
