//============================================================================
//선언
//============================================================================
function insertHTML(html, element) {
    if( element.insertAdjacentHTML ){
        element.insertAdjacentHTML( 'afterBegin', html ) ;
    }
    else
    {

        var oRange = document.createRange() ;
        oRange.setStartAfter( element ) ;
        var oFragment = oRange.createContextualFragment( html );
        element.appendChild(oFragment) ;
    }
}

function _TabMenuMainClass(CreateName ,url)
{
    this.m_createID = CreateName;
    this.m_WaitObj = null; //wait 객체
    this.m_TreeObj = null; //tree 객체

    //텝 property
    this.m_tabList = new Array();		//menu list

    this.Ontab = ""; //활성화 텝 아이디

    this.m_max = 10;		//최대 텝 메뉴수
    this.m_tabSaveYN = false;	//탭변경시 저장유무 확인
    this.m_authCssURL = (url != null && typeof(url) == "string")? url : "";	// 버튼권한 xml url
    this.m_authCssYN = true;	//상단메뉴 버튼권한 처리 유무
    this.m_contentID = "MainContent";	//메인 화면 아이디
    this.m_menuID = "MainMenu";	//메뉴 아이디
    this.m_tabID = "tabMenuArea";	//tab 아이디
    this.m_tabLayerID = "tabAreaLayer";	//tab 범위 아이디
    this.m_tabListID = "tabMenuList";	//tab 목록 아이디
    //버튼 li
    this.m_btnSelectID = "btnSelect";	//조회 아이디
    this.m_btnSaveID = "btnSave";	//저장 아이디
    this.m_btnInsertID = "btnInsert";	//추가 아이디
    this.m_btnDeleteID = "btnDelete";	//삭제 아이디
    this.m_btnPrintID = "btnPrint";	//출력 아이디
    this.m_btnDownloadID = "btnDownload";	//다운로드 아이디
    this.m_btnListID = "btnList";	//명단저장
    //버튼이벤트
    this.FoucsSelect = _FoucsSelect; //조회
    this.FoucsSave = _FoucsSave; //저장
    this.FoucsInsert = _FoucsInsert; //추가
    this.FoucsDelete = _FoucsDelete; //삭제
    this.FoucsPrint = _FoucsPrint; //출력
    this.FoucsDownLoad = _FoucsDownLoad; //다운
    this.FoucsSaveList = _FoucsSaveList; //명단저장


    //메뉴 method
    this.authLoad= _TabAuthLoad;			//메뉴 새로고침
    this.buttonauth= _buttonauth; //버튼 설정
    //텝 method
    this.focus= _TabFocus;			//활성화
    this.add= _TabAdd;			//추가
    this.nadd= _TabNAdd;			//연계텝추가
    this.cadd= _TabCAdd;			//연계텝이동
    this.mod= _TabMod;			//수정
    this.del= _TabDel;			//삭제
    this.delAll= _TabDelAll;			//전체삭제
    this.sel= _TabSel;			//목록
    this.selView= _TabSelView;			//목록보기
    this.search= _TabSearch;			//검색 return idx
    this.searchID= _TabIdxSearchID;			//검색 return id
    this.searchObject= _TabSearchObject;			//검색 return objecct
    this.display= _TabDisplay;			//표시
    this.count= _TabCount;			//메뉴 수
    //아이프레임
    this.iframeSize = _iframeSize;
    //wait method
    this.waitOpen = _openWait;
    this.waitClose = _closeWait;
}

function _iframeSize(id) {
    var obj = document.getElementById(id);
    var ifHeight = obj.contentWindow.document.body.scrollHeight;
    var ifWidth = obj.contentWindow.document.body.scrollWidth;
    //obj.style.width = ifWidth;
    if(ifHeight < 600) ifHeight = 600;
    obj.style.height = String(ifHeight+100)+"px";

    //this.waitClose();
    setTimeout(this.m_createID+".waitClose()",1);

}

function _openWait()
{
    if(this.m_WaitObj != null)
    {
        this.m_WaitObj.OnOpenWait("화면 조회중입니다.");
    }
}

