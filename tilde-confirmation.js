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

    // Vince, change these variables as needed.
    cc = "youremail@example.com";
    sendername = "Tilde~ New Music and Sound Art";
    subject = "Expression of Interest Successfully Submitted";
    textbody = "Hi there, your expression of interest has been received.";

    /*
      This is the body of the auto-reply. You can tart this up with
      any HTML with tilde branding and what not if you like. I've
      attached a HTML file with a basic template borrowing from the
      Tilde website's current look. Modify it as you see fit. you
      can use these tool to format the HTML file for email and then
      as a JavaScript variable:

      http://premailer.dialect.ca/

      then: 
      http://htmltojavascript.com/

      Feel free to pester me if you need help. It's what I'm here
      for. Make your edits in the HTML file and test it in a web
      briwser. If you do any styling, make sure that it sll still
      works when you resize the browser window to a small size to
      account for most email clients and devices.

      Alternatively you can just have a plain text reply. Which
      is commented out right below.
    */
    // message = "Hi there. <br /> We have received your expression of interest. <br /> Thank you!";

    message = [
'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
'<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">',
'  <head>',
'    <meta http-equiv="Content-Type" content="text/html; charset=us-ascii" />',
'    <title>Tilde New Music and Sound Art</title>',
'    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'  </head>',
'  <body style="margin: 0; padding: 0;">&#13;',
'   <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-image: url("http://www.tilde.net.au/wp-content/themes/travelify/images/background.png"); margin: 0; padding: 0;"><tr><td align="center">&#13;',
'         <table width="100%" style="width: 100%; max-width: 900px; background-color: #fff; padding: 40px 30px;" bgcolor="#FFFFFF"><tr bgcolor="#FFFFFF"><td><a href="http://www.tilde.net.au/"><img src="http://www.tilde.net.au/wp-content/uploads/2015/01/header1018-012.jpg" alt="Tilde new music and sound art" style="display: block; width: 100%; max-width: 900px;" /></a></td>&#13;',
'           </tr></table></td>&#13;',
'     </tr><tr><td align="center">&#13;',
'         <table border="0" cellpadding="10" cellspacing="0" style="width: 100%; max-width: 900px; background-color: #fff; text-align: left;" bgcolor="#FFFFFF"><tr><td align="center">&#13;',
'               <h1 style="font-family: monospace; font-size: 14pt; font-weight: bold; margin-bottom: 20px;">&#13;',
'               Confirmation</h1>&#13;',
'             </td>&#13;',
'           </tr><tr><td>&#13;',
'               <p style="font-family: monospace; color: #000; margin-left: 40px;">Hi there,</p>&#13;',
'               <p style="font-family: monospace; color: #000; margin-left: 40px;">We have received your expression of&#13;',
'               interest.</p>&#13;',
'               <p style="font-family: monospace; color: #000; margin-left: 40px;">Thank you,<br />&#13;',
'               The Tilde team</p>&#13;',
'             </td>&#13;',
'           </tr></table></td>&#13;',
'     </tr><tr><td align="center">&#13;',
'         <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 900px;"><tr bgcolor="#FFFFFF" style="margin: 0; padding: 0;"><td><img src="http://www.tilde.net.au/wp-content/uploads/2013/11/Tilde-sonogram-e1406539567234.jpg" style="width: 100%; max-width: 900px;" /></td>&#13;',
'           </tr></table></td>&#13;',
'     </tr></table></body>',
'</html>',
''
].join('');

    ss = SpreadsheetApp.getActiveSheet();
    columns = ss.getRange(1, 1, 1, ss.getLastColumn()).getValues()[0];

    // This is the submitter's email address
    // Make sure you have a field called Email Address in the Google Form
    sender = e.namedValues["Email Address"].toString();

    // This is just the plain text version that shows up in the


    GmailApp.sendEmail(sender, subject, textbody, {
      cc: cc,
      name: sendername,
      htmlBody: message
    });

  } catch (e) {
    Logger.log(e.toString());
  }

}
