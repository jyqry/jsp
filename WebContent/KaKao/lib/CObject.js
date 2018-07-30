function CMoveData(_key,_direction,_power) 
{
	this.m_key = _key;
	this.m_direction = typeof _direction !== 'undefined' ? _direction : new CVec3();
	this.m_power = typeof _power !== 'undefined' ? _power : 0.0;
}
CMoveData.prototype=new ISerialize();
CMoveData.prototype.constructor	=CMoveData;
CMoveData.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	this.m_key=dummy.value[0];
	this.m_direction.Deserialize(dummy.value[1]);
	this.m_power=Number(dummy.value[2]);
}

function CObject() 
{
	this.m_bound = new CBound();
    this.m_mat=new CMat();
    this.m_pos=new CVec3();
    this.m_sca=new CVec3(1,1,1);
    this.m_rot=new CVec3();
    
    this.m_drawColor="rgba(255,0,0,1.0)";
    this.m_alpha=1.0;
    this.m_key=null;
    this.m_viewDir=new CVec3(0,-1);

    this.m_imageCoordinate=null;
    this.m_aniData=new Array();
    this.m_aniQue=new Array();
    this.m_flow=new CFlow();
    this.m_remove=false;
    this.m_speed=1.0;
    this.m_moveQue=new Array();
    this.m_show=true;
	//Init();
}
CObject.prototype=new ISerialize();
CObject.prototype.constructor	=CObject;
CObject.prototype.Init=function()
{
	this.m_bound = new CBound();
    this.m_mat=new CMat();
    this.m_pos=new CVec3();
    this.m_sca=new CVec3(1,1,1);
    this.m_rot=new CVec3();
    
    this.m_drawColor="rgba(255,0,0,1.0)";
    this.m_alpha=1.0;
    this.m_key=null;
    this.m_viewDir=new CVec3(0,-1,0);
    //this.m_animove=null;//이거 조만간 삭제함2016.05.10
    
    this.m_imageCoordinate=null;
    this.m_aniData=new Array();
    this.m_aniQue=new Array();
    this.m_flow=new CFlow();
    this.m_remove=false;
    
    this.m_moveQue=new Array();
}
CObject.prototype.ResetMat=function()
{
	var rotMat=MatAxisToRotation(new CVec3(0,0,1),this.m_rot.y);
	var scaMat=MatScale(this.m_sca);
	this.m_mat=MatMuliplication(scaMat,rotMat);
	this.m_mat.arr[3][0]=parseInt(this.m_pos.x);this.m_mat.arr[3][1]=parseInt(this.m_pos.y);this.m_mat.arr[3][2]=this.m_pos.z;
}
CObject.prototype.Push_Animation=function(_ani)
{
	this.m_aniData.push(_ani);
}

CObject.prototype.Clear_Animation=function()
{
	this.m_aniData=new Array();
	this.m_aniQue=new Array();
	this.m_flow=new CFlow();
}
CObject.prototype.Set_Flow=function(_flow)
{
	this.m_flow=_flow;
}
CObject.prototype.Set_FlowOption=function(_option)
{
	this.m_flow.m_option=_option;
}
CObject.prototype.Set_Alpha=function(_alpha)
{
	this.m_alpha=_alpha;
}
CObject.prototype.Set_Key=function(_key)
{
	this.m_key=_key;
}
CObject.prototype.Get_Key=function()
{
	return this.m_key;
}
/*
CObject.prototype.Set_Animove=function(_bv,_ev,_endMil,_cu)
{
	this.m_animove=new CAniMove();
	this.m_animove.m_beginVec3=_bv;
	this.m_animove.m_endVec3=_ev;
	this.m_animove.m_presentTime=0;
	this.m_animove.m_endTime=_endMil;
	this.m_animove.m_curveFunc = typeof _cu !== 'undefined' ? _cu : CurveLinear;
}
*/
CObject.prototype.ImgToDivAni=function(_img,_width,_height,_divX,_divY,_time)
{
	var divXSize=_width/_divX;
	var divYSize=_height/_divY;
	var tCount=0;
	for(var y=0;y<_divY;++y)
	{
		for(var x=0;x<_divX;++x)
		{
			this.Push_Animation(new CAniImageCoordinate(tCount*_time,_time,_img,new CRect(x*divXSize,y*divYSize,(x+1)*divXSize,(y+1)*divYSize)));
			tCount++;
		}
	}
}
//넣을때는 지름이다
CObject.prototype.NewCBoundCircle=function(_length)
{
	this.m_bound=new CBound();
	//바운드는 반지름
	this.m_bound.Set_Circle(_length/2);
}
//전체 크기
CObject.prototype.NewCBoundBox=function(_length)
{
	this.m_bound=new CBound();
	this.m_bound.ResetBox(new CVec3(-_length.x/2,-_length.y/2,-_length.z/2));
	this.m_bound.ResetBox(new CVec3(_length.x/2,_length.y/2,_length.z/2));
}
CObject.prototype.NewCLine=function(_pos)
{
	this.m_bound=new CBound();
	this.m_bound.Set_Line(_pos);
}
CObject.prototype.Get_CBound=function()
{
	return this.m_bound;
}

