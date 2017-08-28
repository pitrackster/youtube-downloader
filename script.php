<?php

// get request data (POST)
$requestBody = file_get_contents('php://input');
$request = json_decode($requestBody);
$url = $request->url;
$mode = $request->mode;

exec('youtube-dl --output "./downloaded/%(title)s.%(ext)s" ' . $url);

$files = preg_grep('/^([^.])/', scandir('downloaded'));
if ($mode !== 'video') {
    foreach($files as $file){
        $path_parts = pathinfo($file);
        $encodedFileName =  $path_parts['filename'] . '.mp3';
        $cmd = 'avconv -i "downloaded/' .$file. '" "downloaded/' . $encodedFileName . '"';
        exec($cmd);
    }
}

 // zip folder
 $zipFile = './zipped/downloaded.zip';
 $zip = new ZipArchive();
 if($zip->open($zipFile, ZipArchive::CREATE) !== TRUE) {
     exit('impossible d\'ouvrir l\'archive');
 }

 // update files variable
 $files = preg_grep('/^([^.])/', scandir('downloaded'));

 // add files to zip
 foreach($files as $file){
    $path_parts = pathinfo($file);
    // test extension if needed
    if($mode !== 'both') {
        $ext = $path_parts['extension'];
        $video_formats = ['mp4', 'webm', 'mkv', '3gp'];
        if($mode === 'video' && in_array($ext, $video_formats)){
            $zip->addFile('downloaded/' . $file);
        } elseif($mode === 'audio' && $ext === 'mp3') {
            $zip->addFile('downloaded/' . $file);
        }
    } else {
        $zip->addFile('downloaded/' . $file);
    }    
 }

 $zipSuccessFull = $zip->close();

 // remove downloaded and extracted files
 foreach($files as $file){
     unlink('downloaded/' . $file);
 }

// send zip as file
if (file_exists($zipFile)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($zipFile).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($zipFile));
    readfile($zipFile);
} else {
    die("Error: File not found.");
}

// delete zip file
unlink($zipFile);

die('end');

?>