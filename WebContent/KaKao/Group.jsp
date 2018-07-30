<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
	<%@ page import="java.util.Vector" %>
	<%@ page import="java.util.Map" %>

	
<%
request.setCharacterEncoding("UTF-8");
response.setContentType("text/html; charset=UTF-8");
%>
<!DOCTYPE html>
<script src='../libs/Jquery/jquery-1.9.1.min.js'></script>
<link rel='stylesheet' href='../libs/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.css' />
<link rel='stylesheet' href='../libs/jquery.mobile-1.4.5/theme-classic.css' />
<link rel='stylesheet' href='../libs/jquery.mobile-1.4.5/jquery.mobile.structure-1.4.5.min.css' />
<script src='../libs/jquery.mobile-1.4.5/jquery.mobile-1.4.5.min.js'></script>
<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
<link rel='stylesheet' type='text/css' href='../libs/JqmProgressBar/css/jQMProgressBar.css' />
<script type='text/javascript' src='../libs/JqmProgressBar/js/jQMProgressBar.js'></script>
<link rel='stylesheet' href='../libs/swiper-master/dist/css/swiper.min.css' />
<script src='../libs/swiper-master/dist/js/swiper.min.js'></script>

<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script> 


<script type="text/javascript" src="pro/Value.js"></script>
<script type="text/javascript" src="lib/Include.js"></script>
<script type="text/javascript" src="lib/OptionChk.js"></script>
<script type="text/javascript" src="pro/Process.js"></script>
<script type="text/javascript" src="pro/RealTimeGroup.js"></script>




<div id='bodyI' style="overflow:hidden;">
	<canvas id="canvas"  width="400px" height="550px" style='border: 1px solid black' class="no-drag">
			지원 하지 않습니다
	</canvas>
	<div id='show'>
	</div>
	<div id='time'>
	</div>
</div>


<style>
#amazingtext{
    text-align:center;
    border:1px solid #666;
    border-radius:5px;}
#amazingtext h1{
    color: #fff;
    font-size:3.5em;
    text-shadow:
      0 1px 1px #c0c0c0,
      0 2px 0 #a8a7a6,
      0 3px 0 #8b8a89,
      0 4px 0px #7d7b7a,
      0 5px 0px #686766,
      0 6px 3px #5f5e5d;
}
.swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;

      /* Center slide text vertically */
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
    }

 </style>
 
<div id="amazingtext"  onclick='Start()' 
	style='background-image: url("img/Group/title.jpg"); background-position: center;background-repeat: no-repeat;
	min-width: 100%;background-size: cover;'>
    <!-- 
	<h1 style='-webkit-transform: translate(-50%,-20%);
  transform: translate(-50%,-20%);
  position: absolute;
  top: 20%; left: 50%;'>Title</h1> -->
	<span style='-webkit-transform: translate(-50%,-80%);
  transform: translate(-50%,-80%);
  position: absolute;
  top: 80%;
  left: 50%;'>Click Me!</span>
</div>

<div id='menu' data-role="page" data-theme="a" 
	style='background-image: url("img/Group/menu.jpg"); background-position: center;background-repeat: no-repeat;
		min-width: 100%;background-size: cover;'>
	<div id='menu_div0' class="swiper-container">
	    <div class="swiper-wrapper">
	        <div class="swiper-slide">Slide 1</div>
	        <div class="swiper-slide">Slide 2</div>
	        <div class="swiper-slide">Slide 3</div>
	        <div class="swiper-slide">Slide 4</div>
	        <div class="swiper-slide">Slide 5</div>
	        <div class="swiper-slide">Slide 6</div>
	        <div class="swiper-slide">Slide 7</div>
	        <div class="swiper-slide">Slide 8</div>
	        <div class="swiper-slide">Slide 9</div>
	        <div class="swiper-slide">Slide 10</div>
	    </div>
	    <!-- Add Pagination -->
	    <div class="swiper-pagination"></div>
	    <!-- Add Arrows -->
	    <div class="swiper-button-next"></div>
	    <div class="swiper-button-prev"></div>
	</div>
	<div id='menu_div1'>
		<div class="ui-grid-b" style='padding: 10px;'>
			<div class="ui-block-a" style="text-align:center">
				<div style='background-color:#A0A0A0; border-bottom: 1px solid black'><h3>이름</h3></div>
				<div style='border-bottom: 1px solid black'>test0</div>
				<div style='border-bottom: 1px solid black'>test1</div>
			</div>
			<div class="ui-block-b" style="text-align:center">
				<div style='background-color:#A0A0A0; border-bottom: 1px solid black'><h3>점수</h3></div>
				<div style='border-bottom: 1px solid black'>test0</div>
				<div style='border-bottom: 1px solid black'>test1</div>
			</div>
			<div class="ui-block-c" style="text-align:center">
				<div style='background-color:#A0A0A0; border-bottom: 1px solid black'><h3>초대</h3></div>
				<div style='border-bottom: 1px solid black'>test0</div>
				<div style='border-bottom: 1px solid black'>test1</div>
			</div>
		</div><!-- /grid-b -->
	</div>
	<button onclick="MatchingStart()">매칭 시작</button>
