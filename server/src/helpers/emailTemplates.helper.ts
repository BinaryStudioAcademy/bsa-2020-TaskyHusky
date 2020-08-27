import { appHost, frontendPort } from '../../config/app.config';

export const resetEmailTemplate = (token: string) => {
	return `<html>
	<head></head>
  <body>
    <div style="font-family:arial,'helvetica neue',helvetica,sans-serif;padding:0;width:600px;margin:0 auto;background:#ffffff!important">
		  <h1 style="min-width:100%;width:100%;padding-top:30px;padding-right:0px;padding-bottom:0px;padding-left:0px">Notification from Tasky-Husky Team &#128527;</h1>
      <div style="height:2px;border-bottom:2px solid #e5e5e5"></div>
      <p style="font-size:20px;font-weight:300;letter-spacing:1px">Hi there! We received a request to reset the email for the Tasky-Husky account associated with this e-mail address. Click the link below to reset your email using our secure server:
			  <a style="letter-spacing:0px" href=http://${appHost}:${frontendPort}/reset-email/${token}>Link to change e-mail</a></p>
		  <p style="font-size:20px;font-weight:300;letter-spacing:1px">If clicking the link doesn't work, you can copy and paste the link into your web browser's address bar. You will be able to update email for your Tasky-Husky account after clicking the link above.
      If you did not request to have your email assigned to Tasky-Husky account, you can ignore this email.</p>
      <div style="height:2px;border-bottom:2px solid #e5e5e5"></div>
      <p style="font-size:20px;font-weight:300;letter-spacing:1px">P.S. You link expire in 1 day. &#128527;</p>
    </div>
	</body>
	</html>`;
};
