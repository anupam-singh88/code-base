function replaceKeyValue(obj, key, newValue) {
    // Create a new object to avoid mutation of the original object
    const newObj = Array.isArray(obj) ? [] : {};
  
    // Iterate through the object to process each key-value pair
    for (const [k, v] of Object.entries(obj)) {
      if (k === key) {
        // If the key matches, replace the value
        newObj[k] = newValue;
      } else if (typeof v === 'object' && v !== null) {
        // If the value is an object, recursively call replaceKeyValue
        newObj[k] = replaceKeyValue(v, key, newValue);
      } else {
        // Otherwise, keep the original value
        newObj[k] = v;
      }
    }
  
    return newObj;
  }
  
  // Test Case 1
  const assignmentObject = {
    "Name": "Random person",
    "Address": {
       "addressLine1": "SCO 62",
       "addressLine2": "City heart",
       "city": "Mohali",
       "state": "Punjab",
     },
     "educationQualification": {
       "10th": {
           "Marks": 400,
           "Percentage": "80%",
        },
       "12th": {
           "Marks": 400,
           "Percentage": "80%",
        },
       "graduation": {
           "Marks": 400,
           "Percentage": "80%",
        },
       "postGraduation": {
           "Marks": 400,
           "Percentage": "80%",
        },
     }
  };
  
  const result1 = replaceKeyValue(assignmentObject, "state", "Haryana");
  console.log(JSON.stringify(result1, null, 2));
  
  // Test Case 2
  const result2 = replaceKeyValue(assignmentObject, "Marks", 500);
  console.log(JSON.stringify(result2, null, 2));
  