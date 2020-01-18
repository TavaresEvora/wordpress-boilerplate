<?php

namespace App;

use Timber\Site as TimberSite;

class Site extends TimberSite
{
    public function __construct($site_name_od_id = null)
    {
        add_action('wp_enqueue_scripts', [$this, 'registerAssets']);

        parent::__construct($site_name_od_id);
    }

    public function registerAssets()
    {
        $asset = new Assets(get_stylesheet_directory() . '/assets');
        
        wp_register_style('app', $asset->getPath('app.css'));
        wp_enqueue_style('app');

        wp_register_script('app', $asset->getPath('app.js'), [], '1.0.0', true);
        wp_enqueue_script('app');
    }
}