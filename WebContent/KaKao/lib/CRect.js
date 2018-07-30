function CRect(_left,_top,_right,_bottom) 
{
	this.left = _left;
	this.top = _top;
	this.right = _right;    
	this.bottom = _bottom;
}
CRect.prototype=new ISerialize();
CRect.prototype.constructor	=CRect;

CRect.prototype.Serialize=function()
{
	var pac=new CPacket();
	pac.name="CRect";
	pac.value.push(this.left);
	pac.value.push(this.right);
	pac.value.push(this.top);
	pac.value.push(this.bottom);
	
	return pac;
}
CRect.prototype.Deserialize=function(_str)
{
	var dummy=new CPacket();
	dummy.Deserialize(_str);
	this.left=Number(dummy.value[0]);
	this.right=Number(dummy.value[1]);
	this.top=Number(dummy.value[2]);
	this.bottom=Number(dummy.value[3]);
}
