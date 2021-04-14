//Load Data in Table when documents is ready  
$(document).ready(function () { 
  loadData();  
    var table = document.getElementById("emp-table"); 
    $(document).on('click','#delEmp',function(){   

      $.ajax({
        url: 'https://localhost:44302/api/Employee/Delete/'+this.value,
        type: "DELETE",
        success: function (data) {
          
          console.log(data['success']);
          loadData();  
  
        },
        error: function (error) {
            console.log(error);
       
        }
    });
    
    });
//edit employee data
    $(document).on('click','#editEmp',function(){   
      
      var result=localStorage.getItem('editEmp');
      updateEmp(result);
    //   $.ajax({  
    //     url: "https://localhost:44302/api/Employee",  
    //     type: "GET",  
    //     success: function (data) {  
    //       console.log(data['data']);
    //       updateEmp(data['data']);
  
    //     },
    //     error: function (error) {
    //         console.log(error);
       
    //     }
    //  });
    
    });
    

function loadData() {  
    $.ajax({  
        url: "https://localhost:44302/api/Employee",  
        type: "GET",  
        contentType: "application/json;charset=utf-8",  
        dataType: "json",  
        success: function (data) {  
            
          var updateResult=JSON.stringify(data['data']);
          console.log("LocalStorageData",updateResult);
          localStorage.setItem("editEmp",updateResult);
            console.log(data['data']);
            setEmpoyees(data['data']);
        },  
        error: function (errormessage) {  
            alert(errormessage.responseText);  
        }  
    });  
}  

function setEmpoyees(employees){
  $("#emp-table").find("tr:gt(0)").remove();

  
  var i;
  for (i = 0; i < employees.length; i++) {
         var row = table.insertRow();
         row.value=employees[i]["id"];
         row.insertCell().innerHTML = employees[i]["id"];
         row.insertCell().innerHTML = employees[i]['name'];
         row.insertCell().innerHTML = employees[i]['gender'];
         row.insertCell().innerHTML=employees[i]['department1'];

      //  var s =  departmentStr(employees[i]['department']);
      //    row.insertCell().innerHTML = s;
         
         row.insertCell().innerHTML ='₹ '+ employees[i]['salary'];  
         row.insertCell().innerHTML = employees[i]['startDate'];
         row.insertCell().innerHTML = 
         '<button class="tr-btn" id="delEmp" value='+employees[i]["id"]+'><i class="fa fa-trash"></i></button>'+
         '<button class="edit-btn" id="editEmp" value='+employees[i]["id"]+'><i class="fa fa-pencil"></i></button>';
         
  }
}
}); 
