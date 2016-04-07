$(document).ready(function() {
    var twitchLinkURL = "https://www.twitch.tv/";
    var twitchURL = "https://api.twitch.tv/kraken/streams/";
    var twitchURLEnd = "?callback=?";
    var users = ["storbeck", "terakilobyte", "habathcx",
                 "RobotCaleb","thomasballinger","noobs2ninjas",
                 "beohoff","brunofin"];
    //API link format: twitchURL + "username" + twitchURLEnd;
    var userData = [
        Promise.resolve($.getJSON(twitchURL + users[0] + twitchURLEnd)),
        Promise.resolve($.getJSON(twitchURL + users[1] + twitchURLEnd)),
        Promise.resolve($.getJSON(twitchURL + users[2] + twitchURLEnd)),
        Promise.resolve($.getJSON(twitchURL + users[3] + twitchURLEnd)),
        Promise.resolve($.getJSON(twitchURL + users[4] + twitchURLEnd)),
        Promise.resolve($.getJSON(twitchURL + users[5] + twitchURLEnd)),
        Promise.resolve($.getJSON(twitchURL + users[6] + twitchURLEnd)),
        Promise.resolve($.getJSON(twitchURL + users[7] + twitchURLEnd)),
    ];

    
    getUsers();
    getFCCData();
    function getFCCData() {
        var fccURL = twitchURL + "freeCodeCamp" + twitchURLEnd;
        $.getJSON(fccURL, function(json){
           if (json.stream !== null) {
               var fccLink = '<h2><a target="_blank" href="https://www.twitch.tv/freecodecamp">FreeCodeCamp</a></h2>'
                var streamThumb = json.stream.preview.large;
                var thumbDiv = '<div class="videoThumb" style="background-image: url(' + streamThumb + ')"><a target="_blank" href="' + json. stream.channel.url + '"><i class="fa fa-play"></i></a></div>';
                var description = '<p class="userDesc">Currently Streaming: <br>' + json.stream.channel.status + '</p>';
                
                
                var content = $("#fccStatus").html(fccLink + thumbDiv + description);
               
               $("header > p > a").css("color", "green");
               $("header > p > a").html("online");                   
           }
        });
        
    }
    
    

    function getUsers() {
        Promise.all(userData).then(function(json){
           
            for (var i=0; i < json.length; i++) {
                var userURL = twitchURL + currentUser + twitchURLEnd;
                var currentUser = users[i];
                if (json[i].error !== undefined) {
                    var URL = '<a target="_blank" href="' + twitchLinkURL + currentUser + '">' + currentUser + '</a>';
                    var content = '<div class="userPanel"><h2 class="faded">'+ URL +'</h2><p class="faded unavailable">'+ 
                                    "Error: " + JSON.stringify(json[i].status) + "<br>" +
                                    JSON.stringify(json[i].message).substr(1, json[i].message.length) + '</p></div>';
                } 
                else if (json[i].stream === null) {
                    var URL = '<a target="_blank" class="faded" href="' + twitchLinkURL + currentUser + '">' + currentUser + '</a>';
                    var content = '<div class="userPanel"><h2>' + URL + 
                        '</h2><p class="unavailable faded">user is not currently streaming</p></div>';
                }
                else {
                    var URL = '<a target="_blank" href="' + twitchLinkURL + currentUser + '">' + currentUser + '</a>';
                    var streamThumb = json[i].stream.preview.large;
                    var thumbDiv = '<div class="videoThumb" style="background-image: url(' + streamThumb + ')"><a target="_blank" href="' + json[i].stream.channel.url + '"><i class="fa fa-play"></i></a></div>';
                    var description = '<p class="userDesc">Currently Streaming: <br>' + json[i].stream.channel.status + '</p>';
                    
                    var content = '<div class="userPanel"><h2 class="available">'+ URL + '</h2>'  + thumbDiv + description + '</div>';
                }
                $("#userContainer").html($("#userContainer").html() + content); 
            } // end of for loop
        }); // end of promise function
    } // end of getUsers()
});