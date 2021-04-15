$(document).ready(function () { 
var result= localStorage.getItem('templocalStorage');
resultJson=JSON.parse(result);
console.log("jsondata"+resultJson);

$('#name').val(resultJson.name);
$('input[name="gender'+resultJson.gender+'"]').checked.val();
$('select[name="salaryname' + resultJson.salary + '"] option:selected').val();


$("input[name='gender'][value"+resultJson.gender + "]").prop('checked',true);
$("input[name='department'][value"+resultJson.department1 + "]").prop('checked',true);
$("input[name='department'][value"+resultJson.department2 + "]").prop('checked',true);
$("input[name='department'][value"+resultJson.department3 + "]").prop('checked',true);
$('#salary').val(resultJson.salary);
var day=new Date(resultJson.startDate);
$('#day').val(day.getDay());
$('#month').val(day.getMonth());
$('#year').val(day.getFullYear());
$('#notes').val(resultJson.notes);

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
    var startDate1= new  Date(date);
    console.log(startDate1);
    var profile=$("input[name='profile']:checked").val();
    //  var Department1=$("input[name='department']:checked").val();
    // var Department2=$("input[name='department']:checked").val();
    // var Department3=$("input[name='department']:checked").val();
        $.each($("input[name='department']:checked"), function(){
      departments.push($(this).val());

    });

    var result=localStorage.getItem('templocalStorage');
     result=JSON.parse(result);

    let reqData = {
        "name": document.getElementById("name").value,
        "gender":document.querySelector('input[name="gender"]:checked').value,
        "salary":parseFloat(sal),
        "startDate":startDate1,
        "notes":document.getElementById("notes").value,
        "profileImage":profile  ,  
        "department1":departments[0],
        "department2":departments[1],
        "department3":departments[2],
        "id":resultJson.id    
        
}
let rdata = JSON.stringify(reqData);
console.log(rdata);   
 
var x = document.getElementById("snackbar");
  x.className = "show";
    $.ajax({
        
        url: "https://localhost:44302/api/Employee/"+resultJson.id ,  
        type: "PUT",  
        contentType: "application/json;",  
        dataType: "json", 
        data: rdata,      
        success: function (data) {

            console.log(data);
            x.innerHTML = "update successfull";
            x.style.color = "green";           
            //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            localStorage.clear();
        },
        error: function (error) {
            console.log(error);
            x.innerHTML = "update unsuccessfull";
            x.style.color = "red";  
            //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);        
        }
    });
}

