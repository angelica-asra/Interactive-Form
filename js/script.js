/******************************************
Angelica
Project 3 - Interactive Form 
******************************************/

// Set the name field into focus by default.
document.getElementById("name").focus();
// Hide the text field and its label that is displayed when "Other" is selected in the Job Role section. 
var othertitle = document.getElementById("other-title"); 
var othertitlelabel = document.getElementById("other-title-label"); 
othertitle.style.display = "none";
othertitlelabel.style.display = "none";

// Add an event listener to the job selector. If "Other" is selected, show the text field and label. Otherwise, hide it. 
var jobrole = document.getElementById("title"); 
jobrole.addEventListener('change', (event) => {
	if (event.target.value === "other") {
 		othertitle.style.display = "block";
		othertitlelabel.style.display = "block";
	} else {
		othertitle.style.display = "none";
		othertitlelabel.style.display = "none";	
	}
});

var design = document.getElementById("design");
var color = document.getElementById("color");

/*** 
	The deleteColorOptions function uses the global color variable to delete all its options.    	
***/
function deleteColorOptions() {
  while (color.options.length >= 1) {
    color.removeChild(color.options[0]);
  }
}

/*** 
	The createColorOption function takes a string and returns an option from that string.
***/
function createColorOption(str) {
  var newoption = document.createElement('option');
  newoption.value = str.toLowerCase().replace(/\s/g, ""); // Delete spaces and convert to lowercase for the option's value. 
  newoption.innerHTML = str; 
  return newoption; 
}

// Initializes the desired default settings. Deletes all color options and hides the dropdown. Prompts the user to select a theme in the color label. 
deleteColorOptions();
var colorlabel = document.getElementById("colorlabel");
colorlabel.innerHTML = "Please select a T-shirt theme."
color.style.display = "none";

// Creates the full color options array and the theme specific arrays as global variables. 
var coloroptions = ["Cornflower Blue", "Dark Slate Grey", "Gold", "Tomato", "Steel Blue", "Dim Grey"];
var jspuns = coloroptions.slice(0, 3);
var luvjs = coloroptions.slice(3);

// Adds an event listener to the design selector. If no theme is selected, this will clear all color options, hide the dropdown and change the label text. 
// If a theme is selected, the options shown will be specific to that theme. 
design.addEventListener('change', (event) => {
	if (event.target.value === "Select Theme") {
		deleteColorOptions();
		color.style.display = "none";
		colorlabel.innerHTML = "Please select a T-shirt theme."
	}
	else if (event.target.value === "js puns") {
 		deleteColorOptions();
		for (i = 0; i < jspuns.length; i++) {
  			var coloroption = createColorOption(jspuns[i]);
  			color.appendChild(coloroption);
  			colorlabel.innerHTML = "Color:";
  			color.style.display = "block";
		}
	} else {
		deleteColorOptions();
		for (i = 0; i < luvjs.length; i++) {
		  	var coloroption = createColorOption(luvjs[i]);
  			color.appendChild(coloroption);
  			colorlabel.innerHTML = "Color:";
  			color.style.display = "block";
		}
	}
});

var activities = document.getElementsByClassName("activities")[0];

var totaltext = document.createTextNode("Total: $0");
var total = 0; 
activities.appendChild(totaltext);

// I have added the event listener to the whole activity field. 
activities.addEventListener('change', (event) => {
	var checkbox = event.target; 
	var checked = event.target.checked;
	var datetime = checkbox.getAttribute("data-day-and-time");
	var cost = checkbox.getAttribute("data-cost");
	var allcheckboxes = activities.getElementsByTagName("input"); 

	total = 0; 

	// Iterates over the list of checkboxes, finding conflicting checkboxes and toggling their availability. 
	for (i = 0; i < allcheckboxes.length; i++) {
  			var comparecheckbox = allcheckboxes[i];

  			if (comparecheckbox.checked) {
					total += parseInt(comparecheckbox.getAttribute("data-cost")); 
			}
  			if ((comparecheckbox.getAttribute("data-day-and-time") == datetime && comparecheckbox !== checkbox)) {
  				// Toggles whether this conflict checkbox is enabled or disabled. 
				comparecheckbox.disabled = !comparecheckbox.disabled; 
				// I have added an activity id to the label so that I can easily access the label of a given checkbox based on its list location. 
				comparecheckboxlabelname = "activity" + (i+1).toString(); 
				comparecheckboxlabel = document.getElementById(comparecheckboxlabelname);
				// Since we can't toggle a class, we determine whether the event checkbox is checked or unchecked to change the style class.
				if (checked) {
					comparecheckboxlabel.classList.add("disabledcheck");
				} else {
					comparecheckboxlabel.classList.remove("disabledcheck");
				}

			}
	}

	// Change the text of the Total node according to our new calculations. 
	totaltext.nodeValue = "Total: $".concat(total.toString());

});

