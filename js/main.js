/**
 * Show blog list and acticle.
 * @author cocosongying 2017/12/28
 * https://github.com/cocosongying/blog
 */
var thanksContent = '<center><hr/><h4>磨叽熊猫感谢有您的支持和关注</h4><h3>👇</h3><img src="img/wechatpay.jpeg" width="320" height="320" /></center>';
/* Generate json data */
var json = [];
for (var i = article_list.length - 1; i >= 0; i--) {
    json.push({blog: marked(article_list[i])});
};

/* Get Markdown file and transform into HTML */
function getContent(url, id){
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }else{
        xmlhttp=new ActiveXObject(Microsoft.XMLHTTP);
    }

    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            document.getElementById(id).innerHTML = marked(xmlhttp.responseText + thanksContent);
        }else if(xmlhttp.status==404){
            showBlogList(json);
        }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
};

/* Get the parameters in URL */
function getQueryString(name) {
  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if(r!=null) { 
      return  unescape(decodeURI(r[2]));
  } else { 
      return null;
  }
};

/* Show blog list */
function showBlogList(jsondata) {
    $('#table').bootstrapTable({
        pagination: false,                   //是否显示分页（*）
        striped: false,                      //是否显示行间隔色
        sortable: false,                    //是否启用排序
        pageNumber: 1,                      //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        showHeader: false,
        showFooter: false,
        paginationDetailHAlign: "right",
        paginationPreText: ' < ',
        paginationNextText: ' > ',

        columns: [{
            field: 'blog',
            title: 'Blog'
        }],
        data: jsondata
    });
}

/* Judging the content of the display according to the parameters in the URL */
var file=getQueryString("file");
var search=getQueryString("search");
if(search !=null && search.toString().length>0) {
    // Search results list based on search information
    var searchjson = [];
    for (var i = article_list.length - 1; i >= 0; i--) {
        if(article_list[i].indexOf(search)>0){
            searchjson.push({blog: marked(article_list[i])});
        }
    };
    $("#search").val(search);
    showBlogList(searchjson);
}else if(file !=null && file.toString().length>0) {
    // Show Markdown content
    var url="https://cocosongying.github.io/blog/file/" + file + ".md";
    var id="content";
    getContent(url, id);
}else{
    // Show the default list
    showBlogList(json);
}

/* Click the submit button and search */
$("#btn_submit").click(function(e){
    //var txt = $("#search").val();
    //window.location.href="index.html?search=" + encodeURI(txt);
});

/* Hit Enter key and search */
document.onkeydown = function (e){                //网页内按下回车触发
    if(e.keyCode==13){
        //var txt = $("#search").val();
        //window.location.href="index.html?search=" + encodeURI(txt);
        return false;
    }
};

/* Generate footer info */
var footerContent = '<span class="text-muted"><center><p><a href="thanks.html">👉 打赏 👈</a> Design by <a href="http://github.com/cocosongying/" title="cocosongying">cocosongying</a> Copyright © 2018</p></center></span>';
document.getElementById('footer').innerHTML = footerContent;
