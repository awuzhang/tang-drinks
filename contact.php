<?php if ( !isset( $_SESSION ) ) session_start();

if ( !$_POST ) exit;

if ( !defined( "PHP_EOL" ) ) define( "PHP_EOL", "\r\n" );

///////////////////////////////////////////////////////////////////////////
// Simple Configuration Options
// Enter the email address that you want to emails to be sent to.
require_once( dirname(__FILE__).'/php/class-phpmailer.php');
require_once( dirname(__FILE__).'/php/class-smtp.php');

$address = "wa@tangux.com";
//shuang@tangux.com
// END OF Simple Configuration Options

///////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
//
// Do not edit the following lines
//
///////////////////////////////////////////////////////////////////////////

$postValues = array();
foreach ( $_POST as $name => $value ) {
	$postValues[$name] = trim( $value );
}
extract( $postValues );

$error = '';

$mail = new PHPMailer;
$mail->isSMTP();// Set mailer to use SMTP
$mail->CharSet = "UTF-8";                            
$mail->Host = 'smtp.tang-consulting.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'system@tang-consulting.com';                 // SMTP username
$mail->Password = 'SysteM2013';                           // SMTP password
$mail->SMTPSecure = '';

// body1
$body  = "提交饮料信息，信息如下：<br>";
$body .= "-------------------------------------------------------------------------------------------<br>";
$body .= "选择的饮料：<br>$orders <br><br>选择的颜色：<div style='width:30px;height:30px;background:$selectedColor'></div>";
//<div style="width:30px;height:30px;background:$selectedColor"></div> 
$body .= "-------------------------------------------------------------------------------------------<br>";
$body .= "这条信息由微信-饮料表单发出";

$mail->From = 'system@tang-consulting.com';
$mail->FromName = 'Tang';
$mail->WordWrap = 70;                                 // Set word wrap to 50 characters
$mail->isHTML(true);

$mail->Subject = "微信饮料 订单";
$mail->AddAddress($address,"Tang");
$mail->Body = $body;

$errmessage = ''; $message = '';
if ( $mail->send() ) {
  $message = "饮品一会儿送上, 请享用 <br> Please enjoy";
}else{
  $errmessage = $mail->ErrorInfo ;
}
$responseText =  "{\"err\":\"$errmessage\", \"message\" : \"$message\"}";

echo $responseText;
?>
