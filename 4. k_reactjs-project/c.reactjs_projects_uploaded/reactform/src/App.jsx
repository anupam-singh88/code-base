import React, { useState } from 'react'
import './App.css'

export default function App() {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    gender: '',
    dob: '',
    phNo: '',
    hNo: '',
    city: '',
    pincode: '',
    country: '',


  })
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submitHandler = (e) => {
    e.preventDefault();
    // if (formData.fName == '' || formData.lName == '' || formData.gender == '' || formData.dob == '' || formData.phNo == '' || formData.hNo == '' || formData.city == '' || formData.pincode == '' || formData.pincode == '' || formData.country == '') {
    //   alert('Kindly fill all value')
    //   return false
    // }

    if (formData.fName === '') {
      alert('Kindly Enter First Name');
      document.getElementById('fName').style.border = '2px solid red';
      return false
    } else {
      document.getElementById('fName').style.border = '1px solid grey';
    }
    if (formData.lName === '') {
      alert('Kindly Enter Last Name');
      document.getElementById('lName').style.border = '2px solid red';
      return false
    } else {
      document.getElementById('lName').style.border = '1px solid grey';
    }

    if (formData.gender === '' || formData.gender == 'none') {
      alert('Kindly Enter gender');
      document.getElementById('genderField').style.border = '2px solid red';
      return false
    } else {
      document.getElementById('genderField').style.border = '1px solid grey';
    }
    if (formData.dob === '') {
      alert('Kindly Enter dob');
      document.getElementById('dob').style.border = '2px solid red';
      return false
    } else {
      document.getElementById('dob').style.border = '1px solid grey';
    }
    if (formData.phNo === '') {
      alert('Kindly Enter phno');
      document.getElementById('phNo').style.border = '2px solid red';
      return false
    } else {
      document.getElementById('phNo').style.border = '1px solid grey';
    }
    if (formData.hNo === '') {
      alert('Kindly Enter home number');
      document.getElementById('address').style.border = '2px solid red';
      return false
    } else {
      document.getElementById('address').style.border = '1px solid grey';
    }
    if (formData.city === '') {
      alert('Kindly Enter city');
      document.getElementById('city').style.border = '2px solid red';
      return false
    } else {
      document.getElementById('city').style.border = '1px solid grey';
    }
    if (formData.pincode === '') {
      alert('Kindly Enter pincode');
      document.getElementById('pincode').style.border = '2px solid red';
      return false
    } else {
      document.getElementById('pincode').style.border = '1px solid grey';
    }

    if (formData.country === '') {
      alert('Kindly Enter country');
      document.getElementById('country').style.border = '2px solid red';
      return false
    } else {
      document.getElementById('country').style.border = '1px solid grey';
    }
    console.log(formData)
    setFormData({
      fName: '',
      lName: '',
      gender: '',
      dob: '',
      phNo: '',
      hNo: '',
      city: '',
      pincode: '',
      country: '',
    })
    document.getElementById('fName').style.border = '1px solid grey';
    document.getElementById('lName').style.border = '1px solid grey';
    document.getElementById('genderField').style.border = '1px solid grey';
    document.getElementById('dob').style.border = '1px solid grey';
    document.getElementById('phNo').style.border = '1px solid grey';
    document.getElementById('address').style.border = '1px solid grey';
    document.getElementById('city').style.border = '1px solid grey';
    document.getElementById('pincode').style.border = '1px solid grey';
    document.getElementById('country').style.border = '1px solid grey';
    alert('Data Submitted check console for entered data')
  }


  return (
    <>
      <div className="container">

        {/* <h3>React FORM</h3> */}
        <div className="form">
          <form onSubmit={submitHandler}>
            <h3>Name</h3>
            {/* <br /> */}
            <div className="name">
              <div className="fName">
                <label htmlFor="fName">First Name</label>
                <br />
                <input type="text" name="fName" className='inp' id="fName" placeholder='Enter First Name' value={formData.fName} onChange={onChangeHandler} />

              </div>
              <div className="lName">
                <label htmlFor="lName">Last Name</label>
                <br />
                <input type="text" name="lName" className='inp' id="lName" placeholder='Enter Last Name' value={formData.lName} onChange={onChangeHandler} />
              </div>
            </div>
            <br />
            <h3>Gender</h3>
            <select name="gender" id="genderField" value={formData.gender} onChange={onChangeHandler} >
              <option value="none">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender">Prefer Not to say</option>
            </select>
            <br />
            <h3>DOB</h3>
            <input type="date" name="dob" id="dob" className='inp' value={formData.dob} onChange={onChangeHandler} />
            <br />
            <h3>Number</h3>
            <input type="number" minLength={10} maxLength={10} name="phNo" id="phNo" className='inp' placeholder='Enter Phone Number here' value={formData.phNo} onChange={onChangeHandler} />
            <br />
            <h3>Address</h3>
            <div className="addressField">
              <label htmlFor="address">Home No</label>
              <input type="text" name="hNo" id="address" className='inp' style={{ width: "95%" }} placeholder='Enter Flat No:' value={formData.hNo} onChange={onChangeHandler} />
            </div>
            <div className="addressField2 addressField">
              <div>
                <label htmlFor="city">City</label>
                <br />
                <input type="text" name="city" id="city" className='inp' placeholder='Enter City Name' value={formData.city} onChange={onChangeHandler} />
              </div>
              <div>
                <label htmlFor="pincode">PinCode</label>
                <br />
                <input type="number" name="pincode" maxLength={6} id="pincode" className='inp' placeholder='Enter City Name' value={formData.pincode} onChange={onChangeHandler} />
              </div>
            </div>
            <div className='addressField' >
              <label htmlFor="country">Country</label>
              <input type="text" name="country" id="country" className='inp' style={{ width: "95%" }} placeholder='Enter Country Name' onChange={onChangeHandler} />
            </div>
            <div>
              <input type="submit" name="submitBtn" id="submitBtn" value={'Submit'} />
            </div>
          </form>
        </div>

      </div>
    </>
  )
}
