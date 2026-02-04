export function getStringKebabCase(name: string) {
  return name.toLowerCase().replaceAll(" ", "-");
}

export function getTestPathKebabCase(titlePath: string[], testName?: string) {
  let name: string = "";
  let limit = testName ? titlePath.length - 1 : titlePath.length
  for (let index = 0; index < limit; index++) {
    name = name + "/" + titlePath[index];
  }
  name = `${name}${testName ? '/'+testName : ''}.png`;
  return name.toLowerCase().replaceAll(" ", "-").replaceAll(".spec.ts", "");
}