function _closeWait()
{

    if(this.m_WaitObj != null)
    {

        this.m_WaitObj.OnCloseWait();
    }

}
function _buttonauth(SelObj)
{
    var menu = this.searchObject(SelObj.m_id_sel);

    if(menu != null)
    {
        menu.m_auth_sel = SelObj.m_auth_sel;	//조회권한 Y: 있음 , N:없음 , X:기능없음
        menu.m_auth_save =SelObj.m_auth_save;	//저장권한
        menu.m_auth_add = SelObj.m_auth_add;	//추가권한
        menu.m_auth_del = SelObj.m_auth_del;	//삭제권한
        menu.m_auth_print = SelObj.m_auth_print;	//출력권한
        menu.m_auth_list = SelObj.m_auth_list;	//명단저장
        menu.m_auth_down = SelObj.m_auth_down;	//다운로드권한
    }

    if(document.getElementById(this.m_btnSelectID) != null )
    {
        setImgRpOn(document.getElementById(this.m_btnSelectID),SelObj.m_auth_sel);
        setProperty(document.getElementById(this.m_btnSelectID),"OnAir", SelObj.m_auth_sel);
    }
    if(document.getElementById(this.m_btnSaveID) != null )
    {
        setImgRpOn(document.getElementById(this.m_btnSaveID),SelObj.m_auth_save);
        setProperty(document.getElementById(this.m_btnSaveID),"OnAir", SelObj.m_auth_save);
    }
    if(document.getElementById(this.m_btnInsertID) != null )
    {
        setImgRpOn(document.getElementById(this.m_btnInsertID),SelObj.m_auth_add);
        setProperty(document.getElementById(this.m_btnInsertID),"OnAir", SelObj.m_auth_add);
    }
    if(document.getElementById(this.m_btnDeleteID) != null )
    {
        setImgRpOn(document.getElementById(this.m_btnDeleteID),SelObj.m_auth_del);
        setProperty(document.getElementById(this.m_btnDeleteID),"OnAir", SelObj.m_auth_del);
    }
    if(document.getElementById(this.m_btnPrintID) != null )
    {
        setImgRpOn(document.getElementById(this.m_btnPrintID),SelObj.m_auth_print);
        setProperty(document.getElementById(this.m_btnPrintID),"OnAir", SelObj.m_auth_print);
    }
    if(document.getElementById(this.m_btnDownloadID) != null )
    {
        setImgRpOn(document.getElementById(this.m_btnDownloadID),SelObj.m_auth_down);
        setProperty(document.getElementById(this.m_btnDownloadID),"OnAir", SelObj.m_auth_down);
    }
    if(document.getElementById(this.m_btnListID) != null )
    {
        setImgRpOn(document.getElementById(this.m_btnListID),SelObj.m_auth_list);
        setProperty(document.getElementById(this.m_btnListID),"OnAir", SelObj.m_auth_list);
    }

}
function _TabMenuClass(in_name,in_id,in_url,in_auth_sel,in_auth_save,in_auth_add,in_auth_del,in_auth_print,in_auth_down,in_auth_list,in_treeMenu)
{
    this.m_name = in_name;		//메뉴명
    this.m_tabObject = null; // 텝 object
    this.m_ifrObject = null; // 아이프레임 object
    this.m_treeMenu = in_treeMenu; // tree메뉴
    this.m_id = in_id;	//아이디
    this.m_url =in_url;	//url
    this.m_auth_sel = in_auth_sel;	//조회권한 Y: 있음 , N:없음 , X:기능없음
    this.m_auth_save =in_auth_save;	//저장권한
    this.m_auth_add = in_auth_add;	//추가권한
    this.m_auth_del = in_auth_del;	//삭제권한
    this.m_auth_print = in_auth_print;	//출력권한
    this.m_auth_list = in_auth_list;	//명단저장
    this.m_auth_down = in_auth_down;	//다운로드권한
}



//menu load
function _TabAuthLoad()
{
    if(this.m_authCssURL == "")
        return;

}

