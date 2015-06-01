<?php
define("APP_PATH", (isset($_SERVER["HTTPS"]) ? "https" : "http") . "://" . $_SERVER['SERVER_NAME'] . str_replace("index.php", "", $_SERVER['SCRIPT_NAME']));

require 'vendor/autoload.php';
$PAGEDIR = 'data/pages';
$POSTDIR = 'data/posts';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();

$app->hook('slim.before.dispatch', function () use ($app) {
    $app->view()->appendData(array(
        'app_base' => str_replace('index.php', '', $app->request()->getRootUri())
    ));
});

// GET route
$app->get('/page/:id', function ($id) use ($app) {
    $viewData['type'] = "page";
    $viewData['id'] = $id;
    $viewData['path'] = APP_PATH;
    $app->render('owlypressTemplate.php', $viewData);
});

$app->get('/post/:id', function ($id) use ($app) {
    $viewData = array();
    $viewData['type'] = "post";
    $viewData['id'] = $id;
    $viewData['path'] = APP_PATH;
    $app->render('owlypressTemplate.php', $viewData);
});

$app->get('/', function () use ($app) {
    $viewData = array();
    $viewData['type'] = "";
    $viewData['id'] = "";
    $viewData['path'] = APP_PATH;
    $app->render('owlypressTemplate.php', $viewData);
});

//get last number of posts
$app->get('/getPosts/:number', function ($number) use ($app, $POSTDIR) {
    $res = $app->response();
    if (is_dir($POSTDIR)) {
        $res['Content-Type'] = 'application/json';
        $files = scandir($POSTDIR, 1);
        array_pop($files);
        array_pop($files);
        $length = $nFiles = count($files);
        if ($number > 0 && $number <= $length) {
            $length = $number;
        }
        $files = array_slice($files, 0, $length);
        $ids = array();
        foreach ($files as $postId) {
            array_push($ids, $postId);
        }
        $data = array(
            "ids" => $ids,
            "more" => $nFiles > $number
        );
        $res->write(json_encode($data));
    } else {
        $res->status(500);
        $res->write('Can not read posts directory!');
    }
});

//get post by name
$app->get('/posts/:postId', function ($postId) use ($app, $POSTDIR) {
    $res = $app->response();
    $data = array();
    if (is_dir($POSTDIR)) {
        $res['Content-Type'] = 'application/json';
        $files = scandir($POSTDIR);
        array_shift($files);
        array_shift($files);
        if (in_array($postId, $files)) {
            $content = file_get_contents($POSTDIR . '/' . $postId);
            $data['content'] = $content;
            $res->write(json_encode($data));
        } else {
            $res->status(404);
        }
    } else {
        $res->status(500);
        $res->write('Can not read posts directory!');
    }
});

// get list of page names and titles
$app->get('/pages', function () use ($app, $PAGEDIR) {
    $res = $app->response();
    $data = array();
    if (is_dir($PAGEDIR)) {
        $res['Content-Type'] = 'application/json';
        $files = scandir($PAGEDIR);
        array_shift($files);
        array_shift($files);
        $data['files'] = $files;
        $res->write(json_encode($data));
    } else {
        $res->status(500);
        $res->write('Can not read pages directory!');
    }
});

//get page by id
$app->get('/pages/:pageId', function ($pageId) use ($app, $PAGEDIR) {
    $res = $app->response();
    $data = array();
    if (is_dir($PAGEDIR)) {
        $res['Content-Type'] = 'application/json';
        $files = scandir($PAGEDIR);
        array_shift($files);
        array_shift($files);
        if (in_array($pageId, $files)) {
            $content = file_get_contents($PAGEDIR . '/' . $pageId);
            $data['content'] = $content;
            $res->write(json_encode($data));
        } else {
            $res->status(404);
        }
    } else {
        $res->status(500);
        $res->write('Can not read pages directory!');
    }
});


$app->run();
