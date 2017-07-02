var champips = {};
var selectedChampions = {};
var rates = {"Win": {base: 18, rate: 2.312}, "Fail": {base: 16, rate: 1.405}, "Unknown": {base: 17, rate: 1.859}};
var firstWinIP = 150;
var isotopeLoaded = false;
var xtotalRate;

(function($){
    $.isBlank = function(obj){
        return(!obj || $.trim(obj) === "");
    };    
})(jQuery);

$(function() {
    $.ajax({
        url: "champs.json",
        success: function (data) {
            champs = data.data;

            // Generate a clickable portrait for each champion
            for(var i = 0; i < champs.length; i++) {
                var content = $('<li class="champion_port" title="' + champs[i].name + '" data-keywords="' + champs[i].name.toLowerCase() + '" data-champ-id="' + champs[i].id + '"><img src="img/ports2/' + champs[i].img + '"/><img src="img/check.png" class="checkmark"></li>');
                
                $("#portraitsContainer").append(content);

                champips[champs[i].id] = {ip: parseInt(champs[i].ip), selected: false};
            }

            $(".champion_port").click(function() {
                var portrait = $(this);

                portrait.children(".checkmark").toggle();
                portrait.toggleClass("selectedPortrait");

                var champid = parseInt(portrait.data('champ-id'))
                var champ = champips[champid];
                
                var selected = !champ.selected
                champ.selected = selected
                
                if(selected)
                {
                    selectedChampions[champid] = champ;
                }
                else
                {
                    delete selectedChampions[champid];
                }


                var count = Object.keys(selectedChampions).length;
			    var totalcip = 0;

                for(var ochamp in selectedChampions)
                {
                    totalcip += selectedChampions[ochamp].ip;
                }

                // Display the results
                $("#numberOfChampsSelected").html(count);
                $("#totalIPSum").html(totalcip);

                displayRate(totalcip);
            });

            $("#portraitsContainer").tooltip({
                content: function () {
                    return $(this).prop('title');
                },
                track:true,
                show:false,
                hide:{duration:100}
            });
        }
    });

    $("#manualIPCalcForm").submit(false);

    var rememberedSummoner = Cookies.get('summoner');

    if (rememberedSummoner) {
        $("#summonerInput").val(rememberedSummoner);
        $("#rememberMeChkBx").prop('checked', true);
    }
});

function displayRate(totalip) {
    $("#IPTimeResult").text(Math.round(totalip/xtotalRate));

    // If this is the first click, scroll to the bottom of the page to show the user the result section
    if(!($("#IPTimeResultContainer").is(":visible"))) {
        $("#IPTimeResultContainer").fadeIn();
        //window.scrollTo(0,document.body.scrollHeight);
        $('html,body').animate({scrollTop: $(document).height()}, 600);
    }
}

function loadPlayer() {
    var name = $("#summonerInput").val();

    if($.isBlank(name))
    {
        $("#summonerInputGroup").addClass("has-error");
        $("#summonerFormAlert").show();
        $("#summonerFormAlertMessage").html("Invalid Summoner Name");
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
            showLoadError("IP Planner server response error, please try again later");
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
    $("#summonerFormAlertMessage").html(message);
}

function parseMatchStats(summoner, matches)
{
    $("#summonerNameOutput").html(summoner);

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
            days[matches[i].day] = {ip: 0, matches: [], dayName: matches[i].moment.format("MMM Do")};
        }

        days[matches[i].day].matches.push(matches[i]);
        days[matches[i].day].ip += matches[i].ip;
    }

    var dayKeys = Object.keys(days);
    var totalIP = 0;

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

        totalIP += days[dayKeys[i]].ip;
    }

    var ipRate = Math.round(totalIP / dayKeys.length);
    xtotalRate = ipRate;

    $("#recentIPperiod").html(ipRate);

    var ctx = document.getElementById("myChart").getContext('2d');

    var ips = listIPValues(days);

    var dayLabels = listDayLabels(days);  

    $("#summonerLoadingGifContainer").animate({
        opacity:0,
        height:"toggle"
    }, function() {
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dayLabels.reverse(),
                datasets: [{
                    label: summoner,
                    data: ips.reverse(),
                    backgroundColor: "rgba(151,187,205,0.5)",
                    pointBorderColor: "rgba(255,255,255,1)",
                    pointBackgroundColor: "rgba(151,187,205,1)",
                    pointRadius: 5,
                    borderColor: "rgba(151,187,205,1)"
                }]
            },
            options: {
                maintainAspectRatio: false,
                legend: {display: false}
            }
        });

        $('html,body').animate({scrollTop: $("#RecentIPanalysisContainer").offset().top}, 600);

        setTimeout(function() {
            $("#champSelectorContainer").fadeIn(400, function() {
                $('html,body').animate({scrollTop: $("#RecentIPanalysisContainer").offset().top}, 600);

                // Load Isotope
                $('#portraitsContainer').isotope({
                    // options
                    itemSelector: '.champion_port',
                    hiddenStyle: {
                        opacity: 0
                    },
                    visibleStyle: {
                        opacity: 1
                    },
                    masonry: {
                        columnWidth: 52,
                        isFitWidth: true
                    }
                });

                isotopeLoaded = true;
            });
        }, 3000);

        
    });
    $("#RecentIPanalysisContainer").fadeIn();

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

function listIPValues(days)
{
    var ips = [];

    for(var o in days) {
        ips.push(days[o].ip);
    }

    return ips;
}

function listDayLabels(days)
{
    var labels = [];

    for(var o in days) {
        labels.push(days[o].dayName);
    }

    return labels;
}

function searchChamps() {

    if(!isotopeLoaded)
        return;

    var searchKey = $("#championSearchBox").val().trim().toLowerCase();
    var foundChamps = 0;
    
    var portContainer = $('#championPortraitsContainer');
    portContainer.stop(); //Stop any animations
    var curHeight = portContainer.height();
    
    // Filter champions based on the serch term
    $("#portraitsContainer").isotope({
        filter: function() {
            return !searchKey || $(this).data("keywords").indexOf(searchKey) >= 0;
        }
    });

    // If no champions found stylize the search box
    if($("#portraitsContainer").isotope('getFilteredItemElements').length == 0 && searchKey)
    {
        $("#championSearchGroup").addClass("has-error");
    }
    else
    {
        $("#championSearchGroup").removeClass("has-error");
    }
    
    $('html,body').stop(); //Stop any scrolling
    //http://stackoverflow.com/questions/5003220/javascript-jquery-animate-to-auto-height
    
    // smoothly grow or shrink the champions container
    var autoHeight = portContainer.css('height', 'auto').height();
    portContainer.height(curHeight).animate({height: autoHeight}, 600, function ()
    {
        // scroll back to the search box
        $('html,body').animate({scrollTop: $("#championSearchGroup").offset().top}, 600);
    });
}

function skipChampSelect() {
    $("#champSelectorContainer").animate({
        opacity:0,
        height:"toggle"
    });

    $("#specifyIPContainer").fadeIn();
}

function manualIPCalc() {
    displayRate($("#manualIPtext").val());
}

function returnChampSelect() {
    $("#champSelectorContainer").animate({
        opacity:1,
        height:"toggle"
    });

    $("#specifyIPContainer").fadeOut();
}