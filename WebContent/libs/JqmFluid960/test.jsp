<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="dal.CServerInfo" %>
         <%@ page import="dal.CInclude"%>

 <%
 out.println(CInclude.getIns().Init(request, response));
 out.println(CInclude.getIns().Jquery());
 out.println(CInclude.getIns().JqueryMobile(true));
 out.println(CInclude.getIns().JqmFluid960());
 out.println(CInclude.getIns().jqCanvasCircliful());
%>

<!DOCTYPE html> 
<html> 
	<head> 
	<title>jquery mobile + 960 grid</title> 
	
	<!-- include jquery-mobild-fluid960.css just after jquerymobile one -->
	<link rel="stylesheet" href="jquery-mobile-fluid960.css" />
	
	
</head> 
<body> 

<div data-role="page">
	<div class="container_12">
			<div class="grid_12"><a data-role="button">12</a></div>

			<div class="grid_1"><a data-role="button">1</a></div>
			<div class="grid_11"><a data-role="button">11</a></div>

		</div>
	<div data-role="header">
		<a href="index.html" target="_blank">Home</a>		
		<h1>jquery mobile + 960 grid: demo</h1>
	</div><!-- /header -->

	<div data-role="content">
		Demo page of the jquery-mobile-960 grid
		<h1>12 columns</h1>
		<div class="container_12">
			<div class="grid_12"><a data-role="button">12</a></div>

			<div class="grid_1"><a data-role="button">1</a></div>
			<div class="grid_11"><a data-role="button">11</a></div>

			<div class="grid_2"><a data-role="button">2</a></div>
			<div class="grid_10"><a data-role="button">10</a></div>

			<div class="grid_3"><a data-role="button">3</a></div>
			<div class="grid_9"><a data-role="button">9</a></div>

			<div class="grid_4"><a data-role="button">4</a></div>
			<div class="grid_8"><a data-role="button">8</a></div>

			<div class="grid_5"><a data-role="button">5</a></div>
			<div class="grid_7"><a data-role="button">7</a></div>

			<div class="grid_6"><a data-role="button">6</a></div>
			<div class="grid_6"><a data-role="button">6</a></div>

			<div class="grid_7"><a data-role="button">7</a></div>
			<div class="grid_5"><a data-role="button">5</a></div>

			<div class="grid_8"><a data-role="button">8</a></div>
			<div class="grid_4"><a data-role="button">4</a></div>

			<div class="grid_9"><a data-role="button">9</a></div>
			<div class="grid_3"><a data-role="button">3</a></div>

			<div class="grid_10"><a data-role="button">10</a></div>
			<div class="grid_2"><a data-role="button">2</a></div>

			<div class="grid_11"><a data-role="button">11</a></div>
			<div class="grid_1"><a data-role="button">1</a></div>

			<div class="grid_1 suffix_11"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_1 suffix_10"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_2 suffix_9"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_3 suffix_8"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_4 suffix_7"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_5 suffix_6"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_6 suffix_5"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_7 suffix_4"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_8 suffix_3"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_9 suffix_2"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_10 suffix_1"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_11"><a data-role="button">1</a></div>

			<div class="grid_3"><a data-role="button">3</a></div>
			<div class="grid_3"><a data-role="button">3</a></div>
			<div class="grid_1"><a data-role="button">1</a></div>
			<div class="grid_5"><a data-role="button">5</a></div>

			<div class="grid_1"><a data-role="button">1</a></div>
			<div class="grid_5"><a data-role="button">5</a></div>
			<div class="grid_3"><a data-role="button">3</a></div>
			<div class="grid_3"><a data-role="button">3</a></div>
		</div>
		<h1>16 columns</h1>
		<div class="container_16">
			<div class="grid_16"><a data-role="button">16</a></div>

			<div class="grid_1"><a data-role="button">1</a></div>
			<div class="grid_15"><a data-role="button">15</a></div>

			<div class="grid_2"><a data-role="button">2</a></div>
			<div class="grid_14"><a data-role="button">14</a></div>

			<div class="grid_3"><a data-role="button">3</a></div>
			<div class="grid_13"><a data-role="button">13</a></div>

			<div class="grid_4"><a data-role="button">4</a></div>
			<div class="grid_12"><a data-role="button">12</a></div>

			<div class="grid_5"><a data-role="button">5</a></div>
			<div class="grid_11"><a data-role="button">11</a></div>

			<div class="grid_6"><a data-role="button">6</a></div>
			<div class="grid_10"><a data-role="button">10</a></div>

			<div class="grid_7"><a data-role="button">7</a></div>
			<div class="grid_9"><a data-role="button">9</a></div>

			<div class="grid_8"><a data-role="button">8</a></div>
			<div class="grid_8"><a data-role="button">8</a></div>

			<div class="grid_9"><a data-role="button">9</a></div>
			<div class="grid_7"><a data-role="button">7</a></div>

			<div class="grid_10"><a data-role="button">10</a></div>
			<div class="grid_6"><a data-role="button">6</a></div>

			<div class="grid_11"><a data-role="button">11</a></div>
			<div class="grid_5"><a data-role="button">5</a></div>

			<div class="grid_12"><a data-role="button">12</a></div>
			<div class="grid_4"><a data-role="button">4</a></div>

			<div class="grid_13"><a data-role="button">13</a></div>
			<div class="grid_3"><a data-role="button">3</a></div>

			<div class="grid_14"><a data-role="button">14</a></div>
			<div class="grid_2"><a data-role="button">2</a></div>

			<div class="grid_15"><a data-role="button">15</a></div>
			<div class="grid_1"><a data-role="button">1</a></div>

			<div class="grid_1 suffix_15"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_1 suffix_14"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_2 suffix_13"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_3 suffix_12"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_4 suffix_11"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_5 suffix_10"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_6 suffix_9"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_7 suffix_8"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_8 suffix_7"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_9 suffix_6"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_10 suffix_5"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_11 suffix_4"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_12 suffix_3"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_13 suffix_2"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_14 suffix_1"><a data-role="button">1</a></div>
			<div class="grid_1 prefix_15"><a data-role="button">1</a></div>

			<div class="grid_4"><a data-role="button">4</a></div>
			<div class="grid_4"><a data-role="button">4</a></div>
			<div class="grid_1"><a data-role="button">1</a></div>
			<div class="grid_7"><a data-role="button">7</a></div>

			<div class="grid_1"><a data-role="button">1</a></div>
			<div class="grid_7"><a data-role="button">7</a></div>
			<div class="grid_4"><a data-role="button">4</a></div>
			<div class="grid_4"><a data-role="button">4</a></div>
		</div>
	</div><!-- /content -->

	<div data-role="footer">
		<h4>Page Footer</h4>
	</div><!-- /footer -->
</div><!-- /page -->

</body>
</html>