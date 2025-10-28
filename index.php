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
switch (true) {
    case $path === '/' || $path === '/index.php':
        echo $twig->render('pages/landing.twig');
        break;

    case $path === '/auth/login':
        echo $twig->render('pages/auth/login.twig');
        break;

    case $path === '/auth/signup':
        echo $twig->render('pages/auth/signup.twig');
        break;

    case $path === '/dashboard':
        echo $twig->render('pages/dashboard/dashboard.twig');
        break;

    case $path === '/tickets':
        echo $twig->render('pages/dashboard/tickets.twig');
        break;

    case $path === '/tickets/active':
        echo $twig->render('pages/dashboard/tickets.twig');
        break;

    case $path === '/tickets/create':
        echo $twig->render('pages/dashboard/ticket_form.twig', ['mode' => 'create']);
        break;

    case preg_match('#^/tickets/edit/(.+)$#', $path, $matches):
        // Extract ticket ID from URL
        $ticketId = $matches[1];
        echo $twig->render('pages/dashboard/ticket_form.twig', [
            'mode' => 'edit',
            'ticketId' => $ticketId
        ]);
        break;

    default:
        header('Location: ' . $base_path . '/');
        exit;
}
?>
