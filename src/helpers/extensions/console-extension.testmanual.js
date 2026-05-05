console.clear();
const tmp = console.logGroup.list();
//test1
console.logGroup.clear(); 
console.info("T1.1 should be true")
console.log ( true, "test 1.1 should print, no log Groups set");
console.info("T1.2 should be true")
console.log([lg.all],true, "test1.2 should print"); 
console.info("T1.3 should not print");
console.log ([lg.jw],"ERROR test 1.3 should not print");

//test2
console.logGroup.add(lg.jw); //should add "all" by default and "jw" to localstorage
console.info("T2.1 should be true");
console.log([lg.jw],true, "Test 2.1 should print"); //adds "jw". if logGroups is empty, it should add "all" by default as first array item. 

console.info("T2.2 should NOT print"); 
console.log("test 2.2 should NOT print");

console.info("T2.3 should be true");
console.log([lg.all],true, "test 2.3 should print");

console.info("T2.4 should be true");
console.log([lg.jw],true, "test 2.4 should print");

console.info("T2.5 should NOT print");
console.log([lg.hubble],"ERROR test 2.5 should NOT print");

//test3
console.logGroup.add(lg.hubble);
console.info("T3.1 should be true"); 
console.log([lg.hubble],true, "test 3.1 should print");

console.logGroup.clear();
if (tmp) {
  console.logGroup.set(tmp);
}
    