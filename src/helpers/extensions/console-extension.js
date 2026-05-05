/*
  This is used by main.jsx to extend console.log for two important purposes:
    1. prevent prod from receiving console.log messages (unless we specifically provide workaround)
    2. prevent console "noise" from other teams and developers affecting your own debugging experience
  usage:
    1. "regular" usage:
      console.log ("whatever") //feels like normal logging, blocked in prod.
    2. tagged usage:
      blocks direct console.log "noise" by allowing developers to select a group category:
      console.log ([lg.account], "whatever")   //only "account" messages will print.
      console.log (["account","telesto", "SteveC"], whatever)  //only these groups will print
      console.log (["*"]) or console.log (["all"]) // this overrides and always prints
      to set (note: we could add a developer dashboard page for this)
      it uses a variable in localStorage and persists for the url used
      in console:
         console.logGroup.add(lg.account)
         console.logGroup.add("developername") //you can make your own tags.
         now the console will
          1. only display items in that group.
          2. won't display anything typed as console.log("message")
*/
(() => {
  /** @typedef {"all" | "start_mas" | "dashboard" | "participant" | "profile" | "account" | "review" | "faat" | "notes" | "invitation" | "admin" | "collab"} LogGroup */
  /**
   * Log group key for localStorage
   * @type {string}
   */
  const keyLogGroup = "logGroups";
  /**
   * Global log group identifiers
   * @type {{ all: string, start_mas: string, dashboard: string, participant: string, profile: string, account: string, review: string, faat: string, notes: string, invitation: string, admin: string, collab: string }}
   */
  globalThis.lg = {
    all: "all",
    start_mas: "start_mas",
    dashboard: "dashboard",
    participant: "participant",
    profile: "profile",
    account: "account",
    review: "review",
    faat: "faat",
    notes: "notes",
    invitation: "invitation",
    admin: "admin",
    collab: "collab",
    jw: "jw", //don't remove previous codes, it breaks functionality for people that used it.
  };
  const originalLog = console.log.bind(console);
  /**
   * Get active log groups from localStorage
   * @returns {LogGroup[] | null}
   */
  function getGroups() {
    const stored = localStorage.getItem(keyLogGroup);
    if (stored === null) return null;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  }
  /**
   * Override console.log to respect log groups
   * @param {...any} args
   */
  console.log = (...args) => {
    // Add this to capture and log the stack trace
    const stack = new Error().stack;
    const callerInfo = '\nat: ' + stack.split("\n")[2]?.trim(); // Get the second line of the stack trace (caller location)
    if (Array.isArray(args[0]) && args[0].includes("all")) {
      return originalLog(...args, callerInfo);
    }
    const currentGroups = getGroups();
    if (currentGroups === null) {
      const stack = new Error().stack;
      const callerInfo = '\|at:' + stack.split("\n")[2]?.trim();
      if (Array.isArray(args[0]) && typeof args[0][0] !== "string") {
        console.error(
          "console.log('whatever') is being deprecated! see console-extension.js"
        );
        originalLog("use logGroups, see error above!", ...args, callerInfo); // fallback to regular logging
        // Add this to capture and log the stack trace
        return;
      } else if (!Array.isArray(args[0])) {
        //handle glance
        //if (args[0].indexOf('ERR_DOMAINPARSE') !== -1) {
        //originalLog(...args, callerInfo);
        //return;
        //}
        console.error(
          "console.log('whatever') is being deprecated! see console-extension.js"
        );
        originalLog("use logGroups, see error above!", ...args, callerInfo); // fallback to regular logging
        return;
      } else {
        //originalLog("console .log supressed"); //(...args);        
        return;
      }
    };
    if (args.length === 1) {
      //originalLog("console .log supressed");
      return;
    }
    const maybeGroup = args[0];
    if (!Array.isArray(maybeGroup)) {
      return;
    }
    if (
      Array.isArray(maybeGroup) &&
      maybeGroup.some((g) => typeof g !== "string")
    ) {
      //originalLog("console suppressed");
      return;
    }
    if (maybeGroup.some((group) => currentGroups.includes(group))) {
      originalLog(...args);
      return;
    }
  };
  /**
   * Console log group controller
   * @type {{
   *   add: (string) => add item to the log group,
   *   remove: (string) => remove item from the log group,
   *   set: ([string,string]) => set the log group,
   *   clear: () => clear the log group,
   *   list: () => logGroup collection
   * }}
   */
  console.logGroup = {
    add(key) {
      let current = getGroups() || [];
      if (current.length === 0 && key !== "all") {
        current.push("all");
      }
      if (!current.includes(key)) current.push(key);
      localStorage.setItem(keyLogGroup, JSON.stringify(current));
      console.info("added: ", key, console.logGroup.list());
      return console.logGroup.list();
    },
    remove(key) {
      let current = getGroups() || [];
      current = current.filter((g) => g !== group);
      localStorage.setItem(key, JSON.stringify(current));
      return console.logGroup.list();
    },
    set(...keys) {
      // Flatten the groups array in case it's nested (due to rest parameters)
      const flattenedKeys = keys.flat();
      // Check if "all" is already in the array
      if (!flattenedKeys.includes("all")) {
        // Add "all" to the beginning of the array
        flattenedKeys.unshift("all");
      } else {
        // If "all" exists but not at the first position, move it to the front
        const index = flattenedKeys.indexOf("all");
        if (index > 0) {
          flattenedKeys.splice(index, 1); // Remove "all" from its current position
          flattenedKeys.unshift("all"); // Add "all" to the beginning
        }
      }
      // Store the modified array in localStorage
      localStorage.setItem(keyLogGroup, JSON.stringify(flattenedKeys));
      return this.list();
    },
    clear() {
      localStorage.removeItem(keyLogGroup);
      return this.list();
    },
    list() {
      return getGroups();
    },
    test() {
      console.clear();
      console.info("beginning tests");
      const tmp = console.logGroup.list();
      //test1
      console.info("T1.1 should be true and also throw error message");
      console.logGroup.clear();
      console.log(true, "test 1.1 should print, no log Groups set");
      console.info("T1.2 should be true");
      console.log([lg.all], true, "test1.2 should print");
      console.info("T1.3 should not print");
      console.log([lg.account], "ERROR test 1.3 should not print");
      //test2
      console.logGroup.add(lg.account); //should add "all" by default and "account" to localstorage
      console.info("T2.1 should be true");
      console.log([lg.account], true, "Test 2.1 should print"); //adds "account". if logGroups is empty, it should add "all" by default as first array item.
      console.info("T2.2 should NOT print");
      console.log("test 2.2 should NOT print");
      console.info("T2.3 should be true");
      console.log([lg.all], true, "test 2.3 should print");
      console.info("T2.4 should be true");
      console.log([lg.account], true, "test 2.4 should print");
      console.info("T2.5 should NOT print");
      console.log([lg.participant], "ERROR test 2.5 should NOT print");
      //test3
      console.logGroup.add(lg.participant);
      console.info("T3.1 should be true");
      console.log([lg.participant], true, "test 3.1 should print");
      console.logGroup.clear();
      if (tmp) {
        console.logGroup.set(tmp);
      }
      console.info("test complete");
    }
  };
})();
