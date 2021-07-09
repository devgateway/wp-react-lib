<?php


if (! function_exists('tdi_setup')) :
    function tdi_setup()
    {

        register_nav_menus(array(
            'main' => esc_html__('Desktop', 'tdi'),
        ));

        //add_theme_support( 'disable-custom-font-sizes' );

        add_theme_support( 'post-thumbnails' );
        add_theme_support( 'editor-font-sizes', array(
            array(
                'name'      => __( 'Breadcrumbs (12px)', 'wp-react-lib' ),
                'shortName' => __( 'BR', 'wp-react-lib' ),
                'size'      => 12,
                'slug'      => 'standard_12'
            ),
            array(
                'name'      => __( 'Links 16px', 'wp-react-lib' ),
                'shortName' => __( 'L', 'wp-react-lib' ),
                'size'      => 16,
                'slug'      => 'standard_16'
            ),
            array(
                'name'      => __( 'Body Copy (18px)', 'wp-react-lib' ),
                'shortName' => __( 'BC', 'wp-react-lib' ),
                'size'      => 18,
                'slug'      => 'standard_18'
            ),
array(
                'name'      => __( 'Title (24px)', 'wp-react-lib' ),
                'shortName' => __( 'T', 'wp-react-lib' ),
                'size'      => 24,
                'slug'      => 'standard_24'
            ),

array(
                'name'      => __( 'Section (30px)', 'wp-react-lib' ),
                'shortName' => __( 'ST', 'wp-react-lib' ),
                'size'      => 30,
                'slug'      => 'standard_30'
            ),

             array(
                             'name'      => __( 'Secondary (36px)', 'wp-react-lib' ),
                             'shortName' => __( 'SC', 'wp-react-lib' ),
                             'size'      => 36,
                             'slug'      => 'standard_36'
                         ),

   array(
                             'name'      => __( 'Intro (64px)', 'wp-react-lib' ),
                             'shortName' => __( 'IT', 'wp-react-lib' ),
                             'size'      => 64,
                             'slug'      => 'standard_64'
                         ),
        ) );

        add_theme_support('editor-color-palette', array(
            array(
                'name'  => __('Blue', 'wp-react-lib'),
                'slug'  => 'blue',
                'color'	=> '#3e53a6',
            ),
            array(
                'name'  => __('Light Blue', 'wp-react-lib'),
                'slug'  => 'light-blue',
                'color' => '#5089a6',
            ),
            array(
                'name'  => __('Gray', 'wp-react-lib'),
                'slug'  => 'gray',
                'color' => '#54657e',
               ),
            array(
                        'name'  => __('Green', 'wp-react-lib'),
                        'slug'  => 'green',
                        'color' => '#5baf95',
                    ),
            array(
                'name'  => __('Dark Gray', 'wp-react-lib'),
                'slug'  => 'dark-gray',
                'color' => '#5c5d63',
            ),
            array(
                'name'  => __('White', 'wp-react-lib'),
                'slug'  => 'white',
                'color' => '#fff',
            ),
             array(
                            'name'  => __('Black', 'wp-react-lib'),
                            'slug'  => 'black',
                            'color' => '#000',
                        ),
             array(
                        'name'  => __('White', 'wp-react-lib'),
                        'slug'  => 'red',
                        'color' => '#ba5555',
                        ),
        ));
    }
endif;

function tdi_content_width(){
    $GLOBALS['content_width'] = apply_filters('tdi_content_width', 640);
}

add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );
function theme_enqueue_styles() {
  wp_enqueue_style( 'parent-style', get_stylesheet_directory_uri() .'/style.css' );
}


// Register a new rest route
add_action( 'rest_api_init', 'my_rest_routes' );

function my_rest_routes() {

    register_rest_route(
        'alexi/v1',
        '/output_css_uri/',
        [
            'methods'  => 'GET',
            'callback' => 'output_css_callback',
        ]
    );
}


