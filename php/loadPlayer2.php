<?php



function loadPlayer() {

    require("apikey.php");

    $region = $_POST['region'];

	$player = $_POST['summoner'];

    //return array("status" => "ERROR", "message" => "Service under construction, cannot lookup summoner ". $player . " in region " . $region);

    $lolregion = "";

	switch (strtolower($region)) {
		case 'na':
			$lolregion = "na1";
			break;
		case 'euw':
			$lolregion = "euw1";
			break;
		case 'eune':
			$lolregion = "eun1";
			break;
		case 'br':
			$lolregion = "br1";
			break;
		case 'tr':
			$lolregion = "tr1";
			break;
		case 'ru':
			$lolregion = "ru";
			break;
		case 'lan':
			$lolregion = "la1";
			break;
		case 'las':
			$lolregion = "la2";
			break;
		case 'oce':
			$lolregion = "oc1";
			break;
		case 'kr':
			$lolregion = "kr";
			break;
        case 'jp':
            $lolregion = "jp1";
			break;
        case 'pbe':
            $lolregion = "pbe1";
			break;
		default:
			$lolregion = "na1";
			break;
	}

    $curl = curl_init("https://". $lolregion . ".api.riotgames.com/lol/summoner/v3/summoners/by-name/" . $player . "?api_key=" . $lolkey);
    curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1));

    $result = curl_exec($curl);
    $zstatus = curl_getinfo($curl);
    $httpcode = $zstatus["http_code"];

    curl_close($curl);

    //var_dump(array("status" => "ERROR", "message" => $zstatus));

    if($httpcode == "404") {
        return array("status" => "ERROR", "message" => "Could not find summoner ". $player . " in region " . $region);
    }
    else if($httpcode != "200") {
        return array("status" => "ERROR", "message" => "Riot returned server error code: " . $httpcode);
    }

    $userInfo = json_decode($result, true);

    //return array("status" => "ERROR", "message" => "Found summoner ". $player . " in region " . $region . " with ID " . $userInfo["accountId"]);

    $curl = curl_init("https://". $lolregion . ".api.riotgames.com/lol/match/v3/matchlists/by-account/" . $userInfo["accountId"] . "/recent?api_key=" . $lolkey);
    curl_setopt_array($curl, array(CURLOPT_RETURNTRANSFER => 1));

    $result = curl_exec($curl);
    $zstatus = curl_getinfo($curl);
    
    $recentMatchesData = json_decode($result, true);
    $recentMatchList = $recentMatchesData["matches"];
    $outputIds = "";

    for($i = 0; $i < count($recentMatchList); $i++)
    {
        $outputIds .= " " . $recentMatchList[$i]["gameId"];
    }

    return array("status" => "ERROR", "message" => "Found matches " . $outputIds);
}
	
echo json_encode(loadPlayer());

?>