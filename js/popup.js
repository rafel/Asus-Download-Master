$(function() 
    { 
    	var baseUrl;
    	var url = localStorage["url"];
	    var username = localStorage["username"];
	    var password = localStorage["password"];
        $(document).ready(function() {

        	if (url && url !='') {
        		if (username && username !='') {
        			if(password && password !=''){
        				url = 'http://' + username + ':' + password + '@' + url; 
        			}
        			else {
        				url = 'http://' + username + '@' + url;
        			}
	    		}else {
	    			url = 'http://' + url;
	    		}
	    		$('#links').append(' | <a href="'+url+'/downloadmaster" target="blank">Download Master</a>');
	    		url = url + '/downloadmaster/dm_print_status.cgi?action_mode=All';
	    		fillTheList(url);
	    		window.setInterval(function(){
        		fillTheList(url);
				}, 5000);
	        	

	    	}else{
	    		$("#downloadList").append("<center><p><a href='options.html' target='blank'>Click here to configure...</a></p></center>");
	    	}
		} );


    } 
);
function sendRequest(url, callback)
{
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
            if (xhr.readyState==4 && xhr.status==200)
            {
                callback(xhr.responseText);
            }
    }
    
    xhr.open("GET", url, true);
    
    xhr.send();
    
}

function fillTheList(url)
{
    sendRequest(url,responseFillTheList);
}


function responseFillTheList(data)
{
        var thelist
        $("#downloadList").html('<table id="downloadTable" class="display" cellspacing="0" width="100%"><thead><tr><th>Name</th><th>Progress</th><th>Size</th><th>Status</th><th>Download</th><th>Upload</th></tr></thead><tfoot><tr><th>Name</th><th>Progress</th><th>Size</th><th>Status</th><th>Download</th><th>Upload</th></tr></tfoot><tbody></tbody></table>');
        var htmlDownloadList = $("#downloadTable").children("tbody");
        htmlDownloadList.empty();
        thelist= $.parseJSON("["+data+"]");
        $.each(thelist,
            function(index,item)
            {
                addOneItemToHtmlDownloadList(item);
            }
        );
        $('#downloadTable').dataTable();
}

function addOneItemToHtmlDownloadList(item)
{
		var id = item[0];
		var filename = item[1];
		var progress = item[2];
		var size = item[3];
		var status = item[4];
		var type = item[5];
		var time = item[6];
		var download = item[7];
		var upload = item[8];
		var peers = item[9];
		var unkown = item[10];
		var havedone = item[11];
		var downloaddir_error = item[12];
		var downloaddir = item[12].slice(8); 
		progress =progress*100;
		progress =  Math.round(progress * 10)/10;

    var htmlDownloadList = $("#downloadTable").children("tbody");
   
    htmlDownloadList.append(
    "<tr class='bodyrows' id='downloadRow-"+id+"'>"+
    "<td class='filename' title='"+filename+"'>"+filename+"</td>"+
    "<td class='progress' title='"+progress+"%' alt='"+progress+"%'><div class='progressbar'><div class='progress-label' >"+progress+"%</div></td>"+
    "<td title='"+size+"' alt='"+size+"'>"+size+"</td> "+
    "<td title='"+peers+" peers' alt='"+peers+" peers'>"+status+"</td> "+
    "<td title='"+download+"' alt='"+download+"'>"+download+"</td> "+
    "<td title='"+upload+"' alt='"+upload+"'>"+upload+"</td> "+
    "</tr>"
    )
 var progressbar = $( "#downloadRow-"+id +" .progressbar" ),
      progressLabel = progressbar.children(".progress-label");

     progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" )
      }
    });

    progressbar.progressbar( "value", progress );
}