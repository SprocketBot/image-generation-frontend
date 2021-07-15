export function find(obj:any, item:string):string[] {
  for(const key in obj) {
      if(obj[key] && typeof obj[key] === "object") {
          const result = find(obj[key], item);
          if(result) {
              result.unshift(key);
              return result;
          }
      } else if(obj[key] === item) {
          return [key];
      }
  }
}

export function findFormatted(obj:any, item:string):string {
  const path = find(obj, item);
  if(path == null) {
      return "";
  }
  return 'myObj.' + path.join('.');
}

export function recursiveObjectToArray(obj, array, buildStr = "") {
  for (const [key, value] of Object.entries(obj)) {
    if (value.hasOwnProperty("description")) {
      array.push({ key: buildStr + key, value: value });
    } else {
      recursiveObjectToArray(value, array, buildStr + key + ".");
    }
  }
}