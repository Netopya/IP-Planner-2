<?php
	$region = $_POST['region'];

	$player = $_POST['summoner'];

    echo json_encode(array("status" => "ERROR", "message" => "Service under construction, cannot lookup summoner ". $player . " in region " . $region));

?>