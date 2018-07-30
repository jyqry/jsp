(function ( $ ) 
{
	var m_menu = [{
	    name: 'Select',
	    fun: function () 
	    {
	    	StateChange('Select');
	    	if(m_callBack!=null)
	    		m_callBack();
	    }
	}, {
	    name: 'LayoutMove',
	    fun: function () 
	    {
	    	StateChange('LayoutMove');
	    	if(m_callBack!=null)
	    		m_callBack();
	    }
	},{
	    name: 'ObjectMove',
	    fun: function () 
	    {
	    	StateChange('ObjectMove');
	    	if(m_callBack!=null)
	    		m_callBack();
	    }
	},{
	    name: 'Info',
	    fun: function () 
	    {
	    	StateChange('Info');
	    	if(m_callBack!=null)
	    		m_callBack();
	    }
	},{
	    name: 'Html',
	    fun: function () 
	    {
	    	StateChange('Html');
	    	if(m_callBack!=null)
	    		m_callBack();
	    }
	}];

	
	
	function ChildeChk(_root,_id)
	{
		if(_root==null || _id==null)
			return null;
		
		if(_root.attr('id')==_id)
			return _root;
		
		var ch=_root.children();
		
		
		for(var i=0;i<ch.length;++i)
		{
			var rVal=ChildeChk($("#"+ch[i].id),_id);
			if(rVal!=null)
				return rVal;
		}
		
		
		return null;
	}
    var m_this=null;
    var m_menuObj=null;
   

	var m_clickObj;
	var m_state="";
	var m_mouseState=null;
	var m_saveX,m_saveY;
	var m_beforeWidth,m_beforeHeight;
	var m_callBack=null;
	var m_mouseX,m_mouseY;
	var m_oneClickPass=0;
	$.fn.Get_State = function()
	{
		return m_state;
	}
	$.fn.Get_ClickObj = function()
	{
		return m_clickObj;
	}
	$.fn.Set_CallBack = function(_call) 
    {
		m_callBack=_call;
    }
	
	$.fn.Set_DivAttr = function(_div)
	{
		_div.attr("ondragstart",'$("'+m_this.attr("id")+'").DragStart(event)');
		_div.attr("draggable",'false');
		_div.attr("ondrop",'$("#'+m_this.attr("id")+'").Drop(event)');
		_div.css("min-height",'1px');
	}
	$.fn.DummyDataChk = function(_obj)
	{
		if(_obj.attr('id')=="con_menu")
			return true;
		
		_obj.removeAttr("ondragstart");
		_obj.removeAttr("draggable");
		_obj.removeAttr("ondrop");
		_obj.css("min-height",'');
		
		return false;
	}
    $.fn.Init = function() 
    {
    	m_this=this;
    	m_this.html(m_this.html()+"<div id='con_menu'></div>");
    	
    	
    	m_menuObj=$("#con_menu");
    	m_menuObj.contextMenu(m_menu);
    	$(".iw-contextMenu").css('z-index',60000);
    	
        return this;
    };
    $.fn.Get_MenuObj = function()
    {
    	return m_menuObj;
    }
    
    
    function ClickPro(event)
    {
    	if(m_oneClickPass>0)
    	{
    		m_oneClickPass-=1;
    		m_menuObj.contextMenu('open',{top:event.clientY,left:event.clientX});
    		var test=m_menuObj.contextMenu();
    		return;
    	}
    		
    	var target=event.target;
		var t_clickObj=ChildeChk(m_this,target.getAttribute('id'));
		if(t_clickObj!=null && t_clickObj.attr('id')==m_this.attr('id'))
			t_clickObj=null;
		if(t_clickObj==null || m_state!="")
		{
			if(t_clickObj==null)
			{
				if(m_clickObj!=null)
					ResetObject();
					
				
			}
			
			return;
		}
		if(m_clickObj!=null)
			ResetObject();
		
		m_clickObj=t_clickObj;
		m_menuObj.contextMenu('open',{top:event.clientY,left:event.clientX});
		OutlineSet(m_clickObj,'1px','solid','blue');    	
	
    }
    
    $( this ).touchend(function (event) 
	{	
    	
		ClickPro(event);
	});
    $( this ).click(function (event) 
	{	
    	ClickPro(event);
	});
    $.fn.Set_ClickObj = function (_obj)
	{
    	if(m_clickObj!=null)
    		ResetObject();
    	
    	m_oneClickPass+=1;
    	if(_obj==null)
    		return;
    	m_clickObj=_obj;
    	//m_menuObj.contextMenu('open',{top:m_mouseY,left:m_mouseX});
    	
    	OutlineSet(m_clickObj,'1px','solid','blue');
	}
    $( this ).mousemove(function (event)
    {
    	m_mouseX=event.clientX;
    	m_mouseY=event.clientY;
    	if(m_state=='ObjectMove')
   		{
    		var tick=6;
        	var offsetVal=m_clickObj.offset();
        	var widthP=StrToInt(m_clickObj.css("width"));
        	var heightP=StrToInt(m_clickObj.css("height"));
        	
        	//m_clickObj.html(offsetVal.left+" "+leftP);
        	
        	if(m_mouseState!='down')
        	{
        		if(offsetVal.left<event.pageX && event.pageX<offsetVal.left+tick)
        			m_clickObj.css('cursor','e-resize');
        		else if(offsetVal.left+widthP>event.pageX && event.pageX>offsetVal.left+widthP-tick)
        			m_clickObj.css('cursor','w-resize');
        		else if(offsetVal.top<event.pageY && event.pageY<offsetVal.top+tick)
        			m_clickObj.css('cursor','n-resize');
        		else if(offsetVal.top+heightP>event.pageY && event.pageY>offsetVal.top+heightP-tick)
        			m_clickObj.css('cursor','s-resize');
        		else
        			m_clickObj.css('cursor','move');
        	}
        	
        	if(m_mouseState=='down' && m_clickObj.css('cursor')=="move")
        	{
        		var offsetVal=m_clickObj.offset();
        		offsetVal.left=event.pageX;
        		offsetVal.top=event.pageY;
        		m_clickObj.offset(offsetVal);
        		//m_clickObj.css("left",event.pageX +"px");
        		//m_clickObj.css("top",event.pageY+"px");
        		//m_clickObj.css("position","absolute");
        	}
        	else if(m_mouseState=='down' && m_clickObj.css('cursor')=="e-resize")
        	{
        		var offsetVal=m_clickObj.offset();
        		offsetVal.left=event.pageX;
        		m_clickObj.offset(offsetVal);
        	
        		var rSize=m_saveX-event.pageX;
        		m_clickObj.css("width",rSize+m_beforeWidth);
        	}
        	else if(m_mouseState=='down' && m_clickObj.css('cursor')=="n-resize")
        	{
        		var offsetVal=m_clickObj.offset();
        		offsetVal.top=event.pageY;
        		m_clickObj.offset(offsetVal);
        	
        		var rSize=m_saveY-event.pageY;
        		m_clickObj.css("height",rSize+m_beforeHeight);
        	}
        	else if(m_mouseState=='down' && m_clickObj.css('cursor')=="w-resize")
        	{
        		var rSize=event.pageX-m_saveX;
        		m_clickObj.css("width",rSize+m_beforeWidth);
        	}
        	else if(m_mouseState=='down' && m_clickObj.css('cursor')=="s-resize")
        	{
        		var rSize=event.pageY-m_saveY;
        		m_clickObj.css("height",rSize+m_beforeHeight);
        	}
        	
   		}
    	
    	

    	
    });

    $( this ).mousedown(function (event)
    {
    	if(m_state!="")
    	{
    		if(m_mouseState!='down')
   			{
    			m_saveX=event.pageX;
        		m_saveY=event.pageY;
        	
        		m_beforeWidth=StrToInt(m_clickObj.css("width"));
        		m_beforeHeight=StrToInt(m_clickObj.css("height"));
   			}
    		m_mouseState='down';
    	}
    	
    });
    $( this ).mouseup(function (event)
    {
    	if(m_clickObj!=null)
    		m_clickObj.css('cursor','auto');
    	if(m_state!="")
    		m_mouseState='up';
    		
    });

    
    function ResetObject()
    {
    	if(m_clickObj==null)
    		return;
    	m_clickObj.css('cursor','auto');
    	m_clickObj.attr('draggable','false');
    	OutlineSet(m_clickObj,"0px","none","red");
    	m_mouseState=null;
    	m_clickObj=null;
		m_state="";
    }
    
    function StateChange(_state)
    {
    	
    	m_state=_state;
    	if(_state=='ObjectMove')
    	{
    		m_clickObj.attr('draggable','false');
    	}
    	else if(_state=='LayoutMove')
    	{
    		m_clickObj.attr('draggable','true');
    	}
    	OutlineSet(m_clickObj,'1px','dashed','red');
    	
    }
    function StrToInt(_obj)
    {
    	_obj=_obj.replace("px","");
    	if(_obj=="auto")
    		_obj=0;
    	_obj*=1;
    	return _obj; 
    }
    var m_save=null;
    function OutlineSet(_obj,_px,_type,_color)
	{
    	if(m_save==null)
    	{
    		m_save=_obj[0].style;
    		_obj.css('border',_px+' '+_type+' '+_color);
    	}
    	else if(_type=='none')
    	{
    		//var offset=_obj.offset();
    		//var width=_obj.css("widht");
    		//var height=_obj.css("height");
    		
    		//_obj[0].style=m_save;
    		//_obj.offset(offset);
    		//_obj.css("widht",width);
    		//_obj.css("height",height);
    		//_obj.css('position',"");
    		//_obj.css('border',_px+' '+_type+' '+_color);
    		_obj.css('border','');
    	}
    	else
    		_obj.css('border',_px+' '+_type+' '+_color);
    	
	}

    $.fn.DragStart = function (event) 
    {
    	if(m_state!="LayoutMove")
    		return;
    	event.dataTransfer.setData("Text", event.target.id);
    }
    $.fn.AllowDrop = function (event) 
    {
        event.preventDefault();
    }
    $.fn.Drop = function (event) 
    {
        event.preventDefault();
        var data = event.dataTransfer.getData("Text");
    	if(event.target.id==null || event.target.id=="")
    	{
    		return;
    	}

        event.target.appendChild(document.getElementById(data));
      
        if(m_callBack!=null)
        	m_callBack(event.target.id,data);
    }
}( jQuery ));