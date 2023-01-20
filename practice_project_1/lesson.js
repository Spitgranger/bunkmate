//Switch range 
//if condition is evaluated within case then put true as expression
const speed = 55;
switch (true) {
//speed limit is below 50
case speed <= 50:
    console.log("You are within the speed limit");
    break
//speed limit is above 50
case speed > 50:
    console.log("You are speeding!");
    break
//when speed limit is below 0 or above 300
case speed < 0:
case speed >= 300:
    console.log("wtf");
    break
//default statement
default:
    alert("Something broke please make sure you use an integer");
    break
}
//regular switch operator
//if condition is binary (right or wrong) within case then the expression needs to be placed within the parentheses
const looks = 11;
switch (looks) {
    case 1:
        console.log("Sewage");
        break
    case 2:
        console.log("Plastic surgery is a good choice for you");
        break
    case 3:
        console.log("you need to wear makeup 24/7");
        break
    case 4:
        console.log(":(");
        break
    case 5:
        console.log("you're halfway there");
        break
    case 6:
        console.log("not bad");
        break
    case 7:
        console.log("average");
        break
    case 8:
        console.log("good looking");
        break
    case 9:
        console.log("Sweet Jesus");
        break
    case 10:
        console.log("Are you a model");
        break

    case 11:
    case 12:
        console.log("Rarer than francium");
    default:
        console.log("and you've broken the scale");
        break

    
}

//special methods
var mystring = "Adam and Even";
var newstring = mystring.replace("Even", "Eve");
console.log(newstring);

let myarray = ["I", "love", "chocolate", "cake"];

let joined = myarray.join(' '); //joins elemenets within in array into a string seperated by a delimitter
let splitted = joined.split(" "); //splits elements within a string into an array seperated by a delimitter

console.log(joined);
console.log(splitted);

const myNumber = Math.random();
console.log("Random Number: ", myNumber);


function welcome(name = "Chris Evans") {
    console.log("Hello: ", name);
}
welcome();

const cost = 3000;
const people = 4;

//high reusuability
function funcClick() {
    var calculator= document.getElementById("message");
    calculator.innerHTML = cost / people;
}
//function declaration (can be called before declaration)
//function (verb function name) (argument) {
//    statement
//    return expression 
//}

function pet(animal) {
    return ("my pet is a " + animal);
}

let pet2 = pet("goat") //declare a variable 
console.log(pet2);

//function expression
//only called when reached within control flow
let pet3 = function(animal) {
    return ('my pet is a, ${animal} ')
};

console.log(pet3("cat"));

//function expression condensed + arrows
//even more condensed form (declare variable and create function and return value same line (implement arrows)
let favorite_animal = (animal) => 'my pet is a ' + animal; //turn favorite animal into a function (parenthesses msut be present for function expressions)
console.log(favorite_animal('dog'));


//problem solving
// understand the problem (problem statement) (write steps in plain english + divide into subproblems)
    //write a program that that increments from 1 to N every time a number if divisible by 3 output fizz
    //every time it's divisible by 5 output buzz
    //every time it's divisible by 3 and 5 write fizz buzz

// (for web development) per page, study competition for aesthetics of website
    // flow chart for structure and functionality
    // list of desired inputs and outputs
    // how to use their inputs to get desired outputs

// pseudocode
    //for i in range(1, N):
        // if i % 3 == 0: return "fizz"
        // elif i % 5 == 0: return "buzz"
        // elif i % 5 and i % 3: return "fizz buzz"

// write code

let N = parseInt(prompt("Enter the number you'd like to go up to: ", 20));
let fizzBuzz = function(number) {
    //expression contains starting point; condition that it goes up until; increment or decrement
    for (i = 1; i <= number; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FIZZBUZZ");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else {
            console.log(i);
        }
    };
};

fizzBuzz(N);
// stuck?: explain the problem + use debugger + stackoverflow




// https://techterms.com/definition/backend
// https://www.codecademy.com/article/back-end-architecture
// backend responsibility outline

//FUNCTINON DECLARATION VS EXPRESSION
    //both can have anonymous functions
    //both have to have parentheses to indicate they are functions else they are just expressions
    //both can have immediately invoked function expressions

//FUNCTION EXPRESSIONS
    //can't be hoisted (can not be called before being declared)
    //should be used by default when you don't need recurisve code or you don't need hoistability as it's cleaner

//normal function expresion
let wow1 = function() {console.log("normal function expression")};

//alternative method using arrows
let wow2 = () => {console.log("ANON function expression")};

//IIFE immediatly invoked function expression 
//anonymous IIFE using arrows
(() => {console.log("ANON IIFE")})();


// notHoisted(); //error
var notHoisted = () =>
    console.log("bar");
notHoisted();

//FUNCTION DECLARATIONS
    //can be hoisted (called before declared)
    //reusable
    //used recursively
    //commonly used in react to avoid errors when called before declared

//normal function declaration
function func(param1, param2) {
    //expression
}
//call an anonymous function declaration immediatly
//IIFE immediately invoked function expressions
(function() {
    console.log("wooooooooooooooooooooooooooooooooow");
})();
//anonymous functions can be passed as arguments or parameter
//and can be used as private functions that aren't meant
//to be called
// also for functions that are only used once




//precursor to map and filter
cats = ["leopard", "serval", "jaguar"];

let catupper = function(cat) {
    capcats = []
    for (let i = 0; i < (cats.length); i++) {
        capcats.push(cats[i].toUpperCase())
    };
    return capcats
};

console.log(catupper(cats));

/*
let filtered = function(cats) {
    for (i = 0; i < catupper().length; i++) {
        let filter = catupper().startsWith("S");
            console.log(filter);
    };
};

filtered(cat= cats)
*/

//cost splitting function
function overlap (intervals, rate, person) {
    /*
    [[1,7], [2,9], [3,4]]
    Person A's perspective:
    1-2pm dollars
    2-3pm dollars
    3-4pm dollars
    4-5pm dollars
    5-6pm dollars
    6-7pm dollars

    28 dollars and 33 cents
    60 dollars
    */

    let count = 1
    let new_cost = 0
    record = intervals[person]
    intervals.pop(person)
    for (let integer = record[0]; integer < record[1]; i++); {
        for (let compare = intervals[0]; compare < intervals.length; i++); {
            if (integer < compare[1] && integr >= compare[0]) {
                count++
            }
        }
        new_cost += rate / count
        count = 1
    }
    console.log('You save ${rate * (record[1] - record[0]) - newcost}')
}
