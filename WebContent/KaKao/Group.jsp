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

 <style>
#intro {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9990; /* z-index가 꼬인다면 수정해주세요 */
  overflow: hidden;
}
#intro .intro__background {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url('./img/title_bg_narrow.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 1;
}
#intro .intro__logo {
  position: absolute;
  left: 0;
  top: 7vh;
  width: 100%;
  height: 28.5vh;
  background-image: url('./img/logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 2;
}
#intro .intro__start {
  position: absolute;
  left: 0;
  bottom: 6.5vh;
  width: 100%;
  height: 11vh;
  z-index: 2;
  text-align: center;
}
#intro .intro__start img {
  width: auto;
  height: 11vh;
}
#intro.active .intro__start img {
  animation: pops 0.2s ease-in-out 1;
  -webkit-animation: pops 0.2s ease-in-out 1;
}
#intro .intro__how-to-play {
  position: absolute;
  left: 3vh;
  top: 3vh;
  width: 6vh;
  height: 6vh;
  background-image: url('./img/btn_question.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 3;
}
#intro .intro__how-to-play-description {
  position: absolute;
  left: 0;
  top: 12vh;
  width: 94%;
  height: 60vh;
  margin: 0 3%;
  background-color: #ffc521;
  border: 2px solid #000000;
  border-radius: 3vh;
  z-index: 3;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 3vh;
  opacity: 0;
  transition: opacity 300ms;
}
#intro .intro__how-to-play-description img {
  width: 100%;
}
#intro .intro__how-to-play-description.active {
  opacity: 1;
}
@keyframes pops {
  0% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
  }
  70% {
      transform: scale(1.3);
      -webkit-transform: scale(1.3);
  }
  100% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
  }
}

#waiting {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9980; /* z-index가 꼬인다면 수정해주세요 */
  overflow: hidden;
}
#waiting .waiting__start {
  position: absolute;
  left: 0;
  bottom: 6.5vh;
  width: 100%;
  height: 11vh;
  z-index: 2;
  text-align: center;
}
#waiting .waiting__start img {
  width: auto;
  height: 11vh;
}
#waiting.active .waiting__start img {
  animation: pops 0.2s ease-in-out 1;
  -webkit-animation: pops 0.2s ease-in-out 1;
}
#waiting .waiting__top-bg {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 40vh;
  background-image: url('./img/title_bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
#waiting .waiting__bottom {
  width: 100%;
  height: 60vh;
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: url('./img/waiting_back.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  z-index: 2;
}

#matching {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9980; /* z-index가 꼬인다면 수정해주세요 */
  overflow: hidden;
  background-image: url('./img/matching_back.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
#matching .matching__title {
  position: absolute;
  top: 22vh;
  left: 0;
  width: 100%;
  height: 7vh;
  text-align: center;
}
#matching .matching__title img {
  width: auto;
  height: 7vh;
}
#matching .matching__cancel {
  position: absolute;
  left: 0;
  bottom: 6.5vh;
  width: 100%;
  height: 11vh;
  z-index: 2;
  text-align: center;
}
#matching .matching__cancel img {
  width: auto;
  height: 11vh;
}
</style>

<div id="intro">
  <div class="intro__background"></div>
  <div class="intro__how-to-play"></div>
  <div class="intro__how-to-play-description">
    게임방법 이미지
  </div>
  <div class="intro__logo"></div>
  <div class="intro__start"><img src="./img/btn_start.png"></div>
</div>

<div id="waiting">
  <div class="waiting__top-bg"></div>
  <div class="waiting__bottom">
    <div class="waiting__start"><img src="./img/btn_matching.png"></div>
  </div>
</div>


<div id="matching">
  <div class="matching__title"><img src="./img/matching_title.png"></div>
  <div class="matching__cancel"><img src="./img/btn_cancel.png"></div>
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
	$("#waiting").show();
	$("#matching").hide();
	$("#bodyI").hide();
}
function MatchingStart()
{
	$("#intro").hide();
	$("#waiting").hide();
	$("#bodyI").hide();
	$("#matching").show();
	game.emit('matching', uid);
}
function GameStart()
{
	$("#matching").hide();
	$("#intro").hide();
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
$(function() {

  // 게임방법 아이콘 클릭
  $('#intro .intro__how-to-play').on('click', function () {
    $('#intro .intro__how-to-play-description').toggleClass('active');
  })


  // 타이틀 게임시작 클릭
  $('#intro .intro__start').on('click', function () {
    $('#intro').addClass('active');
    setTimeout(function () {
      $('#intro').hide()
      $('#waiting').show()
    }, 300); // 애니메이션 재생 후 대기실 입장
  })

  $('#waiting .waiting__start').on('click', function () {
    $('#waiting').addClass('active');
    setTimeout(function () {
      $('#waiting').hide()
      MatchingStart()
    }, 300); // 애니메이션 재생 후 대기실 입장
  })

  $('#matching .matching__cancel img').on('click', function () {
    Start()
  })
})
</script>
