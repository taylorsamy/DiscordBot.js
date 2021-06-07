const nodeHtmlToImage = require('node-html-to-image');


const probe = require('probe-image-size');


async function generateImage(name, flavour, type, effect, colour, boost, reserve, share, icon, timestamp) {

    const result = await probe(icon);

    const iconTop = (((1500.0 / 2.0) - (result.height / 2.0)) / 2.0);
    const iconLeft = (((1350.0 / 2.0) - (1000 / 2.0)) / 2.0); // 87.5

    const cardHTML = `<html class="no-js" lang="">
<head>
  <meta charset="utf-8">
  <title></title>
  <!--  <link rel="stylesheet" href="css/main.css">-->
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Literata:ital,wght@1,500&family=Roboto+Condensed&display=swap" rel="stylesheet">
  <style>
    body {
      background-color: transparent;
      width: 1500px;
      height: 2100px;
      padding: 0; 
      margin: 0;
    }
    .colour {
      background-color: {{colour}};
      height: 1500px;
      width: 1350px;
      top: 75px;
      left: 75px;
      position: relative;

    }

    .black {
      background-color: black;
      height: 450px;
      width: 1350px;
      top: 75px;
      left: 75px;
      position: relative;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
    }

    .main {
      height: 1950px;
      width: 1350px;
      box-shadow: 0 0 0 75px white;
      border-radius: 25px;
      position: absolute;
      top: 75px;
      left: 75px;
      z-index: 10;
    }
    .container {
      position: relative;
      top: 0;
    }
    .name {
      position: absolute;
      height: auto;
      top: 75px;
      right: 75px;
      font-family: "Roboto C", sans-serif;
      font-size: 100px;
      color: white;
      z-index: 9;
      transform: scale(1, 1.25);
      -webkit-transform: scale(1, 1.25); /* Safari and Chrome */
    }
    .flavour {
      position: absolute;
      width: 60%;
      bottom: 75px;
      text-align: center;
      font-family: 'Literata', serif;
      font-size: 60px;
      color: black;
      z-index: 9;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      transform: scale(1, 1.25);
      -webkit-transform: scale(1, 1.25); /* Safari and Chrome */
      line-height: 65px;
    }
    .effect {
      width: 80%;
      position: absolute;
      text-align: center;
      font-family: "Roboto C", sans-serif;
      font-size: 60px;
      color: white;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      transform: scale(1, 1.25);
      -webkit-transform: scale(1, 1.25); /* Safari and Chrome */
      line-height: 65px;
    }
    .boost {
      width: 175px;
      height: 175px;
    display: {{boost}};

    }
    .share{
      width: 175px;
      height: 175px;
    display: {{share}};

    }
    .reserve {
      width: 175px;
      height: 175px;
      display: {{reserve}};

    }
    .modifierimg{
      min-width: 100%;
      min-height: 100%;
    }
    .modifier {
      position: absolute;
      bottom: 50px;
      left: 50px;
    }
    .watermark {
       transform: rotate(40deg);
       font-family: "Roboto C", sans-serif;
       position: absolute;
       top: 500px;
       left: 50px;
       font-size: 200px;
       text-align: center;
       color: rgba(89,89,89,0.58);
     }
     .copyright {
       font-size: 50px;
     }
     .icon {
       width: 1000px;
       height: auto;
       position: relative;
       top: {{iconTop}}px;
       left: {{iconLeft}}px;
     }
     .miniicon {
       width: 175px;
       height: auto;

       position: absolute;
       top: 32px;
       left: 32px;
     }

  </style>
</head>
<body>
<div class="container">
  <div class="main"></div>
  <div class="colour">
      <div class="icon">
      <img src='{{icon}}' class="icon">
    </div>
    <div class="miniicon">
      <img src='{{icon}}' class="miniicon">
    </div>
      <div class="watermark">
          Playtest Card
          Unofficial
         <div class="copyright">Card Design © Gobico Games</div>
      </div>
    <div class="name">
      <b><b>{{name}}</b></b>
    </div>
    <div class="flavour">
      <em>{{flavour}}</em>
    </div>
    <div class="modifier">
      <div class="share"><img src='https://i.imgur.com/ZEIbUOQ.png' class="modifierimg"></div>
      <div class="reserve"><img src='https://i.imgur.com/TtTRvRU.png' class="modifierimg"></div>
      <div class="boost"><img src='https://i.imgur.com/Mr1lqTI.png' class="modifierimg"></div>
    </div>
  </div>
  <div class="black">
    <div class="effect">
      <b>{{type}}</b> {{effect}}
    </div>
  </div>
</div>
</body>
</html>
  `;

    const filepath = `C:\\Users\\Taylor\\WebstormProjects\\Semikolin.js\\assets\\images\\roz\\${name}${timestamp}.png`;
    await nodeHtmlToImage({
        output: `C:\\Users\\Taylor\\WebstormProjects\\Semikolin.js\\assets\\images\\roz\\${name}${timestamp}.png`,
        html: cardHTML,
        transparent: true,
        content: { name: name,
            flavour: flavour,
            type: type,
            effect: effect,
            colour: colour,
            boost: boost,
            reserve: reserve,
            share: share,
            icon: icon,
            iconTop: iconTop,
            iconLeft: iconLeft,

        },
    });
    return filepath;

}


module.exports = {
    generateImage,
};

