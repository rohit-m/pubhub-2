/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        //The line below is default
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();

//When you click search
$(document).on('submit', '#filters', function (e) {
    $('#temp > *').remove();

    var form_values = $(this).serializeArray();
    var pub_budget, pub_type, form_data;
    e.preventDefault();

    //console.log(form_values);

    for(var key in form_values) {
        var obj = form_values[key];

        switch(obj['name']) {
            case 'pub_type':
                pub_type = obj['value'];
                break;
            case 'pub_budget':
                pub_budget = obj['value'];
                break;
        }
    }

    $('#listing-panel').toggleClass('active');

    //Get the listings
    $.getJSON("/test-json/test-data.json", function (data) {

        /*TODO: Steve have a look here:- this is how I'm filtering the list, is this good?*/
        //console.log(data);
        var items = [];
        $.each(data, function (key, val) {
            if(filters_data(data,key)) {
                items.push(val)
            }
        });

        function filters_data(data, key) {
            if(data[key]['pubType'] == pub_type && data[key]['budget'] == pub_budget) {
                return true;
            }
        }

        $.each(items, function (count){
            var card =
                "<div class='card' style='-webkit-transform: translateZ(0);'>" +
                    "<div class='-close'></div>" +
                    "<div class='-thumbnail bg-cover-center'></div>" +
                    "<div class='meta'>" +
                        "<div class='-distance'>5 <span class='measure'>mins</span></div>" +
                        "<div class='-name'>"+ items[count]['name'] +"</div>" +
                        "<div class='-tags'>"+ items[count]['pubType'] + items[count]['budget'] +"</div>" +
                        "<div class='-share'></div>" +
                    "</div>" +
                    "<div class='offers-list list padding-small'><h3>Offers</h3><ul class='offer-list-ul'><li>STATIC ITEM</li><li>STATIC ITEM</li></ul></div>" +
                        "<div class='desc padding-small'>" +
                            "<p>Lorem ipsum dolor sit amet, ad cibo inermis efficiendi sit, te vim maluisset gubergren, nullam adipisci ei nam. Has te causae minimum scribentur, vis an nonumes invidunt. Cum nonumy nostrum te.</p>" +
                        "</div>" +
                        "<div class='tag-list list padding-small'><h3>Tags</h3>" +
                            "<ul class='tag-list-ul'><li>STATIC ITEM</li><li>STATIC ITEM</li></ul>" +
                        "</div>" +
                        "<div class='map'>" +
                            "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.72810669043!2d-0.24168143192880728!3d51.52877184087034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2suk!4v1465925146219' frameborder='0' allowfullscreen></iframe>" +
                        "</div>" +
                        "<div class='desc padding-small'>" +
                            "<p>Something here</p>" +
                        "</div>" +
                    "</div>" +
                "</div>";
            //Just appends it to the body for now
            $('#temp').append(card);
        });
        if(items.length == 0) {
            $('#temp').append("<h1>Sorry no results found</h1>");
        }
    });
});

$(document).on('click', '.card', function (e) {
    $(this).addClass('active');
    if (e.target.className == "-close") {
        $(this).removeClass('active');
    }
});

//function generateQuery(e) {
//    e.preventDefault();
//    var query = null;
//    var $options = document.getElementsByClassName('qg');
//
//    for(var i = 0; i < $options.length; i++) {
//        query = query + "&"+ $options[i].id + "=" + $options[i].value;
//    }
//
//    showUser(query);
//}
//
//function createCORSRequest(method, url) {
//    var xhr = new XMLHttpRequest();
//    if ("withCredentials" in xhr) {
//        // XHR for Chrome/Firefox/Opera/Safari.
//        xhr.open(method, url, true);
//        console.log('withCredentials');
//    } else if (typeof XDomainRequest != "undefined") {
//        // XDomainRequest for IE.
//        xhr = new XDomainRequest();
//        xhr.open(method, url);
//    } else {
//        // CORS not supported.
//        xhr = null;
//    }
//    return xhr;
//}
//function makeCorsRequest() {
//    var xhr = createCORSRequest('GET', url);
//    if (!xhr) {
//        alert('CORS not supported');
//        return;
//    }
//    xhr.onload = function() {
//        console.log("onloadn");
//    };
//    xhr.onerror = function() {
//        alert('Error accessing database.');
//    };
//    xhr.send();
//}
//
//function showUser(str) {
//    console.log(str);
//    var xmlhttp = new XMLHttpRequest();
//
//    document.getElementById("result").innerHTML = "Getting data ...";
//
//    xmlhttp.onreadystatechange=function() {
//        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
//            var txt = xmlhttp.responseText;
//            document.getElementById("result").innerHTML = xmlhttp.responseText;
//        }
//    };
//    console.log(str);
//    //console.log(truexmlhttp.send());
//    // Need full URL to page, since this HTML page is not on a server
//    xmlhttp.open("GET","http://test.dev/querygen.php?q="+str);
//    xmlhttp.send();
//}
//// Start the CORS on startup
//var url = "http://test.dev/querygen.php";
//var method = "GET";
//createCORSRequest(method, url);