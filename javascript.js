/*jslint browser: true*/
/*global $, jQuery, alert*/

//This funtion allows the buttons to change which users are visible (online, offline or all)//
function displayRelevantUsers(event, userBtn) {
	var onlineUsers = document.getElementsByClassName("online");
	var offlineUsers = document.getElementsByClassName("offline");
	if (userBtn === 'Online') {
		console.log("Online selected");
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "block";
		}
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "none";
		}
	} else if (userBtn === 'Offline') {
		console.log("Offline Selected")
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "none";
		}
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "block";
		}
	} else {
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "block";
		}
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "block";
		}
		console.log("All selected")
	}

}



window.onload = function () {
	'use strict';
	var url = "https://wind-bow.gomix.me/twitch-api",
		usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

	var handleData = function (data, textStatus, jqXHR) {


		if (data.stream === null) {
			//Create wells for offline users - at this point they contain nothing//
			var offlineUserDisplay = document.createElement("div");
			offlineUserDisplay.classList.add("well", "offline", "userStyle");
			document.getElementById("userInfo").appendChild(offlineUserDisplay);

			return;

		} else {
			//if the user is online make a well for that user//

			var link = data.stream.channel.url,
				logoImg = data.stream.channel.logo,
				description = data.stream.channel.status,
				userName = data.stream.channel.name;

			//create well for user information//
			var onlineUserDisplay = document.createElement("div");
			onlineUserDisplay.classList.add("well", "userDisplay", "online", "userStyle");

			//create button to go to user page//		
			var userLogoBtn = document.createElement("a");
			userLogoBtn.setAttribute("href", link);
			userLogoBtn.setAttribute("target", "_blank");
			//setting user's logo image as button//
			var userLogo = document.createElement("img");
			userLogo.setAttribute("src", logoImg);
			userLogo.classList.add("logoImage");
			userLogoBtn.appendChild(userLogo);
			//put image button in user information well//
			onlineUserDisplay.appendChild(userLogoBtn);
			var usernameHeading = document.createElement('h3');
			var userNameNode = document.createTextNode(userName);
			usernameHeading.appendChild(userNameNode);
			onlineUserDisplay.appendChild(usernameHeading);
			//create <p> for streaming information//
			var streamInfoPar = document.createElement("p");
			var streamInfo = document.createTextNode(description);
			streamInfoPar.appendChild(streamInfo);
			onlineUserDisplay.appendChild(streamInfoPar);
			document.getElementById("userInfo").appendChild(onlineUserDisplay);

		}

	};

	function checkUser(user) {
		$.ajax({
			type: "GET",
			url: "https://wind-bow.gomix.me/twitch-api/streams/" + user,
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			async: "false",
			success: handleData,
			error: function (errorMessage) {
				alert("Unable to retrieve results. Please refresh page.");
			}
		});

	}

	for (var i = 0; i < usernames.length; i++) {
		var user = usernames[i];
		console.log(user);
		checkUser(user);
	}








};
