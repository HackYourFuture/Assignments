function AnnunciatorView(dom) {
  return ({ error }) => {
    if (error) {
      dom.annunciator.textContent = error.message;
      setTimeout(() => {
        dom.annunciator.textContent = '';
      }, 2000);
    }
  };
}

export default AnnunciatorView;
