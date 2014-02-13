function addReminder() {
	console.log($('#addReminder').css('display'));
	if ($('#addReminder').css('display') === 'none'){
		$("#addReminder").css('display', 'block');
		$("#doneButton").text("Done");

	} else {
		$("#addReminder").css('display', 'none');
		$("#doneButton").text("Add another");
	}
}