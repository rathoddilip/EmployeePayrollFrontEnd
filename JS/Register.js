function register(event)
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
        $.each($("input[name='department']:checked"), function(){
      departments.push($(this).val());
      
    });
    let reqData = {
        "name": document.getElementById("name").value,
        "gender":document.querySelector('input[name="gender"]:checked').value,
        "salary":parseFloat(sal),
        "startDate":startDate1,
        "notes":document.getElementById("notes").value,
        "profileImage":profile  ,  
        "department1":departments[0],
        "department2":departments[1],
        "department3":departments[2]     
        
}
let rdata = JSON.stringify(reqData);
console.log(rdata);   
 
var x = document.getElementById("snackbar");
  x.className = "show";
    $.ajax({
        
        url: "https://localhost:44302/api/Employee",  
        type: "POST",  
        contentType: "application/json;",  
        dataType: "json", 
        data: rdata,      
        success: function (data) {

            console.log(data);
            x.innerHTML = "registration successfull";
            x.style.color = "green";           
            //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        },
        error: function (error) {
            console.log(error);
            x.innerHTML = "registration unsuccessfull";
            x.style.color = "red";  
            //setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);        
        }
    });
}

