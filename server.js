//hi mdfsa
const queryString = require("query-string");
const http = require("http");
//request, responce(les elements pour produire une reponse)
const server = http.createServer((req, res) => {
  console.log(req.url);

  // construire un objet
  let reqInfo = {
    url: req.url,
    method: req.method,
    contentType: req.headers["content-type"],
  };

  // le body est du json, 200 for if request ok
  res.writeHead(200, { "Content-Type": "application/json" });

  if (req.method == "GET") {
    let stringifyJSONObj = JSON.stringify(reqInfo);
    res.end(stringifyJSONObj);
  } else {
    if (req.method == "POST") {
      let body = [];
      req
        .on("data", (chunk) => {
          body.push(chunk);
        })
        .on("end", () => {
          try {
            if (req.headers["content-type"] === "application/json")
              reqInfo.body = JSON.parse(body);
            else if (
              req.headers["content-type"] ===
              "application/x-www-form-urlencoded"
            )
              reqInfo.body = queryString.parse(body.toString());
            else reqInfo.body = body.toString();
            res.end(JSON.stringify(reqInfo));
          } catch (error) {
            console.log(error);
          }
        });
    }
  }
});

// if port is defined use value,if not use 5000
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
