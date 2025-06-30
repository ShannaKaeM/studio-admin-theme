<?php
namespace Studio\Api;

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Data Manager - Handles JSON file storage
 */
class DataManager {
    
    /**
     * Base directory for studio data
     */
    private $base_dir;
    
    /**
     * Current user ID
     */
    private $user_id;
    
    /**
     * Constructor
     */
    public function __construct() {
        $upload_dir = wp_upload_dir();
        $this->base_dir = $upload_dir['basedir'] . '/studio-data';
        $this->user_id = get_current_user_id();
        
        // Ensure directory exists
        $this->ensure_directory_exists();
    }
    
    /**
     * Ensure directory structure exists
     */
    private function ensure_directory_exists() {
        $user_dir = $this->get_user_directory();
        if (!file_exists($user_dir)) {
            wp_mkdir_p($user_dir);
        }
    }
    
    /**
     * Get user directory path
     */
    private function get_user_directory() {
        return $this->base_dir . '/users/' . $this->user_id;
    }
    
    /**
     * Get projects file path
     */
    private function get_projects_file() {
        return $this->get_user_directory() . '/projects.json';
    }
    
    /**
     * Get all projects
     */
    public function get_all_projects() {
        $file = $this->get_projects_file();
        
        if (!file_exists($file)) {
            return [];
        }
        
        $content = file_get_contents($file);
        $data = json_decode($content, true);
        
        return $data['projects'] ?? [];
    }
    
    /**
     * Get single project
     */
    public function get_project($project_id) {
        $projects = $this->get_all_projects();
        return $projects[$project_id] ?? null;
    }
    
    /**
     * Save project
     */
    public function save_project($project_id, $project_data) {
        $projects = $this->get_all_projects();
        $projects[$project_id] = $project_data;
        
        return $this->save_projects($projects);
    }
    
    /**
     * Delete project
     */
    public function delete_project($project_id) {
        $projects = $this->get_all_projects();
        
        if (!isset($projects[$project_id])) {
            return false;
        }
        
        unset($projects[$project_id]);
        
        // Delete project directory
        $project_dir = $this->get_user_directory() . '/projects/' . $project_id;
        if (file_exists($project_dir)) {
            $this->delete_directory($project_dir);
        }
        
        return $this->save_projects($projects);
    }
    
    /**
     * Save all projects
     */
    private function save_projects($projects) {
        $data = ['projects' => $projects];
        $json = json_encode($data, JSON_PRETTY_PRINT);
        
        if ($json === false) {
            return false;
        }
        
        $file = $this->get_projects_file();
        $result = file_put_contents($file, $json);
        
        // Clear cache
        delete_transient('studio_projects_cache');
        
        return $result !== false;
    }
    
    /**
     * Delete directory recursively
     */
    private function delete_directory($dir) {
        if (!file_exists($dir)) {
            return true;
        }
        
        if (!is_dir($dir)) {
            return unlink($dir);
        }
        
        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }
            
            if (!$this->delete_directory($dir . DIRECTORY_SEPARATOR . $item)) {
                return false;
            }
        }
        
        return rmdir($dir);
    }
    
    /**
     * Get project colors
     */
    public function get_project_colors($project_id) {
        $file = $this->get_user_directory() . '/projects/' . $project_id . '/colors.json';
        
        if (!file_exists($file)) {
            return [];
        }
        
        $content = file_get_contents($file);
        return json_decode($content, true) ?? [];
    }
    
    /**
     * Save project colors
     */
    public function save_project_colors($project_id, $colors_data) {
        $project_dir = $this->get_user_directory() . '/projects/' . $project_id;
        
        if (!file_exists($project_dir)) {
            wp_mkdir_p($project_dir);
        }
        
        $json = json_encode($colors_data, JSON_PRETTY_PRINT);
        if ($json === false) {
            return false;
        }
        
        $file = $project_dir . '/colors.json';
        return file_put_contents($file, $json) !== false;
    }
}