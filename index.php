<?php
// Log to stderr so Railway can see errors
ini_set('log_errors', 1);
ini_set('error_log', 'php://stderr');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Log startup
error_log("=== Application Starting ===");
error_log("Document root: " . __DIR__);

try {
    error_log("Loading autoload...");
    require_once __DIR__ . '/vendor/autoload.php';
    error_log("Autoload loaded successfully");

    // Check templates directory
    error_log("Checking templates directory...");
    $templates_dir = __DIR__ . '/templates';
    if (!is_dir($templates_dir)) {
        throw new Exception("Templates directory not found at: " . $templates_dir);
    }
    error_log("Templates directory found: " . $templates_dir);

    // Initialize Twig
    error_log("Initializing Twig...");
    $loader = new \Twig\Loader\FilesystemLoader($templates_dir);
    $twig = new \Twig\Environment($loader, [
        'cache' => false,
        'debug' => true,
    ]);
    error_log("Twig initialized successfully");

    // For Railway/production, use root path
    $base_path = $_ENV['BASE_PATH'] ?? '';
    $twig->addGlobal('base_path', $base_path);
    error_log("Base path set to: '" . $base_path . "'");

    // Add URL helper function
    $twig->addFunction(new \Twig\TwigFunction('url', function ($path) use ($base_path) {
        return rtrim($base_path, '/') . '/' . ltrim($path, '/');
    }));

    // Get the request path
    $request_uri = $_SERVER['REQUEST_URI'];
    $path = parse_url($request_uri, PHP_URL_PATH);
    error_log("Request URI: " . $request_uri);
    error_log("Parsed path: " . $path);

    // Remove base path if it exists
    if ($base_path && strpos($path, $base_path) === 0) {
        $path = substr($path, strlen($base_path));
        error_log("Path after base_path removal: " . $path);
    }

    // Route handling
    error_log("Routing to: " . $path);
    switch (true) {
        case $path === '/' || $path === '/index.php':
            error_log("Rendering landing page");
            echo $twig->render('pages/landing.twig');
            break;

        case $path === '/auth/login':
            error_log("Rendering login page");
            echo $twig->render('pages/auth/login.twig');
            break;

        case $path === '/auth/signup':
            error_log("Rendering signup page");
            echo $twig->render('pages/auth/signup.twig');
            break;

        case $path === '/dashboard':
            error_log("Rendering dashboard");
            echo $twig->render('pages/dashboard/dashboard.twig');
            break;

        case $path === '/tickets':
        case $path === '/tickets/active':
            error_log("Rendering tickets page");
            echo $twig->render('pages/dashboard/tickets.twig');
            break;

        case $path === '/tickets/create':
            error_log("Rendering ticket create form");
            echo $twig->render('pages/dashboard/ticket_form.twig', ['mode' => 'create']);
            break;

        case preg_match('#^/tickets/edit/(.+)$#', $path, $matches):
            $ticketId = $matches[1];
            error_log("Rendering ticket edit form for ID: " . $ticketId);
            echo $twig->render('pages/dashboard/ticket_form.twig', [
                'mode' => 'edit',
                'ticketId' => $ticketId
            ]);
            break;

        default:
            error_log("404 - Route not found: " . $path);
            http_response_code(404);
            echo $twig->render('pages/landing.twig');
            break;
    }

    error_log("=== Request completed successfully ===");

} catch (\Exception $e) {
    error_log("=== FATAL ERROR ===");
    error_log("Error: " . $e->getMessage());
    error_log("File: " . $e->getFile() . " Line: " . $e->getLine());
    error_log("Stack trace: " . $e->getTraceAsString());

    // Display errors to browser
    http_response_code(500);
    echo '<h1>Application Error</h1>';
    echo '<pre>' . htmlspecialchars($e->getMessage()) . '</pre>';
    echo '<pre>File: ' . htmlspecialchars($e->getFile()) . ' Line: ' . $e->getLine() . '</pre>';
    echo '<pre>' . htmlspecialchars($e->getTraceAsString()) . '</pre>';
}
?>
