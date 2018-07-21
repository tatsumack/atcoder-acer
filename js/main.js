$(function() { 
    function onSuccess(data, dataType) {
        var acCount = {};
        data.StandingsData.forEach(function(userData) {
            Object.keys(userData.TaskResults).forEach(function(taskName) {
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

        $("#main-container table thead tr").append('<th width="5%">AC</th>');
        $("#main-container table tr").each( function(i, elem) {
            if (i === 0) return;

            var taskName = $(elem).find("a").attr("href").split("/").pop();
            var count = acCount[taskName] || 0;
            $(elem).append('<td>' + count + '</td>');
        });
    }

    function getContestName() {
        var url = location.href;
        return url.search("beta") >= 0 ? url.split("/")[4] : url.split("/")[2].split(".")[0];
    }

    $.ajax({url:"https://beta.atcoder.jp/contests/" + getContestName() + "/standings/json", dataType:"json", type:"get", success: onSuccess});
});
