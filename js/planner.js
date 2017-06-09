(function($){
    $.isBlank = function(obj){
    return(!obj || $.trim(obj) === "");
    };
})(jQuery);

function loadPlayer() {
    var name = $("#summonerInput").val();

    if($.isBlank(name))
    {
        $("#summonerInputGroup").addClass("has-error");
        $("#summonerFormAlert").show();
        $("#summonerFormAlertMessage").text("Invalid Summoner Name");
        return false;
    }



    // Add a cookie if the player wishes to be remembered
    if($("#rememberMeChkBx").prop('checked'))
    {
        Cookies.set('summoner', document.getElementById("summonerInput").value, { expires: 150 });
    }
    else
    {
        //else clear the cookie
        Cookies.remove('summoner');
    }

    // Show the loading gif
    $("#summonerLoadingGifContainer").fadeIn();

    $("#summonerLoader").animate({
        opacity:0,
        height:"toggle"
    }, function() {
        // Hide the errors once the animation is done
        $("#summonerInputGroup").removeClass("has-error");
        $("#summonerFormAlert").hide();

        // Proceed with load
        loadPlayerInfo();
    });
}

function loadPlayerInfo()
{
    $.getJSON("php/loadPlayer2.php", {
        sumonner: $("#summonerInput").val(),
        region: $("#regionSelect").val()
    }).done(function(data){

    }).fail(function(){
        $("#summonerLoadingGifContainer").fadeOut();
        $("#summonerLoader").animate({
            opacity:1,
            height:"toggle"
        });
        $("#summonerFormAlert").show();
        $("#summonerFormAlertMessage").text("Could not connect to IP Planner server");
    });
}

