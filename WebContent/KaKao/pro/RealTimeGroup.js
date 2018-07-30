const d_G_Z=-1;
const d_G_U=1;
const d_G_D=2;

const d_T_Z=0;
const d_T_U=2;
const d_T_D=3;

const d_S_Setting=0;
const d_S_Wait=1;
const d_S_MyTurn=2;
const d_S_YouTurn=3;

var g_width;
var g_height;
var g_myGroup=0;
var g_myPiece=new Array();
var g_youPiece=new Array();
var g_sell=new Array();
var g_deathPiece=new Array();
var g_state=0;

var g_selectPiece=null;
var d_XMAX=6;
var d_YMAX=9;
var g_time=0;
var g_maxTime=0;
var g_moveLock=false;
var g_block=64;
var g_tick=50;
function CPiece()
{
	this.m_x=0;
	this.m_y=0;
	this.m_type;
	this.m_group;
	this.m_secret=1;
	this.m_death;
}
CPiece.prototype=new CObject();	
CPiece.prototype.constructor=CPiece;
CPiece.prototype.Init=function(_x,_y,_group,_type)
{
	this.m_x=_x;
	this.m_y=_y;
	this.m_group=_group;
	this.m_type=_type;
	this.m_secret=1;
	
	
	//CObject.prototype.Init.call(this);
	this.NewCBoundBox(new CVec3(g_tick,g_tick));
}
CPiece.prototype.Reset=function()
{
	var char="f";
	if(this.m_group==d_G_D)
		char="l";
	
	var state="basic";
	
	if(this.m_secret==0)
	{
		this.Set_DrawColor("img/Group/sor/"+state+"/"+char+"/"+this.m_type+".png");
	}
	else
	{
		if(this.m_group==g_myGroup)
		{
			this.Set_DrawColor("img/Group/sor/"+state+"/"+char+"/"+this.m_type+".png");
		}
		else
			this.Set_DrawColor("img/Group/sor/"+state+"/"+char+"/s.png");
	}

}
function CSell()
{
	this.m_x=0;
	this.m_y=0;
	this.m_piece=null;
}
CSell.prototype=new CObject();	
CSell.prototype.constructor=CSell;
CSell.prototype.Init=function(_x,_y)
{
	//CObject.prototype.Init.call(this);
	this.m_x=_x;
	this.m_y=_y;
	
	this.NewCBoundBox(new CVec3(g_tick,g_tick));
	this.m_show=true;
}