// Hide the paypal and bitcoin options by default, showing only the fields required for the credit card option. 
var paypal = document.getElementById("paypal");
paypal.style.display = "none";
var bitcoin = document.getElementById("bitcoin");
bitcoin.style.display = "none";
var creditcard = document.getElementById("credit-card");
// Toggle the isCredit variable depending on the payment selection. It is initially set to true. 
var isCredit = true; 

// Get a reference to the payment selector and delete its first option, "Select Payment Method". 
var payment = document.getElementById("payment");
payment.removeChild(payment.options[0]);

// This event listener is attached to the payment select field. It hides all other payment options that are not selected. 
payment.addEventListener('change', (event) => {
	var choice = event.target.value; 
	if (choice === "paypal") {
		paypal.style.display = "block";
		bitcoin.style.display = "none";
		creditcard.style.display = "none";
		isCredit = false; 
	} else if (choice === "bitcoin") {
		paypal.style.display = "none";
		bitcoin.style.display = "block";
		creditcard.style.display = "none";
		isCredit = false; 
	} else { 
		paypal.style.display = "none";
		bitcoin.style.display = "none";
		creditcard.style.display = "block";
		isCredit = true; 
	}

});


/* The empty layout of this form validation section was based off the starting code in Treehouse Form Input Validation Warm-Up Workspace. */

