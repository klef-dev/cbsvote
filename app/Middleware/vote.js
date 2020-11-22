const vote = (request, response, next) => {
  const starting = new Date("Nov 21, 2020 00:00:00").getTime(); //The time voting will be starting
  const ending = new Date("Nov 25, 2020 00:00:00").getTime(); //The time voting will be ending
  const now = new Date().getTime();
  const distance_ending = ending - now;
  const distance_starting = starting - now;
  if (distance_ending < 0 || distance_starting > 0) {
    return response.json({ msg: randomErr("check_vote"), error: true });
  }
  next();
};

function randomErr(type, user = null) {
  if (type == "vote") {
    let vote = [
      "😱😱 " +
        user +
        "! you want to cheat abi, you can only vote once in this category",
      user +
        "! integrity 🤞🏼🤞🏼 please, cheating not allowed, voted here already ",
      user + "! you've voted here already, go to the next category 👇🏼👇🏼",
    ];
    const randomVote = Math.floor(Math.random() * vote.length);
    vote = vote[randomVote];
    return vote;
  }
  if (type == "auth") {
    let auth = ["You've spent too much time, to continue voting, login again"];
    const randomAuth = Math.floor(Math.random() * auth.length);
    auth = auth[randomAuth];
    return auth;
  }
  if (type == "check_vote") {
    let check_vote = [
      "Oshe voting after election",
      "Voting has ended",
      "Come back 2021 and vote",
      "I want to do that, but I’m not available until 2021. Will you vote again then?",
      "Are you trying me? I'm not doing again. Voting has ended.😠😠",
      "Oshey!! Campaign after election... Let me think about it, and I’ll get back to you.🌚🌚🚶🏾‍♂🚶🏾‍♂",
      "I wish I could, but it’s just not going to work right now. Voting has ended.",
    ];
    const randomCheckVote = Math.floor(Math.random() * check_vote.length);
    check_vote = check_vote[randomCheckVote];
    return check_vote;
  }
}

exports.checkVote = vote;
exports.randomErr = randomErr;
