function CFlow() 
{
	this.m_time=0;
	this.m_offset=0;
	this.m_curveFunc=CurveLinear;
	this.m_option="play";//loop,play,stop/rplay,reset,remove
}
function CAniQue(_key,_ani)
{
	this.m_key=_key;
	this.m_ani=_ani;
}
function CAni()
{
	this.m_offset=0;
	this.m_time=0;
	this.m_delay=0;
}
CAni.prototype=new ISerialize();
CAni.prototype.constructor	=CAni;
CAni.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	this.m_offset=Number(dummy.value[0]);
	this.m_time=Number(dummy.value[1]);
	this.m_delay=Number(dummy.value[2]);
}
CAni.prototype.Serialize=function()
{
	var pac=new CPacket();
	pac.name="CAni";
	pac.Push(this.m_offset);
	pac.Push(this.m_time);
	pac.Push(this.m_delay);
	return pac;
}
function CAniImage(_time,_delay,_image)
{
	this.m_time = typeof _time !== 'undefined' ? _time : 0;
	this.m_delay = typeof _delay !== 'undefined' ? _delay : 0;
	
	this.m_image = typeof _image !== 'undefined' ? _image : null;    
	
}
CAniImage.prototype=new CAni();
CAniImage.prototype.constructor	=CAniImage;
CAniImage.prototype.Serialize=function()
{
	var pac=new CPacket();
	pac.name="CAniImage";
	pac.Push(CAni.prototype.Serialize.call(this));
	pac.Push(this.m_image);
	return pac;
}
CAniImage.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	CAni.prototype.Deserialize.call(this,dummy.value[0]);
	this.m_image=dummy.value[1];
}
function CAniAlpha(_time,_delay,_stAlpha,_edAlpha)
{
	this.m_time = typeof _time !== 'undefined' ? _time : 0;
	this.m_delay = typeof _delay !== 'undefined' ? _delay : 0;
	
	this.m_stAlpha = typeof _stAlpha !== 'undefined' ? _stAlpha : null;    
	this.m_edAlpha = typeof _edAlpha !== 'undefined' ? _edAlpha : null;
	
}
CAniAlpha.prototype=new CAni();
CAniAlpha.prototype.constructor	=CAniAlpha;
CAniAlpha.prototype.Serialize=function()
{
	var pac=new CPacket();
	pac.name="CAniAlpha";
	pac.Push(CAni.prototype.Serialize.call(this));
	pac.Push(this.m_stAlpha);
	pac.Push(this.m_edAlpha);
	return pac;
}
CAniAlpha.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	CAni.prototype.Deserialize.call(this,dummy.value[0]);
	this.m_stAlpha=Number(dummy.value[1]);
	this.m_edAlpha=Number(dummy.value[2]);
}
function CAniImageCoordinate(_time,_delay,_image,_coordinate)
{
	this.m_time = typeof _time !== 'undefined' ? _time : 0;
	this.m_delay = typeof _delay !== 'undefined' ? _delay : 0;
	
	this.m_image = typeof _image !== 'undefined' ? _image : null;    
	this.m_coordinate = typeof _coordinate !== 'undefined' ? _coordinate : new CRect();
}
CAniImageCoordinate.prototype=new CAni();
CAniImageCoordinate.prototype.constructor	=CAniImageCoordinate;
CAniImageCoordinate.prototype.Serialize=function()
{
	var pac=new CPacket();
	pac.name="CAniImageCoordinate";
	pac.Push(CAni.prototype.Serialize.call(this));
	pac.Push(this.m_image);
	pac.Push(this.m_coordinate);
	return pac;
}
CAniImageCoordinate.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	CAni.prototype.Deserialize.call(this,dummy.value[0]);
	this.m_image=dummy.value[1];
	this.m_coordinate.Deserialize(dummy.value[2]);
}

function CAniPhysicsDynamic(_time,_delay,_position)
{
	this.m_time=_time;
	this.m_delay=_delay;
	
	this.m_before=new CVec3();
	this.m_position=_position;
}
CAniPhysicsDynamic.prototype=new CAni();
CAniPhysicsDynamic.prototype.constructor	=CAniPhysicsDynamic;
function CAniPhysicsStatic(_time,_delay,_position)
{
	this.m_time=_time;
	this.m_delay=_delay;
	
	this.m_before=new CVec3();
	this.m_position=_position;
}
CAniPhysicsStatic.prototype=new CAni();
CAniPhysicsStatic.prototype.constructor	=CAniPhysicsStatic;


//=======================================================================
function CMotion() 
{
	this.m_offset;
	this.m_name;
	this.m_aniVec=new Array();
}
CMotion.prototype=new ISerialize();
CMotion.prototype.constructor	=CMotion;
CMotion.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	this.m_offset=Number(dummy.value[0]);
	this.m_name=dummy.value[1];
	var dummy2=new CPacket();
	dummy2.Deserialize(dummy.value[2]);
	for(var i=0;i<dummy2.value.length;++i)
	{
		this.m_aniVec.push(dummy2.value[i]);
	}
}
CMotion.prototype.Serialize=function()
{
	var pac=new CPacket();
	pac.name="CMotion";
	pac.Push(this.m_offset);
	pac.Push(this.m_name);
	pac.Push(this.m_aniVec);
	return pac;
}
var g_aniAndMotionArr={};
function AniAndMotionArr_Init(_str,_array)
{
	if(_array)
		g_aniAndMotionArr=new Array();
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	for(var i=0;i<dummy.value.length;++i)
	{
		var dummy2=new CPacket();
		dummy2.Deserialize(dummy.value[i]);
		var mInfo=null;
		if(dummy2.name=="CMotion")
		{
			var mInfo=new CMotion();
			mInfo.Deserialize(dummy.value[i]);
			
		}
		else if(dummy2.name=="CAniImage")
		{
			mInfo=new CAniImage();
			mInfo.Deserialize(dummy.value[i]);
			
		}
		else if(dummy2.name=="CAniImageCoordinate")
		{
			mInfo=new CAniImageCoordinate();
			mInfo.Deserialize(dummy.value[i]);
			
		}
		else if(dummy2.name=="CAniAlpha")
		{
			mInfo=new CAniAlpha();
			mInfo.Deserialize(dummy.value[i]);
		
		}
		else
			alert("what?");
		if(_array)
			g_aniAndMotionArr.push(mInfo);
		else
			g_aniAndMotionArr[mInfo.m_offset]=mInfo;
	}
}

