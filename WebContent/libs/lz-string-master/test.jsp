<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="dal.CServerInfo" %>
	<%@ page import="dal.CInclude" %>
	


<%
CInclude.getIns().Init(request, response);
out.println(CInclude.getIns().Jquery());
out.println(CInclude.getIns().JqueryMobile(true));
out.println(CInclude.getIns().LZString());

%>

<input type='text' id='input'/>
<span id='input_num'>0</span><br/>
<br/>

compress : <br/>
<input type='text' id='output0'/>
<span id='output0_num'>0</span><br/>
<br/>
base64 compress : 
<input type='text' id='output1'/>
<span id='output1_num'>0</span><br/>
<br/>
Uint8Array compress : 
<input type='text' id='output2'/>
<span id='output2_num'>0</span><br/>
<br/>


<button onclick="OkFun()">OK</button>

<script>
function OkFun()
{
	var str=$("#input").val();
	$("#input_num").html(str.length);
	
	var com0=LZString.compress(str)
	$("#output0").val(com0);
	$("#output0_num").html(com0.length);
	
	var com1=LZString.compressToBase64(str)
	$("#output1").val(com1);
	$("#output1_num").html(com1.length);
	
	var com2=LZString.compressToUint8Array(str)
	$("#output2").val(com2);
	$("#output2_num").html(com2.length);
}
</script>