// Callback function to output the css URI
function output_css_callback() {
    return get_stylesheet_uri();
}

 function add_prevalence_post_types(){
     $labels = array(
                'name' => _x('prevalence', 'post type general name'),
                'singular_name' => _x('Post', 'post type singular name'),
                'add_new' => _x('Add New', 'Post'),
                'add_new_item' => __('Add Post'),
                'edit_item' => __('Edit Post'),
                'new_item' => __('New Post'),
                'all_items' => __('All Posts'),
                'view_item' => __('View Post'),
                'search_items' => __('Search posts'),
                'not_found' => __('No post found'),
                'not_found_in_trash' => __('No post found in the Trash'),
                'parent_item_colon' => '',
                'menu_name' => 'Prevalence'
            );
     // args array
     $args = array(
                'labels' => $labels,
                'description' => 'Displays posts',
                'public' => true,
                'menu_position' => 4,
                'supports' => array( 'title', 'editor','revisions','thumbnail'),
                'has_archive' => true,
                'show_in_rest' => true,
            );

     register_post_type('prevalence', $args);
 }



function create_prevalence_category()
{
    register_taxonomy('prevalence_category', 'prevalence', array(
         'hierarchical' => true,
         'labels' =>array(
             'name' => _x('Category', 'taxonomy general name'),
             'singular_name' => _x('Category', 'taxonomy singular name'),
             'search_items' =>  __('Search categories'),
             'popular_items' => __('Popular categories'),
             'all_items' => __('All categories'),
             'parent_item' => null,
             'parent_item_colon' => null,
             'edit_item' => __('Edit Category'),
             'update_item' => __('Update Category'),
             'add_new_item' => __('Add New Category'),
             'new_item_name' => __('New Category Name'),
             'separate_items_with_commas' => __('Separate categories with commas'),
             'add_or_remove_items' => __('Add or remove category'),
             'choose_from_most_used' => __('Choose from the most used category'),
             'menu_name' => __('Categories'),
         ),
         'show_ui' => true,
         'show_in_rest'=>true,
         'show_admin_column' => true,
         'update_count_callback' => '_update_post_term_count',
         'query_var' => true,
         'rewrite' => array( 'slug' => 'topic' ),
     ));
}

    function jr3_enqueue_gutenberg()
    {
        // This font is enqueued for the demo only.  You probably won't need this.

        // Make sure you link this to your actual file.
        wp_register_style('fonts', get_stylesheet_directory_uri() . '/css/editor.css');
        wp_enqueue_style('fonts');


    }




 function add_illicit_post_types(){
     $labels = array(
                'name' => _x('Illicit Trade', 'post type general name'),
                'singular_name' => _x('Post', 'post type singular name'),
                'add_new' => _x('Add New', 'Post'),
                'add_new_item' => __('Add Post'),
                'edit_item' => __('Edit Post'),
                'new_item' => __('New Post'),
                'all_items' => __('All Posts'),
                'view_item' => __('View Post'),
                'search_items' => __('Search posts'),
                'not_found' => __('No post found'),
                'not_found_in_trash' => __('No post found in the Trash'),
                'parent_item_colon' => '',
                'menu_name' => 'Illicit Trade'
            );
     // args array
     $args = array(
                'labels' => $labels,
                'description' => 'Displays posts',
                'public' => true,
                'menu_position' => 4,
                'supports' => array( 'title', 'editor','revisions','thumbnail'),
                'has_archive' => true,
                'show_in_rest' => true,
            );

     register_post_type('illicit', $args);
 }


 function create_illicit_category()
 {
     register_taxonomy('illicit_category', 'illicit', array(
          'hierarchical' => true,
          'labels' =>array(
              'name' => _x('Category', 'taxonomy general name'),
              'singular_name' => _x('Category', 'taxonomy singular name'),
              'search_items' =>  __('Search categories'),
              'popular_items' => __('Popular categories'),
              'all_items' => __('All categories'),
              'parent_item' => null,
              'parent_item_colon' => null,
              'edit_item' => __('Edit Category'),
              'update_item' => __('Update Category'),
              'add_new_item' => __('Add New Category'),
              'new_item_name' => __('New Category Name'),
              'separate_items_with_commas' => __('Separate categories with commas'),
              'add_or_remove_items' => __('Add or remove category'),
              'choose_from_most_used' => __('Choose from the most used category'),
              'menu_name' => __('Categories'),
          ),
          'show_ui' => true,
          'show_in_rest'=>true,
          'show_admin_column' => true,
          'update_count_callback' => '_update_post_term_count',
          'query_var' => true,
          'rewrite' => array( 'slug' => 'topic' ),
      ));
 }



 function add_health_post_types(){
     $labels = array(
                'name' => _x('Health', 'post type general name'),
                'singular_name' => _x('Post', 'post type singular name'),
                'add_new' => _x('Add New', 'Post'),
                'add_new_item' => __('Add Post'),
                'edit_item' => __('Edit Post'),
                'new_item' => __('New Post'),
                'all_items' => __('All Posts'),
                'view_item' => __('View Post'),
                'search_items' => __('Search posts'),
                'not_found' => __('No post found'),
                'not_found_in_trash' => __('No post found in the Trash'),
                'parent_item_colon' => '',
                'menu_name' => 'Health'
            );
     // args array
     $args = array(
                'labels' => $labels,
                'description' => 'Displays posts',
                'public' => true,
                'menu_position' => 4,
                'supports' => array( 'title', 'editor','revisions','thumbnail'),
                'has_archive' => true,
                'show_in_rest' => true,
            );

     register_post_type('health', $args);
 }


 function create_health_category() {
     register_taxonomy('health_category', 'health', array(
          'hierarchical' => true,
          'labels' =>array(
              'name' => _x('Category', 'taxonomy general name'),
              'singular_name' => _x('Category', 'taxonomy singular name'),
              'search_items' =>  __('Search categories'),
              'popular_items' => __('Popular categories'),
              'all_items' => __('All categories'),
              'parent_item' => null,
              'parent_item_colon' => null,
              'edit_item' => __('Edit Category'),
              'update_item' => __('Update Category'),
              'add_new_item' => __('Add New Category'),
              'new_item_name' => __('New Category Name'),
              'separate_items_with_commas' => __('Separate categories with commas'),
              'add_or_remove_items' => __('Add or remove category'),
              'choose_from_most_used' => __('Choose from the most used category'),
              'menu_name' => __('Categories'),
          ),
          'show_ui' => true,
          'show_in_rest'=>true,
          'show_admin_column' => true,
          'update_count_callback' => '_update_post_term_count',
          'query_var' => true,
          'rewrite' => array( 'slug' => 'topic' ),
      ));
 }





