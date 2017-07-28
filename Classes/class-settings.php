<?php

namespace nicomartin\AdvancedWPPerformance;

class Settings {

	public $capability = '';
	public $icon = '';
	public $settings_page = '';
	public $settings_group = '';

	private $options = '';

	public function __construct() {

		$this->capability      = 'administrator';
		$this->settings_page   = awpp_get_instance()->prefix . '-settings';
		$this->settings_option = awpp_get_instance()->prefix . '-option';
		$this->settings_group  = $this->settings_key . '-group';

		$this->options = get_option( $this->settings_option );
	}

	public function run() {
		add_action( 'admin_menu', [ $this, 'add_menu_page' ] );
		add_action( 'admin_init', [ $this, 'register_settings' ] );
	}

	public function add_menu_page() {
		add_submenu_page( 'options-general.php', awpp_get_instance()->name, awpp_get_instance()->name, $this->capability, $this->settings_page, [ $this, 'register_settings_page' ] );
	}

	public function register_settings_page() {
		?>
		<div class="wrap awpp-settings-wrap">
			<h1><?php echo awpp_get_instance()->name; ?></h1>
			<form method="post" action="options.php">
				<?php
				settings_fields( $this->settings_group );
				do_settings_sections( $this->settings_page );
				?>
				<div class="about-text">
					<p>
						<?php
						// translators: This Plugin was created by ...
						printf( __( 'This Plugin was created by %s.', 'awpp' ), '<a href="https://nicomartin.ch" target="_blank">Nico Martin</a> - <a href="https://sayhello.ch" target="_blank">Say Hello GmbH</a>' );
						?>
					</p>
					<p><b>Beta:</b> <?php
						// translators: Still in development: {{Link to Github}}
						printf( __( 'Still in development: %s.', 'awpp' ), '<a href="https://github.com/nico-martin/Advanced-WPPerformance" target="_blank">github.com/nico-martin/Advanced-WPPerformance</a>' );
						?>
					</p>
				</div>
				<?php
				submit_button();
				?>
			</form>
		</div>
		<?php
	}

	public function register_settings() {
		$section = $this->settings_group . '-section1';
		register_setting( $this->settings_group, $this->settings_option, [ $this, 'sanitize' ] );
		add_settings_section( $section, __( 'Settings', 'awpp' ), [ $this, 'print_section_info' ], $this->settings_page );
		add_settings_field( 'scripts_to_footer', __( 'Move all scripts to footer', 'awpp' ), [ $this, 'scripts_to_footer_callback' ], $this->settings_page, $section );
		add_settings_field( 'defer_scripts', __( 'Execute Scripts when page has finished parsing (defer)', 'awpp' ), [ $this, 'defer_scripts_callback' ], $this->settings_page, $section );
		add_settings_field( 'loadcss', __( 'Load CSS async', 'awpp' ), [ $this, 'loadcss_callback' ], $this->settings_page, $section );
	}

	public function sanitize( $input ) {

		$new_input  = [];
		$checkboxes = [ 'scripts_to_footer', 'defer_scripts', 'loadcss' ];

		foreach ( $checkboxes as $key ) {
			if ( isset( $input[ $key ] ) ) {
				$new_input[ $key ] = $input[ $key ];
			} else {
				$new_input[ $key ] = 'off';
			}
		}

		return $new_input;
	}

	public function print_section_info() {
	}

	public function scripts_to_footer_callback() {
		$key = 'scripts_to_footer';
		$val = $this->get_val( $key, 'on' );
		printf( '<input type="checkbox" name="%1$s[%2$s]" id="%2$s" %3$s />', $this->settings_option, $key, ( 'on' == $val ? 'checked' : '' ) );
	}

	public function defer_scripts_callback() {
		$key = 'defer_scripts';
		$val = $this->get_val( $key, 'on' );
		printf( '<input type="checkbox" name="%1$s[%2$s]" id="%2$s" %3$s />', $this->settings_option, $key, ( 'on' == $val ? 'checked' : '' ) );
	}

	public function loadcss_callback() {
		$key = 'loadcss';
		$val = $this->get_val( $key, 'on' );
		printf( '<input type="checkbox" name="%1$s[%2$s]" id="%2$s" %3$s />', $this->settings_option, $key, ( 'on' == $val ? 'checked' : '' ) );
	}


	/**
	 * Helpers
	 */
	public function get_val( $key, $default = '' ) {
		if ( isset( $this->options[ $key ] ) ) {
			return $this->options[ $key ];
		} else {
			return $default;
		}
	}
}