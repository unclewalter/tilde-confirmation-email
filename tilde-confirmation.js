/*
  Take your existing Expression of Interest form and make sure you have
  a field called “Email Address” and make sure it's mandatory.

  Open the Google Spreadsheet that is storing the form responses, go to
  the Tools -> Script Editor

  Copy-paste the Google Script below into the script editor and save it.
  The name is not important.

  I have set up some variables for you to change (lines )

  While you are inside the Script Editor, go Run -> Initialize. Authorize
  the script and it should send the confirmation emails for you. Let me
  know when you've set it up and I can test it too.
*/

function Initialize() {

  var triggers = ScriptApp.getProjectTriggers();

  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }

  ScriptApp.newTrigger("SendConfirmationMail")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onFormSubmit()
    .create();

}

function SendConfirmationMail(e) {

  try {

    var ss, cc, sendername, subject, columns;
    var message, value, textbody, sender;

    // Vince, change these four variables as needed.
    cc = "youremail@example.com";
    sendername = "Tilde~ New Music and Sound Art";
    subject = "Expression of Interest Successfully Submitted";

    // This is the body of the auto-reply. You can tart this up with
    // any HTML with tilde branding and what not if you like. Or
    // pester me about it.
    message = "";

    ss = SpreadsheetApp.getActiveSheet();
    columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];

    // This is the submitter's email address
    // Make sure you have a field called Email Address in the Google Form
    sender = e.namedValues["Email Address"].toString();
  
    // This is just the plain text version that shows up in the
    textbody = "Hi there, your expression of interest has been received.";

    GmailApp.sendEmail(sender, subject, textbody, {
      cc: cc,
      name: sendername,
      htmlBody: message
    });

  } catch (e) {
    Logger.log(e.toString());
  }

}
