const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette, MediaUpload } = wp.editor;
const { __ } = wp.i18n;
const { PanelBody, IconButton } = wp.components;

registerBlockType( 'jk/custom-media', {

	// built-in attributes
	title: __( 'Custom Image Upload' ),
	description: __( 'Block to generate a custom Image Upload' ),
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
		},
		backgroundImage: {
			type: 'string',
			default: null
		}
	},

	// built-in functions
	edit( { attributes, setAttributes } ) {

		const { title, body, titleColor, bodyColor, backgroundImage } = attributes;
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

		function onSelectImage( newImage ) {
			console.log( newImage );
			setAttributes( { backgroundImage: newImage.sizes.full.url } );
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
				<PanelBody title={ __( 'Background Image Settings', 'jk' ) }>
					<p><strong> Select a background Image: </strong></p>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ backgroundImage }
						render={ ( { open } ) => {
						return ( <IconButton
							onClick={ open }
							icon="upload"
							className="editor-media-placeholder__button is-button is-default is-large">
								Background Image
							</IconButton> )
						} }
					/>
				</PanelBody>
			</InspectorControls>,
			<div className="cta-container" style={ {
				backgroundImage: `url( ${ backgroundImage } )`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			} }>
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
		const { title, body, titleColor, bodyColor, backgroundImage } = attributes;
		return (
			<div className="cta-container" style={ {
				backgroundImage: `url( ${ backgroundImage } )`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			} }>
			<h2 style={ { color: titleColor } }>{ title }</h2>
			<RichText.Content tagName="p"
				style= { { color: bodyColor } }
				value={ body } />
		</div>
	);
	},
} );
