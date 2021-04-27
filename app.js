const express = require('express')
const app = express()
const port = 3000
const config = require('./config.json')
const shell = require('shelljs');
const path = require('path');


const SPARK_JAR = path.join(__dirname, "spark-dependency", config.sparkJarName)  
const cmd = config.cmd.replace("$lib$", SPARK_JAR)


app.get(`/spark/${config.sparkJobName}/start`, (req, res) => {

    if (!shell.which('spark-submit')) {
        res.send('Cannot execute spark-submit')
    }else{
      if (shell.exec(cmd).code !== 0) {
          res.send('Error: spark-submit commit failed')
      }else{
        res.send('Job running...')
      }
    
    }
})

app.listen(port, () => {
  console.log(`listening at port: ${port}`)
  console.log(`cmd: ${cmd}`)
})