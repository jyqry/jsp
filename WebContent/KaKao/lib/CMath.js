
function Vec3PlusVec3(_a,_b)
{
	return new CVec3(_a.x+_b.x,_a.y+_b.y,_a.z+_b.z);
}
function Vec3MinusVec3(_a,_b)
{
	return new CVec3(_a.x-_b.x,_a.y-_b.y,_a.z-_b.z);
}
function Vec3MulFloat(_a,_b)
{
	return new CVec3(_a.x*_b,_a.y*_b,_a.z*_b);
}
function Vec3Lenght(_a)
{
	return Math.sqrt(_a.x*_a.x+_a.y*_a.y+_a.z*_a.z); 
}
function Vec3Normalize(_a)
{
	var dummy=Vec3Lenght(_a);
	return new CVec3(_a.x/dummy,_a.y/dummy,_a.z/dummy); 
}
function Vec3Compare(_a,_b)
{
	if(_a.x==_b.x && _a.y==_b.y && _a.z==_b.z)
		return true;
	return false;
}
function Vec3Dot(_a,_b)
{
	return _a.x*_b.x+_a.y*_b.y+_a.z*_b.z;
}
function Vec3Cross(_a,_b)
{
	var rVal=new CVec3();

	rVal.x= _a.y * _b.z - _a.z * _b.y;
	rVal.y= _a.z * _b.x - _a.x * _b.z;
	rVal.z= _a.x * _b.y - _a.y * _b.x;

	/*
	if(rVal.x==0 && rVal.y==0 && rVal.z==0) //크로스 오류인데 이런식으로 체크
	{
		rVal.x= _a.y * _b.z - (_a.z+0.01f) * _b.y;
		rVal.y= (_a.z+0.01f) * _b.x - _a.x * _b.z;
		rVal.z= _a.x * _b.y - _a.y * _b.x;
		rVal.x=-rVal.x;
	}
*/
	return rVal;
}


