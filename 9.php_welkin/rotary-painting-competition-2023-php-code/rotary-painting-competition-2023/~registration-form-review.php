<?php
$servername = "localhost";
$username = "rotarycl_reg-form";
$password = "Temp@2022";
$dbname = "rotarycl_regform";
$textAgeGroup = $_REQUEST['textAgeGroup'];
$first_character = substr($textAgeGroup, 0, 1);
$new_registration_no="";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
 if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
 }

// //for a
if($first_character == "A"){
    $sql = "SELECT `Id`,`Group`,`RegistrationNo` FROM `tbl_contact_a` ORDER BY `DateCreated` DESC LIMIT 1";
}
else if ($first_character == "B"){
     $sql = "SELECT `Id`,`Group`,`RegistrationNo` FROM `tbl_contact_b` ORDER BY `DateCreated` DESC LIMIT 1";
}
else if ($first_character == "C"){
     $sql = "SELECT `Id`,`Group`,`RegistrationNo` FROM `tbl_contact_c` ORDER BY `DateCreated` DESC LIMIT 1";
}
else{
    $sql = "SELECT `Id`,`Group`,`RegistrationNo` FROM `tbl_contact_d` ORDER BY `DateCreated` DESC LIMIT 1";
}


$result = $conn->query($sql);


if ($result->num_rows > 0) {
// output data of each row
  while($row = $result->fetch_assoc()) {
     // echo $row["Id"];
  $new_registration_no=$first_character.(sprintf("%04s", $row["Id"]+1));
  }
}
   


else {
   "0 results";
   }

if ($new_registration_no == "") {
    $new_registration_no=$first_character.'0001';
}
   



//echo  $new_registration_no;

$conn->close();
?>


<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous">
<?php include('header.php'); ?>
    <div class="container">
      <div class="py-5 text-center">
        <h2>Preview Form</h2>
      </div>
      <fieldset>
        
        <form name="frmContact" class="needs-validation " method="post" action="thankyou.php" onsubmit="sessionStorage.clear();return confirm('Are You Sure To Submit?');">
        <!-- <form name="frmContact" class="needs-validation " method="post" action="contact2.php" > -->
          <p>
            <!--<label for="regId" >Your Registration Id:</label>-->
            <input type="hidden" class="form-control" name="regId" value="<?php echo $new_registration_no ?>" id="regId" onkeypress="return false;" style="background: #e7eef4;caret-color: transparent;" />
          </p>
       
          <p>
            <label for="name">Your Name </label>
            <input type="text" class="form-control"  name="txtName" id="txtName" onkeypress="return false;" style="background: #e7eef4;caret-color: transparent;" placeholder="Name"  required />
          <div class="invalid-feedback">
                        Valid first name is required.
                      </div>
          </p>
          <p>
            <label for="email">Your Email</label>
            <input type="text"  class="form-control"  name="txtEmail" id="txtEmail" placeholder="Email" onkeypress="return false;" style="background: #e7eef4;caret-color: transparent;"required />
          </p>
          <p>
            <label for="dob">Your DOB</label>
            <input type="date"   class="form-control" name="txtDob" id="txtDob" placeholder="Phone" min="2006-01-01" max="2020-01-29" onkeypress="return false;" style="background: #e7eef4;caret-color: transparent;" required/>
          </p>
          <p>
            <label for="phone">Your Phone</label>
            <input type="text"  class="form-control" name="txtPhone" id="txtPhone" placeholder="Phone" onkeypress="return false;" style="background: #e7eef4;caret-color: transparent;"  required />
          </p>
          <p>
            <label for="address">Your Address</label>
            <textarea name="txtAddress"  class="form-control"  id="txtAddress"  placeholder="Address" onkeypress="return false;" style="background: #e7eef4;caret-color: transparent;" required></textarea>
          </p>
          <p>
            <label for="schoolName">Your School Name</label>
            <input name="txtSchoolName" class="form-control"  id="schoolName"  placeholder="schoolName" onkeypress="return false;" style="background: #e7eef4;caret-color: transparent;" required/>
          </p>
          <p>
            <label for="age">Your Current Age</label>
            <input name="txtAge" class="form-control"  id="txtAge" onkeypress="return false;" style="background: #e7eef4;caret-color: transparent;" placeholder="Message" required />
          </p>
          <p>
            <label for="age">Your Age Group</label>
            <input name="txtAgeGroup" class="form-control"  id="txtAgeGroup" onkeypress="return false;" style="background: #e7eef4;caret-color: transparent;" placeholder="Age Group" required />
          </p>
          <p>&nbsp;</p>
          <div  style="    display: flex;
    justify-content: space-between;
    width: 100%;">
          <p>
            <a href="registration-form.php"><input type="button" name="edit" id="edit" value="Edit"  class="btn btn-primary btn-lg btn-block"></a>
          </p>
          <p>
            <input type="submit" name="Submit" id="Submit" value="Final Submit"   class="btn btn-success btn-lg btn-block" />
          </p>
          </div>
        </form>
      </fieldset>
    </div>
 
  <script src="reg-form-review.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
<?php include('footer.php'); ?>
