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
      can use this tool to format the HTML file as a JavaScript
      variable:

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

    var message = [
'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
'<html xmlns="http://www.w3.org/1999/xhtml" xmlns="http://www.w3.org/1999/xhtml">',
'  <head>',
'    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
'    <title>Tilde New Music and Sound Art</title>',
'    <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
'  </head>',
'  <body style="margin: 0; padding: 0;">&#13;',
'    <table width="100%" height="100%" style="margin: 0; padding: 0;"><tr><td style="background-image: url("http://www.tilde.net.au/wp-content/themes/travelify/images/background.png");">&#13;',
'          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td>&#13;',
'               <table align="center" style="width: 100%; max-width: 957px; background-color: #fff; padding: 40px 30px;" bgcolor="#fff"><tr align="center" bgcolor="#FFFFFF"><td>&#13;',
'                     <a href="http://www.tilde.net.au/" alt="Tilde new music and sound art">&#13;',
'                       <img src="http://www.tilde.net.au/wp-content/uploads/2015/01/header1018-012.jpg" alt="Tilde new music and sound art" style="display: block; width: 100%;" /></a>&#13;',
'                   </td>&#13;',
'                 </tr></table></td>&#13;',
'           </tr><tr><td>&#13;',
'               <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 957px; background-color: #fff; text-align: left; padding: 40px 30px;" bgcolor="#fff"><tr align="center"><td>&#13;',
'                     <h1 style="font-family: monospace; font-size: 14pt; font-weight: bold; margin-bottom: 20px;">Confirmation</h1>&#13;',
'                   </td>&#13;',
'                 </tr><tr><td>&#13;',
'                     <p style="font-family: monospace;">Hi there,</p>&#13;',
'                     <p style="font-family: monospace;">&#13;',
'                       We have received your expression of interest.&#13;',
'                     </p>&#13;',
'                     <p style="font-family: monospace;">&#13;',
'                       Thank you, <br />&#13;',
'                       The Tilde team&#13;',
'                     </p>&#13;',
'                   </td>&#13;',
'                 </tr></table></td>&#13;',
'           </tr><table align="center" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 957px;"><tr style="padding: 0 30px; border-top-style: solid; border-top-color: #DDD; border-top-width: 1px; width: 100%; max-width: 1018px; height: 163px; background-color: #fff;" bgcolor="#fff"><td>&#13;',
'                 <img src="http://www.tilde.net.au/wp-content/uploads/2013/11/Tilde-sonogram-e1406539567234.jpg" alt="" /></td>&#13;',
'             </tr></table></table></td>&#13;',
'      </tr></table></body>',
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