function _TabCAdd(in_id,in_url)
{
    var tabmenu = this.searchObject(in_id);
    if(tabmenu != null)
    {
        tabmenu.in_url = in_url;
        this.add(tabmenu);
    }
}

function _TabNAdd(in_name,in_id,in_url)
{
    if(this.Ontab == "")
        return;

    var tabmenu = this.searchObject(this.Ontab);
    if(tabmenu != null)
    {
        this.add(new _TabMenuClass(in_name,in_id,in_url,"N","N","N","N","N","N","N",tabmenu.m_treeMenu))
    }
}
//tab add
function _TabAdd(tabmenu)
{
    if(typeof(tabmenu) != "object")
        return;

    //메뉴인덱스 검색
    var TabObj = this.searchObject(tabmenu.m_id);

    if(TabObj != null)
    {
        this.focus(tabmenu.m_id);
        if(TabObj.m_url != tabmenu.m_url)
        {
            TabObj.m_url = tabmenu.m_url;
            TabObj.m_ifrObject.src = tabmenu.m_url;
        }
    }
    else
    {
        //최대치 확인
        if(this.count() == this.m_max)
        {
            alert("최대 탭 사용 " +this.m_max + "개를 모두 사용하고 있습니다.\n다른 텝을 닫고 사용하기시 바랍니다.");
            return;
        }
        if(this.searchObject(this.Ontab) != null)
        {
            if (window.addEventListener)
            {
            }
            else{
                if( this.searchObject(this.Ontab).m_ifrObject.document.readyState!= "complete" )
                {
                    alert("진행중 작업이 완료되지 않았습니다.\n잠시후 다시 시도하여 주세요");
                    return ;
                }
            }
        }
        this.m_tabList[this.m_tabList.length] = tabmenu;
//		this.m_tabList.push(tabmenu);
        this.display(this.m_tabList.length -1);
        console.log("this.m_tabList.length : " + this.m_tabList.length);
        console.log("tabmenu.m_id : " + tabmenu.m_id);
        this.focus(tabmenu.m_id);
        document.documentElement.scrollTop =0;
    }
}
//tab Mod
function _TabMod(tabmenu)
{
    if(typeof(tabmenu) != "_TabMenuClass")
        return;
    var menuidx = this.search(tabmenu.m_id);
    if(menuidx != -1)
    {
        this.m_tabList[menuidx] = tabmenu;
        this.display(menuidx);
    }
}
//tab del
function _TabDel(tabid)
{
    if(tabid == undefined)
        tabid = this.Ontab;

    var menu = this.searchObject(tabid);
    if(menu != null)
    {
//		document.getElementById("ExtendTitle" + menu.m_parentID).className = "off";
        //메뉴 비활성화
//		menu.m_menuObject.className = "";
        //텝삭세처리
        try{
            menu.m_tabObject.parentNode.removeChild(menu.m_tabObject);
            //if( menu.m_tabObject != null){
            //menu.m_tabObject.removeNode(true);//기존소스
            //}
        }catch(e){}
        //아이프레임 삭제
        menu.m_ifrObject.parentNode.removeChild(menu.m_ifrObject);
        //if( menu.m_ifrObject != null){
        //menu.m_ifrObject.removeNode(true);//기존소스
        //}
        //배열삭제 필요
        for( var i=0; i < this.m_tabList.length; i++ )
        {
            if(this.m_tabList[i].m_id == tabid)
            {
                this.m_tabList.splice(i,1);
            }
        }
        this.focus(this.searchID(this.count()-1));
        return;
    }
}
function _TabDelAll()
{
    //if(confirm("모든 탭을 닫으시겠습니까?")){
    for(var dcount = this.count()-1 ; dcount >= 0 ; dcount--)
    {
        var menu = this.m_tabList[dcount];
        //메뉴 비활성화
        if(this.m_TreeObj != null)
        {
            this.m_TreeObj.setBlur();
        }

        //텝삭세처리
        try{
            menu.m_tabObject.parentNode.removeChild(menu.m_tabObject);
            //if( menu.m_tabObject != null){
            //menu.m_tabObject.removeNode(true);//기존소스
            //}
        }catch(e){}
        //아이프레임 삭제
        menu.m_ifrObject.parentNode.removeChild(menu.m_ifrObject);
        //if( menu.m_ifrObject != null){
        //menu.m_ifrObject.removeNode(true);//기존소스
        //}
        //배열삭제 필요
        this.m_tabList.splice(dcount,1);
    }
    this.focus("");
    this.Ontab = "";
    //}
}
//화면표시
function _TabDisplay(menuidx)
{
    var obj = this.m_tabList[menuidx];
    if(document.getElementById(this.m_tabID) != null)
    {
        insertHTML("<li id='menuli_"+obj.m_id+"' class='menu-tab1'><div class='m-tab-on' id='menu_tab_"+obj.m_id+"'><p class='m-tab-on-l' id='menu_tab_pl"+obj.m_id+"'>&nbsp;</p><p class='m-tab-on-c' id='menu_tab_pc"+obj.m_id+"'><a  class='cont' onclick='eval(\""+this.m_createID+"\").focus(\""+obj.m_id+"\");' style='cursor:pointer;'>"+obj.m_name+"</a><a href='javascript:Tabmenu.del();' id='menu_tab_img"+obj.m_id+"'></a></p></div></li>",document.getElementById(this.m_tabID));

        //객체 넣기
        obj.m_tabObject = document.getElementById('menuli_'+obj.m_id);
        //아이프레임 생성 추가
        if(document.getElementById(this.m_contentID) != null)
        {

            //this.waitOpen();
            //document.getElementById(this.m_contentID).insertAdjacentHTML("afterBegin" ,"<iframe id='menuifr_"+obj.m_id+"'  src='"+obj.m_url+"' frameborder='0' style='width:100%;height:100%;overflow-x:auto;display:none;' marginwidth='0' marginheight='0' onload='eval(\""+this.m_createID+"\").iframeSize(this.id)' scrolling='no'  ></iframe>") ;
            insertHTML("<iframe id='menuifr_"+obj.m_id+"' name='menuifr_"+obj.m_id+"' src='"+obj.m_url+"' frameborder='0' style='width:100%;height:100%;overflow-x:auto;display:none;' marginwidth='0' marginheight='0' onload='eval(\""+this.m_createID+"\").iframeSize(this.id)' scrolling='no'  ></iframe>",document.getElementById(this.m_contentID));
            //객체 넣기
            obj.m_ifrObject = document.getElementById('menuifr_'+obj.m_id);
        }
    }

}
function _TabCount()
{
    return this.m_tabList.length;
}

