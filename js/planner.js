(function($){
    $.isBlank = function(obj){
    return(!obj || $.trim(obj) === "");
    };
})(jQuery);

var rates = {"Win": {base: 18, rate: 2.312}, "Fail": {base: 16, rate: 1.405}, "Unknown": {base: 17, rate: 1.859}};
var firstWinIP = 150;

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
    $.post("php/loadPlayer2.php", {
        summoner: $("#summonerInput").val(),
        region: $("#regionSelect").val()
    }, "json").done(function(data){
        var result;
        
        try {
            result = JSON.parse(data);
        } catch(e) {
            showLoadError("IP Planner server response error");
            return false;
        }

        if(result["status"] === "ERROR")
        {
            showLoadError(result["message"]);
        }
        else
        {
            parseMatchStats($("#summonerInput").val(), result["matches"]);
        }
    }).fail(function(){
        showLoadError("Could not connect to IP Planner server");
    });
}

function showLoadError(message)
{
    $("#summonerLoadingGifContainer").fadeOut();
    $("#summonerLoader").animate({
        opacity:1,
        height:"toggle"
    });
    $("#summonerFormAlert").show();
    $("#summonerFormAlertMessage").text(message);
}

function parseMatchStats(summoner, matches)
{
    $("#summonerLoadingGifContainer").fadeOut();

    var days = {};

    for(var i = 0; i < matches.length; i++)
    {
        matches[i].date = new Date(matches[i].gameDate);
        matches[i].prettyTime = matches[i].date.toString();
        matches[i].moment = moment(matches[i].gameDate);
        matches[i].day = matches[i].moment.format("YYYY-MM-DD");
        matches[i].prettyDuration = formatTime(matches[i].gameDuration);
        matches[i].outcome = determineOutcome(matches[i]);
        matches[i].ip = estimateIP(matches[i]);

        if(days[matches[i].day] === undefined)
        {
            days[matches[i].day] = {ip: 0, matches: []};
        }

        days[matches[i].day].matches.push(matches[i]);
        days[matches[i].day].ip += matches[i].ip;
    }

    var dayKeys = Object.keys(days);

    for(var i = 0; i < dayKeys.length; i++)
    {
        for(var j = days[dayKeys[i]].matches.length - 1; j >= 0; j--)
        {
            if(days[dayKeys[i]].matches[j].outcome === "Win")
            {
                days[dayKeys[i]].matches[j].firstWin = true;
                days[dayKeys[i]].ip += firstWinIP;
                break;
            }
        }
    }

    console.log(matches);
    console.log(days);

    var $table = $('#table');

    $table.bootstrapTable({data: matches});
}

function formatTime(seconds)
{
    var minutes = Math.floor(seconds / 60);
    var remaining_sec = seconds - minutes * 60;

    return minutes + ":" + remaining_sec;
}

function determineOutcome(match)
{
    var champ = match.champion;
    var foundTeam = -1;

    for(var i = 0; i < match.participants.length; i++)
    {
        if(match.participants[i].championId === champ)
        {
            if(foundTeam === -1)
                foundTeam = match.participants[i].teamId;
            else
                return "Unknown";
        }
    }

    for(var i = 0; i < match.teams.length; i++)
    {
        if(match.teams[i].teamId == foundTeam)
        {
            return match.teams[i].win;
        }
    }

    return "Unknown";
}

function estimateIP(match)
{
    var rate = rates[match.outcome];

    return Math.floor(rate.base + Math.floor(match.gameDuration / 60) * rate.rate);
}