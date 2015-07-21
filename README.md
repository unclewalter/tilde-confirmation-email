# Tilde confirmation email

## Usage:
* Take your existing Expression of Interest form and make sure you have
  a field called “Email Address” and make sure it's mandatory.

* Open the Google Spreadsheet that is storing the form responses, go to
  the Tools -> Script Editor

* Copy-paste the Google Script below into the script editor and save it.
  The name is not important.

* I have set up some variables for you to change (lines 24-27 and the
  block starting at line 53 right up to `join` method call).

* While you are inside the Script Editor, go Run -> Initialize. Authorize
  the script and it should send the confirmation emails for you.
  
*  
  Make sure you test this code before you make any public links to the
  form.

## Additional info

There is more documentation in the code itself. That should give you all
the tools you need to create your confirmation email.
