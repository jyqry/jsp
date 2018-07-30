function CBound() 
{
	this.min=new CVec3(100000,100000,100000);
	this.max=new CVec3(-100000,-100000,-100000);
	this.boundType=null;
}
CBound.prototype=new ISerialize();
CBound.prototype.constructor	=CBound;
CBound.prototype.ResetBox=function(_vec)
{
	this.boundType="Box";
	this.min.x=Math.min(this.min.x,_vec.x);
	this.min.y=Math.min(this.min.y,_vec.y);
	this.min.z=Math.min(this.min.z,_vec.z);
	
	this.max.x=Math.max(this.max.x,_vec.x);
	this.max.y=Math.max(this.max.y,_vec.y);
	this.max.z=Math.max(this.max.z,_vec.z);
}
CBound.prototype.Set_Circle=function(_val)
{
	this.boundType="Circle";
	this.min.x=-_val;
	this.min.y=-_val;
	this.min.z=-_val;
	
	this.max.x=_val;
	this.max.y=_val;
	this.max.z=_val;
}
CBound.prototype.Set_Line=function(_val)
{
	this.boundType="Line";
	this.max=this.min=_val;
}
CBound.prototype.Get_Radius=function()
{
	var L_max=Math.max(Math.max(Math.abs(this.max.x),Math.abs(this.max.y)),Math.abs(this.max.z));
	return Math.max(Math.max(Math.max(Math.abs(this.min.x),Math.abs(this.min.y)),Math.abs(this.min.z)),L_max);
}
CBound.prototype.Get_Box=function()
{
	return new CVec3((Math.abs(this.max.x)+Math.abs(this.min.x)),
			(Math.abs(this.max.y)+Math.abs(this.min.y)),
			(Math.abs(this.max.z)+Math.abs(this.min.z)));
}
CBound.prototype.Get_Center=function()
{
	var L_cen=new CVec3();
	
	if(max.x<0)
		L_cen.x=(Math.abs(min.x)-Math.abs(max.x))/2;
	else
		L_cen.x=(max.x-min.x)/2;

	if(max.z<0)
		L_cen.z=(Math.abs(min.z)-Math.abs(max.z))/2;
	else
		L_cen.z=(max.z-min.z)/2;

	if(max.y<0)
		L_cen.y=(Math.abs(min.y)-Math.abs(max.y))/2;
	else
		L_cen.y=(max.y-min.y)/2;
	
	return L_cen;
}
CBound.prototype.Serialize=function()
{
	var pac=new CPacket();
	pac.name="CBound";
	if(this.boundType=="Box")
		pac.value.push("Box");
	else if(this.boundType=="Circle")
		pac.value.push("Circle");
	else 
		return pac;
	
	pac.value.push(this.min.Serialize().Serialize());
	pac.value.push(this.max.Serialize().Serialize());
	
	return pac;
}
CBound.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	if(dummy.value.length==0)
		return;
	if(dummy.value[0]=="Box")
		this.boundType="Box";
	else if(dummy.value[0]=="Circle") 
		this.boundType="Circle";
	else
		return;
	

	this.min.Deserialize(dummy.value[1]);
	this.max.Deserialize(dummy.value[2]);
}