function _TabSel()
{
    return this.m_tabList;
}
function _TabSelView(fthis)
{
    var addStr = "";
    var OnStr = "";
    var Len = this.count() ;

    if (Len == 0)
        return;

    if(document.getElementById(this.m_tabListID) != null && document.getElementById(this.m_tabListID).style.display != "none")
    {
        document.getElementById(this.m_tabListID).style.display = "none";
        return;
    }

    for(var i = Len-1 ; i >= 0 ; i--)
    {
        var obj = this.m_tabList[i];

        if(this.Ontab ==obj.m_id )
            OnStr = "color:#5357b2;";
        else
            OnStr = "color:#3d3d3d;";
        addStr += "<li ><div style='width:100%;overflow:hidden;text-overflow:ellipsis;cursor:pointer;' ><nobr><a onclick='eval(\""+this.m_createID+"\").focus(\""+obj.m_id+"\");' style='font-size:12px; font-family:Gulim; line-height:18px; text-decoration:none;"+OnStr+"  '>"+obj.m_name+"</a></nobr></div></li>";
    }

    if(document.getElementById(this.m_tabListID) == null)
    {
        //document.body.insertAdjacentHTML("afterBegin" ,"<div id='" +this.m_tabListID + "' style='position:absolute;width:180px;min-height:100px;z-index:1000;background-color:#ffffff;border:solid 2px #5357b2;overflow-x:hidden;padding: 5px;' ><ul  style='margin-left:5px;'>"+addStr+"</ul></div>") ;
        insertHTML("<div id='" +this.m_tabListID + "' style='position:absolute;top:88px;left:80%;width:180px;min-height:100px;background-color:#ffffff;border:solid 2px #008ed2;overflow-x:hidden;padding: 5px;z-index:1000;' ><ul  style='margin-left:5px;'>"+addStr+"</ul></div>",document.body);
    }
    else
    {
        document.getElementById(this.m_tabListID).innerHTML = "<ul style='margin-left:5px;'>"+addStr+"</ul>"
    }
    //var e =getXY(fthis)
    //var xpos = e.x - e.w -180;
    //var ypos = e.y ;


    //document.getElementById(this.m_tabListID).style.left=xpos;
    //document.getElementById(this.m_tabListID).style.top=ypos;
    document.getElementById(this.m_tabListID).style.display = 'block';

}