function CollusionPointAtBox(pa_pos,pa_bound)
{
	var P0=new CVec3(pa_bound.min.x,pa_bound.max.y,pa_bound.max.z);
	var P1=new CVec3(pa_bound.min.x,pa_bound.max.y,pa_bound.min.z);
	var P2=new CVec3(pa_bound.max.x,pa_bound.max.y,pa_bound.min.z);
	var P3=new CVec3(pa_bound.max.x,pa_bound.max.y,pa_bound.max.z);
	var P4=new CVec3(pa_bound.min.x,pa_bound.min.y,pa_bound.max.z);
	var P5=new CVec3(pa_bound.min.x,pa_bound.min.y,pa_bound.min.z);
	var P6=new CVec3(pa_bound.max.x,pa_bound.min.y,pa_bound.min.z);
	var P7=new CVec3(pa_bound.max.x,pa_bound.min.y,pa_bound.max.z);


	var V0=Vec3MinusVec3(pa_pos,P5);
	var V1=Vec3MinusVec3(P1,P5);
	var V2=Vec3MinusVec3(P4,P5);
	var V3=Vec3MinusVec3(P6,P5);

	if(Vec3Dot(V0,V1)<0.0)
		return false;
	if(Vec3Dot(V0,V2)<0.0)
		return false;
	if(Vec3Dot(V0,V3)<0.0)
		return false;

	V0=Vec3MinusVec3(pa_pos,P3);
	V1=Vec3MinusVec3(P7,P3);
	V2=Vec3MinusVec3(P2,P3);
	V3=Vec3MinusVec3(P0,P3);

	if(Vec3Dot(V0,V1)<0.0)
		return false;
	if(Vec3Dot(V0,V2)<0.0)
		return false;
	if(Vec3Dot(V0,V3)<0.0)
		return false;

	return true;
}
function CollusionCircleAtVec3(_pos,_radius,_vec)
{
	var vlen=Vec3Lenght(Vec3MinusVec3(_vec,_pos));
	if(vlen<_radius)
		return true;
	return false;
}
function CollusionBoxAtBoxAABB(_aPos,_aBound,_bPos,_bBound,_intersect,_passAxis)
{
	var A=[0,0,0,0,0,0];
	var B=[0,0,0,0,0,0];
	A[0]=_aPos.x+_aBound.min.x;
	A[1]=_aPos.x+_aBound.max.x;
	A[2]=_aPos.y+_aBound.min.y;
	A[3]=_aPos.y+_aBound.max.y;
	A[4]=_aPos.z+_aBound.min.z;
	A[5]=_aPos.z+_aBound.max.z;
	
	B[0]=_bPos.x+_bBound.min.x;
	B[1]=_bPos.x+_bBound.max.x;
	B[2]=_bPos.y+_bBound.min.y;
	B[3]=_bPos.y+_bBound.max.y;
	B[4]=_bPos.z+_bBound.min.z;
	B[5]=_bPos.z+_bBound.max.z;
	
	var col= [false,false,false];

	for(var i=0;i<3;++i)
	{
		if(_passAxis==i)
		{
			col[i]=true;
			continue;
		}
		if(A[i*2]<=B[i*2+1] && A[i*2+1]>=B[i*2])
		{
			col[i]=true;
			if(_intersect!=null)
			{
				_intersect[i*2]=A[i*2]>B[i*2]?A[i*2]:B[i*2];
				_intersect[i*2+1]=A[i*2+1]<B[i*2+1]?A[i*2+1]:B[i*2+1];
			}
		}
	}
	
	if(col[0] && col[1] && col[2])
	{
		return true;
	}

	return false;
	
}
/*
function CrashCircleAtVec3(_circle,_vec)
{
	var vlen=Vec3Lenght(Vec3MinusVec3(_vec,_circle.m_position));
	if(vlen<_circle.m_length/2)
		return true;
	return false;
}
//AABB이다 이거 회전 스케일 미적용이다
function CrashBoxAtVec3(_box,_vec)
{
	if(_box.m_position.x-_box.m_length.x*0.5<=_vec.x &&
		(_box.m_position.x+_box.m_length.x*0.5)>=_vec.x&&
		_box.m_position.y-_box.m_length.y*0.5<=_vec.y &&
		(_box.m_position.y+_box.m_length.y*0.5)>=_vec.y &&
		_box.m_position.z-_box.m_length.z*0.5<=_vec.z && 
		(_box.m_position.z+_box.m_length.z*0.5)>=_vec.z)
	{
		return true;
	}
	return false;
}
//2차원만 지원 3차원은 GJK알고리즘을 사용해라!
function CrashPolygonAtVec3(_poly,_vec)
{
	if(_poly.m_polygon.length<3)
		alert("poly size!");
	
	for(var i=0;i<_poly.m_polygon.length-1;++i)
	{
		var nextI=i+1;
		if(nextI>=_poly.m_polygon.length)
			nextI=0;
		var dirA=Vec3MinusVec3(_poly.m_polygon[nextI],_poly.m_polygon[i]);
		dirA=Vec3Normalize(dirA);
		var dirB=Vec3MinusVec3(_vec,_poly.m_polygon[i]);
		dirB=Vec3Normalize(dirB);
		
		var dotVal=Vec3Cross(dirA,dirB);
		if(dotVal.z<0)
			return false;
	}
	return true;
}
function CrashTwoVec3Dir(_a0,_a1,_b0,_b1)
{
	var dirA=Vec3MinusVec3(_a0, _a1);
	dirA=Vec3Normalize(dirA);
	var dirB=Vec3MinusVec3(_b0, _b1);
	dirB=Vec3Normalize(dirB);
	
	var dirAb0=Vec3MinusVec3(_a0, _b0);
	dirAb0=Vec3Normalize(dirAb0);
	var dirAb1=Vec3MinusVec3(_a0, _b1);
	dirAb1=Vec3Normalize(dirAb1);
	
	var dirBa0=Vec3MinusVec3(_b0, _a0);
	dirBa0=Vec3Normalize(dirBa0);
	var dirBa1=Vec3MinusVec3(_b0, _a1);
	dirBa1=Vec3Normalize(dirBa1);
	
	var Achk=false;
	var Bchk=false;

	if(Vec3Cross(dirA, dirAb0).z>=0 && Vec3Cross(dirA, dirAb1).z<=0)
		Achk=true;
	if(Vec3Cross(dirA, dirAb0).z<=0 && Vec3Cross(dirA, dirAb1).z>=0)
		Achk=true;
	
	if(Vec3Cross(dirB, dirBa0).z>=0 && Vec3Cross(dirB, dirBa1).z<=0)
		Bchk=true;
	if(Vec3Cross(dirB, dirBa0).z<=0 && Vec3Cross(dirB, dirBa1).z>=0)
		Bchk=true;
	if(Achk && Bchk)
		return true;
	
	return false;
}
function BoxInPosMove(_box,_pos)
{
	if(!CrashBoxAtVec3(_box,_pos))
	{
		var tlbr=_box.Get_PLToTLBRT();
		if(tlbr.top>_pos.y)
			_pos.y=tlbr.top;
		if(tlbr.left>_pos.x)
			_pos.x=tlbr.top;
		if(tlbr.bottom<_pos.y)
			_pos.y=tlbr.bottom;
		if(tlbr.right<_pos.x)
			_pos.x=tlbr.right;
	}
	
	return _pos;
}
*/

