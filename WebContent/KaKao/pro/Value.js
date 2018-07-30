var g_frame;
var g_packetShow;
var g_preLoad;
var g_autoPick;
var g_shake;
var g_screenMove;
var g_screenMoveSpeed;
var g_chat;
var g_zoom;

var g_keyLock=false;
var g_uiInvenType=0;//예전꺼
var g_ping=0;
var g_pingTime=0;
var g_fowType = 0;// 안개 보이는 형태 브라우져 마다 틀림 OptionChk에서
var g_inputModel = 0;
var g_playerArr=new Array();
var g_itemArr=new Array();
var g_pressCount=0;
var g_chatArr=new Array();
var g_chatTime=0;
//var g_fow=null;
var oneChk=new Array(128);
var g_lastAction=0;
var g_mouseMode=0;
var g_skillOffset=0;
var g_zoneName="";
var g_shakeTime=0;
var g_targetClickOff=true;

var g_story=true;
var g_loading=false;
var g_init=false;

var CDbConnect_eType_Zone_Basic=0;
var CDbConnect_eType_Zone_Mon=6;
var CDbConnect_eType_Zone_Training=8;

var g_inv;
var g_charNpc;
var g_callKey;

var g_autoPickTime=0;
var g_lastWindow=0;
var g_scene=0;
var g_communityTime=0;
var g_communityLast="";

var d_MaxSelect=12;
var g_selectArr=new Array();


var d_zPlayer=0;
var d_zBack=-3;
var d_zMap=-1;
var d_zItem=-1;
var d_zEffect=1;
var d_zSelect=1;
var d_zNpcTarget=10;

var g_lastRemove="";
var g_SLiveTime=0;
var g_RLiveTime=0;