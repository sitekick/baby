<?php


$json = file_get_contents('php://input');
$fp = fopen('../src/data/babyGuesses.json', 'w');

if (flock($fp, LOCK_EX)) {
    fwrite($fp,$json);
    print 'file written';
    sleep(10);
    flock($fp, LOCK_UN);
}
    