function CurveLinear(_time)
{
	return _time;
}
function CurveFadeIn(_time)
{
	return (1.0075-Math.pow(1.25, -_time * 22.0022463022));
}
function CurveFadeOut(_time)
{
	return Math.pow(_time,3.6734111115);
}
function MatAxisToRotation(axis,radianAngle)
{
	var pa_out=new CMat();
	var L_s= Math.sin(radianAngle);
	var L_c= Math.cos(radianAngle);
	var L_d= 1-L_c;
	pa_out.arr[0][0]=(L_d*(axis.x*axis.x)) + L_c;pa_out.arr[0][1]=(L_d*axis.x*axis.y) + (axis.z*L_s);
	pa_out.arr[0][2]=(L_d*axis.x*axis.z) - (axis.y*L_s);pa_out.arr[0][3]=0;

	pa_out.arr[1][0]=(L_d*axis.x*axis.y) - (axis.z*L_s);pa_out.arr[1][1]=(L_d*(axis.y*axis.y)) + L_c;
	pa_out.arr[1][2]=(L_d*axis.y*axis.z) + (axis.x*L_s);pa_out.arr[1][3]=0;

	pa_out.arr[2][0]=(L_d*axis.x*axis.y) + (axis.y*L_s);pa_out.arr[2][1]=(L_d*axis.y*axis.z)-(axis.x*L_s);
	pa_out.arr[2][2]=(L_d*(axis.z*axis.z)) + L_c;pa_out.arr[2][3]=0;

	pa_out.arr[3][0]=0;pa_out.arr[3][1]=0;pa_out.arr[3][2]=0;pa_out.arr[3][3]=1;
	
	return pa_out;
}
function MatScale(pa_vec)
{
	var pa_out=new CMat();
	pa_out.arr[0][0]=pa_vec.x;pa_out.arr[0][1]=0;pa_out.arr[0][2]=0;pa_out.arr[0][3]=0;
	pa_out.arr[1][0]=0;pa_out.arr[1][1]=pa_vec.y;pa_out.arr[1][2]=0;pa_out.arr[1][3]=0;
	pa_out.arr[2][0]=0;pa_out.arr[2][1]=0;pa_out.arr[2][2]=pa_vec.z;pa_out.arr[2][3]=0;
	pa_out.arr[3][0]=0;pa_out.arr[3][1]=0;pa_out.arr[3][2]=0;pa_out.arr[3][3]=1;
	
	return pa_out;
}

