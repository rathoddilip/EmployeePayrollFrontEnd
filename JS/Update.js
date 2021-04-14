$(document).ready(function () { 
var result= localStorage.getItem("#editEmp");
ressultJson=JSON.parse(result);
var departments=[];
$('#fullname').val(ressultJson.name);
$("input[name='profile'][value"+ressultJson.profile + "]").prop('checked',true);
$("input[name='gender'][value"+ressultJson.gender + "]").prop('checked',true);
$("input[name='profile'][value"+ressultJson.profile + "]").prop('checked',true);
$("input[name='department'][value"+ressultJson.department1 + "]").prop('checked',true);
$('#salary').val(ressultJson.salary);
var day=new Date(ressultJson.startDate);
$('#day').val(day.getDay());
$('#month').val(day.getMonth());
$('#year').val(day.getFullYear());
$('#notes').val(ressultJson.notes);

});

function updateEmp(data)
{
    console.log("data in update.js",data);
    location.replace('/HTML/Update.html');
}
function update(event)
{
    event.preventDefault(); 
    console.log(event);
    var departments=[];
    var date = document.getElementById("day").value+'/'
    +document.getElementById("month").value+'/'
    +document.getElementById("year").value;
    console.log(date);
    var salary = document.getElementById("salary").value;
    var sal = parseFloat(salary).toFixed(3);
    var startDate= new  Date(date);
    console.log(startDate);
    var profile=$("input[name='profile']:checked").val();
    //  var Department1=$("input[name='department']:checked").val();
    // var Department2=$("input[name='department']:checked").val();
    // var Department3=$("input[name='department']:checked").val();
        $.each($("input[name='department']:checked"), function(){
      departments.push($(this).val());

    });

    var result=localStorage.getItem('editEmp');
    result=JSON.parse(result);

    let reqData = {
        "name": document.getElementById("fullname").value,
        "gender":document.querySelector('input[name="gender"]:checked').value,
        "salary":parseFloat(sal),
        "startDate":startDate,
        "notes":document.getElementById("notes").value,
        "profileImage":profile  ,  
        "department1":departments[0],
        "department2":departments[1],
        "department3":departments[2],
        "id":result.id    
        
}
let rdata = JSON.stringify(reqData);
console.log(rdata);   
 
var x = document.getElementById("snackbar");
  x.className = "show";
    $.ajax({
        
        url: "https://localhost:44302/api/Employee/Update/"+this.value,  
        type: "PUT",  
        contentType: "application/json;",  
        dataType: "json", 
        data: rdata,      
        success: function (data) {

            console.log(data);
            x.innerHTML = "update successfull";
            x.style.color = "green";           
            //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        },
        error: function (error) {
            console.log(error);
            x.innerHTML = "update unsuccessfull";
            x.style.color = "red";  
            //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);        
        }
    });
}