function cc_mime_types($mimes)
{
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}


function add_post_meta_field() {
	register_rest_field( get_post_types(),
						  'meta_fields',
						  array(
						  	'get_callback' => 'callback_read_meta_data'
							)
						);
}

function add_page_meta_field() {
	register_rest_field( 'page',
						  'page_meta_fields',
						  array(
						  	'get_callback' => 'callback_read_meta_data'
							)
						);
}

function callback_read_meta_data( $object ) {
	$post_id = $object['id'];
	return get_post_meta( $post_id );
}

add_action('after_setup_theme', 'tdi_content_width', 0);
add_action('after_setup_theme', 'tdi_setup');
//add_action('after_setup_theme', 'add_prevalence_post_types');
//add_action('after_setup_theme', 'create_prevalence_category');
//add_action('after_setup_theme', 'add_illicit_post_types');
//add_action('after_setup_theme', 'create_illicit_category');
//add_action('after_setup_theme', 'add_health_post_types');
//add_action('after_setup_theme', 'create_health_category');

add_action('admin_enqueue_scripts', 'jr3_enqueue_gutenberg');
add_action( 'rest_api_init', 'add_page_meta_field' );
add_action( 'rest_api_init', 'add_post_meta_field' );







//add_filter('upload_mimes', 'cc_mime_types');

