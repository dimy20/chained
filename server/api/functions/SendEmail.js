const nodemailer = require("nodemailer");
async function SendEmail() {
	const testaccount = await nodemailer.createTestAccount(); // GIVES BACK FAKE SMPT SERVICE FOR TESTING
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "franco.nolan@ethereal.email", // generated ethereal user
			pass: "rMDB1c5F33pBrHd1bD", // generated ethereal password
		},
	});
	const info = await transporter.sendMail({
		from: '"Fred Foo 👻" <foo@example.com>', // sender address
		to: "bar@example.com, baz@example.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "http://localhost:3000/profile", // plain text body
		html: "<b>Hello world?</b>", // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
SendEmail().catch((err) => {
	console.log(err);
});
