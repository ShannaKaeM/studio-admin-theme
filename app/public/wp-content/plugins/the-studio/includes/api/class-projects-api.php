<?php
namespace Studio\Api;

use WP_REST_Controller;
use WP_REST_Server;
use WP_REST_Response;
use WP_Error;

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Projects REST API Controller
 */
class ProjectsAPI extends WP_REST_Controller {
    
    /**
     * Constructor
     */
    public function __construct() {
        $this->namespace = 'studio/v2';
        $this->rest_base = 'projects';
    }
    
    /**
     * Register routes
     */
    public function register_routes() {
        // Get all projects
        register_rest_route($this->namespace, '/' . $this->rest_base, [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'get_items'],
                'permission_callback' => [$this, 'get_items_permissions_check'],
            ],
            [
                'methods' => WP_REST_Server::CREATABLE,
                'callback' => [$this, 'create_item'],
                'permission_callback' => [$this, 'create_item_permissions_check'],
                'args' => $this->get_endpoint_args_for_item_schema(WP_REST_Server::CREATABLE),
            ],
        ]);
        
        // Single project routes
        register_rest_route($this->namespace, '/' . $this->rest_base . '/(?P<id>[a-zA-Z0-9-_]+)', [
            [
                'methods' => WP_REST_Server::READABLE,
                'callback' => [$this, 'get_item'],
                'permission_callback' => [$this, 'get_item_permissions_check'],
                'args' => [
                    'id' => [
                        'description' => __('Project ID', 'the-studio'),
                        'type' => 'string',
                    ],
                ],
            ],
            [
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => [$this, 'update_item'],
                'permission_callback' => [$this, 'update_item_permissions_check'],
                'args' => $this->get_endpoint_args_for_item_schema(WP_REST_Server::EDITABLE),
            ],
            [
                'methods' => WP_REST_Server::DELETABLE,
                'callback' => [$this, 'delete_item'],
                'permission_callback' => [$this, 'delete_item_permissions_check'],
            ],
        ]);
        
        // Set active project
        register_rest_route($this->namespace, '/' . $this->rest_base . '/(?P<id>[a-zA-Z0-9-_]+)/activate', [
            'methods' => WP_REST_Server::CREATABLE,
            'callback' => [$this, 'set_active_project'],
            'permission_callback' => [$this, 'update_item_permissions_check'],
            'args' => [
                'id' => [
                    'description' => __('Project ID', 'the-studio'),
                    'type' => 'string',
                ],
            ],
        ]);
    }
    
    /**
     * Get all projects
     */
    public function get_items($request) {
        $data_manager = new DataManager();
        $projects = $data_manager->get_all_projects();
        
        return new WP_REST_Response($projects, 200);
    }
    
    /**
     * Get single project
     */
    public function get_item($request) {
        $project_id = $request['id'];
        $data_manager = new DataManager();
        $project = $data_manager->get_project($project_id);
        
        if (!$project) {
            return new WP_Error('not_found', __('Project not found', 'the-studio'), ['status' => 404]);
        }
        
        return new WP_REST_Response($project, 200);
    }
    
    /**
     * Create project
     */
    public function create_item($request) {
        $data = $request->get_json_params();
        
        // Validate required fields
        if (empty($data['name'])) {
            return new WP_Error('missing_name', __('Project name is required', 'the-studio'), ['status' => 400]);
        }
        
        // Generate project ID from name
        $project_id = sanitize_title($data['name']);
        
        // Check if project already exists
        $data_manager = new DataManager();
        if ($data_manager->get_project($project_id)) {
            return new WP_Error('duplicate_project', __('A project with this name already exists', 'the-studio'), ['status' => 400]);
        }
        
        // Create project data
        $project_data = [
            'id' => $project_id,
            'name' => sanitize_text_field($data['name']),
            'client' => sanitize_text_field($data['client'] ?? ''),
            'logo' => esc_url_raw($data['logo'] ?? ''),
            'isActive' => false,
            'activeTheme' => 'default',
            'stats' => [
                'totalColors' => 0,
                'totalThemes' => 1,
                'lastModified' => current_time('Y-m-d H:i:s'),
            ],
            'created' => current_time('Y-m-d H:i:s'),
        ];
        
        // Save project
        $saved = $data_manager->save_project($project_id, $project_data);
        
        if (!$saved) {
            return new WP_Error('save_failed', __('Failed to save project', 'the-studio'), ['status' => 500]);
        }
        
        return new WP_REST_Response($project_data, 201);
    }
    
    /**
     * Update project
     */
    public function update_item($request) {
        $project_id = $request['id'];
        $data = $request->get_json_params();
        
        $data_manager = new DataManager();
        $project = $data_manager->get_project($project_id);
        
        if (!$project) {
            return new WP_Error('not_found', __('Project not found', 'the-studio'), ['status' => 404]);
        }
        
        // Update fields
        if (isset($data['name'])) {
            $project['name'] = sanitize_text_field($data['name']);
        }
        if (isset($data['client'])) {
            $project['client'] = sanitize_text_field($data['client']);
        }
        if (isset($data['logo'])) {
            $project['logo'] = esc_url_raw($data['logo']);
        }
        if (isset($data['activeTheme'])) {
            $project['activeTheme'] = sanitize_text_field($data['activeTheme']);
        }
        
        // Update modified time
        $project['stats']['lastModified'] = current_time('Y-m-d H:i:s');
        
        // Save project
        $saved = $data_manager->save_project($project_id, $project);
        
        if (!$saved) {
            return new WP_Error('save_failed', __('Failed to update project', 'the-studio'), ['status' => 500]);
        }
        
        return new WP_REST_Response($project, 200);
    }
    
    /**
     * Delete project
     */
    public function delete_item($request) {
        $project_id = $request['id'];
        
        $data_manager = new DataManager();
        $deleted = $data_manager->delete_project($project_id);
        
        if (!$deleted) {
            return new WP_Error('delete_failed', __('Failed to delete project', 'the-studio'), ['status' => 500]);
        }
        
        // If this was the active project, clear it
        if (get_option('studio_active_project') === $project_id) {
            update_option('studio_active_project', '');
        }
        
        return new WP_REST_Response(['deleted' => true], 200);
    }
    
    /**
     * Set active project
     */
    public function set_active_project($request) {
        $project_id = $request['id'];
        
        $data_manager = new DataManager();
        $project = $data_manager->get_project($project_id);
        
        if (!$project) {
            return new WP_Error('not_found', __('Project not found', 'the-studio'), ['status' => 404]);
        }
        
        // Deactivate all projects
        $all_projects = $data_manager->get_all_projects();
        foreach ($all_projects as $id => $proj) {
            $proj['isActive'] = false;
            $data_manager->save_project($id, $proj);
        }
        
        // Activate this project
        $project['isActive'] = true;
        $data_manager->save_project($project_id, $project);
        
        // Update option
        update_option('studio_active_project', $project_id);
        
        return new WP_REST_Response(['active' => $project_id], 200);
    }
    
    /**
     * Check permissions for reading
     */
    public function get_items_permissions_check($request) {
        return current_user_can('manage_options');
    }
    
    /**
     * Check permissions for reading single item
     */
    public function get_item_permissions_check($request) {
        return current_user_can('manage_options');
    }
    
    /**
     * Check permissions for creating
     */
    public function create_item_permissions_check($request) {
        return current_user_can('manage_options');
    }
    
    /**
     * Check permissions for updating
     */
    public function update_item_permissions_check($request) {
        return current_user_can('manage_options');
    }
    
    /**
     * Check permissions for deleting
     */
    public function delete_item_permissions_check($request) {
        return current_user_can('manage_options');
    }
}