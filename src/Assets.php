<?php

namespace App;

class Assets
{
    /**
     * Assets constructor
     *
     * @var [array, string]
     */
    private $manifest, $assetsPath;

    public function __construct(string $assetsPath)
    {
        $this->assetsPath = $assetsPath;
    }

    /**
     * Get path to file
     *
     * @param string $filename
     * @return string|null
     */
    public function getPath(string $filename): ?string
    {
        $path = $this->getManifest()->$filename ?? $filename;

        if (strpos($path, 'http://') !== false) {
            return $path;
        }

        return get_stylesheet_directory_uri() . '/assets/' . $path;
    }

    /**
     * Get manifest file content
     *
     * @return array
     */
    public function getManifest(): object
    {
        if (!$this->manifest) {
            $this->manifest = json_decode(file_get_contents($this->assetsPath . '/manifest.json'));
        }
        return $this->manifest;
    }
}