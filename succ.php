<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <style media="screen">
    @-webkit-keyframes rotatePlaceholder {
      0% {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg); }
      5% {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg); }
      12% {
        transform: rotate(-405deg);
        -webkit-transform: rotate(-405deg); }
      100% {
        transform: rotate(-405deg);
        -webkit-transform: rotate(-405deg); }
     }

    @keyframes rotatePlaceholder {
      0% {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg); }
      5% {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg); }
      12% {
        transform: rotate(-405deg);
        -webkit-transform: rotate(-405deg); }
      100% {
        transform: rotate(-405deg);
        -webkit-transform: rotate(-405deg); }
      }
      .arc{
        border: 2px solid #ddd;
        border-radius: 50%;
        width: 100px;
        height: 100px;
        margin: auto;
        position: relative;
        top: 50px;
        overflow: hidden;
        width: 80px;
        height: 80px;
        /* border: 4px solid gray; */
        -webkit-border-radius: 40px;
        border-radius: 40px;
        border-radius: 50%;
        margin: 20px auto;
        padding: 0;
        position: relative;
        box-sizing: content-box;
      }
      .arc::before {
          -webkit-border-radius: 120px 0 0 120px;
          border-radius: 120px 0 0 120px;
          top: -7px;
          left: -33px;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          -webkit-transform-origin: 60px 60px;
          transform-origin: 60px 60px;
      }

      .arc::before, .arc::after {
          content: '';
          -webkit-border-radius: 40px;
          border-radius: 40px;
          border-radius: 50%;
          position: absolute;
          width: 60px;
          height: 120px;
          background: white;
          -webkit-transform: rotate(45deg);
      }

      .arc::after {
          -webkit-animation: rotatePlaceholder 4.25s ease-in;
          animation: rotatePlaceholder 4.25s ease-in;
      }

      .arc::after {
          -webkit-border-radius: 0 120px 120px 0;
          border-radius: 0 120px 120px 0;
          top: -11px;
          left: 30px;
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          -webkit-transform-origin: 0px 60px;
          transform-origin: 0px 60px;
      }


      .arc::before, .arc::after {
          content: '';
          -webkit-border-radius: 40px;
          border-radius: 40px;
          border-radius: 50%;
          position: absolute;
          width: 60px;
          height: 120px;
          background: white;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
      }
    </style>
  </head>
  <body>
      <div class="" style="margin: auto; width: 300px; height: 300px; background: #f1f1f1;">
        <div class="arc">
          <div class="arc_child">

          </div>
        </div>
      </div>
  </body>
</html>
