function Get_CookieBoolean(_key,_default)
{
	var _value=$.cookie(_key);
	_value = typeof _value !== 'undefined' ? (_value=='true'?true:false) : _default;
	$.cookie(_key,_value);
	return _value;
}
function Get_CookieNumber(_key,_default)
{
	var _value=$.cookie(_key);
	_value = typeof _value !== 'undefined' ? Number(_value) : _default;
	$.cookie(_key,_value);
	return _value;
}
function Get_CookieString(_key,_default)
{
	var _value=$.cookie(_key);
	_value = typeof _value !== 'undefined' ? _value : _default;
	$.cookie(_key,_value);
	return _value;
}


g_autoPick=Get_CookieBoolean("g_autoPick",false);
g_frame=Get_CookieBoolean("g_frame",false);
g_packetShow=Get_CookieBoolean("g_packetShow",false);
g_preLoad=Get_CookieBoolean("g_preLoad",true);
g_shake=Get_CookieNumber("g_shake",12);
g_screenMove=Get_CookieBoolean("g_screenMove",false);
g_screenMoveSpeed=Get_CookieNumber("g_screenMoveSpeed",12);
g_targetClickOff=Get_CookieBoolean("g_targetClickOff",true);
g_chat=Get_CookieBoolean("g_chat",true);
g_zoom=Get_CookieNumber("g_zoom",1.0);

//사파리 익스는 포그 레벨을 줄인다
function Get_CookieFog()
{
	g_fowType=$.cookie("g_fowType");
	if(typeof g_fowType == 'undefined')
	{
		if($.browser.name=="msie" || $.browser.name=="safari")
			g_fowType=1;
		else
			g_fowType=2;
	}
	else
		g_fowType=Number(g_fowType);
	
	$.cookie("g_fowType",g_fowType);
}
Get_CookieFog();


if (navigator.standalone) 
{
	//alert('전체화면모드입니다.');
}

var userAgent=navigator.userAgent;

if(userAgent.indexOf("iPhone")!=-1 || userAgent.indexOf("Android")!=-1)
{
	//모바일 임
}
if(userAgent.indexOf("iPhone")!=-1 && !navigator.standalone)
{
	//alert('아이폰 전체화면 모드는 홈화면에 추가해야지만 가능합니다!');
}