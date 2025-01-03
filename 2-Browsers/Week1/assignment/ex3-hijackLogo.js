function hijackGoogleLogo() {
  const googleLogo = document.querySelector('.lnXdpd');
  googleLogo.src =
    'https://cdn.prod.website-files.com/62745a1007e49e2461fb7ecd/62745a1007e49e6f2afb7fd1_HYF.svg';
  googleLogo.srcset =
    'https://cdn.prod.website-files.com/62745a1007e49e2461fb7ecd/62745a1007e49e6f2afb7fd1_HYF.svg';
}

hijackGoogleLogo();
