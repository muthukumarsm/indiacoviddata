(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "agebracket",
            alias: "Age",
            dataType: tableau.dataTypeEnum.int
        },{
            id: "currentstatus",
            alias: "Current Status",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "dateannounced",
            alias: "Diagnosed date",
            dataType: tableau.dataTypeEnum.date
        } ,{
            id: "detectedcity",
            alias: "Detected City",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "detecteddistrict",
            alias: "Detected District",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "detectedstate",
            alias: "Detected State",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "gender",
            alias: "Gender",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "country",
            alias: "Country",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "patientnumber",
            alias: "ID",
            dataType: tableau.dataTypeEnum.int
        },
        {
            id: "statuschangedate",
            alias: "Status Change Date",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "typeoftransmission",
            alias: "Source",
            dataType: tableau.dataTypeEnum.string
        }
        ];

        var tableSchema = {
            id: "CovidMain",
            alias: "India Covid Main",
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

        $.getJSON("https://api.covid19india.org/raw_data.json", function(resp) {
            var feat = resp.raw_data,countryVal = "India",
                tableData = [];
            
            // Iterate over the JSON object
             for (var j = 0, len = feat.length; j < len; j++) { 
                

               
                    tableData.push({
                    
                        "agebracket" : feat[j].agebracket,
                        "currentstatus": feat[j].currentstatus,
                        "dateannounced":feat[j].dateannounced,
                        "detectedcity":feat[j].detectedcity,
                        "detecteddistrict": feat[j].detecteddistrict,
                        "detectedstate": feat[j].detectedstate,
                        "gender":feat[j].gender,
                        "country": countryVal,
                        "patientnumber": feat[j].patientnumber,
                        "statuschangedate": feat[j].statuschangedate,
                        "typeoftransmission":feat[j].typeoftransmission
                        
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
