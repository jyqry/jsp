<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <%@ page import="dal.CServerInfo" %>
	<%@ page import="dal.CUtil" %>
	<%@ page import="dal.CInclude" %>
	
<%
CInclude.getIns().Init(request, response);
out.println(CInclude.getIns().Jquery());
out.println(CInclude.getIns().JqueryMobile(true));
out.println(CInclude.getIns().JqMasonry());
%>
  <body>
  

	<div class="grid" >
		<div class="grid-item"></div>
		<div class="grid-item grid-item--width2 grid-item--height2"></div>
		<div class="grid-item grid-item--height3"></div>
		<div class="grid-item grid-item--height2"></div>
		<div class="grid-item grid-item--width3"></div>
		<div class="grid-item"></div>
		<div class="grid-item"></div>
		<div class="grid-item grid-item--height2"></div>
		<div class="grid-item grid-item--width2 grid-item--height3"></div>
		<div class="grid-item"></div>
		<div class="grid-item grid-item--height2"></div>
		<div class="grid-item"></div>
		<div class="grid-item grid-item--width2 grid-item--height2"></div>
		<div class="grid-item grid-item--width2"></div>
		<div class="grid-item"></div>
		<div class="grid-item grid-item--height2"></div>
		<div class="grid-item"></div>
		<div class="grid-item"></div>
		<div class="grid-item grid-item--height3"></div>
		<div class="grid-item grid-item--height2"></div>
		<div class="grid-item"></div>
		<div class="grid-item"></div>
		<div class="grid-item grid-item--height2"></div>
	</div>
	<button onclick='AddItem();'>Add</button>

    <script>
    var iAdd=0;
    function AddItem()
    {
    	//alert("test1");
    	var cObj = document.createElement( "div" );
    	cObj.id=("dummy"+iAdd);
    	//alert(cObj.id);
    	iAdd++;
    	$('.grid').append(cObj);
    	$('#'+cObj.id).attr("class","grid-item");
    	$('.grid').masonry('appended',$('#'+cObj.id) );
    	//alert("test2");
    }
      $('.grid').masonry({
		  itemSelector: '.grid-item',
		  columnWidth: 120
		});
    </script>
  </body>
</html>