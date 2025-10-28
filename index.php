<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

try {
    require_once __DIR__ . '/vendor/autoload.php';

    // Initialize Twig
    $loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
    $twig = new \Twig\Environment($loader, [
        'cache' => false,
        'debug' => true,
    ]);

    // For Railway/production, use root path
    $base_path = $_ENV['BASE_PATH'] ?? '';
    $twig->addGlobal('base_path', $base_path);

    // Add URL helper function
    $twig->addFunction(new \Twig\TwigFunction('url', function ($path) use ($base_path) {
        return rtrim($base_path, '/') . '/' . ltrim($path, '/');
    }));

    // Get the request path
    $request_uri = $_SERVER['REQUEST_URI'];
    $path = parse_url($request_uri, PHP_URL_PATH);

    // Remove base path if it exists
    if ($base_path && strpos($path, $base_path) === 0) {
        $path = substr($path, strlen($base_path));
    }

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
        case $path === '/tickets/active':
            echo $twig->render('pages/dashboard/tickets.twig');
            break;

        case $path === '/tickets/create':
            echo $twig->render('pages/dashboard/ticket_form.twig', ['mode' => 'create']);
            break;

        case preg_match('#^/tickets/edit/(.+)$#', $path, $matches):
            $ticketId = $matches[1];
            echo $twig->render('pages/dashboard/ticket_form.twig', [
                'mode' => 'edit',
                'ticketId' => $ticketId
            ]);
            break;

        default:
            http_response_code(404);
            echo $twig->render('pages/landing.twig'); // or create a 404 page
            break;
    }

} catch (\Exception $e) {
    // Display errors during development
    http_response_code(500);
    echo '<h1>Application Error</h1>';
    echo '<pre>' . htmlspecialchars($e->getMessage()) . '</pre>';
    echo '<pre>' . htmlspecialchars($e->getTraceAsString()) . '</pre>';
}
?>
