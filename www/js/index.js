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
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('qg_submit').addEventListener('click', generateQuery);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();

function generateQuery(e) {
    e.preventDefault();
    var query = null;
    var $options = document.getElementsByClassName('qg');

    for(var i = 0; i < $options.length; i++) {
        query = query + "&"+ $options[i].id + "=" + $options[i].value;
    }

    showUser(query);
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
        console.log('withCredentials');
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}
function makeCorsRequest() {
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    xhr.onload = function() {
        console.log("onloadn");
    };
    xhr.onerror = function() {
        alert('Error accessing database.');
    };
    xhr.send();
}

function showUser(str) {
    console.log(str);
    var xmlhttp = new XMLHttpRequest();

    document.getElementById("result").innerHTML = "Getting data ...";

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            var txt = xmlhttp.responseText;
            document.getElementById("result").innerHTML = xmlhttp.responseText;
        }
    };
    console.log(str);
    //console.log(truexmlhttp.send());
    // Need full URL to page, since this HTML page is not on a server
    xmlhttp.open("GET","http://test.dev/getcars.php?q="+str);
    xmlhttp.send();
}
// Start the CORS on startup
var url = "http://test.dev/getcars.php";
var method = "GET";
createCORSRequest(method, url);