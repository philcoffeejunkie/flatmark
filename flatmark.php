<?php

$action = $_GET['action'];

switch ($action) {
  case 'addmark':
    $bookmark_to_save = $_POST['text'] . "\n";
    file_put_contents("marks.txt", $bookmark_to_save, FILE_APPEND);
    break;

  case 'del':
    $newmarks = "";
    $id = $_GET['id'];
    $i = 0;
    $handle = fopen("marks.txt", "r");
    if ($handle) {
      while (($mark = fgets($handle)) !== false) {
        if ($i != $id) {
          $newmarks .= $mark;
        }
        $i++;
      }
      fclose($handle);
    } else {
      // error opening the file.
    }
    $handle2 = fopen("marks.txt", "w");
    fwrite($handle2, $newmarks);
    fclose($handle2);
    break;

  case 'init':
  default:
    $handle = fopen("marks.txt", "r");
    if ($handle) {
      while (($mark = fgets($handle)) !== false) {
        echo $mark;
      }
      fclose($handle);
    } else {
      // error opening the file.
    }
    break;
}

?>
