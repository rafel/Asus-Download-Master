var imageurl = chrome.extension.getURL("image/buttonIcon.png");

var okimageurl = chrome.extension.getURL("image/ok.gif");
var noimageurl = chrome.extension.getURL("image/no.gif");
var loadingimageurl = chrome.extension.getURL("image/loading.gif");

$(document).ready(function() {
    var url;
    var username;
    var password;

    // Loads all settings
    chrome.storage.local.get( "url", function (result) {
        url = result.url;
         chrome.storage.local.get( "username", function (result) {
            username = result.username;
            chrome.storage.local.get( "password", function (result) {
                password = result.password;

                    // If host is set
                    if (url && url !='') {
                        // build url
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
                        searchForLinksAndAddButtons(url);
                    }
            });
        });
        
    });
} );


function searchForLinksAndAddButtons(url)
{

    var counter =0;
    // Add links if magnet is found
    $('body').find('a').each(function() {

            var link = $(this).attr('href');
            if(link)
            if(link.match("^magnet:\?")){
                var id = 'routerMagnetLink'+ counter;
                $(this).after(
                        '<a id="'+id+'" style="cursor: pointer;">'
                        + '<img src="'+imageurl+'" "title="Magnet link to router"></a>'
                )
                $('#'+ id).click(function(){
                    makeLoading(id);
                    gotoLink(url,link, id);

                })
                counter++;
            }
    });
 }   
 
 
function makeLoading(id)
{
    var image = $('#'+id).children('img');
    image.attr('src', loadingimageurl); // change icon
    image.attr("title","Processing...");
}
function makeGreen(id)
{
    var image = $('#'+id).children('img');
    image.attr('src', okimageurl); // change icon
    image.attr("title","The download was successfully sent to the router");   
}
function makeRed(id, text)
{
    var altText = "Failed to start";
    if(text.trim()!="")altText += ". Error msg: " + text;
    var image = $('#'+id).children('img');
    image.attr('src', noimageurl); // change icon
    image.attr("title",altText);
}
function gotoLink(url,link, id){
    var magnet = encodeURIComponent(link);
    var magneturl = url+'/downloadmaster/dm_apply.cgi?action_mode=DM_ADD&download_type=&again=no&usb_dm_url='+magnet+'&t=1338';
    sendRequest(magneturl, id);
}
function sendRequest(magneturl, id)
{
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
            if (xhr.readyState==4 && xhr.status==200)
            {
                check_result(id, xhr.responseText);
            }
    }
    
    xhr.open("GET", magneturl, true);
    
    xhr.send();
    
}
function check_result(id, text)
{
    
    if(text.trim()=="ACK_SUCESS")
    {
        makeGreen(id);
    }
    else
    {
        makeRed(id,text);
    }
}