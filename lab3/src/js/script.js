let btns   = document.querySelectorAll('button'),
    hidden = document.querySelector('.hidden')

let mainLink    = 'https://jut.su/kimetsu-yaiba/season-1/',
    tanjiroLink = 'https://kimetsu-no-yaiba.fandom.com/wiki/Tanjiro_Kamado',
    nezukoLink  = 'https://kimetsu-no-yaiba.fandom.com/wiki/Nezuko_Kamado',
    zenitsuLink = 'https://kimetsu-no-yaiba.fandom.com/wiki/Zenitsu_Agatsuma',
    inosukeLink = 'https://kimetsu-no-yaiba.fandom.com/wiki/Inosuke_Hashibira',
    link        = document.querySelector('link')

for (let btn of btns) {
  btn.addEventListener('click', (e) => {
    if(btn.dataset.name === "header") {
      document.location = mainLink
    }else if(btn.dataset.name === "tanjiro") {
      document.location = tanjiroLink
    }else if(btn.dataset.name === "nezuko") {
      document.location = nezukoLink
    }else if(btn.dataset.name === "zenitsu") {
      document.location = zenitsuLink
    }else if(btn.dataset.name === "inosuke") {
      document.location = inosukeLink
    }else if(btn.dataset.name === "print") {
      btn.dataset.name = "Noprint"
      btn.textContent = "Версия для просмотра"
      link.href = './src/css/print.css'
    }else if(btn.dataset.name === "Noprint") {
      btn.dataset.name = "print"
      btn.textContent = "Версия для печати"
      link.href = './src/css/style.css'
    }
  });
}