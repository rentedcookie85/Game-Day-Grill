const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., your HTML, CSS, and JS files)
app.use(express.static('public'));

// Handle form submission
app.post('/process_reservation', (req, res) => {
    const { name, email, phone, date, time, guests } = req.body;

    // Compose email message
    const subject = 'New Reservation from Game Day Grill';
    const message = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}`;

    // Configure nodemailer with your email credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dnnd804@gmail.com', // Replace with your Gmail email address
            pass: ' E91E54D40C29543A2183EBCFD0EA5A2665D4' // Replace with your Gmail password or an App Password
        }
    });

    // Email options
    const mailOptions = {
        from: 'dnnd804@gmail.com', // Replace with your Gmail email address
        to: 'smtp.elasticemail.com', // Replace with your recipient email address
        subject: subject,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Reservation submitted successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
