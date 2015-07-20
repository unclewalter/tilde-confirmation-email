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
    message = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'> \
              <html xmlns='http://www.w3.org/1999/xhtml'> \
               <head> \
                <meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /> \
                <title>Tilde New Music and Sound Art</title> \
                <meta name='viewport' content='width=device-width, initial-scale=1.0'/> \
              </head> \
              <body style='margin: 0; padding: 0;'> \
               <table align='center' border='0' cellpadding='0' cellspacing='0' width='600' style='border-collapse: collapse;'> \
                <tr> \
                 <td> \
                  <img src='http://www.tilde.net.au/wp-content/uploads/2015/01/header1018-012.jpg' \
                 </td> \
                </tr> \
               </table> \
              </body> \
              </html>";

    ss = SpreadsheetApp.getActiveSheet();
    columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];

    // This is the submitter's email address
    // Make sure you have a field called Email Address in the Google Form
    sender = e.namedValues["Email Address"].toString();

    // Clears out any blank fiels
    for (var keys in columns) {
      var key = columns[keys];
      var val = e.namedValues[key] ? e.namedValues[key].toString() : "";
      if (val !== "") {
        message += key + ' :: ' + val + "<br />";
      }
    }

    textbody = message.replace("<br>", "\n");

    GmailApp.sendEmail(sender, subject, textbody, {
      cc: cc,
      name: sendername,
      htmlBody: message
    });

  } catch (e) {
    Logger.log(e.toString());
  }

}
