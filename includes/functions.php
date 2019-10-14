<?php
  function confirmQuery($result){
    global $connection;
    if(!$result){
        die("QUERY FAILED " . mysqli_error($connection));
    }
  }

  function test_input($data){
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    $data = htmlentities($data);
    $data = strip_tags($data);
    $data = filter_var($data, FILTER_SANITIZE_STRING);
    $data = filter_var($data, FILTER_SANITIZE_SPECIAL_CHARS);
    return $data;
  }

  function decode_data($data){
    $data = html_entity_decode($data);
    $data = htmlspecialchars_decode($data);
    return $data;
  }

?>
