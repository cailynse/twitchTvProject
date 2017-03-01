/*jslint browser: true*/
/*global $, jQuery, alert*/

//This funtion allows the buttons to change which users are visible (online, offline or all)//
function displayRelevantUsers(event, userBtn) {
	var onlineUsers = document.getElementsByClassName("online");
	var offlineUsers = document.getElementsByClassName("offline");
	var inactiveUsers = document.getElementsByClassName("inactive");

	if (userBtn === 'Online') {
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "block";
		}
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "none";
		}
		for (i = 0; i < inactiveUsers.length; i++) {
			inactiveUsers[i].style.display = "none";
		}

	} else if (userBtn === 'Offline') {
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "none";
		}
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "block";
		}
		for (i = 0; i < inactiveUsers.length; i++) {
			inactiveUsers.style.display = "none";
		}

	} else {
		for (i = 0; i < onlineUsers.length; i++) {
			onlineUsers[i].style.display = "block";
		}
		for (i = 0; i < offlineUsers.length; i++) {
			offlineUsers[i].style.display = "block";
		}
		for (i = 0; i < inactiveUsers.length; i++) {
			inactiveUsers[i].style.display = "block";
		}
	}

}


//My attempt at an IFFE - I think that I still have some reading to do about using this meathod properly but so far it's keeping me from reating global variables so that's a win//
window.onload = function () {
	'use strict';

	function handleInactiveUserData(data) {
		var logoImg = "https://dummyimage.com/600x400/000000/6f0dab&text=No+User",
			userName = data.message;

		var inactiveUserDisplay = document.createElement("div");
		inactiveUserDisplay.classList.add("well", "inactive", "userStyle");

		var userLogo = document.createElement("img");
		userLogo.setAttribute("src", logoImg);
		userLogo.classList.add("logoImage");
		inactiveUserDisplay.appendChild(userLogo);

		//put image in user information well//
		var usernameHeading = document.createElement("h5");
		var userNameNode = document.createTextNode(userName);
		usernameHeading.appendChild(userNameNode);
		inactiveUserDisplay.appendChild(usernameHeading);

		document.getElementById("userInfo").appendChild(inactiveUserDisplay);
	}

	var handleOfflineUserData = function (data, textStatus, jqXHR) {
		if (data.hasOwnProperty("status")) {
			handleInactiveUserData(data);
			return;
		} else {
			var logoImg = data.logo,
				description = "Offline",
				userName = data.name,
				link = "https://www.twitch.tv/" + userName;

			var offlineUserDisplay = document.createElement("div");
			offlineUserDisplay.classList.add("well", "offline", "userStyle");

			//create button to go to user page//		
			var userPageBtn = document.createElement("a");
			userPageBtn.setAttribute("href", link);
			userPageBtn.setAttribute("target", "_blank");


			var userLogo = document.createElement("img");
			userLogo.setAttribute("src", logoImg);
			userLogo.classList.add("logoImage");
			offlineUserDisplay.appendChild(userLogo);

			var usernameHeading = document.createElement("h3");
			var userNameNode = document.createTextNode(userName);
			var offlineIcon = document.createElement("i");
			offlineIcon.classList.add("glyphicon", "glyphicon-remove-sign");
			usernameHeading.appendChild(userNameNode);
			usernameHeading.appendChild(offlineIcon);
			offlineUserDisplay.appendChild(usernameHeading);


			//create <p> for streaming information//
			var streamInfoPar = document.createElement("p");
			var streamInfo = document.createTextNode(description);
			userPageBtn.appendChild(streamInfo);
			streamInfoPar.appendChild(userPageBtn);
			offlineUserDisplay.appendChild(streamInfoPar);

			document.getElementById("userInfo").appendChild(offlineUserDisplay);
		}
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
		usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
		currentUserName = "";


	var handleData = function (data, textStatus, jqXHR) {
		if (data.stream === null) {
			//this grabs the username from the end of a URL in the Offline user Object//
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
			var userPageBtn = document.createElement("a");
			userPageBtn.setAttribute("href", link);
			userPageBtn.setAttribute("target", "_blank");

			var userLogo = document.createElement("img");
			userLogo.setAttribute("src", logoImg);
			userLogo.classList.add("logoImage");
			onlineUserDisplay.appendChild(userLogo);

			var usernameHeading = document.createElement('h3');
			var userNameNode = document.createTextNode(userName);
			var onlineIcon = document.createElement('i');
			onlineIcon.classList.add("glyphicon", "glyphicon-ok-sign");
			usernameHeading.appendChild(userNameNode);
			usernameHeading.appendChild(onlineIcon);
			onlineUserDisplay.appendChild(usernameHeading);

			//create <p> for streaming information//
			var streamInfoPar = document.createElement("p");
			var streamInfo = document.createTextNode(description);
			userPageBtn.appendChild(streamInfo);
			streamInfoPar.appendChild(userPageBtn);
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
