// and  or operator 
//and && when both condition is true
//or || when any of the condition is true


// if(firstName[0] === "H"){
//     console.log("your name starts with H")
// }

// if(age > 18){
//     console.log("you are above 18");
// }

// if(firstName[0] === "H" && age>18){
//     console.log("Name starts with H and above 18");
// }else{
//     console.log("inside else");
// }
let firstName = "arshit";
let age = 16;

if (firstName[0] === "H" || age > 18) {
    console.log("inside if");
} else {
    console.log("inside else");
}