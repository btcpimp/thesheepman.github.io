 // Contract Address
 var dappAddress = "n233msrZLUNe3VRuXwUvpymftX1Q4uHNTNM";
 document.addEventListener("DOMContentLoaded", function() {

     function formatDate(date) {
         var monthNames = [
             "January", "February", "March",
             "April", "May", "June", "July",
             "August", "September", "October",
             "November", "December"
         ];

         var day = date.getDate();
         var monthIndex = date.getMonth();
         var year = date.getFullYear();

         return monthNames[monthIndex] + ' ' + day + ',' + ' ' + year;
     }


     $('.date').text(formatDate(new Date()))
     var NebPay = require("nebpay");
     var nebPay = new NebPay();

     //to check if the extension is installed
     //if the extension is installed, var "webExtensionWallet" will be injected in to web page
     if (typeof webExtensionWallet === "undefined") {
         $("#noExtension").removeClass("hide");
     }

     /** Preload registered names */
     function loadNamesCount() {
         nebPay.simulateCall(dappAddress, 0, "getNamesCount", "", {
             listener: showNamesCount
         });
     }
     loadNamesCount();

     function showNamesCount(resp) {
         if (resp.result > 0) {
             $(".totalNames").text(resp.result);
         } else {
             $(".totalNames").text(0);
         }
     }

     /* Get address of name function */
     function getAddressOf() {
         var args = '["' + $("#getAddressOfVal").val() + '"]';
         var func = "getAddressOf";
         nebPay.simulateCall(dappAddress, 0, func, args, {
             listener: getAddressOfResp
         });
     }

     function getAddressOfResp(resp) {
         $('#getAddressOfResult').removeClass('hide')
         if (resp.result === "Error: This name is free.") {

             $('#getAddressOfResult').addClass('--fail')
             $("#getAddressOfResult").text("This name has not been registered yet.");
         } else {
             $('#getAddressOfResult').removeClass('--fail')
             $("#getAddressOfResult").text(resp.result);
         }


     }

     $("#getAddressOf").click(function() {
         getAddressOf();
     });

     /* Get name of  address function */
     function getNameOf() {
         var args = '["' + $("#getNameOfVal").val() + '"]';
         var func = "getNameOf";
         nebPay.simulateCall(dappAddress, 0, func, args, {
             listener: getNameOfResp
         });
     }

     function getNameOfResp(resp) {
         $('#getNameOfResult').removeClass('hide')
         if (resp.result === "Error: This address didn't registered nickname yet.") {
             $('#getNameOfResult').addClass('--fail')
             $("#getNameOfResult").text("This address is not associated with any nicknames.");
         } else {
             $('#getNameOfResult').removeClass('--fail')
             $("#getNameOfResult").text(resp.result);
         }

     }
     $("#getNameOf").click(function() {
         getNameOf();
     });

     /* Register new name function */
     function addName() {
         var args = '["' + $("#addNameVal").val() + '"]';
         var func = "addName";
         nebPay.simulateCall(dappAddress, 0, func, args, {
             listener: addNameResp
         });
     }

     function addNameTrue() {
         var args = '["' + $("#addNameVal").val() + '"]';
         var func = "addName";
         nebPay.call(dappAddress, 0, func, args, {
             listener: addNameRespTrue
         });
     }

     function addNameResp(resp) {
         $('#addNameResult').removeClass('hide')
         if (
             resp.result === "Error: This address already has a nickname." ||
             resp.result === "Error: Your nickname must contain atleast 1 symbol." ||
             resp.result === "Error: Name is already exists."
         ) {

             $('#addNameResult').addClass('--fail')
             $("#addNameResult").text(resp.result);
         } else {
             addNameTrue();
         }
     }

     function addNameRespTrue(resp) {
         $('#addNameResult').removeClass('--fail')
         $("#addNameResult").text("You have succefully registered a name.");
     }

     $("#addName").click(function() {
         addName();
     });

     /* Change name function */
     function changeName() {
         var args = '["' + $("#changeNameVal").val() + '"]';
         var func = "changeName";
         nebPay.simulateCall(dappAddress, 0, func, args, {
             listener: changeNameResp
         });
     }

     function changeNameTrue() {
         var args = '["' + $("#changeNameVal").val() + '"]';
         var func = "changeName";
         nebPay.call(dappAddress, 0, func, args, {
             listener: changeNameRespTrue
         });
     }

     function changeNameResp(resp) {
         $('#changeNameResult').removeClass('hide')
         if (resp.result === "Error: Name is already exists." || resp.result === "Error: Your nickname must contain atleast 1 symbol.") {
             $('#changeNameResult').addClass('--fail')
             $("#changeNameResult").text(resp.result);
         } else {
             changeNameTrue();
         }
     }

     function changeNameRespTrue(resp) {
         $('#changeNameResult').removeClass('--fail')
         $("#changeNameResult").text("Your name was succefully changed.");
     }

     $("#changeName").click(function() {
         changeName();
     });

     /* Delete name function */
     function deleteName() {
         var args = "";
         var func = "deleteName";
         nebPay.simulateCall(dappAddress, 0, func, args, {
             listener: deleteNameResp
         });
     }

     function deleteNameTrue() {
         var args = "";
         var func = "deleteName";
         nebPay.call(dappAddress, 0, func, args, {
             listener: deleteNameRespTrue
         });
     }

     function deleteNameResp(resp) {
         $('#deleteNameResult').removeClass('hide')
         if (resp.result === "Error: This address didn't registered nickname yet.") {
             $('#deleteNameResult').addClass('--fail')
             $("#deleteNameResult").text(resp.result);
         } else {
             deleteNameTrue();
         }
     }

     function deleteNameRespTrue(resp) {
         $('#deleteNameResult').removeClass('--fail')
         $("#deleteNameResult").text("Your name has been succefully deleted.");
     }

     $("#deleteName").click(function() {
         deleteName();
     });
 });