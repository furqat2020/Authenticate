module.exports = {
    show_home: (req, res) => {
        res.render('home') // {xabar:{success:"Bosh sahifa"}}
    }
}



// getSubscriberParams = (body) => { 1return {
//     name: body.name,
//     email: body.email,
//     zipCode: parseInt(body.zipCode)
//     };
//     };