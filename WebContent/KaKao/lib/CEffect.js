var Ecount=0;
var g_cTick=32;

function EffectCreate(_ani,_pos,_rot,_sca,_move,_speed)
{
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	
	var pa=MotionToPlayerAction(_ani);
	
	
	var ani=pa.m_aniVec[0];
	if(ani instanceof CAniAlpha)
		ani=pa.m_aniVec[1];
	
	var bound=new CVec3(0,0);
	if(ani instanceof CAniImage)	
	{
		var img=Get_LoadImage(ani.m_image);
		bound.x=img.width;
		bound.y=img.height;
		
	}
	else if(ani instanceof CAniImageCoordinate)
	{
		bound.x=ani.m_coordinate.right-ani.m_coordinate.left;
		bound.y=ani.m_coordinate.bottom-ani.m_coordinate.top;
	}
	bound.x*=_sca.x;
	bound.y*=_sca.y;
	
	dummy.NewCBoundBox(bound);
	dummy.Set_Position(_pos);
	dummy.Set_Rotation(new CVec3(0,_rot));
	for(var i=0;i<pa.m_aniVec.length;++i)
		dummy.Push_Animation(pa.m_aniVec[i]);
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}


function Effect0(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,64));
	dummy.Set_Position(_pos);
	dummy.ImgToDivAni("img/won.png",960,960,5,5,30);
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect1(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,64));
	dummy.Set_Position(_pos);
	dummy.ImgToDivAni("img/explosion.png",768,512,3,4,30);
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect2(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(128,128));
	dummy.Set_Position(_pos);
	var tick=60;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_magic_trail0.png"));
	dummy.Push_Animation(new CAniImage(1*tick+1,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_magic_trail1.png"));
	dummy.Push_Animation(new CAniImage(2*tick+1,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_magic_trail2.png"));
	dummy.Push_Animation(new CAniImage(3*tick+1,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_magic_trail3.png"));
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect3(_pos)
{
	
	var rMat=new CMat();
	var dir=new CVec3(0,-1);
	rMat=MatAxisToRotation(new CVec3(0,0,1),0);
	dir=MatToVec3Coordinate(rMat,dir);
	dir=Vec3MulFloat(dir,128-32);
	
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,256));
	dummy.Set_Position(Vec3PlusVec3(_pos,dir));
	var tick=30;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/FX/fx1_blue_topEffect/spell_bluetop_1_1.png"));
	for(var i=1;i<23;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/FX/fx1_blue_topEffect/spell_bluetop_1_"+(i+1)+".png"));
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect4(_pos,_rot)
{
	var rMat=new CMat();
	var dir=new CVec3(0,-1);
	rMat=MatAxisToRotation(new CVec3(0,0,1),_rot);
	dir=MatToVec3Coordinate(rMat,dir);
	dir=Vec3MulFloat(dir,g_cTick);
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,64));
	dummy.Set_Position(Vec3PlusVec3(_pos,dir));
	dummy.Set_Rotation(new CVec3(0,_rot));
	var tick=30;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/2d-special-effects/sparks_effect/sparks_effect_01.png"));
	for(var i=1;i<10;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/2d-special-effects/sparks_effect/sparks_effect_0"+(i+1)+".png"));
	for(var i=10;i<13;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/2d-special-effects/sparks_effect/sparks_effect_"+(i+1)+".png"));
	
	
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect5(_pos)
{
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,64));
	dummy.Set_Position(_pos);
	
	var tick=30;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/2d-special-effects/green_effect/green_effect_01.png"));
	for(var i=1;i<10;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/2d-special-effects/green_effect/green_effect_0"+(i+1)+".png"));
	for(var i=10;i<11;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/2d-special-effects/green_effect/green_effect_"+(i+1)+".png"));
	
	
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect6(_pos)
{
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,64));
	dummy.Set_Position(_pos);
	
	var tick=30;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/2d-special-effects/light_glow_effect/light_glow_01.png"));
	for(var i=1;i<10;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/2d-special-effects/light_glow_effect/light_glow_0"+(i+1)+".png"));
	for(var i=10;i<11;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/2d-special-effects/light_glow_effect/light_glow_"+(i+1)+".png"));
	
	
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect7(_pos)
{
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,64));
	dummy.Set_Position(_pos);
	
	var tick=30;
	dummy.Push_Animation(new CAniImageCoordinate(0,500,"img/effect/heal.png",new CRect(606,86,606+320,86+320)));
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect8(_pos)
{
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,64));
	dummy.Set_Position(_pos);
	
	var tick=30;
	dummy.Push_Animation(new CAniImage(0,100,"img/crawl-tiles Oct-5-2010/effect/bolt08.png"));
	dummy.Push_Animation(new CAniImage(101,100,"img/crawl-tiles Oct-5-2010/effect/bolt08.png"));
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect9(_pos)
{
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(184*2,85*2));
	dummy.Set_Position(Vec3PlusVec3(_pos,new CVec3(19*2,-5*2)));
	
	var tick=50;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/FX/fx3_fireBall/spell_decap_2_ball_1.png"));
	for(var i=1;i<19;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/FX/fx3_fireBall/spell_decap_2_ball_"+(i+1)+".png"));
	
	
	
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect10(_pos)
{
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(50,47));
	dummy.Set_Position(_pos);
	
	var tick=50;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/FX/fx10_blackExplosion/smoke_black_1_19_1.png"));
	for(var i=2;i<20;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/FX/fx10_blackExplosion/smoke_black_1_19_"+(i)+".png"));
	
	
	
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect11(_pos)
{
	
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,64));
	dummy.Set_Position(_pos);
	
	var tick=50;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/2d-special-effects/magic_effect/magic_effect_01.png"));
	for(var i=1;i<10;++i)
		dummy.Push_Animation(new CAniImage(i*tick+1,tick,"img/2d-special-effects/magic_effect/magic_effect_0"+(i)+".png"));
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/2d-special-effects/magic_effect/magic_effect_10.png"));
	
	
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect12(_pos,_allTime)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(64,64));
	dummy.Set_Position(_pos);
	dummy.ImgToDivAni("img/loader.png",1160,927,5,4,_allTime/20);
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect13(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(32,32));
	dummy.Set_Position(_pos);
	dummy.Push_Animation(new CAniImage(0,550,"img/crawl-tiles Oct-5-2010/spells/translocation/portal.png"));
	
	
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect14(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(32,32));
	dummy.Set_Position(_pos);
	var tick=60;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_fire0.png"));
	dummy.Push_Animation(new CAniImage(1*tick+1,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_fire1.png"));
	dummy.Push_Animation(new CAniImage(2*tick+1,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_fire2.png"));
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect15(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(32,32));
	dummy.Set_Position(_pos);
	var tick=60;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_cold0.png"));
	dummy.Push_Animation(new CAniImage(1*tick+1,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_cold1.png"));
	dummy.Push_Animation(new CAniImage(2*tick+1,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_cold2.png"));
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect16(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(32,32));
	dummy.Set_Position(_pos);
	var tick=60;
	dummy.Push_Animation(new CAniImage(0*tick,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_poison0.png"));
	dummy.Push_Animation(new CAniImage(1*tick+1,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_poison1.png"));
	dummy.Push_Animation(new CAniImage(2*tick+1,tick,"img/crawl-tiles Oct-5-2010/effect/cloud_poison2.png"));
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect17(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(128,128));
	dummy.Set_Position(_pos);
	dummy.Push_Animation(new CAniImage(0,0,"img/179347-control/png/checked.png"));
	dummy.Push_Animation(new CAniAlpha(0,500,1,0));
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect18(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(128,128));
	dummy.Set_Position(_pos);
	dummy.Push_Animation(new CAniImage(0,0,"img/179347-control/png/cancel.png"));
	dummy.Push_Animation(new CAniAlpha(0,500,1,0));
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect19(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(128,128));
	dummy.Set_Position(_pos);
	dummy.Push_Animation(new CAniImage(0,0,"img/179347-control/png/refresh-1.png"));
	dummy.Push_Animation(new CAniAlpha(0,500,1,0));
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function Effect20(_pos)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(128,128));
	dummy.Set_Position(_pos);
	dummy.Push_Animation(new CAniImage(0,0,"img/179347-control/png/move.png"));
	dummy.Push_Animation(new CAniAlpha(0,500,1,0));
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}
function TextEffect(_pos,_text,_time)
{
	var dummy=$("#effect"+Ecount).Get_CObject(new CObject());
	dummy.NewCBoundBox(new CVec3(128,32));
	dummy.Set_Position(_pos);
	dummy.Set_DrawColor("fillText:"+_text);

	dummy.Push_Animation(new CAniAlpha(_time,500,1,0));
	
	dummy.Set_FlowOption("play,remove");
	Ecount++;
}

function TimeEffect(_obj,_allTime)
{
	_obj.Set_Alpha(1.0);
	_obj.m_aniData=new Array();
	_obj.ImgToDivAni("img/loader.png",1160,927,5,4,_allTime/20);
	_obj.Push_Animation(new CAniAlpha(_allTime,500,1,0));
	_obj.Set_Flow(new CFlow());
	_obj.Set_FlowOption("play");
}