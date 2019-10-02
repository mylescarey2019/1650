// home page  

//on document load
$(document).ready(function(){
// prototyping phase  
// make get routes call to retrieve a default model data 
// and render it as table grid on page

  // retreive servers for the order form control select box
  $.ajax("/api/plan-life-chapter/4", {
    type: "GET"
  }).then(function(res) {
      console.log(res);
      console.log(`plan name: ${res.plan_name}`);
      $("#grid-caption").text(res.plan_name);
      res.LifeChapters.map(chapter => {
        console.log(`seq: ${chapter.seq_no} name ${chapter.chapter_name} start ${chapter.start_age} end ${chapter.end_age} 
                     invest-amt ${chapter.invest_amount} frequency: ${chapter.InvestRateType.invest_type} 
                     return-rate ${chapter.return_pct} inflation-rate ${chapter.inflation_pct}`);
        var modelRow = $('<tr>');
        modelRow.append($(`<td>${chapter.chapter_name}</td>`));
        modelRow.append($(`<td>${chapter.start_age}</td>`));
        modelRow.append($(`<td>${chapter.end_age}</td>`));
        modelRow.append($(`<td>${chapter.invest_amount}</td>`));
        modelRow.append($(`<td>${chapter.InvestRateType.invest_type}</td>`));
        modelRow.append($(`<td>${chapter.return_pct}</td>`));
        modelRow.append($(`<td>${chapter.inflation_pct}</td>`));
        $("#grid-table").append(modelRow);
      });
    



      // $("#server-selection").append('<option value="" selected="selected" hidden="hidden"  >Select server</option>');
      // res.map(foodserver => {
      //   $("#server-selection").append(`<option value="${foodserver.food_server_id}">${foodserver.food_server_name}</option`);
      // });
    }
  );



});