/*
$taxonomies = array('health_category', 'illicit_category','prevalence_category','agriculture_category');


foreach ($taxonomies as &$taxonomy) {

    add_action( $taxonomy.'_add_form_fields', 'add_disable_header' );
    add_action( $taxonomy.'_edit_form_fields', 'edit_disable_header', 10, 2 );


    add_action( $taxonomy.'_add_form_fields', 'add_sub_title_field' );
    add_action( $taxonomy.'_edit_form_fields', 'edit_sub_title_field', 10, 2 );

    add_action( $taxonomy.'_add_form_fields', 'add_per_page_field' );
    add_action( $taxonomy.'_edit_form_fields', 'edit_per_page_fields', 10, 2 );

    add_action( $taxonomy.'_add_form_fields', 'add_component_field' );
    add_action( $taxonomy.'_edit_form_fields', 'edit_component_fields', 10, 2 );


    add_action( 'created_'.$taxonomy, 'save_fields' );
    add_action( 'edited_'.$taxonomy, 'save_fields' );
    add_filter( 'rest_prepare_'.$taxonomy, prepare_rest_taxonomy_metadata, 10, 3);

}

*/

function prepare_rest_taxonomy_metadata($response, $item, $request){
    $per_page = get_term_meta( $item->term_id, 'ui-per-page', true );
    $component = get_term_meta( $item->term_id, 'ui-display-component', true );

    $subtitle = get_term_meta( $item->term_id, 'ui-subtitle', true );
    $display_header = get_term_meta( $item->term_id, 'ui-display-header', true );

    $response->data['ui-per-page'] = (int)$per_page ?: null;
    $response->data['ui-display-component'] = $component ?: '';
    $response->data['ui-subtitle'] = $subtitle ?: '';
    $response->data['ui-display-header'] = $display_header ?: 'no';
    return $response;
}

function add_per_page_field( $taxonomy ) {
	echo '<div class="form-field">
            <label for="ui-per-page">Items</label>
            <input type="text" name="ui-per-page" id="ui-per-page" size="5" />
            <p>Number of post listed by default.</p>
        </div>';
}


function edit_per_page_fields( $term, $taxonomy ) {
	$value = get_term_meta( $term->term_id, 'ui-per-page', true );
	echo '<tr class="form-field">
        <th>
            <label for="ui-per-page">Items</label>
        </th>
        <td>
            <input name="ui-per-page" id="ui-per-page" type="text" value="' . esc_attr( $value ) .'" />
            <p>Number of post listed by default.</p>
        </td>
        </tr>';
}

function save_fields( $term_id ) {
	update_term_meta(
		$term_id,
		'ui-display-component',
		sanitize_text_field( $_POST[ 'ui-display-component' ] )
	);

update_term_meta(
    		$term_id,
    		'ui-per-page',
    		sanitize_text_field( $_POST[ 'ui-per-page' ] )
    	);
	update_term_meta(
    		$term_id,
    		'ui-subtitle',
    		sanitize_text_field( $_POST[ 'ui-subtitle' ] )
    	);
    	update_term_meta(
            		$term_id,
            		'ui-display-header',
            		sanitize_text_field( $_POST[ 'ui-display-header' ] )
            	);
}


function component_list( $value ){
    return '<select name="ui-display-component" id="ui-display-component" value="' . esc_attr( $value ) .'" />
              <option value="default" '.($value=='default'?'selected':'').'>Default</option>
               <option value="tabbed" '.($value=='tabbed'?'selected':'').'>Tabbed View</option>
               <option value="tabbed-light" '.($value=='tabbed-light'?'selected':'').'>Light Tabbed View </option>
               <option value="featured" '.($value=='featured'?'selected':'').'>Featured Columns</option>
               <option value="myths" '.($value=='myths'?'selected':'').'>Myths List</option>
               <option value="inline-list" '.($value=='inline-list'?'selected':'').'>Inline List</option>
        </select>';
}




function add_component_field( $taxonomy ) {
    $value = get_term_meta( $term->term_id, 'ui-display-component', true );
	echo '<div class="form-field">
    	<label for="ui-per-page">Component</label>'.component_list($value).'
          <p>UI Component (ask to your programmer)</p>
	</div>';
}


