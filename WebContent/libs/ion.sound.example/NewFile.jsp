<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="dal.CServerInfo"%>   
 <%@ page import="dal.CInclude"%>

<%
CInclude.getIns().Init(request, response);
out.println(CInclude.getIns().Jquery());
out.println(CInclude.getIns().JqueryIonSound());
%>   

<div style="position: relative; padding: 100px;">

    <button id="b01">Play "beer_can_opening"</button>
    <button id="b02">Play "bell_ring"</button>
</div>




<script>
function myReadyCallback()
{
	
}
    $(document).ready(function(){

        ion.sound({
            sounds: [
                {
                	alias: "s1",//별칭
                	name: "beer_can_opening",
                	loop: 3
                	},
                {name: "bell_ring"}
            ],
            path: "sounds/",
            preload: true,
            multiplay: true,
            volume: 1.0,
            //scope: this,
            //ready_callback: myReadyCallback
        });


        $("#b01").on("click", function(){
            ion.sound.play("s1");
        });

        $("#b02").on("click", function(){
            ion.sound.play("bell_ring");
        });

        //ion.sound.preload("pop_cork");//미리 로드 시킬수도 있다
        ion.sound.volume({volume: 0.9});
        ion.sound.play("bell_ring");
        //ion.sound.pause("bell_ring");
        //ion.sound.stop("bell_ring");
    });
</script>


