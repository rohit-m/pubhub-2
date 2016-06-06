<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

//$query = explode("&amp;", $_GET);

$sql = "SELECT pub_id, pub_name, pub_postcode FROM pubs WHERE pub_type_of_night='".$_GET['type_of_night']."' AND pub_budget='".$_GET['budget']."'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     // output data of each row
     while($row = $result->fetch_assoc()) {
         echo "<br> id: ". $row["pub_id"]. " - Name: ". $row["pub_name"]. " " . $row["pub_postcode"] . "<br>";
     }
} else {
     echo "0 results";
}

$conn->close();
?>  