//tab Search
function _TabSearch(tabid)
{
    for(var i = 0; i < this.m_tabList.length ; i++)
    {
        if(tabid == this.m_tabList[i].m_id)
            return i;
    }

    return -1;
}
//tab Search
function _TabIdxSearchID(menuidx)
{
    if(menuidx > -1 && this.count() >  menuidx)
        return this.m_tabList[menuidx].m_id;

    return "";
}


function _TabSearchObject(tabid)
{
    for(var i = 0; i < this.m_tabList.length ; i++)
    {
        if(tabid == this.m_tabList[i].m_id)
            return this.m_tabList[i];
    }

    return null;
}
//tab Focus
function _TabFocus(tabid)
{
    if(this.Ontab == tabid)
        return;

    //기존 텝 비활성화
    if(document.getElementById("menuli_" +this.Ontab ) != null )
    {
        document.getElementById("menuli_" +this.Ontab ).className = "";
        document.getElementById("menu_tab_" +this.Ontab ).className = "m-tab-off";
        document.getElementById("menu_tab_pl" +this.Ontab ).className = "m-tab-off-l";
        document.getElementById("menu_tab_pc" +this.Ontab ).className = "m-tab-off-c";
        document.getElementById("menu_tab_img" +this.Ontab ).innerHTML = "<img src='http://cdn.touch-down.co.kr/html/img/bg/bg_menu01_right.jpg'>";

        if(this.searchObject(this.Ontab) != null)
        {
//			this.searchObject(this.Ontab).m_menuObject.className = "";
            //아이프레임 표시
            this.searchObject(this.Ontab).m_ifrObject.style.display = "none";

//			document.getElementById("ExtendTitle" + this.searchObject(this.Ontab).m_parentID).className = "off";
        }

    }
    else
    {
        this.Ontab = "";
    }
    var SelObj = this.searchObject(tabid);
    //tab 표시
    if(document.getElementById("menuli_" +tabid )  != null)
    {
        this.Ontab = tabid;
        document.getElementById("menuli_" +tabid ).className = "on";
        document.getElementById("menu_tab_" +this.Ontab ).className = "m-tab-on";
        document.getElementById("menu_tab_pl" +this.Ontab ).className = "m-tab-on-l";
        document.getElementById("menu_tab_pc" +this.Ontab ).className = "m-tab-on-c";
        document.getElementById("menu_tab_img" +this.Ontab ).innerHTML = "<img src='http://cdn.touch-down.co.kr/html/img/btn/btn_menu_close.gif'>";
        if(SelObj != null)
        {
            //텝위치조정
            var LayerWidth = parseInt(document.getElementById(this.m_tabLayerID).offsetWidth);
            var LayerscrollLeft = parseInt(document.getElementById(this.m_tabLayerID).scrollLeft);
            var ObjLeft = parseInt(SelObj.m_tabObject.offsetLeft) + parseInt(SelObj.m_tabObject.offsetWidth);
            if(LayerWidth < ObjLeft)
                document.getElementById(this.m_tabLayerID).scrollLeft =   ObjLeft - LayerWidth;
            if(parseInt(document.getElementById(this.m_tabLayerID).scrollLeft) > parseInt(SelObj.m_tabObject.offsetLeft) )
                document.getElementById(this.m_tabLayerID).scrollLeft =  parseInt(SelObj.m_tabObject.offsetLeft) - 20;

//			SelObj.m_menuObject.className = "on";
            if(this.m_TreeObj != null)
            {
                this.m_TreeObj.setFocus(SelObj.m_treeMenu);
//				SelObj.m_treeMenu.className="nodeSel";
                this.m_TreeObj.openTo(SelObj.m_treeMenu, false, false);
            }

            //아이프레임 표시
            SelObj.m_ifrObject.style.display = "block";
            //var contentHeight = $('#MainContent').css('height');


//			document.getElementById("ExtendTitle" + SelObj.m_parentID).className = "on";
            //메뉴 확장처리
//			document.getElementById("ExtendMenu" + SelObj.m_parentID).style.display = "block";
        }

        if(document.getElementById(this.m_btnSelectID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnSelectID),SelObj.m_auth_sel);
            setProperty(document.getElementById(this.m_btnSelectID),"OnAir", SelObj.m_auth_sel);

        }
        if(document.getElementById(this.m_btnSaveID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnSaveID),SelObj.m_auth_save);
            setProperty(document.getElementById(this.m_btnSaveID),"OnAir", SelObj.m_auth_save);
        }
        if(document.getElementById(this.m_btnInsertID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnInsertID),SelObj.m_auth_add);
            setProperty(document.getElementById(this.m_btnInsertID),"OnAir", SelObj.m_auth_add);
        }
        if(document.getElementById(this.m_btnDeleteID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnDeleteID),SelObj.m_auth_del);
            setProperty(document.getElementById(this.m_btnDeleteID),"OnAir", SelObj.m_auth_del);
        }
        if(document.getElementById(this.m_btnPrintID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnPrintID),SelObj.m_auth_print);
            setProperty(document.getElementById(this.m_btnPrintID),"OnAir", SelObj.m_auth_print);
        }
        if(document.getElementById(this.m_btnDownloadID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnDownloadID),SelObj.m_auth_down);
            setProperty(document.getElementById(this.m_btnDownloadID),"OnAir", SelObj.m_auth_down);
        }
        if(document.getElementById(this.m_btnListID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnListID),SelObj.m_auth_list);
            setProperty(document.getElementById(this.m_btnListID),"OnAir", SelObj.m_auth_list);
        }
        if(SelObj != null)
        {
            try{
                eval(SelObj.m_ifrObject.id + ".SetPageMenuAuth()");
            }catch(e){}
        }
    }
    else
    {
        if(document.getElementById(this.m_btnSelectID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnSelectID),"N");
            setProperty(document.getElementById(this.m_btnSelectID),"OnAir", "N");

        }
        if(document.getElementById(this.m_btnSaveID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnSaveID),"N");
            setProperty(document.getElementById(this.m_btnSaveID),"OnAir", "N");
        }
        if(document.getElementById(this.m_btnInsertID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnInsertID),"N");
            setProperty(document.getElementById(this.m_btnInsertID),"OnAir", "N");
        }
        if(document.getElementById(this.m_btnDeleteID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnDeleteID),"N");
            setProperty(document.getElementById(this.m_btnDeleteID),"OnAir", "N");
        }
        if(document.getElementById(this.m_btnPrintID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnPrintID),"N");
            setProperty(document.getElementById(this.m_btnPrintID),"OnAir", "N");
        }
        if(document.getElementById(this.m_btnDownloadID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnDownloadID),"N");
            setProperty(document.getElementById(this.m_btnDownloadID),"OnAir", "N");
        }
        if(document.getElementById(this.m_btnListID) != null )
        {
            setImgRpOn(document.getElementById(this.m_btnListID),"N");
            setProperty(document.getElementById(this.m_btnListID),"OnAir", "N");
        }
    }

    if(document.getElementById(this.m_tabListID) != null)
        document.getElementById(this.m_tabListID).style.display = "none";


}

