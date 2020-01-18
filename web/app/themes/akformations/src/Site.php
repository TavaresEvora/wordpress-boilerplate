<?php

namespace Theme;

class Site extends \App\Site
{
    public function __construct($site_name_or_id = null)
    {
        parent::__construct($site_name_or_id);

        add_action('init', [$this, 'registerMenus']);
    }

    public function registerMenus()
    {
        register_nav_menus([
            'header' => 'Menu principal'
        ]);
    }
}