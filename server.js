const express = require("express");
const tiny = require("tiny-json-http");
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");

// We store the relavant Dribbble URLs here for convenience.
// authUrl is passed along to our template in the `/` handler below.
const authUrl = "https://dribbble.com/oauth/authorize";
const tokenUrl = "https://dribbble.com/oauth/token";

// The path of the Callback URL we set when creating our application on Dribbble.
// We reference this URL below in an app.get
const callbackUrl = "/oauth_callback";

// This isn't oauth or dribbble specific, but storing the value of the original
// Glitch project to check if we're seeing the original or a remix.
const ogGlitchUrl = "https://jribbble.glitch.me";

// These environment variables need to be set in the `.env` file. Look to your left 👈
// client id is safe as public value, if those are seen, it's OK.
// client_secret is not safe for public. You need to keep that private at all times.
const client_id = process.env.DRIBBBLE_APP_ID;
const client_secret = process.env.DRIBBBLE_APP_SECRET;

// When we receive an access_token from the api.dribbble.com server, we'll store it
// in this variable. 
// Q: Why do we use `let` here instead of `const`?
// A: We use `let` so we can reassign `access_token` to a new value. Here, we set
//    an initial value of `null`. Below in the `/oauth_callback` handler we set
//    it to a new value of the access_token from the server.
let access_token = null;

// Standard express setup code.
const app = express();
app.use([express.static("public"), cookieParser()]);

// Set up our template library.
// I–Tyler–didn't look too deep into this, this block of code came from the nunjucks
// docs and got me up and running, so good enough for me at this time.
nunjucks.configure(["views", "public"], {
    autoescape: true,
    express: app
});

// This is our homepage and the page that does most of the work.
app.get("/", (req, res) => {
    const pageUrl = `https://${req.get("host")}`;

    // Here, we'll try to set the access_token from a cookie.
    // In the callback handler below, we set the access_token cookie on successful auth.
    // This isn't something you need to do in your Jribbble uses.
    access_token = req.cookies.access_token;

    // We use render so we can pass along variables to our template.
    // In index.html any time you see {{thing}} or {% %}, we're referencing
    // a variable we set here.
    res.render("index.html", {
        authUrl,
        accessToken: access_token,
        clientId: client_id,
        // Just in case we've hit an authentication error we'll use this to display a message in the template
        error: req.query.error,
        // We create new boolean value here so we don't send the actual secret to the template.
        // Note: I–Tyler–am not sure this is 100% necessary, but it felt best to be overly
        // cautious when our app secret. You don't want anyone to have that.
        hasClientSecret: client_secret.length,

        pageUrl,
        isRemix: pageUrl !== ogGlitchUrl,
        callbackUrl
    });
});

// This is where our Dribbble applications will come back to after a GET to authUrl
app.get(callbackUrl, async (req, res) => {
    const data = {
        code: req.query.code,
        client_id,
        client_secret
    };

    try {
        // We required `tiny` above in tiny-json-http
        // That's a small http library I preferred to use https://github.com/brianleroux/tiny-json-http
        // It's not the only way to make requests, there are many different was to accomplish
        // this http post request to Dribbble
        // Note we are using async/await here. If you're unfamiliar, that's OK. The number one thing
        // to know is `await` makes this code act like it's pausing here and waiting for the http
        // request to complete before moving on to the following lines of code.
        const { body } = await tiny.post({ url: tokenUrl, data });

        // As mentioned above, here we're assigning access_token a new value that is your
        // shiny oauth access token that gives you public read access to your Dribbble account
        access_token = body.access_token;

        // NOTE: Setting a cookie want be required in your uses of Jribbble, because you will
        // include the access_token in your JavaScript.
        res.cookie("access_token", access_token);

        // We don't want to stay on the /oauth_callback page, so redirect back home.
        res.redirect("/");
    } catch (err) {
        // If we hit an error we'll handle that here
        console.log(err);
        res.redirect("/?error=😡");
    }
});

app.get("/logout", (req, res) => {
    res.clearCookie("access_token");
    res.redirect("/");
});

app.listen(process.env.PORT);
