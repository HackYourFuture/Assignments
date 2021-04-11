// Credit: https://stackoverflow.com/questions/57556471/convert-kebab-case-to-camelcase-javascript

function camelize(name) {
  return name.replace(/-./g, (x) => x.toUpperCase()[1]);
}

export default camelize;