// The necessary variables for accessing form inputs. 
const form = document.querySelector("form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const activitiesContainer = document.querySelector(".activities");
const activitiesInputs = document.querySelectorAll('[data-cost]');
const creditnumber = document.querySelector("#cc-num");
const creditcode = document.querySelector("#zip");
const creditcvv = document.querySelector("#cvv");

/* This name validator ensures the name field is not blank. If it is, it adds a red border and sets the input label text to red as well. */
const nameValidator = () => {
	var nameLabel = document.querySelector('[for=name]');
	if (name.value.length > 0) {
		name.style.border = "2px solid rgb(111, 157, 220)"; 
		nameLabel.style.color = "";
		return true; 
	} else {
		name.style.border = "2px solid rgb(128, 0, 0)"; 
		nameLabel.style.color = "rgb(128, 0, 0)";
		return false;
	}
}

// This email validator ensures that @ is not the first character. It checks that the final dot comes after the @ symbol and at least one character.
// Also, since no top level domains are single letter, I require that the dot be followed by two or more letters (.uk, .com, etc.)
// If the input does not meet these requirements, the border and label text are both set to a red color. 
const emailValidator = () => {
	var emailvalue = email.value; 
	var emailLabel = document.querySelector('[for=email]');
	var atsymbol = email.value.indexOf("@"); 
	var websiteindex = email.value.lastIndexOf("."); 
	var web = email.value.slice(websiteindex);
	if (atsymbol > 1 && websiteindex > (atsymbol + 1) && web.length >= 2) {
		email.style.border = "2px solid rgb(111, 157, 220)"; 
		emailLabel.style.color = "";
		return true; 
	} else {
		email.style.border = "2px solid rgb(128, 0, 0)"; 
		emailLabel.style.color = "rgb(128, 0, 0)";
		return false; 
	}
}

// Here I create an HTML element that will present an error message if at least one activity is not selected. 
// It is appended as a child before all the activity checkboxes. 
var span = document.createElement('span');
var errortext = document.createTextNode("You must select at least one activity.");
span.style.fontSize = "15px";
span.style.color = "rgb(128, 0, 0)";
span.padding = "0px";
span.appendChild(errortext);
activities.insertBefore(span, activities.childNodes[0]);
span.style.display = "none"; 
var legend = activities.childNodes[2];

// This validator for the activities section iterates through all the checkboxes, counting the number of options that are checked.
// If zero are checked, it will add a red border around the whole activity section and set the text font to red. 
// In that case, an error message will also appear in the section as created above.   

const activitiesValidator = () => {
	var numchecked = 0; 
	
	for (i = 0; i < 7; i++) {
		if (activitiesInputs[i].checked == true) {
			numchecked += 1;  
		}
	}

	if (numchecked >= 1) { 
		legend.style.color = "";
		activities.style.border = "none"; 
		span.style.display = "none"; 
		return true;

	} else { 
		legend.style.color = "rgb(128, 0, 0)";
		activities.style.border = "2px solid rgb(128, 0, 0)"; 
		span.style.display = "block"; 
		return false; 

	}

}

/*** 
	I had a few weird issues with this section. Trying to verify that the input was in fact a number was difficult. 
	I checked its length while it was still a string input. Then I used parseInt() to convert it into a number 
	and ensure that the input could actually be translated into a sequence of digits. However, when given a cvv code 
	like "12e", parseInt() seemed to return "12" which is still a number but is not the same length as the original string 
	and therefore the input. 
	As a strange, roundabout solution, I check at the end that the outcome of parseInt() results in a string of the same 
	length as the original input. 
***/

/* This credit number validator verifies that the number given is between 13 and 16 digits. */
const creditnumberValidator = () => {
	var number = creditnumber.value; 
	var numberLabel = document.querySelector('[for=cc-num]');
	if (number.length >= 13 && number.length <= 16) { 
		var isNumeric = !Number.isNaN(parseInt(number)); 
		if (isNumeric && parseInt(number).toString().length === number.length) { 
			numberLabel.style.color = "";
			creditnumber.style.border = "none";
			numberLabel.innerHTML = "Card Number:";
			return true; 
		} else { 
			numberLabel.style.color = "rgb(128, 0, 0)";
			numberLabel.innerHTML = "Card Number: (13-16 digits.) ";
			creditnumber.style.border = "2px solid rgb(128, 0, 0)"; 
			return false; 
		} 
		
	} else {
		numberLabel.style.color = "rgb(128, 0, 0)";
		numberLabel.innerHTML = "Card Number: (13-16 digits.) ";
		creditnumber.style.border = "2px solid rgb(128, 0, 0)"; 
		return false; 
	}
} 

/* This credit zip code validator verifies that the number given is 5 digits. */
const creditzipValidator = () => {
	var zip = creditcode.value; 
	var zipLabel = document.querySelector('[for=zip]');
	if (zip.length == 5) {
		var isNumeric = !Number.isNaN(parseInt(zip));  
		if (isNumeric && parseInt(zip).toString().length === zip.length) { 
			zipLabel.style.color = "";
			creditcode.style.border = "none";
			zipLabel.innerHTML = "Zip Code:";
			return true; 

		} else {
			zipLabel.style.color = "rgb(128, 0, 0)";
			zipLabel.innerHTML = "Zip Code: (5 digits.) ";
			creditcode.style.border = "2px solid rgb(128, 0, 0)"; 
			return false;
		}
		
	} else {
		zipLabel.style.color = "rgb(128, 0, 0)";
		zipLabel.innerHTML = "Zip Code: (5 digits.) ";
		creditcode.style.border = "2px solid rgb(128, 0, 0)"; 
		return false; 
	}
} 


/* This credit cvv validator verifies that the number given is 3 digits. */
const creditcvvValidator = () => {
	var cvv = creditcvv.value; 
	var cvvLabel = document.querySelector('[for=cvv]');
	if (cvv.length == 3) { 
		//console.log(parseInt(cvv));
		var isNumeric = !Number.isNaN(parseInt(cvv)); 
		if (isNumeric && parseInt(cvv).toString().length === cvv.length) { 
			cvvLabel.style.color = "";
			creditcvv.style.border = "none";
			cvvLabel.innerHTML = "CVV:";
			return true; 
		} else {
			cvvLabel.style.color = "rgb(128, 0, 0)";
			cvvLabel.innerHTML = "CVV: (3 digits.) ";
			creditcvv.style.border = "2px solid rgb(128, 0, 0)"; 
			return false; 
		}
	} else {
		cvvLabel.style.color = "rgb(128, 0, 0)";
		cvvLabel.innerHTML = "CVV: (3 digits.) ";
		creditcvv.style.border = "2px solid rgb(128, 0, 0)"; 
		return false; 

	}
} 

// All the helper function validators above are called in this new event listener added to the main form element. 
// The form is stopped from submitting whenever a flag is raised at any point in the process. 
form.addEventListener('submit', (e) => {

	if (nameValidator() === false) { 
		e.preventDefault();
	} else {
	}

	if (emailValidator() === false) { 
		e.preventDefault();
	} else {
	}

	if (activitiesValidator() === false) { 
		e.preventDefault();
	} else {
	}

	if (isCredit) { 
		if (creditnumberValidator() === false) { 
			e.preventDefault();
		} 
		if (creditzipValidator() === false) { 
			e.preventDefault();
		} 
		if (creditcvvValidator() === false) { 
			e.preventDefault();
		} 
	}

});


