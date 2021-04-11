import camelize from './camelize.js';

function getElementsById(...ids) {
  const dom = {};
  ids.forEach((id) => {
    dom[camelize(id)] = document.getElementById(id);
  });
  return dom;
}

export default getElementsById;
