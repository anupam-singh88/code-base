<?php $mail = new PHPMailer();

// Settings
$mail->IsSMTP();
$mail->CharSet = 'UTF-8';

$mail->Host       = "mail.rotaryclubdelhisouthwest.org";    // SMTP server example
$mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)
$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->Port       = 465;                    // set the SMTP port for the GMAIL server
$mail->Username   = "_mainaccount@rotaryclubdelhisouthwest.org";            // SMTP account username example
$mail->Password   = "password";            // SMTP account password example

// Content
$mail->isHTML(true);                       // Set email format to HTML
$mail->Subject = 'Here is the subject';
$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

$mail->send();



/*
Username:	_mainaccount@rotaryclubdelhisouthwest.org
Password:	Use your cPanel password.
Incoming Server:	rotaryclubdelhisouthwest.org
IMAP Port: 993 POP3 Port: 995
Outgoing Server:	rotaryclubdelhisouthwest.org
SMTP Port: 465
IMAP, POP3, and SMTP require authentication.
*/
?>