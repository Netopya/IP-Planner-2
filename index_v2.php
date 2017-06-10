<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>IP Planner</title>

        <script type="text/javascript" src="../js/ga_script.js"></script>

        <!-- JQuery 3.2.1 -->
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>

        <!-- Bootstrap 3.3.7 -->
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

        <!-- Bootstrap-Table 1.11.1 -->
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.css">

        <!-- Latest compiled and minified JavaScript -->
        <script src="//cdnjs.cloudflare.com/ajax/libs/bootstrap-table/1.11.1/bootstrap-table.min.js"></script>

        <!-- Moment.js 2.18.1 -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js" integrity="sha256-1hjUhpc44NwiNg8OwMu2QzJXhD8kcj+sJA3aCQZoUjg=" crossorigin="anonymous"></script>

        <!-- Chart.js 2.6.0 -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js" integrity="sha256-SiHXR50l06UwJvHhFY4e5vzwq75vEHH+8fFNpkXePr0=" crossorigin="anonymous"></script>

	    <script src="js/js.cookie.js"></script>

        <!-- Isotope -->
        <script src="https://unpkg.com/isotope-layout@3/dist/isotope.pkgd.min.js"></script>

        <!-- Images Loaded -->
        <script src="https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js"></script>

        <link rel="stylesheet" href="css/stylesheet.css">
        <link rel="stylesheet" href="css/stylesheet2.css">

        <meta property="og:type" content="website"> 
        <meta property="og:url" content="http://www.netopyaplanet.com/ipplanner/"> 
        <meta property="og:title" content="IP Planner"> 
        <meta property="og:image" content="http://www.netopyaplanet.com/ipplanner/img/banner1.jpg"> 
        <meta property="og:site_name" content="IP Planner">
        <meta property="og:description" content="A quick and easy tool to calculate how long it will take you to unlock League of Legends champions based on your personal Influence Points rate">
        <meta property="fb:app_id" content="694334497298278">

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <script src="js/planner.js"></script>
    </head>
    <body>
      	<div id="fb-root"></div>
        <script>(function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));</script>
        <div class="container marketing" id="marketingContainer">
            <div class="row">
                <div class="col-lg-12">
                    <div class="banner">
                        <a href="index.php"><img src="img/banner1.jpg" class="img-responsive" height="150" width="900"/></a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <ul class="nav nav-tabs">
                        <li role="presentation"><a href="../"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span> Back to Netopyaplanet</a></li>
                        <li role="presentation"><a href="index.php">IP Planner home</a></li>
                        <li role="presentation" class="active"><a href="index_v2.php">IP Planner 2 alpha</a></li>
                        <li role="presentation"><a href="about.php">About &amp; Help</a></li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="socialcontainer well well-sm">
                        <div class="row">
                            <div class="col-xs-12">
                                <div>
                                    <div class="fb-like" data-href="http://netopyaplanet.com/ipplanner/" data-layout="standard" data-action="like" data-show-faces="false" data-share="true"></div>	
                                </div>
                                <div id="twitterShare">
                                    <a href="https://twitter.com/share" class="twitter-share-button" data-url="http://netopyaplanet.com/ipplanner/" data-via="Netopya" data-hashtags="ipplanner">Tweet</a>
                                    <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');</script>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="alert alert-warning" role="alert">Welcome to the next version of IP Planner! Riot Games will be depreciating the API that IP Planner uses to retrieve summoner data on <strong>Monday, July 24th, 2017</strong>. The replacement unfortunately API does not have the ability to retrieve summoner IP information. However there is no need to worry! Development of IP Planner 2 has started and should be completed by the deadline. We will transition to a model where your IP rate is estimated based on statistics from your matches so you can still enjoy the features of the original IP Planner! Tryout the development version early here as IP Planner 2 comes to life.</div>
                </div>
            </div>
            <div class="row">
                <div id="summonerLoader" class="col-lg-12">
                    <div class="jumbotron">
                        <div id="summonerFormAlert" class="alert alert-danger alert-dismissible" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <span id="summonerFormAlertMessage">Better check yourself, you're not looking too good.</span>
                        </div>
                        <h1>Lookup your League of Legends IP rate:</h1>
                        <form onsubmit="loadPlayer(); return false;">
                            <div class="form-inline">
                                <div class="form-group" id="summonerInputGroup">
                                    <label class="sr-only" for="summonerInput">Summoner Name</label>
                                    <input class="form-control input-lg" type="text" id="summonerInput" placeholder="Summoner Name" method="GET" value="<?php echo $summoner; ?>"/>
                                </div>
                                <label>Region:
                                    <select id="regionSelect" class="form-control input-lg">
                                        <option value="NA">NA</option>
                                        <option value="EUW">EUW</option>
                                        <option value="EUNE">EUNE</option>
                                        <option value="BR">BR</option>
                                        <option value="TR">TR</option>
                                        <option value="RU">RU</option>
                                        <option value="LAN">LAN</option>
                                        <option value="LAS">LAS</option>
                                        <option value="OCE">OCE</option>
                                        <option value="KR">KR</option>
                                        <option value="JP">JP</option>
                                        <option value="PBE">PBE</option>
                                    </select>
                                </label>
                                <input type="button" id="summonerGo" class="btn btn-primary btn-lg" value="Go!" onclick="loadPlayer()"/>
                                
                            </div>
                            <label>
                            <input type="checkbox" id="rememberMeChkBx"/>
                            Remember me
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row">
                <div id="summonerLoadingGifContainer" class="col-lg-12">
                    <img src="img/ajax-loader.gif" id="summonerLoadingGif"/><br/>
                    <span>Retrieving information...</span>
                </div>
            </div>
            <div class="row" id="RecentIPanalysisContainer">
                <div class="col-lg-12">
                    <div id="summonerNameNotifcation" class="alert alert-info" role="alert">Welcome <strong><span id="summonerNameOutput"></span></strong>!</div>
                </div>
                <div class="col-lg-12">
                    <h1>IP per day of your last 20 matches</h1>
                </div>
                <div id="chartContainer" class="col-lg-12">
                    <canvas id="myChart"></canvas>
                </div>
                <div class="col-lg-12">
                    <span>That's an estimated rate of <span id="recentIPperiod"></span><img src="img/15px-IpPoints.png"/>/day</span>
                </div>
            </div>
            <div class="row" id="champSelectorContainer">
                <div class="col-lg-12">
                    <h1>Which champions would you like to unlock?</h1>
                    <div class="row">
                        <div class="col-lg-6">
                            <span>I already know how much IP I want <input class="btn btn-primary" type="button" value="Skip" onclick="skipChampSelect()"/></span>
                        </div>
                        <div class="col-lg-4 col-lg-offset-2">
                            <div id="championSearchGroup" class="form-group has-feedback">
                                <input type="text" class="form-control" id="championSearchBox" placeholder="Search" onchange="searchChamps()" onkeyup="this.onchange();" onpaste="this.onchange();" oninput="this.onchange();"/>
                                <span class="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12" id="championPortraitsContainer">
                    
                    <ul id="portraitsContainer">

                    </ul>
                </div>
                
                <div class="championIPResult row">
                    <div class="col-md-6">
                        <span>Champions selected: <span id="numberOfChampsSelected">0</span></span>
                    </div>
                    <div class="col-md-6">
                        <span>Total IP: <span id="totalIPSum">0</span><img src="img/15px-IpPoints.png"/></span>
                    </div>				
                </div>
                
            </div>
            <div class="row" id="specifyIPContainer">
                <div class="col-lg-12">
                    <span>How much IP would you like? <input type="text" id="manualIPtext" onkeyup="manualIPCalc()" class="form-control"/></span>
                </div>	
            </div>
            <div class="row" id="IPTimeResultContainer">
                <div class="col-lg-12">
                    <h1>It will take you <span id="IPTimeResult"></span> days to earn enough ip!</h1>
                </div>	
            </div>
            <div id="table-container" class="row">
                <table class="table table-bordered" id="table">
                    <thead>
                        <tr>
                            <th data-field="gameId">Game ID</th>
                            <th data-field="day">Game Date</th>
                            <th data-field="prettyDuration">Game Duration</th>
                            <th data-field="gameMode">Game Mode</th>
                            <th data-field="gameType">Game Type</th>
                            <th data-field="outcome">Result</th>
                            <th data-field="ip">Estimated IP</th>
                            <th data-field="firstWin">Guessed First Win</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </body>
</html>
