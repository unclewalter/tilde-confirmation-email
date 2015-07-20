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

    message = [
'  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
'  <html xmlns="http://www.w3.org/1999/xhtml">',
'   <head>',
'    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
'    <title>Tilde New Music and Sound Art</title>',
'    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>',
'    <style type="text/css">',
'      body {',
'        background-color: #fff;',
'        background-image: url("http://www.tilde.net.au/wp-content/themes/travelify/images/background.png");',
'      }',
'      p {',
'        font-family: monospace;',
'      }',
'      h1 {',
'        font-family: monospace;',
'        font-size: 14pt;',
'        font-weight: bold;',
'        margin-bottom: 20px;',
'      }',
'      .banner {',
'        padding: 40px 30px 40px 30px;',
'        width: 100%;',
'        max-width: 897px;',
'        background-color: #fff;',
'      }',
'      .banner img {',
'        width: 100%;',
'        display: block;',
'      }',
'      .content {',
'        padding: 40px 30px 40px 30px;',
'        width: 100%;',
'        max-width: 897px;',
'        background-color: #fff;',
'        border-top: 1px solid #DDD;',
'        text-align: left;',
'      }',
'      .footer {',
'        border-top: 1px solid #DDD;',
'        padding: 0 30px 0 30px;',
'        width: 100%;',
'        max-width: 897px;',
'        height: 163px;',
'        background-color: #fff;',
'        background-image: url("http://www.tilde.net.au/wp-content/uploads/2013/11/Tilde-sonogram-e1406539567234.jpg");',
'        background-position: right;',
'      }',
'    </style>',
'  </head>',
'  <body style="margin: 0; padding: 0;">',
'   <div class="main" align="center">',
'    <div class="banner" align="center" bgcolor="#FFFFFF">',
'      <a href="http://www.tilde.net.au/" alt="Tilde new music and sound art">',
'        <img src="http://www.tilde.net.au/wp-content/uploads/2015/01/header1018-012.jpg" alt="Tilde new music and sound art" style="display: block;" />',
'      </a>',
'    </div>',
'    <div class="content">',
'      <h1>Confirmation</h1>',
'      <p>Hi there,</p>',
'      <p>',
'        We have received your expression of interest.',
'      </p>',
'      <p>',
'        Thank you, <br />',
'        The Tilde team',
'      </p>',
'    </div>',
'    <div class="footer">',
'    </div>',
'  </div>',
'  </body>',
'  </html>',
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
