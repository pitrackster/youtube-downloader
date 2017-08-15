<?php

// get request data (POST)
$requestBody = file_get_contents('php://input');
$request = json_decode($requestBody);
$url = $request->url;
$mode = $request->mode;

// CLI exec vars for debug / errors
$output = [];
$return_var = 0;

// get video file name
$videoFileName = exec("youtube-dl --get-filename " . $url, $output, $return_var);

// download video
exec('youtube-dl --output "./%(title)s.%(ext)s" ' . $url, $output, $return_var);

print_r($videoFileName);die;

if ($mode != 'video') {
    $path_parts = pathinfo($videoFileName);
    // audio file name = video file name without extension
    $audioFileName =  $path_parts['filename'];
    
    /*echo $path_parts['dirname'], "\n";
    echo $path_parts['basename'], "\n";
    echo $path_parts['extension'], "\n";
    echo $path_parts['filename'], "\n"; // depuis PHP 5.2.0*/
    exec("ffmpeg -i " . $videoFileName . " -o " . $audioFileName . 'mp3');
}

// ffmpeg extract audio if asked

// download video + extracted audio / video only / audio only

// zip files if needed

// readfile

$file = 'Igorrr_ieuD.mp4';

if (file_exists($file)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="'.basename($file).'"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($file));
    readfile($file);
    exit;
} else {
    die("Error: File not found.");
} 


/*


$zip = new ZipArchive();
$filename = "./test112.zip";

if ($zip->open($filename, ZipArchive::CREATE)!==TRUE) {
    exit("Impossible d'ouvrir le fichier <$filename>\n");
}

$zip->addFromString("testfilephp.txt" . time(), "#1 Ceci est une chaîne texte, ajoutée comme testfilephp.txt.\n");
$zip->addFromString("testfilephp2.txt" . time(), "#2 Ceci est une chaîne texte, ajoutée comme testfilephp2.txt.\n");
$zip->addFile($thisdir . "/too.php","/testfromfile.php");
echo "Nombre de fichiers : " . $zip->numFiles . "\n";
echo "Statut :" . $zip->status . "\n";
$zip->close();

*/



?>