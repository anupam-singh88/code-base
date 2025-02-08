<?php

$servername = "localhost";
$database = "rotarycl_regform";
$username = "rotarycl_reg-form";
$password = "Temp@2022";
// Create a connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check the connection
if (!$conn) {
     die("Connection failed: " . mysqli_connect_error());
}
echo "Connected successfully";

$query = "INSERT INTO `tbl_contact_a` (`Id`,`RegistrationNo`, `Name`, `Email`,`Dob`, `Phone`, `Address`,`SchoolName`,`Age`,`AgeGroup`) VALUES ('0','A0106', '', '','','', '', '','','')";

                if(mysqli_query($conn,$query)){
                    echo "data inserted into DB<br>";                   
                }else{
                     echo "duplicate entry no need to insert into DB<br>";
                   if(mysqli_errno($conn) == 1062)
                       echo "duplicate entry no need to insert into DB<br>";
                   else
                    echo "Rajeev_db insertion error:".$query."<br>";

                }//else end
				

mysqli_close($conn);
?>