<?php

  $mail['mail'] = $_POST['mail'];
  $mail['name'] = $_POST['nom'];
  $mail['title'] = $_POST['sujet'];
  $mail['location'] = 'site de l\'agence';
  $mail['message'] = $_POST['message'];
  $mail['link'] = 'http://ecume.me';
  $mail['link-content'] = 'Aller sur le site de l\'agence';


  $headers  = 'MIME-Version: 1.0' . "\r\n";
  $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";


  $mail['send'] = '<!doctype html><html><head><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>'.$mail['title'].'</title><style>*{font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;font-size: 100%;line-height: 1.6em;margin: 0;padding: 0;}img {max-width: 600px;width: 100%;}body{-webkit-font-smoothing: antialiased;height: 100%;-webkit-text-size-adjust: none;width: 100% !important;}a{color: #348eda;}.btn-primary{Margin-bottom: 10px;width: auto !important;}.btn-primary td{background-color: #348eda; border-radius: 25px;font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; font-size: 14px; text-align: center;vertical-align: top;}.btn-primary td a {background-color: #348eda;border: solid 1px #348eda;border-radius: 25px;border-width: 10px 20px;display: inline-block;color: #ffffff;cursor: pointer;font-weight: bold;line-height: 2;text-decoration: none;}.last{margin-bottom: 0;}.first {margin-top: 0;}.padding {padding: 10px 0;}table.body-wrap {padding: 20px;width: 100%;}table.body-wrap .container {border: 1px solid #f0f0f0;}table.footer-wrap {clear: both !important;width: 100%;  }.footer-wrap .container p {color: #666666;font-size: 12px; }table.footer-wrap a {color: #999999;}h1,h2,h3{color: #111111;font-family: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;font-weight: 200;line-height: 1.2em;margin: 40px 0 10px;}h1{font-size: 36px;}h2{font-size: 28px;}h3{font-size: 22px;}p, ul, ol{font-size: 14px;font-weight: normal;margin-bottom: 10px;}ul li, ol li {margin-left: 5px;list-style-position: inside;}.container{clear: both !important;display: block !important;Margin: 0 auto !important;max-width: 600px !important;}.body-wrap .container {padding: 20px;}.content {display: block;margin: 0 auto;max-width: 600px;}.content table {width: 100%;}</style></head><body bgcolor="#f6f6f6"><table class="body-wrap" bgcolor="#f6f6f6"><tr><td></td><td class="container" bgcolor="#FFFFFF"><div class="content"><table><tr><td><h1>Message de '.$mail['name'].' - '.$mail['mail'].'</h1><p>'.$mail['message'].'</p><p><a href="'.$mail['link'].'">'.$mail['link-content'].'</a></p></td></tr></table></div></td><td></td></tr></table><table class="footer-wrap"><tr><td></td><td class="container"><div class="content"><table><tr><td align="center"><p>Envoyé depuis '.$mail['location'].'</p></td></tr></table></div></td><td></td></tr></table></body></html>';


  if(mail("amelie13.bertout@orange.fr",$mail['title'],$mail['send'], $headers)){
    echo 'true';
  }
  else{
    echo 'false';
  }

?>
