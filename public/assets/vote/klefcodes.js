var config = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: ["#6ECDDD", "#36BB93", "#7D43AE", "#E31565", "#EBA91F"]
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#111820"
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 0.1,
        opacity_min: 0,
        sync: false
      }
    },
    size: {
      value: 6,
      random: true
    },
    line_linked: {
      enable: false
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "in",
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      },
      resize: true
    },
    modes: {
      push: {
        particles_nb: 3
      }
    }
  },
  retina_detect: true
};

particlesJS("site__bg", config);

function randomErr(type) {
  if (type == "request") {
    let request = [
      "A request is still processing...",
      "Action can't be performed now, please wait for ongoing request to finish",
      "You can't vote now, there is a procesing request"
    ];
    const randomReq = Math.floor(Math.random() * request.length);
    request = request[randomReq];
    return request;
  }
  if (type == "auth") {
    let auth = [
      "Calm down, you need to login that's all 🌚🌚",
      "To perform this action, authentication is required 😁😁",
      "No rush, please identify yourself right now 😤😤",
      "You're trying to vote when you've not identified yourself 🙄🙄",
      "Sorry if you want to stay anonymous, but it doesn't work here, please login 😔😔"
    ];
    const randomAuth = Math.floor(Math.random() * auth.length);
    auth = auth[randomAuth];
    return auth;
  }
}

async function Vote(id, category, token) {
  if (!token) {
    return Swal.fire({
      text: randomErr("auth"),
      showConfirmButton: false,
      footer: "<a href='/auth/login'>Login</a>"
    });
  }
  let request_processing = false;
  document.querySelectorAll("#content").forEach(content => {
    if (content.innerHTML.indexOf("VOTING...") > 0) {
      request_processing = true;
    }
  });

  if (request_processing) {
    return Swal.fire("✋🏼", randomErr("request"));
  }

  try {
    document.getElementById("content_" + id).innerHTML = `
    VOTING...
    `;
    const { data } = await axios.post(
      "/api/votes",
      { id, category },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );
    document.getElementById("content_" + id).innerHTML = `
    VOTE 👍🏽
    `;
    if (data.error) {
      return Swal.fire({ text: data.msg });
    }
    Swal.fire(
      "👏🏼👏🏼",
      "Congratulations you've voted, please move to the next category"
    );
  } catch (error) {
    document.getElementById("content_" + id).innerHTML = `
    VOTE 👍🏽
    `;
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!"
    });
  }
}
