//TODO 현재 origin 부분소스를 강제로 수정해서 처리했다.
//이건 상당히 위험한 방법이고 나중에 사운드 관련 소스를 다시 작성해야 하는데 임시로 이렇게 처리했다


var g_multi = 5;

function soundArray()
{
	this.sound = new Array();
}

function sound(alias,name,_volume,_loop)
{
	this.alias = alias;
	this.name = name;
	this.sound_Alias = new Array();
	this.offset=0;
	this.volume=_volume;
	this.loop=_loop;
	this.load=false;
}

var soundArray = new Array();

function Get_LoadSound(_alias,_name,_volume,_loop)
{
	var loop= typeof _loop !== 'undefined' ? _loop : false;
	sound_Q = new sound(_alias, _name,_volume,loop);
	
	for(var i = 0; i<g_multi; i++)
	{
		g_loadCount++;
		
		sound_Q.sound_Alias.push(_alias+i);
		
		
		ion.sound({
		    sounds: [
		        {
		        	alias: _alias+i,
		            name: _name
		        },	 
		    ],
		    loop:loop,
		    origin: _alias,
		    path: "sound/",
		    preload: g_preLoad,
		    volume: _volume,
		    ready_callback: myReadyCallback,
			//ended_callback: myEndedCallback,
		});
	}
	soundArray.push(sound_Q);
}

function OnPlay(_alias,_vol)
{
	var vol= typeof _vol !== 'undefined' ? _vol : 1.0;
	
	if(vol<0.1)
		return;
	else if(vol>1.0)
		vol=1.0;
	
	
	for(var i = 0; i < soundArray.length; i++)
	{
		if(soundArray[i].alias == _alias)
		{
			vol=soundArray[i].volume*vol;
			ion.sound.play(soundArray[i].sound_Alias[soundArray[i].offset],{volume: vol});
			
			soundArray[i].offset++;
			
			if(soundArray[i].offset>=g_multi)
				soundArray[i].offset=0;
		}
	}
}

function myReadyCallback(_alias)
{
	g_loadComplete++;
	for(var i = 0; i < soundArray.length; i++)
	{
		if(soundArray[i].alias == _alias)
		{
			soundArray[i].load=true;
			break;
		}
	}
}

function myEndedCallback(obj)
{
	for(var i = 0; i < soundArray.length; i++)
	{
		if(soundArray[i].alias == obj.origin)
		{
			if(soundArray[i].loop)
			{
				OnPlay(soundArray[i].alias);
				break;
			}

		}
	}//for
}