import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "greekpotato";
const yourPassword = "123456789";
const yourAPIKey = "b90b1eed-1c99-488f-84c6-4caed635ace6";
const yourBearerToken = "3baecf14-2836-4007-b280-e2290ea18061";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {

  try{
    const response = await axios.get(API_URL+`/random`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs",{content: result});
    console.log(result);
  } catch (error) {
    console.error("Failed to make request",error.message);
    res.render("index.ejs",{error: "No messages were loaded"});
  }

});

app.get("/basicAuth", async (req, res) => {

  try{

    const response = await axios.get(API_URL+"/all?page=1", {
      auth: {username: "greekpotato",password: "123456789",},
    });
    const result = JSON.stringify(response.data);
    res.render("index.ejs",{content: result});
    console.log(result);
  } catch (error) {
    console.error("Failed to make request",error.message);
    res.render("index.ejs",{error: "Incorrect  password"});
  }

});

app.get("/apiKey", async (req, res) => {
  try{
    const response = await axios.get(API_URL+`/filter?score=5&apiKey=${yourAPIKey}`);
    const result = JSON.stringify(response.data);
    res.render("index.ejs",{content: result});
    console.log(result);
  } catch (error) {
    console.error("Failed to make request",error.message);
    res.render("index.ejs",{error: "Your API key is not valid"});
  }

});

app.get("/bearerToken", async (req, res) => {
  try{
    const response = await axios.get(API_URL+"/secrets/2", {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}`
      },});
    res.render("index.ejs",{content: JSON.stringify(response.data)});
    console.log(result);
  } catch (error) {
    console.error("Failed to make request",error.message);
    res.render("index.ejs",{error: "Request failed with status code 401"});
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
