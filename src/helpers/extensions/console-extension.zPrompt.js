//USER: PROMPT1:
/* 
in javascript vite react application, create a console.log extension that overrides the default console.log function to show or block the log based on if the first item is a string array with the first item ==="all" 

it will look at values in a localStorage key called "logGroups" and if the value is "all" it will show all logs, if the value is "jw" it will show only logs that are in the jw group, if the value is "hubble" it will show only logs that are in the hubble group.

if a developer writes console.log without the inital logGroup array, prefix with a message that says "!important look at console-extension" and then their log values

if logGroups is not set, it will show all logs. 

if logGroups is null, the console.log will work as a regular console.log.

console.logGroup will have methods to add, remove, set, clear, and list the log groups. if possible, console.logGroup should return console.logGroup.list(). 


it should have a globalThis.lg that stands for log group with predefined string values "all", "jw","hubble". 

use jsdoc to document the methods and properties of console.logGroup and lg 

intellisense in vscode should display items

the following tests should be done to check if the console.log is working as expected:
*/

//if localStorage.logGroups exists, save it to a temporary variable to restore after tests (or null if it doesn't exist)

const tmp =console.logGroup //or console.logGroup.list()
console.clear() //clear the console

console.log("beginning tests") //this should show

//test1
console.logGroup.clear(); 
console.log ("test 1.1 should print, no log Groups set");
console.log([lg.all],"test1.2 should print"); 
console.log ([lg.jw],"ERROR test 1.3 should not print");

//test2
console.logGroup.add(lg.jw); //should add "all" by default and "jw" to localstorage
console.log([lg.jw],); //adds "jw". if logGroups is empty, it should add "all" by default as first array item. 
console.log("test 2.1 should NOT print");
console.log([lg.all],"test 2.2 should print");
console.log([lg.jw],"test 2.3 should print");
console.log([lg.hubble],"ERROR test 2.4 should NOT print");

//test3
console.logGroup.add(lg.hubble); 
console.log([lg.hubble],"test 3.1 should print");

//USER: PROMPT2:
/*
    are there any  gaps in the logic or the test scenario to consider
*/




