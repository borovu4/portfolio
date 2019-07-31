<?php
if($_POST){
    if(isset($_POST['mail'])){
        $message = 'Сообщение со второй формы. Имя: '.$_POST['name']. ', Телефон: '.$_POST['phone'].',  email: '.$_POST['mail'];
    }
    else{
        $message = 'Сообщение с первой формы. Имя: '.$_POST['name']. ', Телефон: '.$_POST['phone'];
    }
//    mail('labserinua@gmail.com', 'Сообщение с сайта LuckyLOOK', $message);
    mail('voznesenskaya.84@gmail.com, i.rogozha@luckylook.com.ua, badikov.t@gmail.com', 'Сообщение с сайта LuckyLOOK', $message);
    return json_encode('ok');
}