<?php

$action = $_GET['action'];

switch ($action) {
  case 'addmark':
    $bookmark_to_save = $_POST['text'] . "\n";
    file_put_contents("marks.txt", $bookmark_to_save, FILE_APPEND);
    break;

  case 'init':
  default:
    $handle = fopen("marks.txt", "r");
    if ($handle) {
      while (($mark = fgets($handle)) !== false) {
        $markparts = explode(" ", $mark);
        echo "<a href=\"" . $markparts[0] . "\">" . $markparts[0] . "</a> ";
        for ($i = 1; $i < count($markparts); $i++) {
          echo $markparts[$i] . " ";
        }
        echo "<br>\n";
      }

      fclose($handle);
    } else {
      // error opening the file.
    }
    break;
}


?>
