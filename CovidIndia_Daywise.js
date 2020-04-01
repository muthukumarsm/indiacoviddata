(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "dailyconfirmed",
            alias: "Daily Confirmed",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "dailydeceased",
            alias: "Daily Deceased",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "dailyrecovered",
            alias: "Daily Recovered",
            dataType: tableau.dataTypeEnum.int
        },
       {
            id: "date",
            alias: "Log Date",
            dataType: tableau.dataTypeEnum.date
        }, 
        {
            id: "totalconfirmed",
            alias: "Total Confirmed",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "totaldeceased",
            alias: "Total Deceased",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "totalrecovered",
            alias: "Total Recovered",
            dataType: tableau.dataTypeEnum.int
        }
        ];

        var tableSchema = {
            id: "DailyStatusSummary",
            alias: "Covid India Daily Status Summary",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {

     /*   $.ajaxSetup({
         headers : {
            'x-rapidapi-host' : 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key' : 'd18cdeb3a2mshab6824adf713c9ep130fb2jsncca2d444588d'
          } 
        }); */

        $.getJSON("https://api.covid19india.org/data.json", function(resp) {
            var feat = resp.cases_time_series,tableData = [];
            
            // Iterate over the JSON object
             for (var j = 0, len = feat.length; j < len; j++) { 
                

               
                    tableData.push({
                    
                        "dailyconfirmed" : feat[j].dailyconfirmed,
                        "dailydeceased": feat[j].dailydeceased,
                        "dailyrecovered":feat[j].dailyrecovered,
                        "date":feat[j].date,
                        "totalconfirmed": feat[j].totalconfirmed,
                        "totaldeceased": feat[j].totaldeceased,
                        "totalrecovered":feat[j].totalrecovered                        
                    });       
                } 
            
            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Covid 19 India Dataset"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
