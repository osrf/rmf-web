export function joinClasses() {
  var classes = [];
  for (var _i = 0; _i < arguments.length; _i++) {
    classes[_i] = arguments[_i];
  }
  return classes
    .filter(function (value) {
      return value;
    })
    .join(' ');
}
var id = 0;
export function uniqueId() {
  return (id++).toString();
}
