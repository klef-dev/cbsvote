// Login
$('input[name="btn-login"]').on("click", function(e) {
  e.preventDefault();
  $.busyLoadSetup({ animation: "slide", background: "rgba(50, 91, 93, 0.86)" });
  let reg_no = $("#reg_no").val(),
    password = $("#password").val();
  $.busyLoadFull("show");
  axios
    .post("/api/users/login", { reg_no, password })
    .then(({ data }) => {
      $.busyLoadFull("hide");
      if (data.errors) {
        data.errors.forEach(error => {
          if (error.field == "reg_no") {
            $("#reg_err").html(error.text);
          }
          if (error.field == "password") {
            $("#pass_err").html(error.text);
          }
        });
      } else if (data.error) {
        swal(data.msg);
      } else {
        // localStorage.setItem("tokenizeMe", data.token);
        location.href = "/";
      }
    })
    .catch(err => {
      $.busyLoadFull("hide");
      swal("Somthing went wrong, try again");
    });
});

// Register
$('input[name="commit"]').on("click", function(e) {
  e.preventDefault();
  $.busyLoadSetup({ animation: "slide", background: "rgba(50, 91, 93, 0.86)" });
  let reg_no = $("#reg_no").val();
  $.busyLoadFull("show");
  axios
    .post("/api/users/register", { reg_no })
    .then(({ data }) => {
      $.busyLoadFull("hide");
      if (data.errors) {
        data.errors.forEach(error => {
          if (error.field == "reg_no") {
            $("#reg_err").html(error.text);
          }
        });
      } else if (data.error) {
        swal(data.msg);
      } else {
        swal({
          title: "Sucessful!",
          text: data.msg,
          icon: "success",
          button: "Continue"
        });
      }
    })
    .catch(err => {
      $.busyLoadFull("hide");
      swal("Somthing went wrong, try again");
    });
});
