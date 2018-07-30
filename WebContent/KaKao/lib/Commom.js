
String.prototype.hashCode = function(){
    var hash = 0;
    for (var i = 0; i < this.length; i++) {
        var character = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
String.prototype.replaceAll = function(org, dest) {return this.split(org).join(dest);}
Array.prototype.add = function(_val) {return this.push(_val);}
function PathToId(_val)
{
	var dummuy=_val.replaceAll('/', '_');
	dummuy=dummuy.replaceAll(':', '_');
	dummuy=dummuy.replaceAll(' ', 'q');
	dummuy=dummuy.replaceAll(',', 'q');
	dummuy=dummuy.replaceAll('.', 'q');
	dummuy=dummuy.replaceAll('#', 'q');
	dummuy=dummuy.replaceAll('@', 'q');
	dummuy=dummuy.replaceAll('!', 'q');
	dummuy=dummuy.replaceAll('~', 'q');
	dummuy=dummuy.replaceAll('$', 'q');
	dummuy=dummuy.replaceAll('@', 'q');
	dummuy=dummuy.replaceAll('^', 'q');
	dummuy=dummuy.replaceAll('&', 'q');
	dummuy=dummuy.replaceAll('*', 'q');
	dummuy=dummuy.replaceAll('(', 'q');
	dummuy=dummuy.replaceAll(')', 'q');
	dummuy=dummuy.replaceAll('[', 'q');
	dummuy=dummuy.replaceAll(']', 'q');
	dummuy=dummuy.replaceAll('/', 'q');
	dummuy=dummuy.replaceAll('\\', 'q');
	dummuy=dummuy.replaceAll('|', 'q');
	dummuy=dummuy.replaceAll('|', 'q');
	dummuy=dummuy.replaceAll(':', 'q');
	dummuy=dummuy.replaceAll(';', 'q');
	dummuy=dummuy.replaceAll('"', 'q');
	dummuy=dummuy.replaceAll('\'', 'q');
	dummuy=dummuy.replaceAll('?', 'q');
	dummuy=dummuy.replaceAll('<', 'q');
	dummuy=dummuy.replaceAll('>', 'q');
	dummuy=dummuy.replaceAll('-', 'q');
	dummuy=dummuy.replaceAll('+', 'q');
	dummuy=dummuy.replaceAll('=', 'q');
	dummuy=dummuy.replaceAll('{', 'q');
	dummuy=dummuy.replaceAll('}', 'q');
	dummuy=dummuy.replaceAll('%', 'q');
	return dummuy;
}
function SpTokToNSpTok(_str)
{
	//alert(_str);
	_str=_str.replaceAll("%", "#37;");
	_str=_str.replaceAll("'", "#39;");
	_str=_str.replaceAll("\"", "#34;");
	_str=_str.replaceAll("&", "#38;");
	_str=_str.replaceAll(",", "#44;");
	_str=_str.replaceAll("/", "#47;");
	_str=_str.replaceAll("\\", "#92;");
	
	//alert(_str);
	return _str;
}
function NSpTokToSpTok(_str)
{
	//alert(_str);
	_str=_str.replaceAll("#37;","%");
	_str=_str.replaceAll("#39;","'");
	_str=_str.replaceAll("#34;","\"");
	_str=_str.replaceAll("#38;","&");
	_str=_str.replaceAll("#44;",",");
	_str=_str.replaceAll("#47;","/");
	_str=_str.replaceAll("#92;","\\");
	//
	return _str;
}
//==========================================================================================
/**
* The FreeBSD Copyright
*
* Copyright 1992-2012 The FreeBSD Project. All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer. Redistributions in binary
* form must reproduce the above copyright notice, this list of conditions and
* the following disclaimer in the documentation and/or other materials provided
* with the distribution. THIS SOFTWARE IS PROVIDED BY THE FREEBSD PROJECT ``AS
* IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
* THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
* PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE FREEBSD PROJECT OR CONTRIBUTORS
* BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*
* The views and conclusions contained in the software and documentation are
* those of the authors and should not be interpreted as representing official
* policies, either expressed or implied, of the FreeBSD Project.
*
* @author kipyung.sung
*/
 
function newMap() 
{
	var map = {};
	map.value = {};
	map.key = new Array();
	map.getKey = function(id) {
		return "k_"+id;
	};
	map.push = function(id, value) {
		var key = map.getKey(id);

		if(map.value[key])
		{}
		else
			map.key.push(id);

		map.value[key] = value;

	};
	map.contains = function(id) {
		var key = map.getKey(id);
		if(map.value[key]) {
			return true;
		} else {
			return false;
		}
	};
	map.get = function(id) {
		var key = map.getKey(id);
		if(map.value[key]) {
			return map.value[key];
		}
		return null;
	};
	map.remove = function(id) {
		var key = map.getKey(id);
		if(map.contains(id)){
			map.value[key] = undefined;
		}
	};
	map.getKeyArray=function()
	{
		return map.key;
	};

	return map;
}
function clone(obj) 
{
	if (obj === null || typeof(obj) !== 'object')
		return obj;
	var copy = null;
	
	if(obj instanceof CAniImageCoordinate)
		copy=new CAniImageCoordinate();
	else if(obj instanceof CAniImage)
		copy=new CAniImage();
	else if(obj instanceof CAniAlpha)
		copy=new CAniAlpha();
	else if(obj instanceof CVec3)
		copy=new CVec3();
	else
		alert("추가해라!");
	
	for (var attr in obj) 
	{
		if (obj.hasOwnProperty(attr)) 
		{
			copy[attr] = obj[attr];
		}
	}
	return copy;
}
function CArrCut()
{
	this.m_arr=new Array();
}
CArrCut.prototype=new CArrCut();
CArrCut.prototype.constructor	=CArrCut;
CArrCut.prototype.Process=function(_text)
{
	var twoArr=new Array();
	var col=_text.split("\n");
	for(var i=0;i<col.length;++i)
	{
		var row=col[i].split("\t");
		this.m_arr.push(row);
	}
}
CArrCut.prototype.Get=function(_key,_offset)
{
	if(typeof(_key) == 'string')
	{
		for(var i=0;i<this.m_arr.length;++i)
		{
			if(this.m_arr[i][0]==_key)
			{
				return this.m_arr[i][_offset];
			}
		}
	}
	else
	{
		return this.m_arr[_key][_offset];
	}
	alert("find fail");
	return null;
}
CArrCut.prototype.RowSize=function()
{
	if( this.m_arr.length>0)
	{
		return this.m_arr[0].length;
	}
	return 0;
}
CArrCut.prototype.Output=function()
{
	var allStr="";
	for(var i=0;i<this.m_arr.length;++i)
	{
		for(var j=0;j<this.m_arr[i].length;++j)
		{
			allStr+=this.m_arr[i][j]+"	";
		}
		allStr+="\n";
	}
	return allStr;
}
function TrueFalseChk(_val)
{
	if(_val=="true" || _val=="TRUE")
		return true;
	return false;
}
var g_resMap=new newMap();
var g_loadCount=0;
var g_loadComplete=0;
function Get_LoadImage(_name)
{
	var img=g_resMap.get(_name);
	
	if(img==null)
	{
		g_loadCount++;
		img = new Image();
		img.m_load=false;
		img.onload = function(){this.m_load=true;g_loadComplete++;};
		img.src=_name;
		g_resMap.push(_name,img);
	}
	return img;
}