</div>
<div id='matching'>
	매칭중 입니다<br/>
	최소 두명이 있어야 시작 가능합니다<br/>
</div>

<script>
const uri = 'http://numchessserver-env.eekbuppg72.ap-northeast-2.elasticbeanstalk.com:3000'
var game = io(uri + '/game')
var token;
var uid;
var euid;
var room;
var name;
const register = function () 
{
	name=""+parseInt(Math.random()*10000000);
	axios.post(uri + '/register', { 'name': name })
	.then(function(res) 
	{
		token=res.data.token;
		login();
		//alert(res.data.token);
	}).catch(function(err)
	{
		alert("error");
	})
};
  
const login = function () {
	axios.get(uri + '/me', { headers: { 'x-auth-token': token }})
	.then(function(res)
	{
		uid=res.data._id;
		//alert(res.data._id);
	   //$('#app .step-2 input[name=id]').val(res.data._id)
	   //$('#app .step-2 input[name=name]').val(res.data.name)
	   //$('#app .step-2 input[name=trophy]').val(res.data.trophy)
	   //$('#app .step-2 input[name=win]').val(res.data.win)
	   //$('#app .step-2 input[name=lose]').val(res.data.lose)
	
	}).catch(function(err)
	{
		alert("error");
	})
};
const join = function () 
{
	var data = {
		user: uid,
		name: name,
		room: room
	};
	game.emit('join', data);

}
function Init()
{
	$("#amazingtext").height($(window).height());
	$("#bodyI").hide();
	$("#menu").hide();
	$("#matching").hide();
	
	GameInit();
	register();
}
Init();

var swiper = null;

function Start()
{
	$("#amazingtext").hide();
	$("#menu").show();
	$("#menu_div0").height($(window).height()*0.4);
	$("#menu_div1").height($(window).height()*0.45);
	$("#bodyI").hide();
	//var off=$("#menu_div1").offset();
	//off.top=$(window).height()-$(window).height()*0.4;
	//$("#menu_div1").offset(off);
	
	swiper = new Swiper('.swiper-container', {
	      navigation: {
	        nextEl: '.swiper-button-next',
	        prevEl: '.swiper-button-prev',
	      },
	      pagination: {
	          el: '.swiper-pagination',
	        },
	    });
}
function MatchingStart()
{
	$("#menu").hide();
	$("#bodyI").hide();
	$("#matching").show();
	game.emit('matching', uid);
}
function GameStart()
{
	$("#matching").hide();
	$("#menu").hide();
	$("#bodyI").show();
	SorInit();
}
game.on('matched', function (data) 
{
	const id = $('#user')
	const index = data.players.indexOf(id)
	if(index)
	{
		if(uid==data.players[0])
			euid=data.players[1];
		else
			euid=data.players[0];
		
		room=data._id;
		join();
		
// 		var data2 = {
// 				'user': uid,
// 				'name': name,
// 				'room': room,
// 				'x': "0",
// 				'y': "0"
// 			};
// 			game.emit('piece move', data2);
			
		GameStart();
	} else 
	{
		//matchingLog('대기열 순위를 기다리고 있습니다.')
	}
});
function TimerStart()
{
	if(turn==3)
	{
		g_time=0;
		if(group==d_G_D)
		{
			g_maxTime=30*1000;
		}
		else
		{
			g_maxTime=0;
			$("#time").html("");
		}
	}
	else if(turn==2)
	{
		g_time=0;
		if(group==d_G_U)
		{
			g_maxTime=30*1000;
		}
		else
		{
			g_maxTime=0;
			$("#time").html("");
		}
			
	}
}
game.on('piece move', function (data) 
{
	//alert("call");
	g_moveLock=false;
	var pac=new CPacket();
	pac.Deserialize(data.data);
	Packet(pac);
});
game.on('end', function (data) 
{
	turn=0;
	if(uid==data.winner)
		alert("승리");
	else
		alert("패배");
	Start();
	
});

</script>

