var app = require('express')();
var proxy = require('express-http-proxy');
const serve   = require('express-static');

app.use('/api', proxy('http://49.4.12.144:8080/'
,{
  proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
    proxyReqOpts.headers.origin="http://49.4.12.144:8080"
    proxyReqOpts.headers['method'] = 'POST';
    proxyReqOpts.headers['Access-Control-Allow-Origin']="*"

    console.log(proxyReqOpts)
    return proxyReqOpts
  },
  userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
  // recieves an Object of headers, returns an Object of headers.
  headers['Access-Control-Allow-Origin']="*"
  // console.log(headers)
  return headers;
}
}
));


app.use(serve(__dirname + '/www'));

app.listen(8000, function(){
  console.log('server is running at %s');
})


