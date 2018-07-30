var g_socketArr=new Array();
function CWebSocket(_addr,_open,_error,_message)
{
	this.m_addr=_addr;
	this.m_socket=null;
	this.m_open=_open;
	this.m_error=_error;
	this.m_message=_message;
	this.m_callMap=new newMap();

}
CWebSocket.prototype.constructor	=CWebSocket;
CWebSocket.prototype.Connect=function()
{
	this.m_socket=new WebSocket('ws://'+this.m_addr);
	g_socketArr.push(this);
	this.m_socket.onerror = function(event) 
	{
		for(var i=0;i<g_socketArr.length;++i)
		{
			if(g_socketArr[i].m_socket==this)
			{
				if(g_socketArr[i].m_error!=null)
					g_socketArr[i].m_error(g_socketArr[i],event.data);
				break;
			}
		}
	};
	this.m_socket.onopen = function(event) 
	{
		for(var i=0;i<g_socketArr.length;++i)
		{
			if(g_socketArr[i].m_socket==this)
			{
				if(g_socketArr[i].m_open!=null)
					g_socketArr[i].m_open(g_socketArr[i]);
				break;
			}
		}
	};
	this.m_socket.onmessage = function(event) 
	{
		for(var i=0;i<g_socketArr.length;++i)
		{
			if(g_socketArr[i].m_socket==this)
			{
				var pac=new CPacket();
				pac.Deserialize(event.data);
				if(pac.name=="Lz")
				{
					if(typeof LZString == 'undefined')
						alert("압축 헤더를 선업하세요!");
					
					var pac2=new CPacket();
					pac2.Deserialize(LZString.decompressFromBase64(pac.value[0]));
					pac=pac2;
				}
				if(pac.name=="Json")
				{
					var data = JSON.parse(pac.value[1]);
					g_socketArr[i].On(pac.value[0], data,true);
				}
				else if(g_socketArr[i].m_message!=null)
					g_socketArr[i].m_message(g_socketArr[i],pac);
				
				break;
			}
		}
		
	};
}
CWebSocket.prototype.On=function(_event,_callAndData,_packet)
{
	if(this.m_callMap==null)
		alert("init 후 사용해!");
	if(typeof _packet == 'undefined')
	{
		this.m_callMap.push(_event,_callAndData);
	}
	else
		this.m_callMap.get(_event)(_callAndData);
}
CWebSocket.prototype.Send=function(_str)
{
	if(this.m_socket.readyState==1)
		this.m_socket.send(_str);
	else
		alert("소켓 초기화 안됌");
}
CWebSocket.prototype.Emit=function(_event,_json)
{
	var pac=new CPacket();
	pac.name="Json";
	pac.value.push(_event);
	pac.value.push(JSON.stringify(_json));
	return pac.Serialize();
}
CWebSocket.prototype.Compress=function(_str)
{
	if(typeof LZString == 'undefined')
	{
		alert("압축 헤더를 선업하세요!");
		return _str;
	}
	var pac=new CPacket();
	pac.name="Lz";
	pac.value.push(LZString.compressToBase64(_str));
	if(pac.value[0].length>_str.length)
		pac.value[0]=_str;
	return pac.Serialize();
}
CWebSocket.prototype.Close=function()
{
	this.m_socket.close();
	this.m_socket=null;
}
CWebSocket.prototype.Get_Url=function()
{
	return this.m_socket.url;
}
CWebSocket.prototype.IsConnect=function()
{
	if(this.m_socket.readyState==1)
		return true;
	else
		return false;
}

//function onOpen()
//{	
//	var pac=new CPacket();
//	pac.name="Dummy1";
//	soc.Send(pac.Serialize());
//}
//function onError(_data)
//{
//	alert("에러");
//}
//function onMessage(_data)
//{
//	alert(_data.name);
//}
//
//
//var soc=new CWebSocket('<%=request.getServerName()%>'+':'+'<%=request.getServerPort()%>'+'/DalWebV2/CZoneTrainingWorld',
//		onOpen,onError,onMessage);
//soc.On("Dummy1",function(_data)
//{
//	alert("0"+_data.name);
//});
//soc.Connect();