function CInput() 
{
	this.m_mobile=false;
	this.m_mouseX=0;
	this.m_mouseY=0;
	
	
	this.m_dragClick=false;
	this.m_dragX=-1;
	this.m_dragY=-1;
	
	this.m_mouseLPress=false;
	this.m_mouseClick=false;
	
	this.m_clickCount=0;
	this.m_key=new Array(128);
	
	this.m_touchCount=0;
	this.m_touchX=new Array(5);
	this.m_touchY=new Array(5);
	this.m_mobileBtn=false;
	
	this.m_pressVec=new CVec3();
	this.m_aButton=false
	this.m_bButton=false
}
CInput.prototype.Update=function(_ani)
{
	
	if(this.m_mouseLPress==true)
	{
		this.m_clickCount=1;
		if(this.m_dragX==-1)
		{
			this.m_dragX=this.m_mouseX;
			this.m_dragY=this.m_mouseY;
		}
	}
	else if(this.m_mouseLPress==false && this.m_clickCount==1)
	{
		
		if(this.m_mobileBtn==false)
		{
			if(this.m_mobile)
			{
				
				this.m_mouseClick=true;
			}
			else
			{
				if(Math.abs(this.m_dragX-this.m_mouseX)<3 || Math.abs(this.m_dragY-this.m_mouseY)<3)
				{
					
					this.m_mouseClick=true;
					this.m_dragX=-1;
					this.m_dragY=-1;
				}
				else
					this.m_dragClick=true;
			}
			
		}
		//ChatAdd("m_mobileBtn"+this.m_mobileBtn+"/"+this.m_mouseClick);
		
		this.m_mobileBtn=false;
		this.m_clickCount=0;
	}
	if(this.m_mobile && this.m_touchCount==0)
	{
		this.m_mouseLPress=false;
	}
}
CInput.prototype.Reset=function()
{
	//ChatAdd("m_mouseClick1");
	if(this.m_mouseClick)
	{
		this.m_mouseClick=false;
		
	}
		
	else if(this.m_dragClick)
	{
		this.m_dragClick=false;
		this.m_dragX=-1;
		this.m_dragY=-1;
	}
	
}
//CInput.prototype.constructor	=CInput;
//instanceof클래스명 확인 tydefof 생성 형태 확인