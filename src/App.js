import React from 'react';
import logo from './logo.svg';
import Button from '@material-ui/core/Button';
import './App.css';
import * as d3 from 'd3';
// var csv = require('jquery-csv');
import data from './data.csv';
// import data1 from './data.xlsx';
var max10=0;
var idealRow;

function processExcel(){
  d3.csv(data).then(function(result) {
        // console.log(result);
        var len=result.length;
        
        for(let i=2;i<result.columns.length;i++){
          let key=result.columns[i];
          console.log(result[len-1][key]-result[len-2][key]);
        }

        if(len==0){
          max10=result[0]['Para-010'];
          idealRow=result[0];
        }
        else{
          // calculating delta 10
          let delta10= (result[len-1]['Para-010']-result[len-2]['Para-010'])/5;
          if(delta10>max10){
            // current row is ideal one so update the ideal conditions
            idealRow=result[len-1];
            max10=delta10;
          }
          else if(delta10<max10){
            // difference of two rows for all the parameters
            for(let i=2;i<result.columns.length;i++){
              let key=result.columns[i];
              console.log(result[len-1][key]-result[len-2][key]);
            }
          }
          else if(delta10==max10){
              // comparing parameter 6
              let currPara6=result[len-1]['Para-006'];
              let prevPara6=result[len-2]['Para-006'];
              
              if(currPara6 < prevPara6){
                // current row is the ideal one
                idealRow=result[len-1];
              }
              else if(currPara6 > prevPara6){
                // previous row was the ideal one
                idealRow=result[len-2];
                // difference of two rows for all the parameters
                for(let i=2;i<result.columns.length;i++){
                  let key=result.columns[i];
                  console.log(result[len-1][key]-result[len-2][key]);
                }
              }
              else if(currPara6 == prevPara6){
                // calculating delta 1
                try {
                  let currdelta1= (result[len-1]['Para-001']-result[len-2]['Para-001'])/5;
                  let prevdelta1= (result[len-2]['Para-001']-result[len-3]['Para-001'])/5;

                  if (currdelta1 < prevdelta1){
                    // previous row was ideal one
                    idealRow=result[len-2];
                    // difference of two rows for all the parameters
                  }
                  else{
                    // current row is ideal one
                    idealRow=result[len-1];
                  }
                }
                catch(err) {
                  // if len-3 is not a valid index
                  idealRow=result[len-1];
                }
                
              }
          }
          console.log(idealRow);
          console.log(max10);
        }
    }).catch(function(err) {
        throw err;
    }) 
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button variant="contained" color="primary" onClick={processExcel}>
          Hello World
        </Button>
      </header>
    </div>
  );
}

export default App;
