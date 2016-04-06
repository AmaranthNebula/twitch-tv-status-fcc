$(document).ready(function() {
    var twitchLinkURL = "https://www.twitch.tv/";
    var twitchURL = "https://api.twitch.tv/kraken/streams/";
    var twitchURLEnd = "?callback=?";
    var users = ["storbeck", "terakilobyte", "habathcx",
                 "RobotCaleb","thomasballinger","noobs2ninjas",
                 "beohoff","brunofin"];
    
    //freeCodeCamp Panel
    
    getUsers();
    getFCCData();
    function getFCCData() {
        var fccURL = "freecodecamponline.json";// should be twitchURL + "freeCodeCamp" + twitchURLEnd;
        $.getJSON(fccURL, function(json){
           if (json.stream !== null) {
               var fccLink = '<h2><a href="https://www.twitch.tv/freecodecamp">FreeCodeCamp</a></h2>'
                var streamThumb = "images/streamMissingThumb.jpg";//json.stream.preview.large;
                var thumbDiv = '<div class="videoThumb" style="background-image: url(' + streamThumb + ')"><a href="' + json. stream.channel.url + '"><i class="fa fa-play"></i></a></div>';
                var description = '<p class="userDesc">Currently Streaming: <br>' + json.stream.channel.status + '</p>';
                
                
                var content = $("#fccStatus").html(fccLink + thumbDiv + description);
               
               $("header > p > a").css("color", "green");
               $("header > p > a").html("online");                   
           }
        });
        
    }
    function getUsers() {
       for (var i = 0; i < users.length; i++) {
        var userURL = "freecodecamponline.json"; // should be twitchURL + currentUser + twitchURLEnd;
        var currentUser = users[i];
        console.log(currentUser);
        
        $.getJSON(userURL, function(json) {
            if (json.error !== undefined) {
                var URL = '<a href="' + twitchLinkURL + currentUser + '">' + currentUser + '</a>';
                var content = '<div class="userPanel"><h2 class="faded">'+ URL +'</h2><p class="faded unavailable">'+ 
                                "Error: " + JSON.stringify(json.status) + "<br>" +
                                JSON.stringify(json.message).substr(1, json.message.length) + '</p></div>';
            } 
            else if (json.stream === null) {
                var URL = '<a class="faded" href="' + twitchLinkURL + currentUser + '">' + currentUser + '</a>';
                var content = '<div class="userPanel"><h2>' + URL + 
                    '</h2><p class="unavailable faded">user is not currently streaming</p></div>';
            }
            else {
                var URL = '<a href="' + twitchLinkURL + currentUser + '">' + currentUser + '</a>';
                var streamThumb = "images/streamMissingThumb.jpg";//json.stream.preview.large;
                var thumbDiv = '<div class="videoThumb" style="background-image: url(' + streamThumb + ')"><a href="' + json. stream.channel.url + '"><i class="fa fa-play"></i></a></div>';
                var description = '<p class="userDesc">Currently Streaming: <br>' + json.stream.channel.status + '</p>';
                
                var content = '<div class="userPanel"><h2 class="available">'+ URL + '</h2>'  + thumbDiv + description + '</div>';
            }
            console.log(URL);
            $("#userContainer").html($("#userContainer").html() + content);
        });
       } // end of for loop
    }
    
    
    
//    for (var i = 0; i < users.length; i++) {
//        var currentUser = users[i];
//        $("#userContainer").html($("#userContainer").html() + '<div class="userPanel"><h2>'+ 
//                                                                 currentUser +'</h2></div>');
//    } 
    
});