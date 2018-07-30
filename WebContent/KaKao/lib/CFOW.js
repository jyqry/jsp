function CFOW()
{
	this.m_sun=10;//56789-1516171819는 선타임  낮012345  밤1011121314
	this.m_canvas=null;
	this.m_ctx=null;
	this.m_my=null;	
	this.m_light=new Array();
}
CFOW.prototype=new CFOW();
CFOW.prototype.constructor	=CFOW;
CFOW.prototype.Init=function(_context)
{
	this.m_canvas = document.createElement('canvas');
}
CFOW.prototype.Set_My=function(_my)
{
	this.m_my=_my;
}
//외부에서 화면 안만 인한다
CFOW.prototype.Update=function(_obj)
{
	if(this.m_my==null || this.m_sun<6)
		return;
	
	if(_obj.m_group>=CPlayer_eGroup_UserBegin && _obj.m_group<=CPlayer_eGroup_UserEnd)
	{
		this.m_light.push(_obj);
	}
	else if(_obj.m_group==CPlayer_eGroup_Npc)
	{
		this.m_light.push(_obj);
	}
}
CFOW.prototype.ObjectDrawChk=function(_obj)
{
	//밤이 아니면 적이 보인다
	if(this.m_sun<9 || 15<this.m_sun)
		return true;
	var rVal=false;
	for(var i=0;i<this.m_light.length;++i)
	{
		if(this.m_light[i].ObjectToLength(_obj)<256)
		{
			rVal=true;
		}
	}
	return rVal;
}
CFOW.prototype.Draw=function(_context,_camera)
{
	
	_context.globalAlpha=1.0;
	
	var clearPro=false;
	if(this.m_ctx==null)
		clearPro=true;
	

	var input=$(document).Get_CInput();
	if(clearPro)
	{
		this.m_ctx = this.m_canvas.getContext('2d');
		this.m_ctx.canvas.width = _context.canvas.width;
		this.m_ctx.canvas.height = _context.canvas.height;
		this.m_ctx.setTransform(1,0,0,1,0,0);
		this.m_ctx.fillStyle="rgba( 0, 0, 0, 1.0)";
		this.m_ctx.fillRect(0,0,this.m_ctx.canvas.width,this.m_ctx.canvas.height);	
		
	}
	this.m_ctx.globalCompositeOperation = 'destination-out';
	
	
	this.m_ctx.fillStyle="rgba( 0, 0, 0,  1 )";
	this.m_ctx.beginPath();
	this.m_ctx.arc(input.m_mouseX,input.m_mouseY,32 , 0, 2 * Math.PI);
	this.m_ctx.fill();
	
	_context.setTransform(1,0,0,1,0,0);
	_context.drawImage(this.m_canvas, 0, 0, this.m_ctx.canvas.width, this.m_ctx.canvas.height);

}