function _FoucsSelect(fthis)
{
    if(this.Ontab == null)
        return;

    if(getProperty(fthis,"OnAir","N") == "N")
        return;

    var menu = this.searchObject(this.Ontab);
    if(menu != null)
    {
        try{
            eval(menu.m_ifrObject.id)._Fselect();
        }catch(e){window.status = "조회 기능이 존재하지 않습니다."}
    }
}

function _FoucsSave(fthis)
{

    if(this.Ontab == null)
        return;
    if(getProperty(fthis,"OnAir","N") == "N")
        return;

    var menu = this.searchObject(this.Ontab);
    if(menu != null)
    {
        try{
            //in_fr.contentWindow._Fsave();
            eval(menu.m_ifrObject.id)._Fsave();
        }catch(e){window.status = "저장 기능이 존재하지 않습니다."}
    }
}

function _FoucsInsert(fthis)
{
    if(this.Ontab == null)
        return;

    if(getProperty(fthis,"OnAir","N") == "N")
        return;

    var menu = this.searchObject(this.Ontab);
    if(menu != null)
    {
        try{
            eval(menu.m_ifrObject.id)._Finsert();
        }catch(e){window.status = "추가 기능이 존재하지 않습니다."}
    }
}

function _FoucsDelete(fthis)
{
    if(this.Ontab == null)
        return;

    if(getProperty(fthis,"OnAir","N") == "N")
        return;

    var menu = this.searchObject(this.Ontab);
    if(menu != null)
    {
        try{
            eval(menu.m_ifrObject.id)._Fdelete();
        }catch(e){window.status = "삭제 기능이 존재하지 않습니다."}
    }
}