function MatMuliplication(pa_val1,pa_val2)
{
	var L_matrix=new CMat();
	L_matrix.arr[0][0]=0;
	L_matrix.arr[1][1]=0;
	L_matrix.arr[2][2]=0;
	L_matrix.arr[3][3]=0;
	

	for(var i=0;i<4;++i)
	{
		for(var j=0;j<4;++j)
		{
			for(var k=0;k<4;++k)
			{
				L_matrix.arr[i][j]+=pa_val1.arr[i][k]*pa_val2.arr[k][j];
			}
		}
	}
	return L_matrix;
}
function MatToVec3Coordinate(pa_mat,pa_vec)
{
	var pa_out=new CVec3();
	var x=0,y=0,z=0,w=0;


	x=(pa_mat.arr[0][0]*pa_vec.x) + (pa_mat.arr[1][0]*pa_vec.y) + (pa_mat.arr[2][0]*pa_vec.z) + pa_mat.arr[3][0];
	y=(pa_mat.arr[0][1]*pa_vec.x) + (pa_mat.arr[1][1]*pa_vec.y) + (pa_mat.arr[2][1]*pa_vec.z) + pa_mat.arr[3][1];
	z=(pa_mat.arr[0][2]*pa_vec.x) + (pa_mat.arr[1][2]*pa_vec.y) + (pa_mat.arr[2][2]*pa_vec.z) + pa_mat.arr[3][2];
	w=(pa_mat.arr[0][3]*pa_vec.x) + (pa_mat.arr[1][3]*pa_vec.y) + (pa_mat.arr[2][3]*pa_vec.z) + pa_mat.arr[3][3];

	pa_out.x=x/w;
	pa_out.y=y/w;
	pa_out.z=z/w;
	
	return pa_out;
}
function MatInvert(pa_val1)
{
	
	var tmp=new Array(12);
	var src=new Array(16);
	var det=0.0;
	var dst=new CMat();


	
	for (var i = 0; i < 4; i++) {
		src[i]        = pa_val1.arr[i][0];
		src[i + 4]    = pa_val1.arr[i][1];
		src[i + 8]    = pa_val1.arr[i][2];
		src[i + 12]   = pa_val1.arr[i][3];
		
		tmp[i]        = 0;
		tmp[i + 4]    = 0;
		tmp[i + 8]    = 0;
	}
	
	tmp[0]  = src[10] * src[15];
	tmp[1]  = src[11] * src[14];
	tmp[2]  = src[9]  * src[15];
	tmp[3]  = src[11] * src[13];
	tmp[4]  = src[9]  * src[14];
	tmp[5]  = src[10] * src[13];
	tmp[6]  = src[8]  * src[15];
	tmp[7]  = src[11] * src[12];
	tmp[8]  = src[8]  * src[14];
	tmp[9]  = src[10] * src[12];
	tmp[10] = src[8]  * src[13];
	tmp[11] = src[9]  * src[12];
	
	dst.arr[0][0]  = tmp[0]*src[5] + tmp[3]*src[6] + tmp[4]*src[7];
	dst.arr[0][0] -= tmp[1]*src[5] + tmp[2]*src[6] + tmp[5]*src[7];
	dst.arr[0][1]  = tmp[1]*src[4] + tmp[6]*src[6] + tmp[9]*src[7];
	dst.arr[0][1] -= tmp[0]*src[4] + tmp[7]*src[6] + tmp[8]*src[7];
	dst.arr[0][2]  = tmp[2]*src[4] + tmp[7]*src[5] + tmp[10]*src[7];
	dst.arr[0][2] -= tmp[3]*src[4] + tmp[6]*src[5] + tmp[11]*src[7];
	dst.arr[0][3]  = tmp[5]*src[4] + tmp[8]*src[5] + tmp[11]*src[6];
	dst.arr[0][3] -= tmp[4]*src[4] + tmp[9]*src[5] + tmp[10]*src[6];
	dst.arr[1][0]  = tmp[1]*src[1] + tmp[2]*src[2] + tmp[5]*src[3];
	dst.arr[1][0] -= tmp[0]*src[1] + tmp[3]*src[2] + tmp[4]*src[3];
	dst.arr[1][1]  = tmp[0]*src[0] + tmp[7]*src[2] + tmp[8]*src[3];
	dst.arr[1][1] -= tmp[1]*src[0] + tmp[6]*src[2] + tmp[9]*src[3];
	dst.arr[1][2]  = tmp[3]*src[0] + tmp[6]*src[1] + tmp[11]*src[3];
	dst.arr[1][2] -= tmp[2]*src[0] + tmp[7]*src[1] + tmp[10]*src[3];
	dst.arr[1][3]  = tmp[4]*src[0] + tmp[9]*src[1] + tmp[10]*src[2];
	dst.arr[1][3] -= tmp[5]*src[0] + tmp[8]*src[1] + tmp[11]*src[2];
	
	tmp[0]  = src[2]*src[7];
	tmp[1]  = src[3]*src[6];
	tmp[2]  = src[1]*src[7];
	tmp[3]  = src[3]*src[5];
	tmp[4]  = src[1]*src[6];
	tmp[5]  = src[2]*src[5];
	tmp[6]  = src[0]*src[7];
	tmp[7]  = src[3]*src[4];
	tmp[8]  = src[0]*src[6];
	tmp[9]  = src[2]*src[4];
	tmp[10] = src[0]*src[5];
	tmp[11] = src[1]*src[4];
	
	dst.arr[2][0]  = tmp[0]*src[13] + tmp[3]*src[14] + tmp[4]*src[15];
	dst.arr[2][0] -= tmp[1]*src[13] + tmp[2]*src[14] + tmp[5]*src[15];
	dst.arr[2][1]  = tmp[1]*src[12] + tmp[6]*src[14] + tmp[9]*src[15];
	dst.arr[2][1] -= tmp[0]*src[12] + tmp[7]*src[14] + tmp[8]*src[15];
	dst.arr[2][2] = tmp[2]*src[12] + tmp[7]*src[13] + tmp[10]*src[15];
	dst.arr[2][2]-= tmp[3]*src[12] + tmp[6]*src[13] + tmp[11]*src[15];
	dst.arr[2][3] = tmp[5]*src[12] + tmp[8]*src[13] + tmp[11]*src[14];
	dst.arr[2][3]-= tmp[4]*src[12] + tmp[9]*src[13] + tmp[10]*src[14];
	dst.arr[3][0] = tmp[2]*src[10] + tmp[5]*src[11] + tmp[1]*src[9];
	dst.arr[3][0]-= tmp[4]*src[11] + tmp[0]*src[9] + tmp[3]*src[10];
	dst.arr[3][1] = tmp[8]*src[11] + tmp[0]*src[8] + tmp[7]*src[10];
	dst.arr[3][1]-= tmp[6]*src[10] + tmp[9]*src[11] + tmp[1]*src[8];
	dst.arr[3][2] = tmp[6]*src[9] + tmp[11]*src[11] + tmp[3]*src[8];
	dst.arr[3][2]-= tmp[10]*src[11] + tmp[2]*src[8] + tmp[7]*src[9];
	dst.arr[3][3] = tmp[10]*src[10] + tmp[4]*src[8] + tmp[9]*src[9];
	dst.arr[3][3]-= tmp[8]*src[9] + tmp[11]*src[10] + tmp[5]*src[8];
	
	det=src[0]*dst.arr[0][0]+src[1]*dst.arr[0][1]+src[2]*dst.arr[0][2]+src[3]*dst.arr[0][3];
	
	det = 1/det;
	for (var j = 0; j < 4; j++)
	{
		dst.arr[j][0]*=det;
		dst.arr[j][1]*=det;
		dst.arr[j][2]*=det;
		dst.arr[j][3]*=det;
	}

	return  dst;
}
function TwoVec3DirAngle(pa_vec1,pa_vec2)
{
	var pa_radian=0;
	pa_vec1=Vec3Normalize(pa_vec1);
	pa_vec2=Vec3Normalize(pa_vec2);
	
	var L_cro=Vec3Cross(pa_vec1,pa_vec2);
	pa_radian = Math.acos(Vec3Dot(pa_vec2, pa_vec1));
	var dir=L_cro.x+L_cro.y+L_cro.z;
	if(dir<0)
		pa_radian=-pa_radian;
	
	return pa_radian;
}