function edit_component_fields( $term, $taxonomy ) {
	$value = get_term_meta( $term->term_id, 'ui-display-component', true );
	echo '<tr class="form-field">
	<th>
		<label for="ui-display-component">Component</label>
	</th>
	<td>'.component_list($value).'
		<p>UI Component (ask to your programmer)</p>
	</td>
	</tr>';

}




function add_sub_title_field( $taxonomy ) {
   echo '<div class="form-field">
               <label for="ui-subtitle">Subtitle</label>
               <input type="text" name="ui-subtitle" id="ui-subtitle" size="5" />
               <p>Subtitle </p>
           </div>';
}


function edit_sub_title_field( $term, $taxonomy ) {
	$value = get_term_meta( $term->term_id, 'ui-subtitle', true );
    	echo '<tr class="form-field">
    	<th>
    		<label for="ui-subtitle">Subtitle</label>
    	</th>
    	<td>
    		<input name="ui-subtitle" id="ui-subtitle" type="text" value="' . esc_attr( $value ) .'" />
    		<p>Subtitle</p>
    	</td>
    	</tr>';
}





function add_disable_header( $taxonomy ) {
   echo '<div class="form-field">
               <label for="ui-subtitle">Display Header</label>
               <input type="checkbox" value="yes" checked name="ui-display-header" id="ui-display-header"  checked />
               <p>Show subsection header</p>
           </div>';
}





function edit_disable_header( $term, $taxonomy ) {
	    $value = get_term_meta( $term->term_id, 'ui-display-header', true );
	    $checked= esc_attr( $value )=="yes"?'checked':'';

    	echo '<tr class="form-field">
    	<th>
    		<label for="ui-subtitle">Subtitle (for subsection header)</label>
    	</th>
    	<td>
    		<input name="ui-display-header" id="ui-display-header" type="checkbox"  value="yes" '.$checked.' />
    		<p>Show subsection header</p>
    	</td>
    	</tr>';
}





function create_api_posts_meta_field() {

    // register_rest_field ( 'name-of-post-type', 'name-of-field-to-return', array-of-callbacks-and-schema() )
    register_rest_field( 'type', 'post-meta-fields', array(
           'get_callback'    => 'get_post_meta_for_api',
           'schema'          => null,
        )
    );
}

function get_post_meta_for_api( $object ) {
    //get the id of the post object array
        return  get_post_type_object($object['_edit_link']);
}





add_filter( 'wp_is_application_passwords_available', '__return_true' );



function add_setting_section(){
/* Create settings section */
    add_settings_section(
        'wp-react-section',                   // Section ID
        'WP React Settings',  // Section title
        'my_settings_section_description', // Section callback function
        'general'                          // Settings page slug
    );

     /* Create settings field */
        add_settings_field(
            'my-settings-field-id',       // Field ID
            'WP React URI',       // Field title
            'my_settings_field_callback', // Field callback function
            'general',                    // Settings page slug
            'wp-react-section'               // Section ID
        );
   }

/* Settings Init */
function my_settings_init(){


    /* Register Settings */
        register_setting(
            'general',             // Options group
            'react_ui_url',      // Option name/database
         array(
                 'show_in_rest' => true,
                 'type' => 'string'
               )
        );
}

/* Sanitize Callback Function */
function my_settings_sanitize( $input ){
    return isset( $input ) ? true : false;
}

/* Setting Section Description */
function my_settings_section_description(){
    echo  "<p>Enter React APP base URL (include hash symbol if using hash history) </p>" ;
}

/* Settings Field Callback */
function my_settings_field_callback(){
    ?>
    <label for="droid-identification">

        <input id="react_ui_url" class="regular-text" type="text"  name="react_ui_url" value="<?php echo(get_option( 'react_ui_url' )) ?>">
    </label>
    <?php
}
add_action( 'admin_init', 'my_settings_init' );
add_action( 'admin_init', 'add_setting_section' );
add_action('rest_api_init', 'my_settings_init');
