(function ( $ ) 
{
	var m_objArr=new Array();
	var m_camera;
	var m_canvas;
	var m_ctx;
	var m_input=new CInput();
	var m_jqCanvas;
	var m_mobileBtn=new Array();
	var m_fow=null;
	var m_syn=new Array();
	var m_joy=new CVec3();
	$.fn.JoyModeChange=function()
	{
		if(m_joy!=null)
			m_joy=null;
		else
			m_joy=new CVec3();
	}
	$.fn.Get_Syn=function()
	{
		return m_syn;
	}
	$.fn.Push_Syn=function(_key)
	{
		for(var i=0;i<m_syn.length;++i)
		{
			if(m_syn[i][0]==_key)
				return;
		}
		m_syn.push(new Array(_key,0));
	}
	$.fn.Remove_Syn=function(_key)
	{
		for(var i=0;i<m_syn.length;++i)
		{
			if(m_syn[i][0]==_key)
			{
				m_syn.splice(i,1);
				return;
			}
		}
	}
	$.fn.Get_Canvas=function()
	{
		return m_canvas;
	}	
	$.fn.Set_Fow=function(_enable)
	{
		if(_enable)
		{
			m_fow=new CFOW();
			m_fow.Init(m_ctx);
		}
			
		else
			m_fow=null;
	}
	
	$.fn.Get_Ctx=function()
	{
		return m_ctx;
	}
	$.fn.Get_Camera=function()
	{
		return m_camera;
	}
	$.fn.Get_CInput=function()
	{
		return m_input;
	}
	$.fn.Get_CamToMouse=function(_pt)
	{
		
		var pt=new CVec3(m_input.m_mouseX,m_input.m_mouseY);
		if(typeof _pt !== 'undefined')
			pt=_pt;
		var invM=MatInvert(m_camera.m_mat);
		pt=MatToVec3Coordinate(invM,pt);

		return pt;
	}
	$.fn.CanvasResize = function (_width,_height)
	{
		m_canvas.clientWidth=_width;
	    m_canvas.width=_width;
	    
	    m_canvas.clientHeight=_height;
	    m_canvas.height=_height;
	}
	$.fn.Init = function (_id,_fullMode)
	{   
		m_canvas = document.getElementById(_id);
		
		if(_fullMode)
		{
			m_canvas.clientWidth=$(window).width();
		    m_canvas.width=$(window).width();
		    
		    m_canvas.clientHeight=$(window).height();
		    m_canvas.height=$(window).height();
		    
		    //alert("width : "+$(window).width()+" "+"height : "+$(window).height());
		}
		
		
		
		if (m_canvas == null || m_canvas.getContext == null) return;
		m_ctx = m_canvas.getContext("2d");
		this.CameraInit();
		m_jqCanvas=$(_id);
		$(this).Set_CameraPos(new CVec3(m_canvas.width/2,m_canvas.height/2),new CVec3(1,1,1));

		$(document).keydown(function(key)
		{
			
			if(key.keyCode>128)
			{
				//alert("error : 2016.07.06");
				return;
			}
			m_input.m_key[key.keyCode]=true;
			//m_input.Update();
		});
		$(document).keyup(function(key)
		{
		
			if(key.keyCode>128)
			{
				//alert("error : 2016.07.06");
				return;
			}
			m_input.m_key[key.keyCode]=false;
			//m_input.Update();
		});
		
		
		m_mobileBtn.push($("skill0Btn").Get_CObject(new CObject()));//0
		m_mobileBtn.push($("skill1Btn").Get_CObject(new CObject()));
		m_mobileBtn.push($("skill2Btn").Get_CObject(new CObject()));
		m_mobileBtn.push($("attackBtn").Get_CObject(new CObject()));//3
		
		m_mobileBtn.push($("skill0DelBtn").Get_CObject(new CObject()));
		m_mobileBtn.push($("skill1DelBtn").Get_CObject(new CObject()));
		m_mobileBtn.push($("skill2DelBtn").Get_CObject(new CObject()));
		for(var i=0;i<7;++i)
		{
			m_mobileBtn[i].NewCBoundBox(new CVec3(80,80));
			m_mobileBtn[i].Set_Position(new CVec3(0,0,2));
			m_mobileBtn[i].Set_DrawColor("rgba(255,255,255,0.3)");
		}
		m_mobileBtn[0].Set_DrawColor("img/crosshairs/user/skill1.png");
		m_mobileBtn[1].Set_DrawColor("img/crosshairs/user/skill2.png");
		m_mobileBtn[2].Set_DrawColor("img/crosshairs/user/skill3.png");
		m_mobileBtn[3].Set_DrawColor("img/crosshairs/user/find.png");
		m_mobileBtn[4].Set_Alpha(0);
		m_mobileBtn[5].Set_Alpha(0);
		m_mobileBtn[6].Set_Alpha(0);
		
		
		//========================================
		var userAg=navigator.userAgent;
		if(userAg.indexOf("iPhone")!=-1 || userAg.indexOf("Android")!=-1)
		{
			m_input.m_mobile=true;
			
			m_mobileBtn.push($("spaceBtn").Get_CObject(new CObject()));//4
			m_mobileBtn.push($("moveBtn").Get_CObject(new CObject()));//5
			
			
			
		
			m_mobileBtn[7].Set_DrawColor("img/crosshairs/user/space.png");
			m_mobileBtn[7].NewCBoundBox(new CVec3(80,80));
			m_mobileBtn[7].Set_Position(new CVec3(0,0,2));
			
			
			m_mobileBtn[8].NewCBoundBox(new CVec3(150,150));
			m_mobileBtn[8].Set_Position(new CVec3(128,128,2));
			m_mobileBtn[8].Set_DrawColor("img/crosshairs/user/move.png");
			m_mobileBtn[8].m_alpha=0.5;
			
			
			
			
			
			m_jqCanvas.touchstart(function(event)
			{
				var e = event.originalEvent; 
				//$("#explanation").html("touchstart"+e.targetTouches.length);
				
				m_input.m_touchCount=e.targetTouches.length;
				for(var i=0;i<m_input.m_touchCount;++i)
				{
					
					m_input.m_touchX[i] = e.targetTouches[i].pageX- e.target.offsetLeft; 
					m_input.m_touchY[i] = e.targetTouches[i].pageY- e.target.offsetTop; 
					
					
					m_input.m_mouseX=m_input.m_touchX[i];
					m_input.m_mouseY=m_input.m_touchY[i];
					m_input.m_mouseLPress=true;
					
				}
				
				
			});
			m_jqCanvas.touchmove(function(event)
			{
				
				event.preventDefault(); 
				event.stopPropagation();
				var e = event.originalEvent; 
				m_input.m_touchCount=e.targetTouches.length;
				for(var i=0;i<m_input.m_touchCount;++i)
				{
					m_input.m_touchX[i] = e.targetTouches[i].pageX- e.target.offsetLeft; 
					m_input.m_touchY[i] = e.targetTouches[i].pageY- e.target.offsetTop;
					m_input.m_mouseX=m_input.m_touchX[i];
					m_input.m_mouseY=m_input.m_touchY[i];
				}
			
			});
			m_jqCanvas.touchend(function(event)
			{
				var e = event.originalEvent; 
				
				event.preventDefault(); 
				event.stopPropagation();
				//ChatAdd("touchend");
			
				m_input.m_touchCount=e.targetTouches.length;
				for(var i=0;i<m_input.m_touchCount;++i)
				{
					
					m_input.m_touchX[i] = e.targetTouches[i].pageX- e.target.offsetLeft; 
					m_input.m_touchY[i] = e.targetTouches[i].pageY- e.target.offsetTop;
					
				}
				
			});
		}
		if(m_input.m_mobile==false)
		{
			m_jqCanvas.mousemove(function(e)
			{
				
				m_input.m_mouseX=e.offsetX;
				m_input.m_mouseY=e.offsetY;
				//m_input.Update();
			});

			m_jqCanvas.mousedown(function(e) 
			{
				
				m_input.m_mouseLPress=true;
				//m_input.m_mouseX= e.pageX - e.target.offsetLeft;
				//m_input.m_mouseY= e.pageY - e.target.offsetTop;
				m_input.m_mouseX=e.offsetX;
				m_input.m_mouseY=e.offsetY;
				//m_input.Update();
			    
			});
			m_jqCanvas.mouseup(function(e) 
			{
				
				m_input.m_mouseLPress=false;
				m_input.m_mouseX=e.offsetX;
				m_input.m_mouseY=e.offsetY;
				//m_input.Update();
			});
		}
		
		
			
		
	}
	$.fn.CameraInit= function ()
	{
		m_camera=$("cam").Get_CObject(new CObject());
		m_camera.NewCBoundBox(new CVec3());
		m_camera.Set_Position(new CVec3(0,0,0));
	}
	$.fn.Set_CameraPos = function (_pos,_sca)
	{
		
		var width=m_ctx.canvas.width;
		var height=m_ctx.canvas.height;
		
		m_camera.m_pos=_pos;
		m_camera.m_sca=_sca;
		var rotMat=MatAxisToRotation(new CVec3(0,0,1),m_camera.m_rot.y);
		var scaMat=MatScale(m_camera.m_sca);
		m_camera.m_mat=MatMuliplication(scaMat,rotMat);
		//인트로 안하면 픽셀이 오차가 난다
		m_camera.m_mat.arr[3][0]=parseInt(m_camera.m_pos.x-(width/2)*m_camera.m_sca.x);
		m_camera.m_mat.arr[3][1]=parseInt(m_camera.m_pos.y-(height/2)*m_camera.m_sca.y);
		m_camera.m_mat.arr[3][2]=m_camera.m_pos.z;
		m_camera.m_mat=MatInvert(m_camera.m_mat);
		if(_sca.x!=1)
		{
			for(var i=0;i<6;++i)
			{
				m_mobileBtn[i].Set_Scale(_sca);
			}
		}
		
		
	}
	$.fn.Get_CameraPos = function ()
	{
		return m_camera.Get_Position();
	}
	$.fn.InObjectChk=function()
	{
		var dummy=null;
		for(var i=0;i<m_objArr.length;++i)
		{
			if(m_objArr[i].Get_Key()==$(this).selector)
				dummy=m_objArr[i];
		}
		if(dummy==null)
			return false;
		return true;
	}
	$.fn.Get_CObject = function (_type)
	{
		
		var dummy=null;
		for(var i=0;i<m_objArr.length;++i)
		{
			if(m_objArr[i].Get_Key()==$(this).selector)
				dummy=m_objArr[i];
		}
		if(dummy==null)
		{
			dummy=_type;	
			dummy.Init();
			dummy.Set_Key($(this).selector);
			m_objArr.push(dummy);
		}
		
		return dummy;
	}
	$.fn.Set_CObject = function (_obj)
	{
		for(var i=0;i<m_objArr.length;++i)
		{
			if(m_objArr[i].Get_Key()==$(this).selector)
			{
				//alert("2016.09.01 이미 있습니다["+m_objArr[i].Get_Key());
				$(this).Push_Syn($(this).selector,$(this).selector);
				return;
			}
		}
		_obj.Set_Key($(this).selector);
		m_objArr.push(_obj);
	}
	
	$.fn.Get_CObjcetArr= function ()
	{
		return m_objArr;
	}
	$.fn.AllDraw=function ()
	{
		if(m_ctx=='undefined' || m_ctx==null || m_canvas=='undefined' || m_canvas==null)
			alert("2016.03.20:초기화 null");
		m_ctx.clearRect(0, 0, m_canvas.width, m_canvas.height);
		
		
		var camPos=m_camera.Get_Position();

		var width=m_ctx.canvas.width/2;
		var height=m_ctx.canvas.height/2;
		var left=camPos.x-width*m_camera.m_sca.x;
		var right=camPos.x+width*m_camera.m_sca.x;
		var top=camPos.y-height*m_camera.m_sca.y;
		var bottom=camPos.y+height*m_camera.m_sca.y;


		for(var i=0;i<m_objArr.length;i++)
		{
			//화면 안만
			var pos=m_objArr[i].Get_Position();
			var rad=m_objArr[i].m_bound.Get_Radius();
			if(left-rad<=pos.x && pos.x<=right+rad && 
					top-rad<=pos.y && pos.y<=bottom+rad)
			{
				if(m_objArr[i].m_show)
					m_objArr[i].Draw(m_ctx,m_camera);
			}
				
		}
		if(m_fow!=null)
			m_fow.Draw(m_ctx,m_camera);
		
	}
	$.fn.MobileUpdate=function(_first)
	{
		
		
		for(var i=0;i<128;++i)
			m_input.m_key[i]=false;
		
		if(m_input.m_touchCount==0 && m_joy!=null)
			m_joy=new CVec3(3000);
		for(var i=0;i<m_input.m_touchCount;++i)
		{
			var pt=this.Get_CamToMouse(new CVec3(m_input.m_touchX[i],m_input.m_touchY[i]));
			
			
				
			
			
			if(m_mobileBtn[0].Pick(pt))
			{
				m_input.m_key[87]=true;
				m_input.m_mobileBtn=true;
			}
			if(m_mobileBtn[1].Pick(pt))
			{
				m_input.m_key[69]=true;
				m_input.m_mobileBtn=true;
			}
			if(m_mobileBtn[2].Pick(pt))
			{
				m_input.m_key[82]=true;
				m_input.m_mobileBtn=true;
			}
			if(m_mobileBtn[3].Pick(pt))
			{
				m_input.m_key[65]=true;
			}	
			if(m_mobileBtn[7].Pick(pt))
			{	
				//ChatAdd("4");
				m_input.m_key[32]=true;
				m_input.m_mobileBtn=true;
			}
			if(m_input.m_mobileBtn==false && _first && m_joy!=null)
			{
				m_joy=new CVec3(pt.x,pt.y,0);
				var camPos=m_camera.Get_Position();
				camPos.z=0;
				m_joy=Vec3MinusVec3(m_joy,camPos);
				
				//m_mobileBtn[8].Set_Position();
			}
			
			if(m_mobileBtn[8].Pick(pt))
			{
				if(m_mobileBtn[8].m_pos.x>pt.x+20)
				{
					m_input.m_key[37]=true;
					
				}
				if(m_mobileBtn[8].m_pos.x<pt.x-20)
				{
					m_input.m_key[39]=true;
					
				}
				if(m_mobileBtn[8].m_pos.y>pt.y+20)
				{
					m_input.m_key[38]=true;
					
				}
				if(m_mobileBtn[8].m_pos.y<pt.y-20)
				{
					m_input.m_key[40]=true;
				}
				m_input.m_mobileBtn=true;
			}//move
			
		}
	}
	$.fn.AllUpdate=function (_time)
	{
		m_input.Reset();
		m_input.Update();
		var camPos=m_camera.Get_Position();

		var width=m_ctx.canvas.width/2;
		var height=m_ctx.canvas.height/2;
		var left=camPos.x-width*m_camera.m_sca.x;
		var right=camPos.x+width*m_camera.m_sca.x;
		var top=camPos.y-height*m_camera.m_sca.y;
		var bottom=camPos.y+height*m_camera.m_sca.y;
		
		
		var removeKey=new Array();
		for(var i=0;i<m_objArr.length;i++)
		{
			m_objArr[i].Update(_time);
			if(m_objArr[i].m_remove)
			{
				removeKey.push(m_objArr[i].m_key);
			}
		}
		for(var j=0;j<removeKey.length;j++)
		{
			for(var i=0;i<m_objArr.length;i++)
			{
				if(removeKey[j]==m_objArr[i].m_key)
				{
					$(m_objArr[i].m_key).remove();
					m_objArr.splice(i,1);
					break;
				}
			}
		}
		
		
		//var camPos=m_camera.Get_Position();
		//var obj3=$("move").Get_CObject();
		//obj3.Set_Position(new CVec3(64+camPos.x,480-64+camPos.y,100));
		var camPos=m_camera.Get_Position();
		width=m_ctx.canvas.width;
		height=m_ctx.canvas.height;
		
		m_mobileBtn[0].Set_Position(new CVec3(camPos.x+(width/2)*m_camera.m_sca.x-40,camPos.y-height*0.2*m_camera.m_sca.y,1.1));
		m_mobileBtn[1].Set_Position(new CVec3(camPos.x+(width/2)*m_camera.m_sca.x-40,camPos.y,1.1));
		m_mobileBtn[2].Set_Position(new CVec3(camPos.x+(width/2)*m_camera.m_sca.x-40,camPos.y+height*0.2*m_camera.m_sca.y,1.1));
		m_mobileBtn[3].Set_Position(new CVec3(40+camPos.x-(width/2)*m_camera.m_sca.x,camPos.y+height*0.4*m_camera.m_sca.y,1.1));
		
		m_mobileBtn[4].Set_Position(new CVec3(camPos.x+(width/2)*m_camera.m_sca.x-40,camPos.y-height*0.2*m_camera.m_sca.y,1.1));
		m_mobileBtn[5].Set_Position(new CVec3(camPos.x+(width/2)*m_camera.m_sca.x-40,camPos.y,1.1));
		m_mobileBtn[6].Set_Position(new CVec3(camPos.x+(width/2)*m_camera.m_sca.x-40,camPos.y+height*0.2*m_camera.m_sca.y,1.1));
		
		if(m_input.m_mobile)
		{
			m_mobileBtn[7].Set_Position(new CVec3(camPos.x+(width/2)*m_camera.m_sca.x-40,camPos.y+height*0.4*m_camera.m_sca.y,1.1));
			if(m_joy!=null)
			{
				var pos=Vec3PlusVec3(m_joy,camPos);
				pos.z=1.1;
				m_mobileBtn[8].Set_Position(pos);//r
			}
			else
				m_mobileBtn[8].Set_Position(new CVec3(85+camPos.x-(width/2)*m_camera.m_sca.x,camPos.y,1.1));//r

		}//mob
	
	}
	$.fn.ObjectRemove=function(_name)
	{
		for(var i=0;i<m_objArr.length;i++)
		{
			if(_name==m_objArr[i].m_key)
			{
				$(m_objArr[i].m_key).remove();
				m_objArr.splice(i,1);
				break;
			}
		}
	}
	
	$.fn.DepthSort=function ()
	{
		
		for(var i=0;i<m_objArr.length-1;i++)
		{
			
			for(var j=0;j<m_objArr.length-i-1;j++)
			{
				var posA=m_objArr[j].Get_Position();
				var posB=m_objArr[j+1].Get_Position();
				
				if(posA.z>posB.z)
				{
					var dummy=m_objArr[j];
					m_objArr[j]=m_objArr[j+1];
					m_objArr[j+1]=dummy;
					//var removed = m_objArr.splice(i, 0, 'drum');
				}
			}
			
		}
		//for(var i=0;i<m_objArr.length;i++)
		{
		//	alert(m_objArr[i].Get_Key());
		}
		/*
		var logText="";
		for(var i=0;i<m_objArr.length;i++)
		{
			var posA=m_objArr[i].Get_Position();
			logText+=m_objArr[i].m_key+":"+posA.z;
			logText+=" ";
		}
		$("logText").html(logText);
		*/
	}
	var m_beforeTime=0;
	$.fn.Get_Delay=function()
	{
		var d = new Date();
		if(m_beforeTime==0)
		{
			m_beforeTime=d.getTime();
			return 1;
		}
			
		
		var delay=d.getTime()-m_beforeTime;
		m_beforeTime=d.getTime();
		return delay;
	}
	var m_frame=0;
	var m_cacFrame=0;
	var m_frameTime=0;
	$.fn.Get_Frame=function()
	{
		return m_frame;
	}
	$.fn.Cac_Frame=function(_delay)
	{
		if(m_frameTime>1000)
		{
			m_frame=m_cacFrame;
			m_cacFrame=0;
			m_frameTime=0;
			return true;
		}

		m_cacFrame++;
		m_frameTime+=_delay;
		
		return false;
	}
	
}( jQuery ));