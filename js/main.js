$(function () {
    var acCount = {};
    var url = location.href;

    function onSuccess(data, dataType) {
        data.StandingsData.forEach(function (userData) {
            Object.keys(userData.TaskResults).forEach(function (taskName) {
                if (userData.TaskResults[taskName].Score > 0) {
                    if (acCount[taskName]) {
                        acCount[taskName] += 1;
                    } else {
                        acCount[taskName] = 1;
                    }
                }
            });
        });
        console.log(acCount);

        draw();
    }

    function draw() {
        $("table thead tr").append('<th width="5%">AC</th>');
        $("table tr").each(function (i, elem) {
            if (i === 0) return;

            var taskName = $(elem).find("a").attr("href").split("/").pop();
            var count = acCount[taskName] || 0;
            $(elem).append('<td>' + count + '</td>');
        });
    }

    function getContestName() {
        return url.split("/")[4];
    }

    $.ajax({ url: "https://atcoder.jp/contests/" + getContestName() + "/standings/json", dataType: "json", type: "get", success: onSuccess });
});
