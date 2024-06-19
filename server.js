const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

app.post('/send-email', (req, res) => {
    const { name } = req.body;

    // Create a Nodemailer transporter using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your Gmail address
            pass: 'your-email-password'   // Replace with your Gmail password or app-specific password
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'fahadchaudhary7868@gmail.com', // The recipient's email address
        subject: 'New Name Submission',
        text: `You have received a new name: ${name}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ success: false, error: error.message });
        }
        res.json({ success: true, info: info.response });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
