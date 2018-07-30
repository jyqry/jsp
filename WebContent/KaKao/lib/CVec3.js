function CVec3(_x,_y,_z) 
{
	this.x = typeof _x !== 'undefined' ? _x : 0.0;
	this.y = typeof _y !== 'undefined' ? _y : 0.0;
	this.z = typeof _z !== 'undefined' ? _z : 0.0;    
}
CVec3.prototype=new ISerialize();
CVec3.prototype.constructor	=CVec3;
CVec3.prototype.ToPoint=function()
{
	var x0=parseInt(this.x);
	var y0=parseInt(this.y);
	return {x:x0,y:y0};
}
CVec3.prototype.StringToVec3=function(_str)
{
	var arrs=_str.split(",");
	this.x=Number(arrs[0]);
	this.y=Number(arrs[1]);
	this.z=Number(arrs[2]);
}
CVec3.prototype.ZeroChk=function()
{
	if(this.x==0 && this.y==0 && this.z==0)
		return true;
	
	return false;
}

CVec3.prototype.Equals=function(_target)
{
	if(this.x==_target.x && this.y==_target.y && this.z==_target.z)
		return true;
	
	return false;
}
CVec3.prototype.Serialize=function()
{
	var pac=new CPacket();
	pac.name="CVec3";
	pac.value.push(this.x);
	pac.value.push(this.y);
	pac.value.push(this.z);
	
	return pac;
}
CVec3.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	this.x=Number(dummy.value[0]);
	this.y=Number(dummy.value[1]);
	this.z=Number(dummy.value[2]);
}

