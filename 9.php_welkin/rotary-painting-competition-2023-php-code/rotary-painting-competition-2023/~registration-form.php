
<?php include('header.php'); ?>
    <div class="container">
      <div class="py-5 text-center">
        <h2>Painting Competition 2023 - Registration Form</h2>
      </div>
      <fieldset>
        <form name="frmContact" class="needs-validation"  action="registration-form-review.php"
        onsubmit="return validation(this)" method="POST">
          <p>
            <label for="name">Your Name </label>
            <input type="text" class="form-control" name="txtName" id="txtName" placeholder="Name"  required />
          <div class="invalid-feedback">
                        Valid first name is required.
                      </div>
          </p>
          <p>
            <label for="email">Your Email</label>
            <input type="email"  class="form-control"  name="txtEmail" id="txtEmail" placeholder="Email" required />
          </p>
          <p>
            <label for="dob">Your DOB</label>
            <input type="date"  class="form-control" name="txtDob" id="txtDob" placeholder="DOB" min="2006-01-29" max="2020-01-29" required >
          </p>
          <p>
            <label for="phone">Your Phone</label>
            <input type="number"  class="form-control" name="txtPhone" id="txtPhone" placeholder="Phone"  required />
          </p>
          <p> 
            <label for="address">Your Address</label>
            <textarea type="text" name="txtAddress" class="form-control"  id="txtAddress"  placeholder="Address" required></textarea>
          </p>
          <p>
            <label for="schoolName">Your School Name</label>
            <input type="text" name="txtSchoolName" class="form-control"  id="schoolName"  placeholder="School Name" required />
            
            <input type="hidden" name="textAgeGroup" class="form-control"  id="textAgeGroup"  />
          </p>
          
          <p>&nbsp;</p>
          <p>
            <input type="submit" name="" id="submitBtn" value="Submit"  class="btn btn-primary btn-lg btn-block" onclick="return validation()" />
          
          </p>
        </form>
        
      </fieldset>
    </div>
  
  <script src="reg-form2.js"></script>
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
    crossorigin="anonymous"
  ></script>
<?php include('footer.php'); ?>
