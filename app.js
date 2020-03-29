const createError = require('http-errors');
const express = require('express');
const path = require('path');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//设置跨域访问
app.all('*', function(req, res,next) {
    let origin = req.headers.origin
    res.header("Access-Control-Allow-Origin", origin );
    res.header("Access-Control-Allow-Headers","X-Requested-With,auth")
    res.header("Access-Control-Allow-Credentials", "true")
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
          res.sendStatus(200);/*让options请求快速返回*/
    } else{
    next();
    }
});

app.use('/*',function(req,res,next){
  res.send('Hello world')
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
