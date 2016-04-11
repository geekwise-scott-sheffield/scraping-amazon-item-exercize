var express = require("express");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();


function scrapePrice(){
    app.get("/scrape", function(req, res){
        //url = "http://www.internetlivestats.com/";
        url = "http://www.amazon.com/gp/product/B00OBRE5UE/ref=s9_simh_gw_g147_i1_r?ie=UTF8&fpl=fresh&pf_rd_m=ATVPDKIKX0DER&pf_rd_s=desktop-1&pf_rd_r=1Q8HJX9N44JHJP7G8PD2&pf_rd_t=36701&pf_rd_p=2437869742&pf_rd_i=desktop";
        //url = "http://advancedemissions2.editllc.com/testimonial/testimonial-first/";

        request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);

                //advanced emisssions scrape request
                var testimonial;
                $(".eut-testimonial-element > :nth-child(1)").filter(function(){
                    var data = $(this);

                    testimonial = data.text();
                    console.log(testimonial);
                });


                ////live stats scrape request
                //var sitesHacked;
                //$(".counterboxwrapper > :nth-child(2)").filter(function(){
                //    var data = $(this);
                //
                //    sitesHacked = data.text();
                //    console.log(sitesHacked);
                //});

                //amazon price scrape request
                var price;
                var json = {price : ""};

                $("#priceblock_ourprice").filter(function(){
                    var data = $(this);

                    price = data.text();
                    console.log("current price of SSD: " + price);
                    //json.price = price;
                })
            }

            //fs.writeFile("output.json", JSON.stringify(json, null, 4), function(err){
            //    console.log("price properly retrived, seek project file output.json");
            //});

            res.send("check terminal!");
        })
    });


}


//setInterval(scrapePrice, 1000);
setTimeout(scrapePrice, 4000);
app.listen("8081");
console.log("magic happens at port 8081");
exports = module.exports = app;