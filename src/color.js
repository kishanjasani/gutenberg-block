const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { __ } = wp.i18n;
const { PanelBody } = wp.components;

registerBlockType( 'jk/custom-color', {

	// built-in attributes
	title: __( 'Custom Color Pallate' ),
	description: __( 'Block to generate a custom Color Pallate to Action' ),
	icon: 'format-image',
	category: 'layout',

	// custom attributes
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2'
		},
		body: {
			type: 'string',
			source: 'html',
			selector: 'p'
		},
		titleColor: {
			type: 'string',
			default: 'black'
		},
		bodyColor: {
			type: 'string',
			default: 'black'
		}
	},

	// built-in functions
	edit( { attributes, setAttributes } ) {

		const { title, body, titleColor, bodyColor } = attributes;
		// custom functions
		function onChangeTitle( newTitle ) {
			setAttributes( { title: newTitle } );
		}

		function onChangeBody( newBody ) {
			setAttributes( { body: newBody } );
		}

		function onTitleColorChange( newColor ) {
			setAttributes( { titleColor: newColor } );
		}

		function onBodyColorChange( newColor ) {
			setAttributes( { bodyColor: newColor } );
		}

		return ( [
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title={ __( 'Font Color Settings', 'jk' ) }>
					<p><strong> Select a title color: </strong></p>
					<ColorPalette value={ titleColor }
								  onChange={ onTitleColorChange } />

					<p><strong> Select a text color: </strong></p>
					<ColorPalette value={ bodyColor }
					onChange={ onBodyColorChange } />
				</PanelBody>
			</InspectorControls>,
			<div className="cta-container">
				<RichText key="editable"
					tagName="h2"
					placeholder={ __( 'Your CTA Title', 'jk' ) }
					value={ title }
					onChange={ onChangeTitle }
					style={ { color: titleColor } } />

				<RichText key="editable"
					tagName="p"
					placeholder= { __( "Your CTA Description", 'jk' ) }
					value={ body }
					onChange={ onChangeBody }
					style={ { color: bodyColor } }/>
			</div>
		] );
	},

	save( { attributes } ) {
		const { title, body, titleColor, bodyColor } = attributes;
		return (
			<div className="cta-container">
			<h2 style={ { color: titleColor } }>{ title }</h2>
			<RichText.Content tagName="p"
				style= { { color: bodyColor } }
				value={ body } />
		</div>
	);
	},
} );
