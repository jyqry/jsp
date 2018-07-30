function CPacket()
{
	this.name="";
	this.value=new Array();
}

CPacket.prototype.Serialize=function()
{
	
	var cutTag="";
	var rVal=this.name+":{";
	var valList="";
	for(var i=0;i<this.value.length;++i)
	{
		if(valList.length!=0)
			valList+=",";
		else if(valList.length==0 && i==1)
			valList+=",";	
		valList+=this.value[i];
		
		if(cutTag.length!=0)
			cutTag+=",";
		cutTag+=valList.length;
		
	}
	rVal+=valList+"}"+cutTag;
	
	return rVal;
	
}


CPacket.prototype.Deserialize=function(_str)
{
	 
	this.value=new Array();
	var index=_str.indexOf(":");
	this.name=_str.substring(0,index);

	this.name=this.name.replace(/\n/g,'');
	this.name=this.name.replace(/\r/g,'');
	
		

	var lastStr=_str.substring(_str.indexOf("{")+1,_str.lastIndexOf("}"));
	var cutStr=_str.substring(_str.lastIndexOf("}")+1,_str.length);
	var cutStrArr=cutStr.split(",");
	var before=0;
	for(var i=0;i<cutStrArr.length;++i)
	{
		if(cutStrArr[i]=="")
			continue;
		var pst=parseInt(cutStrArr[i]);
		this.value.push(lastStr.substring(before,pst));
		before=pst+1;
	}
}

CPacket.prototype.Push=function(_data)
{
	if(_data==null)
	{
		this.value.push("null");
		return;
	}
		
	if(typeof _data == "number" || typeof _data == "string" || typeof _data == "boolean")
		this.value.push(_data);
	else if(typeof _data == "object")
	{
		if(_data instanceof Array)
		{
			var dummy =new CPacket();
			dummy.name="Vector";
			for(var i=0;i<_data.length;++i)
			{
				dummy.Push(_data[i]);
			}
			this.value.push(dummy.Serialize());
		}
		else if(_data instanceof ISerialize)
		{
			this.value.push(_data.Serialize().Serialize());
		}
		else if(_data instanceof CPacket)
		{
			this.value.push(_data.Serialize());
		}
		else
			alert("CPacket error");
		
	}
	else
		alert("CPacket error "+typeof _data);


}
