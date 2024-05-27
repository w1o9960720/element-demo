export default function (val = [], enumObj = {}, join = ';') {
  if (Array.isArray(val)) {
    return val.map((item) => enumObj[item]).join(join);
  }
  return '';
}