function CanvasReset()
{

	g_width=$(window).width();
	g_height=$(window).height();
	g_height-=g_block;

	$(document).CanvasResize(g_width,g_height);
	$(document).Set_CameraPos(new CVec3(g_width/2,g_height/2),new CVec3(1,1,1));

}
$(window).on('resize', function()
{
	//$('#canvas').css('width', $(window).width()); 
    //$('#canvas').css('height', $(window).height()); 
    //$(document).CanvasResize($(window).width(),$(window).height());
});
function WinChk()
{
	
	
}
function PiecePosSet(x,y)
{
	
	
	return new CVec3(x*(g_tick)+g_width*0.5-150+g_tick/2,y*(g_tick)+g_height*0.5-(g_tick*9)*0.5+g_tick/2,d_zPlayer);
}
function DeathSet(_piece)
{

	if(_piece.m_group==g_myGroup && _piece.m_type<11)
	{
		
		if(_piece.m_group==d_G_D)
			g_deathPiece[_piece.m_type].Set_DrawColor("img/Group/sor/death/l/"+_piece.m_type+".png");
		else
			g_deathPiece[_piece.m_type].Set_DrawColor("img/Group/sor/death/f/"+_piece.m_type+".png");
	}
}
function Packet(_packet)
{
	$(window).DepthSort();
	if(_packet.name=="First")
	{
		for(var i=1;i<_packet.value.length;++i)
		{
			var pac1=new CPacket();
			pac1.Deserialize(_packet.value[i]);
			var x=Number(pac1.value[1]);
			var y=Number(pac1.value[2]);
			
			obj=$(_packet.value[0]+"p"+i).Get_CObject(new CPiece());
			obj.Init(x,y,Number(_packet.value[0]),Number(pac1.value[0]));
			obj.Set_Position(PiecePosSet(x,y));
			obj.Reset();
			var sell=$("sell"+y+"-"+x).Get_CObject(new CSell());
			sell.m_piece=obj;
			
			if(g_myGroup==Number(_packet.value[0]))
				g_myPiece.push(obj);
			else
				g_youPiece.push(obj);
			
		}
		if(g_myPiece.length!=0 && g_youPiece.length==0)
		{
			var obj=$("msg").Get_CObject(new CObject());
			obj.Set_DrawColor("fillText:RN"+"상대가 세팅 중 입니다");
			g_state=d_S_Wait;
		}
		else if(g_myPiece.length==0 && g_youPiece.length!=0)
		{
			var obj=$("msg").Get_CObject(new CObject());
			obj.Set_DrawColor("fillText:RN"+"왕을 세팅해 주세요!");
		}
		else if(g_myPiece.length!=0 && g_youPiece.length!=0)
		{
			var obj=$("msg").Get_CObject(new CObject());
			
			if(g_myGroup==d_G_U)
			{
				g_state=d_S_MyTurn;
				obj.Set_DrawColor("fillText:RN"+"제 턴 입니다");
			}
			else
			{
				g_state=d_S_YouTurn;
				obj.Set_DrawColor("fillText:RN"+"상대 턴 입니다");
			}
				
		}
	}
	else if(_packet.name=="PieceMove")
	{
		
		var movesell=$(_packet.value[2]).Get_CObject(new CSell());
		var pi=$(_packet.value[1]).Get_CObject(new CPiece());
		var pstsell=$("sell"+pi.m_y+"-"+pi.m_x).Get_CObject(new CSell());
		pstsell.m_piece=null;
		movesell.m_piece=pi;
		pi.Set_Position(PiecePosSet(movesell.m_x,movesell.m_y));
		pi.m_x=movesell.m_x;
		pi.m_y=movesell.m_y;
		
		var obj=$("msg").Get_CObject(new CObject());
		
		if(g_state==d_S_MyTurn)
		{
			g_state=d_S_YouTurn;
			obj.Set_DrawColor("fillText:RN"+"상대 턴 입니다");
		}
		else
		{
			g_state=d_S_MyTurn;
			obj.Set_DrawColor("fillText:RN"+"제 턴 입니다");
		}
		var sel=pi.m_x+pi.m_y*d_XMAX;
		var remArr=new Array();
		if(pi.m_x>0)
			remArr.push({"rem":Battle(g_sell[sel-1].m_piece,g_sell[sel].m_piece),"a":sel-1,"b":sel});
		if(pi.m_y>0)
			remArr.push({"rem":Battle(g_sell[sel-d_XMAX].m_piece,g_sell[sel].m_piece),"a":sel-d_XMAX,"b":sel});
		if(pi.m_x<d_XMAX-1)
			remArr.push({"rem":Battle(g_sell[sel+1].m_piece,g_sell[sel].m_piece),"a":sel+1,"b":sel});
		if(pi.m_y<d_YMAX-1)
			remArr.push({"rem":Battle(g_sell[sel+d_XMAX].m_piece,g_sell[sel].m_piece),"a":sel+d_XMAX,"b":sel});
			
		
		for(var j=0;j<remArr.length;++j)
		{

			if(remArr[j].rem==1)
			{
				DeathSet(g_sell[remArr[j].a].m_piece);
				g_sell[remArr[j].a].m_piece.m_death=true;
				g_sell[remArr[j].a].m_piece.m_show=false;
				g_sell[remArr[j].a].m_piece=null;
				
			}
				
			else if(remArr[j].rem==2)
			{
				DeathSet(g_sell[remArr[j].b].m_piece);
				g_sell[remArr[j].b].m_piece.m_death=true;
				g_sell[remArr[j].b].m_piece.m_show=false;
				g_sell[remArr[j].b].m_piece=null;
			}
				
			else if(remArr[j].rem==3)
			{
				DeathSet(g_sell[remArr[j].a].m_piece);
				DeathSet(g_sell[remArr[j].b].m_piece);
				g_sell[remArr[j].a].m_piece.m_death=true;
				g_sell[remArr[j].a].m_piece.m_show=false;
				g_sell[remArr[j].a].m_piece=null;
				g_sell[remArr[j].b].m_piece.m_death=true;
				g_sell[remArr[j].b].m_piece.m_show=false;
				g_sell[remArr[j].b].m_piece=null;
			}
		}
		WinChk();
		
	}
	
}
function FirstPiece(_sell)
{
	
	if(g_myGroup==d_G_U)
	{
		if(_sell.m_y<3)
		{
		
		}
		else
			return;
	}
	else if(g_myGroup==d_G_D)
	{
		if(_sell.m_y>=6)
		{
		
		}
		else
			return;
	}//1
	
	
	g_moveLock=true;
	var pac=new CPacket();
	pac.name="First";
	pac.Push(g_myGroup);
	
	var pac1=new CPacket();
	pac1.Push(14);
	pac1.Push(_sell.m_x);
	pac1.Push(_sell.m_y);
	pac.Push(pac1);
	
	var sorArr=new Array();
	
	sorArr.push(_sell.m_x+"/"+_sell.m_y);
	for(var i=1;i<14;++i)
	{
		while(true)
		{
			var randY;
			var randX=parseInt(Math.random()*d_XMAX);
			
			
			if(g_myGroup==d_G_U)
				randY=parseInt(Math.random()*3);
			else
				randY=parseInt(Math.random()*3+d_YMAX-3);
			for(var j=0;j<sorArr.length;++j)
			{
				if(sorArr[j]==randX+"/"+randY)
				{
					randX=-1;
				}
			}
			if(randX!=-1)
			{

				var pac1=new CPacket();
				pac1.Push(i);
				pac1.Push(randX);
				pac1.Push(randY);
				pac.Push(pac1);
				
				sorArr.push(randX+"/"+randY);
				break;
			}
		}
		
	}
	
	
	
	
	var data = {
			'user': uid,
			'name': name,
			'room': room,
			'data':pac.Serialize(),
			
		};
	game.emit('piece move', data);
	
}
function PieceMove(_piece,_sell)
{

	g_moveLock=true;
	var pac=new CPacket();
	pac.name="PieceMove";
	pac.Push(g_myGroup);
	pac.Push(_piece.m_key);
	pac.Push(_sell.m_key);
	
	var data = {
			'user': uid,
			'name': name,
			'room': room,
			'data':pac.Serialize(),	
	};
	
	game.emit('piece move', data);
}
function GameInit()
{
	$(document).Init("canvas",false);
	$(document).Set_Fow(false);
	CanvasReset();
	var obj=null;
	g_width=$(window).width();
	g_height=$(window).height();
	g_height-=g_block;
    var obj=$("backGround").Get_CObject(new CObject());
	obj.NewCBoundBox(new CVec3(g_width,g_height));
	obj.Set_Position(new CVec3(g_width*0.5,g_height*0.5,d_zBack));
	obj.Set_DrawColor("img/Group/background.png");

	var obj=$("inside").Get_CObject(new CObject());
	obj.NewCBoundBox(new CVec3(300,450));
	obj.Set_Position(new CVec3(g_width*0.5,g_height*0.5,d_zBack));
	obj.Set_DrawColor("img/Group/inside300_450.png");
	
	for(var y=0;y<9;++y)
	{
		for(var x=0;x<6;++x)
		{
			var obj=$("sell"+y+"-"+x).Get_CObject(new CSell());
			obj.Init(x,y);
			obj.Set_Position(PiecePosSet(x,y),0);
			obj.Set_DrawColor("rgba(0,0,0,0.5)");
			g_sell.push(obj);
			//obj.Reset();
		}
	}
	var off=0;
	for(var y=0;y<2;++y)
	{
		for(var x=0;x<6;++x)
		{
			obj=$("death"+off).Get_CObject(new CObject());
			off++;
			obj.Init();
			obj.NewCBoundBox(new CVec3(g_tick,g_tick));
			obj.Set_Position(new CVec3(x*(g_tick)+g_width*0.5-(g_tick*3)+g_tick/2,y*(g_tick)+g_tick/2,d_zPlayer));
			obj.Set_DrawColor("rgba(0,0,0,0.0)");
			g_deathPiece.push(obj);
		}	
	}
	

	
	var obj=$("death").Get_CObject(new CObject());
	obj.NewCBoundBox(new CVec3(g_width,64));
	obj.Set_Position(new CVec3(g_width*0.5,32,d_zMap));
	obj.Set_DrawColor("img/Group/death.png");
	
	var obj=$("msg").Get_CObject(new CObject());
	obj.NewCBoundBox(new CVec3(g_width,g_height));
	obj.Set_Position(new CVec3(g_width*0.5,g_height*0.5,d_zEffect));
	//obj.Set_DrawColor("fillText:RN"+"test");
	
	setInterval(RealTime, 0);

}