function _FoucsPrint(fthis)
{
    if(this.Ontab == null)
        return;

    if(getProperty(fthis,"OnAir","N") == "N")
        return;

    var menu = this.searchObject(this.Ontab);
    if(menu != null)
    {
        try{
            eval(menu.m_ifrObject.id)._Fprint();
        }catch(e){window.status = "출력 기능이 존재하지 않습니다."}
    }
}

function _FoucsDownLoad(fthis)
{
    if(this.Ontab == null)
        return;
    if(getProperty(fthis,"OnAir","N") == "N")
        return;

    var menu = this.searchObject(this.Ontab);
    if(menu != null)
    {
        try{
            eval(menu.m_ifrObject.id)._Fdownload();
        }catch(e){window.status = "다운로드 기능이 존재하지 않습니다."}
    }
}
function _FoucsSaveList(fthis)
{
    if(this.Ontab == null)
        return;
    if(getProperty(fthis,"OnAir","N") == "N")
        return;

    var menu = this.searchObject(this.Ontab);
    if(menu != null)
    {
        try{
            eval(menu.m_ifrObject.id)._Fsavelist();
        }catch(e){window.status = "명단저장 기능이 존재하지 않습니다."}
    }
}


/**************	MP_LAYOUT CUSTOM	****************/

$(function(){
    $('#layerInOut').draggable({
        axis:'x'
        ,containment:'document'
        ,drag: handleDragStop
        ,stop:stopDrag
        ,start:startDrag
    })

    $('*').keydown(function(e){
        if(e.keyCode==107){
            $('.content').css('margin-left',0);
            $('#layerInOut').css('left',0);
        }else if(e.keyCode==109){
            $('.content').css('margin-left',201);
            $('#layerInOut').css('left',194);
        }
    })


})//handler end

function handleDragStop( event, ui ) {
    var offsetXPos = parseInt( ui.offset.left );
    $('.content').css('margin-left',offsetXPos+7);
}

function stopDrag(event, ui){
    $('#layerInOut').css('background','url("http://cdn.touch-down.co.kr/html/img/bg/inout_bg.jpg") repeat-y;');
}

function startDrag(event, ui){
    $('#layerInOut').css('background','url("http://cdn.touch-down.co.kr/html/img/bg/inout_bg_on.jpg") repeat-y;');
}