function ImageDraw(_context,_img,x,y,z,w,codi)
{
	if(codi==null)
		_context.drawImage(_img, parseInt(x),parseInt(y),parseInt(z), parseInt(w));
	else
		_context.drawImage(_img, codi.left, codi.top, codi.right-codi.left, codi.bottom-codi.top, parseInt(x),parseInt(y),parseInt(z), parseInt(w));
}
CObject.prototype.Draw=function(_context,_camera)
{
	var camPos=_camera.Get_Position();
	if(this.m_drawColor==null || this.m_show==false)
		return;

	_context.globalAlpha=this.m_alpha;
	var allMat=MatMuliplication(this.m_mat,_camera.m_mat);
	_context.setTransform(allMat.arr[0][0], allMat.arr[0][1], 
			allMat.arr[1][0], allMat.arr[1][1], allMat.arr[3][0], allMat.arr[3][1]);
	
	var x,y,z,w,length;
	if(this.m_bound.boundType==null)
	{
		return;
	}
	else if(this.m_bound.boundType=="Circle")
	{
		x=0;y=0;
		length=this.m_bound.Get_Radius();
	}
	else if(this.m_bound.boundType=="Box")
	{
		x=this.m_bound.min.x;
		y=this.m_bound.min.y;
		z=this.m_bound.max.x*2;
		w=this.m_bound.max.y*2;
	}
	
	if(this.m_drawColor.indexOf("rgba")!=-1)
	{
		_context.fillStyle = this.m_drawColor;
		
		
		if(this.m_bound.boundType=="Circle")
		{
			_context.beginPath();
			_context.arc(parseInt(x),parseInt(y),parseInt(length) , 0, 2 * Math.PI);
			_context.fill();
		}
		else if(this.m_bound.boundType=="Box")
		{
			_context.fillRect(parseInt(x),parseInt(y),parseInt(z), parseInt(w));
			//_context.fillRect(parseInt(this.m_bound.position.x), parseInt(this.m_bound.position.z), 100, 100);
		}
		else if(this.m_bound.boundType=="Line")
		{
			_context.strokeStyle = this.m_drawColor;
			_context.lineCap="round";
			_context.setLineDash([10]);
			_context.beginPath();
			_context.moveTo(parseInt(0), parseInt(0));
			_context.lineTo(parseInt(-(this.m_pos.x-this.m_bound.max.x)), parseInt(-(this.m_pos.y-this.m_bound.max.y)));
			_context.stroke();
		}
	}
	else if(this.m_drawColor.indexOf("fillText")!=-1)
	{
		_context.setTransform(1,0,0,1,0,0);
		var str=this.m_drawColor.substring(11,this.m_drawColor.length);
		var strArr=str.split("<br/>");
		var color=this.m_drawColor.substring(9,10);
		var ts=this.m_drawColor.substring(10,11);
		_context.textAlign="center";
		_context.textBaseline="middle"
		if(ts=="S")
			_context.font="16px serif";
		else
			_context.font="24px serif";
		
		x=allMat.arr[3][0];
		y=allMat.arr[3][1];
		_context.lineWidth = 2;
		_context.strokeStyle = 'black';
		
		if(color=="W")
		{
			_context.strokeStyle = 'black';
			_context.fillStyle = 'white';
		}
		else
		{
			_context.strokeStyle = 'black';
			_context.fillStyle = 'red';
		}
			
		_context.setLineDash([]);
		for(var i=0;i<strArr.length;++i)
		{
			_context.strokeText(strArr[i], x, y+i*17);
			_context.fillText(strArr[i], x, y+i*17);
		}
			 
		
		
		//_context.lineWidth = 5;
		//_context.font="bold 33px arial";
		//_context.fillStyle="rgba(0,0,0,1)";
		//_context.fillText(str, x, y, length*3);
		
	}
	else
	{
		var img=Get_LoadImage(this.m_drawColor);

		if(img.m_load)
		{
			if(this.m_bound.boundType=="Circle")
			{

				ImageDraw(_context,img,x-length/2,y-length/2,length,length,this.m_imageCoordinate);
			}
			else if(this.m_bound.boundType=="Box")
			{
				ImageDraw(_context,img,x,y,z,w,this.m_imageCoordinate);
			}
		}
	}//else
	
}
CObject.prototype.Update=function(_time)
{

	//var rVal=new CVec3();
	for(var i=0;i<this.m_moveQue.length;++i)
	{
		var dtime=_time*0.001;
		var res=Vec3MulFloat(Vec3MulFloat(this.m_moveQue[i].m_direction,this.m_moveQue[i].m_power),dtime);
		this.m_pos=Vec3PlusVec3(this.m_pos,res);
		this.ResetMat();

	}
	

	if(this.m_aniData!=null)
	{
		
		if(this.m_flow.m_option.indexOf("play")!=-1)
		{
			
			this.m_flow.m_time+=_time*this.m_speed;
			while(this.m_aniData.length!=0)
			{
				
				if(this.m_flow.m_offset>=this.m_aniData.length && this.m_aniQue.length==0)
				{
					if(this.m_flow.m_option.indexOf("loop")!=-1)	
					{
						this.m_flow.m_offset=0;
						this.m_flow.m_time=0;
					}
					break;
				}
				
				if(this.m_flow.m_offset<this.m_aniData.length && this.m_aniData[this.m_flow.m_offset].m_time<this.m_flow.m_time)
				{
					this.m_aniQue.push(clone(this.m_aniData[this.m_flow.m_offset]));
					this.m_flow.m_offset+=1;
				}
				else
					break;
					
			}//while
			
			
		}//if
		
	
		for(var i=0;i<this.m_aniQue.length;++i)
		{
			this.m_aniQue[i].m_delay-=_time;
		
			if(this.m_aniQue[i] instanceof CAniImage)
			{
				this.m_drawColor=this.m_aniQue[i].m_image;
			}
			else if(this.m_aniQue[i] instanceof CAniAlpha)
			{
				var ff=this.m_flow.m_time-this.m_aniQue[i].m_time;//흐른시간
				var pst=ff/parseFloat(this.m_aniQue[i].m_delay+ff);
				if(pst>1.0)
					pst=1.0;
				pst=this.m_flow.m_curveFunc(pst);
				
				this.m_alpha=this.m_aniQue[i].m_edAlpha*pst+this.m_aniQue[i].m_stAlpha*(1.0-pst);
			}
			else if(this.m_aniQue[i] instanceof CAniImageCoordinate)
			{
				this.m_drawColor=this.m_aniQue[i].m_image;
				this.m_imageCoordinate=this.m_aniQue[i].m_coordinate;
			}
			else if(this.m_aniQue[i] instanceof CAniPhysicsDynamic)
			{
				//100,0 이면 100만큼 가는걸 한다
				var ff=this.m_flow.m_time-this.m_aniQue[i].m_time;//흐른시간
				var pst=ff/parseFloat(this.m_aniQue[i].m_delay+ff);
				if(pst>1.0)
					pst=1.0;
				pst=this.m_flow.m_curveFunc(pst);
				var moav=Vec3MinusVec3(Vec3MulFloat(this.m_aniQue[i].m_position,pst),this.m_aniQue[i].m_before);
				this.m_pos=Vec3PlusVec3(this.m_pos,moav);
				this.m_aniQue[i].m_before=Vec3PlusVec3(this.m_aniQue[i].m_before,moav);
			}
			else if(this.m_aniQue[i] instanceof CAniPhysicsStatic)
			{
				if(Vec3Compare(this.m_aniQue[i].m_before,new CVec3()))
				{
					this.m_aniQue[i].m_before=this.m_pos;
				}
				//100,0 이면 100만큼 가는걸 한다
				var ff=this.m_flow.m_time-this.m_aniQue[i].m_time;//흐른시간
				var pst=ff/parseFloat(this.m_aniQue[i].m_delay+ff);
				if(pst>1.0)
					pst=1.0;
				pst=this.m_flow.m_curveFunc(pst);
				this.m_pos=Vec3PlusVec3(Vec3MulFloat(this.m_aniQue[i].m_before,1.0-pst),Vec3MulFloat(this.m_aniQue[i].m_position,pst));
				//this.m_bound.m_position=Vec3PlusVec3(this.m_bound.m_position,moav);
				//this.m_aniQue[i].m_before=Vec3PlusVec3(this.m_aniQue[i].m_before,moav);
			}
			
			if(this.m_aniQue[i].m_delay<=0)
			{
				this.m_aniQue.splice(i,1);
				i--;
			}
			
		}
		if(this.m_flow.m_option.indexOf("remove")!=-1 && this.m_aniQue.length==0 && this.m_flow.m_offset>=this.m_aniData.length)
		{
			this.m_remove=true;
		}
	
		
	}//if
}
CObject.prototype.MoveQueToViewVec=function()
{
	if(this.m_bound==null)
		return;
	
	
	var rVal=new CVec3();
	for(var i=0;i<this.m_moveQue.length;++i)
	{
		var dirPower=Vec3MulFloat(this.m_moveQue[i].m_direction, this.m_moveQue[i].m_power);
		rVal=Vec3PlusVec3(rVal, dirPower);
	}
	
	if(rVal.x==0 && rVal.y==0 && rVal.z==0)
	{}
	else
	{
		this.m_viewDir=rVal;
		this.m_viewDir=Vec3Normalize(this.m_viewDir);
	}
}
CObject.prototype.Set_Position=function(_pos)
{
	this.m_pos=_pos;
	this.ResetMat();
}
CObject.prototype.Set_Scale=function(_sca)
{
	this.m_sca=_sca;
	this.ResetMat();
}
CObject.prototype.Set_Rotation=function(_rot)
{
	this.m_rot=_rot;
	this.ResetMat();
}
CObject.prototype.Get_Position=function()
{
	return clone(this.m_pos);
}
CObject.prototype.Get_ViewDir=function()
{
	return this.m_viewDir;
}

