<?php include('header.php'); ?>
<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if(isset($_POST['regId'])){
// database connection code
// $con = mysqli_connect('localhost', 'root', '','new-data');
$con = mysqli_connect('localhost', 'rotarycl_reg-form', 'Temp@2022','rotarycl_regform');

// get the post records
$regId = $_POST['regId'];
$txtName = $_POST['txtName'];
$txtEmail = $_POST['txtEmail'];
$txtDob = $_POST['txtDob'];
$txtPhone = $_POST['txtPhone'];
$txtAddress = $_POST['txtAddress'];
$txtSchoolName = $_POST['txtSchoolName'];
$txtAge = $_POST['txtAge'];
$txtAgeGroup = $_POST['txtAgeGroup'];

$first_character = mb_substr($_POST['regId'], 0, 1);

if($first_character=="A"){
$sql = "INSERT INTO `tbl_contact_a` (`Id`,`RegistrationNo`,`Group`, `Name`, `Email`,`Dob`, `Phone`, `Address`,`SchoolName`,`Age`,`AgeGroup`) VALUES ('0','$regId','A', '$txtName', '$txtEmail','$txtDob','$txtPhone', '$txtAddress', '$txtSchoolName','$txtAge','$txtAgeGroup')";
}
if($first_character=="B"){
    $sql = "INSERT INTO `tbl_contact_b` (`Id`,`RegistrationNo`,`Group`, `Name`, `Email`,`Dob`, `Phone`, `Address`,`SchoolName`,`Age`,`AgeGroup`) VALUES ('0','$regId','B', '$txtName', '$txtEmail','$txtDob','$txtPhone', '$txtAddress', '$txtSchoolName','$txtAge','$txtAgeGroup')";
}
if($first_character=="C"){
    $sql = "INSERT INTO `tbl_contact_c` (`Id`,`RegistrationNo`,`Group`, `Name`, `Email`,`Dob`, `Phone`, `Address`,`SchoolName`,`Age`,`AgeGroup`) VALUES ('0','$regId','C', '$txtName', '$txtEmail','$txtDob','$txtPhone', '$txtAddress', '$txtSchoolName','$txtAge','$txtAgeGroup')";
}

if($first_character=="D"){
    $sql = "INSERT INTO `tbl_contact_d` (`Id`,`RegistrationNo`,`Group`, `Name`, `Email`,`Dob`, `Phone`, `Address`,`SchoolName`,`Age`,`AgeGroup`) VALUES ('0','$regId','D', '$txtName', '$txtEmail','$txtDob','$txtPhone', '$txtAddress', '$txtSchoolName','$txtAge','$txtAgeGroup')";
}

$rs = mysqli_query($con, $sql);

if($rs){
    //start sms code for sending sms//

    //$apikey="xn4CyAGtvX0LrKQO";
    
    $apikey="Lg0wOL9p7qgzxJje";
    $sender="ROTRYC";
    $mobile= $txtPhone;
    if($first_character=="A"){
    $msg=urlencode("Dear $txtName, thank you for registration in 21st Rotary Poster Painting Competition. Your registration ID is A".(sprintf("%04s",mysqli_insert_id($con)))." Thanks, Rotary Club of DSW");
    }
    if($first_character=="B"){
        $msg=urlencode("Dear $txtName, thank you for registration in 21st Rotary Poster Painting Competition. Your registration ID is B".(sprintf("%04s",mysqli_insert_id($con)))." Thanks, Rotary Club of DSW");
    }
    if($first_character=="C"){
        $msg=urlencode("Dear $txtName, thank you for registration in 21st Rotary Poster Painting Competition. Your registration ID is C".(sprintf("%04s",mysqli_insert_id($con)))." Thanks, Rotary Club of DSW");
    }
    
    if($first_character=="D"){
        $msg=urlencode("Dear $txtName, thank you for registration in 21st Rotary Poster Painting Competition. Your registration ID is D".(sprintf("%04s",mysqli_insert_id($con)))." Thanks, Rotary Club of DSW");
    }

   
    $url = "https://bulksmsindia.app/V2/http-api.php?apikey=$apikey&senderid=$sender&number=$mobile&message=$msg";
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $curl_scraped_page = curl_exec($ch);
    curl_close($ch);
    // echo $curl_scraped_page;

//start end code for sending sms/
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer();

// Settings
$mail->IsSMTP();
$mail->Mailer = "smtp";
$mail->CharSet = 'UTF-8';

$mail->Host       = "smtp.gmail.com";    // SMTP server example
$mail->SMTPDebug  = 0;                     // enables SMTP debug information (for testing)

$mail->SMTPAuth   = true;                  // enable SMTP authentication
$mail->SMTPSecure = "tls";
$mail->Port       = 587;                    // set the SMTP port for the GMAIL server
$mail->Username   = "rotaryposterpainting@gmail.com";            // SMTP account username example
$mail->Password   = "hyikpjfviulnprqg";            // SMTP account password example

// Content
$mail->isHTML(true);                       // Set email format to HTML
$mail->AddAddress($txtEmail, $txtName);
$mail->SetFrom("rotaryposterpainting@gmail.com", "Rotary Club Delhi South West");
$mail->Subject = 'New Registration';
if($first_character=="A"){
$content = "<b>Dear ". $txtName. ",<br><br>Thank you for registering with us for 21st Rotary Poster Painting Competition which will be held on 29th January 2023 (Sunday).This is your Registration ID - A" . (sprintf("%04s",mysqli_insert_id($con))) . "<br><br> Thanks & Regards, <br> Rotary Club of Delhi South West </b> ";
}
if($first_character=="B"){
    $content = "<b>Dear ". $txtName. ",<br><br>Thank you for registering with us for 21st Rotary Poster Painting Competition which will be held on 29th January 2023 (Sunday).This is your Registration ID - B" . (sprintf("%04s",mysqli_insert_id($con))) . "<br><br> Thanks & Regards, <br> Rotary Club of Delhi South West </b> ";
}
if($first_character=="C"){
    $content = "<b>Dear ". $txtName. ",<br><br>Thank you for registering with us for 21st Rotary Poster Painting Competition which will be held on 29th January 2023 (Sunday).This is your Registration ID - C" . (sprintf("%04s",mysqli_insert_id($con))) . "<br><br> Thanks & Regards, <br> Rotary Club of Delhi South West </b> ";
}

if($first_character=="D"){
    $content = "<b>Dear ". $txtName. ",<br><br>Thank you for registering with us for 21st Rotary Poster Painting Competition which will be held on 29th January 2023 (Sunday).This is your Registration ID - D" .  (sprintf("%04s",mysqli_insert_id($con)))  . "<br><br> Thanks & Regards, <br> Rotary Club of Delhi South West </b> ";
}
$mail->send();
$mail->MsgHTML($content); 

if(!$mail->Send()) {
    echo "Error while sending Email.";
    //var_dump($mail);
  } else {
    echo "<div class='container'><div class='py-5 text-center'><h2>A confirmation email has been sent to your registered mail id.</h2></div></div>";
  }

echo '<br><div class="container" style="background-color:#eeeeee;font-size:20px;padding:20px;"><div class="row">';
if($first_character=="A"){
echo '<div class="col-md-12" style="text-align:center;font-weight:500;">Hello ' . $_POST["txtName"] . ',<br>Thankyou for submitting the painting competition form.<br>This is your registration no. <big><b>A' . (sprintf("%04s",mysqli_insert_id($con))) .'</b></big></div>';
}
if($first_character=="B"){
    echo '<div class="col-md-12" style="text-align:center;font-weight:500;">Hello ' . $_POST["txtName"] . ',<br>Thankyou for submitting the painting competition form.<br>This is your registration no. <big><b>B' . (sprintf("%04s",mysqli_insert_id($con))).'</b></big></div>';
}
if($first_character=="C"){
    echo '<div class="col-md-12" style="text-align:center;font-weight:500;">Hello ' . $_POST["txtName"] . ',<br>Thankyou for submitting the painting competition form.<br>This is your registration no. <big><b>C' . (sprintf("%04s",mysqli_insert_id($con))).'</b></big></div>';
}

if($first_character=="D"){
    echo '<div class="col-md-12" style="text-align:center;font-weight:500;">Hello ' . $_POST["txtName"] . ',<br>Thankyou for submitting the painting competition form.<br>This is your registration no. <big><b>D' . (sprintf("%04s",mysqli_insert_id($con))).'</b></big></div>';
}


echo '<div class="col-md-12" style="text-align:center"><p>&nbsp;</p><button class="btn-primary" onclick="window.print()">Print</button></div>';
echo '</div></div>';

// echo "New record has id: " . (sprintf("%04s",mysqli_insert_id($con)));
mysqli_close($con);
}}
else{
    echo '<br><div class="container" style="background-color:#eeeeee;font-size:20px;padding:20px;"><div class="row">';
    echo '<div class="col-md-12" style="text-align:center;font-weight:500;"><br><b>Form Already Submitted.<b></b></div>';
    echo '</div></div>';
}


?>

<script>

if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}


</script>
