$('input[type="submit"]').on("click", function(e) {
  e.preventDefault();
  $.busyLoadSetup({ animation: "slide", background: "rgba(50, 91, 93, 0.86)" });
  var appid = 1;
  var data = $("#myReg").serialize();
  var form = document.getElementById("myReg");
  $.ajax({
    type: "POST",
    url: "/api/users/login",
    data: data,
    beforeSend: function() {
      $.busyLoadFull("show");
    },
    success: function(response) {
      console.log(response);
      if (response == 1) {
        form.reset();
        $.busyLoadFull("hide");
        swal({
          title: "Sucessful!",
          text: "Check your email for your 6 string password.",
          icon: "success",
          button: "Continue"
        });
      } else {
        $.busyLoadFull("hide");
        $(this).removeAttr("disabled");
        $.busyLoadFull("hide");
        swal({
          title: "Warning!",
          text:
            "Hmmm 🌚😏. This reg number looks strange to me. Please visit the LMU ADMISSIONS page. ",
          icon: "warning",
          button: "Continue"
        });
      }
    },
    error: function(error) {
      console.log("error");
    }
  });
});
