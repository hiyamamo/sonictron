
export function getPtClassSet(ptClass, ptSize) {
  let classes = {};
  classes[ptClass] = true;
  const prefix = ptClass + '-';

  if (ptSize) {
    classes[prefix + ptSize] = true;
  }

  return classes;
}
