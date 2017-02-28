/*jslint browser: true*/
/*global $, jQuery, alert*/

//This funtion allows the buttons to change which users are visible (online, offline or all)//
function displayRelevantUsers(event, userBtn) {
	var onlineUsers = document.getElementsByClassName("online");
	var offlineUsers = document.getElementsByClassName("offline");

	if (userBtn === 'Online') {
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "block";
		}
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "none";
		}

	} else if (userBtn === 'Offline') {
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
	}

}


//My attempt at an IFFE - I think that I still have some reading to do about using this meathod properly but so far it's keeping me from reating global variables so that's a win//
window.onload = function () {
	'use strict';

	var handleOfflineUserData = function (data, textStatus, jqXHR) {
		var logoImg = data.logo,
			description = "Offline",
			userName = data.name,
			link = "https://www.twitch.tv/" + userName;

		var offlineUserDisplay = document.createElement("div");
		offlineUserDisplay.classList.add("well", "offline", "userStyle");

		//create button to go to user page//		
		var userLogoBtn = document.createElement("a");
		userLogoBtn.setAttribute("href", link);
		userLogoBtn.setAttribute("target", "_blank");

		//setting user's logo image as button//
		var userLogo = document.createElement("img");
		userLogo.setAttribute("src", logoImg);
		userLogo.classList.add("logoImage");
		userLogoBtn.appendChild(userLogo);

		//put image and username button in user information well//
		offlineUserDisplay.appendChild(userLogoBtn);
		var usernameHeading = document.createElement('h3');
		var userNameNode = document.createTextNode(userName);
		usernameHeading.appendChild(userNameNode);
		offlineUserDisplay.appendChild(usernameHeading);

		//create <p> for streaming information//
		var streamInfoPar = document.createElement("p");
		var streamInfo = document.createTextNode(description);
		streamInfoPar.appendChild(streamInfo);
		offlineUserDisplay.appendChild(streamInfoPar);
		document.getElementById("userInfo").appendChild(offlineUserDisplay);
	}

	function getOfflineUserInfo(userName) {
		$.ajax({
			type: "GET",
			url: "https://wind-bow.gomix.me/twitch-api/users/" + userName,
			contentType: "application/json; charset=utf-8",
			dataType: "jsonp",
			async: "false",
			success: handleOfflineUserData,
			error: function (errorMessage) {
				alert("Unable to retrieve results. Please refresh page.");
			}
		});
	}


	var url = "https://wind-bow.gomix.me/twitch-api",
		//these are the usernames suggested in the excersize description//
		usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "habathcx", "RobotCaleb", "noobs2ninjas"],
		currentUserName = "";


	var handleData = function (data, textStatus, jqXHR) {
		if (data.stream === null) {
			//Create wells for offline users - at this point they contain nothing//
			var userName = data._links.channel.substr(38);
			getOfflineUserInfo(userName);


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

			//put image and username button in user information well//
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

	// For loop that iterates through the array of suggested users //
	for (var i = 0; i < usernames.length; i++) {
		var user = usernames[i];
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


};
