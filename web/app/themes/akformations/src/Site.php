<?php

namespace Theme;

use Timber\Post;
use Timber\Menu;

class Site extends \App\Site
{
    public function __construct($site_name_or_id = null)
    {
        parent::__construct($site_name_or_id);

        add_action('init', [$this, 'registerMenus']);
        add_filter('timber/context', [$this, 'addToContext']);
    }

    public function registerMenus()
    {
        register_nav_menus([
            'header' => 'Menu principal'
        ]);
    }

    public function addToContext($context)
    {
        $context['main_menu'] = new Menu('primary-menu');
        $context['post'] = new Post();

        return $context;
    }
}