CObject.prototype.Clear_DirectionPower=function(_moveData)
{
	this.m_moveQue=new Array();
}
CObject.prototype.Push_DirectionPower=function(_moveData)
{
	this.m_moveQue.push(_moveData);
}
CObject.prototype.Remove_DirectionPower=function(_key)
{
	if(_key==null)
		this.m_moveQue.clear();
	else
	{
		for (var i=0;i<this.m_moveQue.length;++i)
		{
			if(this.m_moveQue[i].m_key==_key)
			{
				this.m_moveQue.splice(i,1);
				break;
			}
			
		}
	}
}
CObject.prototype.PushAndModify_DirectionPower=function(_moveData)
{
	for (var i=0;i<this.m_moveList.length;++i)
	{
		if(this.m_moveList[i].m_key==_moveData.m_key)
		{
			this.m_moveList[i]=_moveData;
			return;
		}
		
	}
	this.m_moveList.push(_moveData);
	
}
CObject.prototype.Pick=function(_pos)
{
	//alert("error");
	
	if(this.m_bound.boundType==null)
	{
		
	}
	else if(this.m_bound.boundType=="Circle")
	{
		//this.m_bound.m_position=this.m_pos;
		if(CollusionCircleAtVec3(this.m_pos,this.m_bound.Get_Radius(),_pos))
			return true;
	}
	else if(this.m_bound.boundType=="Box")
	{
		var inM=MatInvert(this.m_mat);
		var dummy=MatToVec3Coordinate(inM,_pos);
		
		if(CollusionPointAtBox(dummy,this.m_bound))
		{
			return true;
		}
		
	}
	
	return false;
}
CObject.prototype.Set_DrawColor=function(_color)
{
	this.m_drawColor=_color;
}
CObject.prototype.Serialize=function()
{
	var pac=new CPacket();
	pac.name="CObject";
	pac.value.push(this.m_key);
	pac.Push(this.m_bound);
	pac.Push(this.m_pos);
	pac.Push(this.m_moveQue);
	
	return pac;
}
CObject.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	this.m_key=dummy.value[0];
	if(dummy.value[1]=="null")
		this.m_bound=null;
	else
		this.m_bound.Deserialize(dummy.value[1]);
	this.m_pos.Deserialize(dummy.value[2]);
	this.m_moveQue.length=0;
	
	if(dummy.value.length>3)
	{
		var mpac=new CPacket();
		mpac.Deserialize(dummy.value[3]);
		for(var i=0;i<mpac.value.length;++i)
		{
			var move=new CMoveData();
			move.Deserialize(mpac.value[i]);
			this.m_moveQue.push(move);
		}
	}
	
	
	this.ResetMat();
}
CObject.prototype.ObjectToLength=function(_obj)
{
	var len=0;
	
	var MtoP=Vec3MinusVec3(this.m_pos,_obj.m_pos);
	len=Vec3Lenght(MtoP);
	
	return len;
}
CObject.prototype.CollusionLen=function(_obj)
{
	if(this==_obj)
		return;
	var dir=Vec3MinusVec3(this.m_pos,_obj.m_pos);
	var vlen=Vec3Lenght(dir);

	if(vlen+0.5<(this.m_bound.Get_Radius()+_obj.m_bound.Get_Radius()))
		return vlen;
	return -1;
}