function ISerialize()
{
	this.m_dummy;
}
ISerialize.prototype.Serialize=function()
{	
}
ISerialize.prototype.Deserialize=function(_str)
{}
//ISerialize.prototype=new ISerialize();
ISerialize.prototype.constructor	=ISerialize;