function SorInit()
{
	if(uid.hashCode()<euid.hashCode())
	{

		var obj=$("msg").Get_CObject(new CObject());
		obj.Set_DrawColor("fillText:RN"+"위턴 왕을 세팅하세요");
		g_myGroup=d_G_U;
	}
	else
	{
		
		var obj=$("msg").Get_CObject(new CObject());
		obj.Set_DrawColor("fillText:RN"+"밑턴 왕을 세팅하세요");
		g_myGroup=d_G_D;
	}
	g_state=d_S_Setting;
	g_moveLock=false;
}
function RealTime()
{
	var pst=$(document).Get_Delay();
	
	GameSceneUpdate(pst);
}
function WinChk()
{
	var win=false;
	for(var i=0;i<g_myPiece.length;++i)
	{
		if(g_myPiece[i].m_type==14 && g_myPiece[i].m_group==d_G_U && g_myPiece[i].m_y==d_YMAX-1)
		{
			win=true;
			break;
		}
			
	}
	for(var i=0;g_youPiece.length;++i)
	{
		if(g_youPiece[i].m_type==14 && g_youPiece[i].m_death)
		{
			win=true;
			break;
		}
			
	}
	//적왕이 없거나, 내가 마지막
	if(win)
	{
		turn=0;
		var data = {
			winner: uid,
			name: name,
			room: room
		}
		game.emit('end', data);
	}
	
	
}

