<?php
require_once __DIR__ . '/vendor/autoload.php';

// Initialize Twig
$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader, [
    'cache' => false,
    'debug' => true,
]);

// Simple routing
$request_uri = $_SERVER['REQUEST_URI'];
$base_path = '/twig-ticket-app';

// Remove base path and query string
$path = str_replace($base_path, '', parse_url($request_uri, PHP_URL_PATH));

// Route handling
switch ($path) {
    case '/':
    case '/index.php':
        echo $twig->render('pages/landing.twig');
        break;
    
    case '/auth/login':
        echo $twig->render('pages/auth/login.twig');
        break;
    
    case '/auth/signup':
        echo $twig->render('pages/auth/signup.twig');
        break;
    
    case '/dashboard':
        echo $twig->render('pages/dashboard/dashboard.twig');
        break;
    
    case '/tickets':
        echo $twig->render('pages/dashboard/tickets.twig');
        break;
    
    case '/tickets/create':
        echo $twig->render('pages/dashboard/ticket_form.twig', ['mode' => 'create']);
        break;
    
    default:
        header('Location: ' . $base_path . '/');
        exit;
}
?>