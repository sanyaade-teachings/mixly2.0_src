function save2moodle() {
	var id=getUrlParam('id');
	var hash=getUrlParam('hash');
	var userid=getUrlParam('userid');
	var taskid=getUrlParam('taskid');
	if(id==null||hash==null||userid==null){
	   alert('参数有误，请检查(请从作业进入)');
	   return false;	
	}
 //event_save('saveSever');
	var data='';
 //if (document.getElementById('tab_arduino').className == 'tabon') {
  	data = mixlyjs.getCodeContent();
  		type='py';
  	 console.log(data)
  	 console.log(type);
  //	if(data==null){
      	  var xml = Blockly.Xml.workspaceToDom(Mixly.Editor.blockEditor);
         data = Blockly.Xml.domToText(xml);
        	 console.log(data)
    		type='xml';
    			 console.log(type);
   // }
//		  xmlCode = mixlyjs.getXmlCode("project");
 //   console.log(xmlCode)
//	}else{
//		data = mixlyjs.getXmlContent("project");
//  	type='xml';
//	} 
  $.post('../../../post_server_js.php',{unionid:id,hash:hash,userid:userid,content:data,type:type},function(result){
  	var json=eval('(' + result + ')');
    alert(json.result);
  });	
}

function loadfrommoodle() {

//当有localStorage缓存时，不从api接口中读取数据，否则api读取后会存在localStorage中，重复显示出来 add by qiang 20180521
var xml_str;
console.log('loadfrommoodle');
  if ('localStorage' in window && window['localStorage'] != null && window.localStorage[Mixly.Config.BOARD.boardName]) {
    xml_str = window.localStorage[Mixly.Config.BOARD.boardName];
	console.log('localStorage');
	  console.log(xml_str);
	  var pattern=/<xml[\w\W]*?>(.*)<\/xml>/i
	var code=pattern.exec(xml_str)
	console.log(code);
	
	if( code!=null&&code[1]!=''){
		console.log(code[1]);
		console.log('read from localStorage');
		return false;
	}
  }
  /*else{
	  if(typeof JSFuncs!='undefined' && typeof JSFuncs.loadFromLocalStorageCache!='undefined')
		xml_str =(JSFuncs.loadFromLocalStorageCache());
  }*/


	var data='';
var type='xml';
		var id=getUrlParam('id');
		var hash=getUrlParam('hash');
		var userid=getUrlParam('userid');
		var taskid=getUrlParam('taskid');
		if(id==null||hash==null||userid==null){
		  // alert('参数有误，请检查');
		   return false;	
		}
		$.post('../../../get_content_microbitpy.php',{unionid:id,hash:hash,userid:userid,content:data},function(result){
	   console.log('read from api post');
	   console.log(result);
                    if(result==''){
						return;	
				}else{
					var count = Mixly.Editor.blockEditor.getAllBlocks().length;
		      if (count){
						Mixly.Editor.blockEditor.clear();
					}
type=result.substr(0,3)
data=result.substr(3); 
}
//		alert(2);	
		 data = mixlyjs.translateQuote(data, true);
		 console.log(type);
if(type=='xml'||type=='mix')
{
    mixlyjs.renderXml(data);
}else{
	mixlyjs.renderIno(data);
}
var selectFile = document.getElementById('select_file');
  if (selectFile != null) {
    $("#select_file").remove();
    $("#select_file_wrapper").remove();
    selectFile = document.getElementById('select_file');
  }
  if (selectFile == null) {
    var selectFileDom = document.createElement('INPUT');
    selectFileDom.type = 'file';
    selectFileDom.id = 'select_file';

    var selectFileWrapperDom = document.createElement('DIV');
    selectFileWrapperDom.id = 'select_file_wrapper';
    selectFileWrapperDom.style.display = 'none';
    selectFileWrapperDom.appendChild(selectFileDom);

    document.body.appendChild(selectFileWrapperDom);
    selectFile = document.getElementById('select_file');
   
//	$("#select_file").change(parseInputXMLfile);
  }
  selectFile.click();
	//	      var count = Mixly.Editor.blockEditor.getAllBlocks().length;
	//	      if (count) {// && confirm('Replace existing blocks?\n"Cancel" will merge.')
	//	        Mixly.Editor.blockEditor.clear();
	//	      }
	  }); 
     
// clearTimeout(Timer2);
}

function getUrlParam(name) {
 var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
 var r = window.location.search.substr(1).match(reg); //匹配目标参数
 if (r != null) return unescape(r[2]); return null; //返回参数值
}

function save2hex(){
	var firmware = $("#firmware").text();
	var output = getHexFile(firmware);
	var blob = new Blob([output], {type: 'text/xml'});
  saveAs(blob, 'blockduino.hex');
}

   
	var Timer =	setTimeout("changeState()",3000 );  	
	function changeState(){
	    var id=getUrlParam('id');
		var hash=getUrlParam('hash');
		var userid=getUrlParam('userid');
		var taskid=getUrlParam('taskid');
		if(id==null||hash==null||userid==null){
		  // alert('参数有误，请检查');
		   return false;	
		}
  //alert($('#nav').attr('id'));
  $('#nav #nav-right-btn-list').append('<li class="layui-nav-item"  lay-unselect=""><a href="#"   onclick="save2moodle()" class="icon-upload">保存到教学平台</a></li>');
        clearTimeout(Timer);
        loadfrommoodle();
        //	var Timer2 =	setTimeout("loadfrommoodle()",1000 );  	
        
	}

  