function Battle(_a,_b)
{
	
	var removeStr=0;
	if(_a==null || _b==null || _a.m_group==_b.m_group)
	{
		
	}
	else if(_a.m_type==11 || _a.m_type==12 || _a.m_type==13 ||
			_b.m_type==11 || _b.m_type==12 || _b.m_type==13)
	{
		removeStr=3;
	}
	else if(_a.m_type==_b.m_type)
	{
		if(_a.m_type==14 && _b.m_type==14)
			removeStr=0;
		else
			removeStr=3;
	}
	else 
	{
		_a.m_secret=0;
		_b.m_secret=0;
		_a.Reset();
		_b.Reset();
	
		var sum=_a.m_type+_b.m_type;
		if((_a.m_x==3 && _b.m_x==4) || (_a.m_x==4 && _b.m_x==3) || 
				(_a.m_x==1 && _b.m_x==2) || (_a.m_x==2 && _b.m_x==1))
		{
			if(_a.m_type>_b.m_type)
				sum=_a.m_type-_b.m_type;
			else
				sum=_b.m_type-_a.m_type;
		}
		if(_a.m_type==14 || _b.m_type==14)
		{
			
			if(_a.m_type==14)
				removeStr=1;
			else
				removeStr=2;
		}
		else if(sum>=10)
		{
			if(_a.m_type>_b.m_type)
				removeStr=2;
			else
				removeStr=1;
		}
		else
		{
			if(_a.m_type<_b.m_type)
				removeStr=2;
			else
				removeStr=1;
		}
	}
	
	
	return removeStr;
}
function GameSceneUpdate(pst)
{
	$(document).AllUpdate(pst);
	$(document).AllDraw();

	
	var input=$(document).Get_CInput();
	var pt=$(document).Get_CamToMouse();

	for(var i=0;i<g_sell.length;++i)
	{
		if(g_sell[i].m_piece==null)
			g_sell[i].Set_DrawColor("rgba(0,0,0,0.5)");
		else
			g_sell[i].Set_DrawColor("rgba(255,0,0,0.5)");
		
		if(input.m_mouseClick && g_sell[i].Pick(pt) && g_moveLock==false)
		{
			//if(g_sell[i].Pick(pt))
			//	alert(g_sell[i].m_key);
			
			if(d_S_Setting==g_state)
			{
				FirstPiece(g_sell[i]);
			}
			else if(d_S_MyTurn==g_state)
			{
				if(g_selectPiece!=null)
				{
					
					//좌우 1칸 이상 움직이면 무시
					if(Math.abs(g_selectPiece.m_x-g_sell[i].m_x)<=1 &&
							g_sell[i].m_piece==null)
					{
						//다운인데 선택된게 더 작으면 뒤로 갈수 없다
						if(g_myGroup==d_G_U &&g_sell[i].m_y<g_selectPiece.m_y)
						{
						}
						else if(g_myGroup==d_G_D &&g_sell[i].m_y>g_selectPiece.m_y)
						{
						}
						//2칸 이상 점프 금지
						else if(g_sell[i].m_x==g_selectPiece.m_x && Math.abs(g_sell[i].m_y-g_selectPiece.m_y)>2)
						{
							
						}
						//좌우로 2칸 이상은 제외
						else if(g_sell[i].m_x!=g_selectPiece.m_x && Math.abs(g_sell[i].m_y-g_selectPiece.m_y)>1)
						{
							
						}
						else
						{
							PieceMove(g_selectPiece,g_sell[i]);
							//return;
						}
					}
					
					g_selectPiece.m_alpha=1.0;
					g_selectPiece=null;

				}
				if(g_sell[i].m_piece!=null && g_sell[i].m_piece.m_group==g_myGroup)
				{
					g_selectPiece=g_sell[i].m_piece;
					g_selectPiece.m_alpha=0.5;
				}
				
					
			}
			
		}
	}
	
}