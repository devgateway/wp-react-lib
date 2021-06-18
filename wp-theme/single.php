<?php
$preview = $_GET['$preview'];
global $post;
    if ( is_preview() ) {
       wp_redirect(get_option( 'react_ui_url' )."".wpm_get_language()."/preview/post/".$_GET['preview_id']."?_wpnonce="."".wp_create_nonce( "wp_rest")."&preview="."".$_GET["preview"]);
    }else{
       wp_redirect(get_option( 'react_ui_url' )."".wpm_get_language()."".parse_url(get_permalink($post),PHP_URL_PATH));
    }
?>
